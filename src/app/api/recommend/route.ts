import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { Goal, MealType, GOALS, getIngredientIcon } from '@/types/recipe'

type Message = { role: 'user' | 'assistant' | 'system'; content: string }

const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Sos Fitto, un asistente nutricional que recomienda recetas saludables y personalizadas.

REGLAS CRÍTICAS:
1. Siempre respondés en español argentino
2. Las recetas son SIMPLES y rápidas de preparar (máximo 25 min)
3. Usás ingredientes accesibles en Argentina (supermercado común, dietética, mercado)
4. Cada ingrediente tiene un ícono de boxicons (ej: bx bx-chicken, bx bx-carrot)
5. La respuesta es en JSON válido con este formato EXACTO:
{
  "name": "Nombre de la receta",
  "ingredients": [
    { "name": "ingrediente 1", "icon": "bx bx-nombre-icono", "substitutes": ["subst1", "subst2"] }
  ],
  "instructions": ["paso 1", "paso 2"],
  "calories": numero,
  "tags": ["tag1", "tag2"],
  "reason": "Explicación detallada de 1-2 oraciones de por qué esta receta es perfecta para el objetivo del usuario. Sea específico sobre los beneficios nutricionales."
}

El campo "reason" es CLAVE. Debe ser una explicación concreta y persuasiva de 1-2 oraciones que conecte directamente los ingredientes con el objetivo de salud. NO sea genérico. Mencioná ingredientes específicos y su beneficio.

Ejemplos de reason BUENO vs MALO:
- MALO: "Rica en fibra y proteína"
- BUENO: "La avena aporta betaglucano que reduce el colesterol LDL, mientras que las nueces dan omega-3 para proteger el corazón"

- MALO: "Bueno para ganar músculo"
- BUENO: "Con 35g de proteína de whey y carbohidratos de banana, esta receta Optimiza la síntesis de proteína muscular post-entreno"

Cuando te pidan "otra receta" o "shuffle", обязательно DAS UNA RECETA COMPLETAMENTE DIFERENTE.
No repitas el mismo tipo de comida. Si la anterior era con salmón, ahora HACÉ UNA CON POLLO O LEGUMBRES.
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

PARA PERDER PESO:
- Déficit calórico moderado (400-500 kcal debajo del mantenimiento)
- Alta proteína (1.8-2g por kg de peso) para preservar músculo
- Carbohidratos moderados y complejos solo en comidas autour de ejercicio
- Grasas saludables moderadas (0.8-1g por kg)
- Vegetal abundante en cada comida para dar volumen y saciedad

PARA GANAR MÚSCULO:
- Superávit calórico moderado (300-400 kcal encima del mantenimiento)
- Proteína alta (1.6-2.2g por kg de peso)
- Carbohidratos ample para energía y resíntesis de glucógeno
- Timing: proteína + carb después de entrenar
- Micronutrientes: zinc, magnesio, vitamina D

PARA CUIDAR EL CORAZÓN:
- Omega-3 de pescados azules (salmón, sardina, atún, merluza)
- Beta-glucano de avena para reducir colesterol LDL
- Fibra soluble de legumbres y vegetales
- Grasas monoinsaturadas (aceite de oliva, palta, frutos secos)
- Reducir saturadas, sal y evitar grasas trans

PARA TENER MÁS ENERGÍA:
- Carbohidratos complejos (avena, quinoa, arroz integral)
- Hierro de legumbres y carnes magras
- Vitaminas B de cereales integrales y vegetales verdes
- Magnesio de frutos secos y banana
- Hidratación adecuada (2-3 litros de agua por día)`

function buildUserPrompt(goal: Goal, mealType: MealType, forceNew: boolean, previousRecipe?: string): string {
  const goalInfo = GOALS.find(g => g.id === goal)
  const mealLabels: Record<MealType, string> = {
    desayuno: 'el DESAYUNO',
    almuerzo: 'el ALMUERZO',
    merienda: 'la MERIENDA',
    cena: 'la CENA',
  }

  let hint = ''
  if (forceNew && previousRecipe) {
    hint = `La receta anterior fue "${previousRecipe}". Ahora generá algo MUY diferente - otra categoría de comida, otros ingredientes principales, otra forma de preparación. NO repitas categorías similares ni ingredientes principales usados antes.`
  } else if (forceNew) {
    const hints = [
      'Elegí ingredientes que no suelas usar juntos.',
      'Probá una preparación nueva que nunca hayas hecho.',
      'La receta debe ser DISTINTA de lo común.',
    ]
    hint = hints[Math.floor(Math.random() * hints.length)]
  }

  return `Generame una receta para ${mealLabels[mealType]} enfocada en: ${goalInfo?.label}

${hint}

${goalInfo?.promptHint}

La receta debe ser:
- Simple y rápida (máximo 20 min de preparación)
- Con ingredientes accesibles en Argentina
- Apta para el objetivo: ${goalInfo?.description}
- Con todos los ingredientes y un emoji representativo para cada uno
- Incluir los ingredientes alternativos por si no tiene alguno
- Incluir instrucciones breves de preparación
- Calorías aproximadas
- El campo "reason" debe ser de 1-2 oraciones, CONCRETO y basado en ingredientes específicos de esta receta. NO genérico.

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
      maxOutputTokens: 1500,
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
          recipe.reason = `Receta equilibrada ideal para ${goalInfo?.label.toLowerCase()}, diseñada para maximizar beneficios nutricionales.`
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