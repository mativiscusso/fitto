import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { Goal, MealType, GOALS, getIngredientIcon } from '@/types/recipe'

type Message = { role: 'user' | 'assistant' | 'system'; content: string }

const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Sos Fitto, un asistente nutricional que recomienda recetas saludables y personalizadas.

REGLAS CRÍTICAS:
1. Siempre respondés en español argentino
2. Las recetas son SIMPLES y rápidas de preparar (máximo 25 min)
3. Usás ingredientes accesibles en Argentina (supermercado común)
4. Cada ingrediente DEBE tener un emoji representativo
5. La respuesta es en JSON válido con este formato EXACTO:
{
  "name": "Nombre de la receta",
  "ingredients": [
    { "name": "ingrediente 1", "icon": "emoji", "substitutes": ["subst1", "subst2"] }
  ],
  "instructions": ["paso 1", "paso 2"],
  "calories": numero,
  "tags": ["tag1", "tag2"],
  "reason": "Explicación breve de por qué esta receta es buena para el objetivo seleccionado (máximo 80 caracteres)"
}

IMPORTANTE: El campo "reason" es una explicación corta y persuasiva de por qué esta receta ayuda al objetivo de salud del usuario. Debe ser concreta y basadas en evidencia nutricional simple.

Cuando te pidan "otra receta" o "shuffle",必ず DAS UNA RECETA COMPLETAMENTE DIFERENTE.
No repitas el mismo tipo de comida. Si la anterior era con salmón, ahora HACÉ UNA CON POLLO O VEGETALES.
La variedad es clave - cada receta debe ser DISTINTA de las anteriores.

OPCIONES VARIADAS POR TIPO DE COMIDA:

DESAYUNO (alternativas diferentes):
- Avena con frutas y semillas
- Yogur con granola y frutas
- Huevos revueltos con verduras
- Tostadas integrales con palta
- Licuado verde de espinaca y manzana
- Omelette de claras con queso
- Panqueques de banana y avena
- Taza de yogur con nueces y miel

ALMUERZO (alternativas diferentes):
- Ensalada de pollo a la plancha con hojas verdes
- Quinoa con vegetales salteados
- Pollo al horno con batata
- Ensalada de lentejas con atún
- Arroz integral con brócoli y ajo
- Sopa de verduras con frango
- Ensalada de garbanzos con tomate y pepino
- Carne molida sazonada con ensalada

MERIENDA (alternativas diferentes):
- Frutas con yogur griego
- Puñado de almendras y nueces
- Galletitas integrales con infusión
- Hummus con bastones de zanahoria
- Palta pisada con limón en tostada
- Fruta de estación con queso fresco

CENA (alternativas diferentes):
- Merluza a la plancha con ensalada
- Ensalada César con pollo
- Verduras al vapor con huevo pochado
- Caldo de pollo con vegetales
- Rolitos de pollo con espinaca
- Ensalada tibia de quinoa
- Zucchini relleno con atún
- Sopa de lentejas con espinaca

PARA BAJAR COLESTEROL LDL:
- Priorizá: pescados (merluza, atún, sardina), legumbres, frutos secos, fibra
- Evitá: frituras, embutidos, productos lácteos enteros

PARA BAJAR TRIGLICÉRIDOS:
- Priorizá: omega-3, fibra, vegetales verdes
- Evitá: harinas refinadas, azúcar, alcohol

PARA CONTROLAR GLUCOSA:
- Priorizá: fibra, proteína, carbohidratos complejos
- Evitá: azúcar, harinas blancas, frutas muy dulces

PARA BAJAR PRESIÓN:
- Priorizá: potasio, vegetales, pescado
- Evitá: sal, embutidos, alimentos procesados`

function buildUserPrompt(goal: Goal, mealType: MealType, forceNew: boolean, previousRecipe?: string): string {
  const goalInfo = GOALS.find(g => g.id === goal)
  const mealLabels: Record<MealType, string> = {
    desayuno: 'el DESAYUNO',
    almuerzo: 'el ALMUERZO',
    merienda: 'la MERIENDA',
    cena: 'la CENA',
  }

  const varietyHints = [
    'Usá ingredientes diferentes a los que generalmente se usan.',
    'Elegí una preparación que no hayas usado antes.',
    'La receta debe ser DISTINTA, no repitas tipos de comida.',
    'Si la receta anterior tenía X ingrediente, ahora usá ingredientes completamente diferentes.',
  ]

  let hint = ''
  if (forceNew && previousRecipe) {
    hint = `La receta anterior fue "${previousRecipe}". Ahora generá algo MUY diferente - otra categoría de comida, otros ingredientes principales, otra forma de preparación. NO repitas categorías similares.`
  } else if (forceNew) {
    hint = varietyHints[Math.floor(Math.random() * varietyHints.length)]
  }

  return `Generame una receta para ${mealLabels[mealType]} enfocada en: ${goalInfo?.label}

${hint}

La receta debe ser:
- Simple y rápida (máximo 20 min de preparación)
- Con ingredientes accesibles en Argentina
- Apta para el objetivo: ${goalInfo?.description}
- Con todos los ingredientes y un emoji representativo para cada uno
- Incluir los ingredientes alternativos por si no tiene alguno
- Incluir instrucciones breves de preparación
- Calorías aproximadas
- Incluir un campo "reason" corto y persuasivo (máximo 80 caracteres) de por qué esta receta ayuda a ${goalInfo?.label.toLowerCase()}

Respondé SOLO con el JSON, sin texto adicional.`
}

export async function POST(request: Request) {
  const { goal, mealType, forceNew, history, previousRecipe } = await request.json()

  if (!goal || !mealType) {
    return Response.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  const messages: Message[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(goal, mealType, forceNew, previousRecipe) },
  ]

  try {
    const { text } = await generateText({
      model: groq(MODEL),
      messages,
      temperature: forceNew ? 1.0 : 0.9,
      maxOutputTokens: 1400,
    })

    let recipe
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0])
        recipe.id = crypto.randomUUID()
        recipe.mealType = [mealType]

        if (!recipe.reason) {
          const goalInfo = GOALS.find(g => g.id === goal)
          recipe.reason = `Rica en fibra y proteína, ideal para ${goalInfo?.label.toLowerCase()}`
        }

        recipe.ingredients = recipe.ingredients.map((ing: any) => ({
          name: ing.name,
          icon: ing.icon || getIngredientIcon(ing.name),
          substitutes: ing.substitutes || [],
        }))
      } else {
        throw new Error('No JSON found')
      }
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError, text)
      return Response.json(
        { error: 'Error generando receta. Probá de nuevo.' },
        { status: 500 }
      )
    }

    return Response.json({ recipe })
  } catch (error: any) {
    console.error('Error calling Groq:', error)
    return Response.json(
      { error: error?.message || 'Error generando receta. Probá de nuevo.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return Response.json({
    info: 'Usa POST con { goal, mealType, forceNew, previousRecipe } para generar una receta',
    goals: GOALS.map(g => ({ id: g.id, label: g.label })),
    mealTypes: ['desayuno', 'almuerzo', 'merienda', 'cena'],
  })
}