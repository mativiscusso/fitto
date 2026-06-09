import { generateText } from 'ai'
import { groq } from '@ai-sdk/groq'
import { Goal, MealType, GOALS, getIngredientIcon } from '@/types/recipe'

type Message = { role: 'user' | 'assistant' | 'system'; content: string }

const MODEL = 'llama-3.3-70b-versatile'

const SYSTEM_PROMPT = `Sos Fitto, un asistente nutricional que recomienda recetas saludables y personalizadas.

Tenés una base de datos de recetas cardio-friendly optimizadas para objetivos de salud específicos.

REGLAS:
1. Siempre respondés en español argentino
2. Las recetas son SIMPLES y rápidas de preparar
3. Usás ingredientes accesibles en Argentina
4. Cada ingrediente DEBE tener un emoji representativo
5. La respuesta es en JSON válido con este formato EXACTO:
{
  "name": "Nombre de la receta",
  "ingredients": [
    { "name": "ingrediente 1", "icon": "emoji", "substitutes": ["subst1", "subst2"] }
  ],
  "instructions": ["paso 1", "paso 2"],
  "calories": numero,
  "tags": ["tag1", "tag2"]
}

INSTRUCCIONES PARA GENERAR RECETAS:

Para DESAYUNO - priorizá:
- Avena con frutas y semillas
- Yogur con granola y frutas
- Huevos revueltos con verduras
- Tostadas integrales con palta
- Licuado verde

Para ALMUERZO - priorizá:
- Ensaladas con proteína (pollo, pavo, atún, legumbres)
- Quinoa o arroz integral con verduras
- Carnes magras a la plancha con ensalada
- Sopas nutritivas

Para MERIENDA - priorizá:
- Frutas con yogur
- Un puñado de frutos secos
- Galletitas integrales con infusión
- Hummus con vegetales

Para CENA - priorizá:
- Pescados al horno o a la plancha
- Ensaladas completas
- Verduras al vapor con proteína
- Caldos nutritivos

Para BAJAR COLESTEROL LDL:
- Pescados ricos en omega-3 (salmón, merluza, sardina, atún)
- Legumbres (lentejas, garbanzos)
- Frutos secos
- Fibra (avena, quinoa, verduras)
- Aceites saludables (oliva)

Para BAJAR TRIGLICÉRIDOS:
- Omega-3 y fibra
- Reducir harinas refinadas
- Más vegetales verdes
- Proteínas magras

Para CONTROLAR GLUCOSA:
- Fibra a cada comida
- Carbohidratos complejos (integral, quinoa)
- Proteína en cada comida
- Evitar azúcares agregados

Para BAJAR PRESIÓN:
- Reducir sal
- Más potasio (banana, palta, espinaca)
- Omega-3
- Alimentos naturales`

function buildUserPrompt(goal: Goal, mealType: MealType): string {
  const goalInfo = GOALS.find(g => g.id === goal)
  const mealLabels: Record<MealType, string> = {
    desayuno: 'el DESAYUNO',
    almuerzo: 'el ALMUERZO',
    merienda: 'la MERIENDA',
    cena: 'la CENA',
  }

  return `Generame una receta para ${mealLabels[mealType]} enfocada en: ${goalInfo?.label}

La receta debe ser:
- Simple y rápida (máximo 20 min de preparación)
- Con ingredientes accesibles en Argentina
- Apta para el objetivo: ${goalInfo?.description}
- Con todos los ingredientes y un emoji representativo para cada uno
- Incluir los ingredientes alternativos por si no tiene alguno
- Incluir instrucciones breves de preparación
- Calorías aproximadas

Respondé SOLO con el JSON, sin texto adicional.`
}

export async function POST(request: Request) {
  const { goal, mealType } = await request.json()

  if (!goal || !mealType) {
    return Response.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  const messages: Message[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'user', content: buildUserPrompt(goal, mealType) },
  ]

  try {
    const { text } = await generateText({
      model: groq(MODEL),
      messages,
      temperature: 0.8,
      maxOutputTokens: 1000,
    })

    let recipe
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        recipe = JSON.parse(jsonMatch[0])
        recipe.id = crypto.randomUUID()
        recipe.mealType = [mealType]

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
    info: 'Usa POST con { goal, mealType } para generar una receta',
    goals: GOALS.map(g => ({ id: g.id, label: g.label })),
    mealTypes: ['desayuno', 'almuerzo', 'merienda', 'cena'],
  })
}