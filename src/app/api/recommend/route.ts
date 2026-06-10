import { Goal, MealType } from '@/types/recipe'
import { generateMeal } from '@/lib/recommender'
import { findIngredientById } from '@/lib/ingredients'

export async function POST(request: Request) {
  const { goal, mealType, history = [] } = await request.json()

  if (!goal || !mealType) {
    return Response.json({ error: 'Faltan parámetros' }, { status: 400 })
  }

  const meal = generateMeal(goal as Goal, mealType as MealType, history)

  const recipe = {
    id: meal.id,
    name: meal.name,
    mealType: [meal.mealType],
    ingredients: meal.ingredients.map(ing => {
      const catalogItem = findIngredientById(ing.id)
      return {
        id: ing.id,
        name: ing.name,
        icon: ing.icon,
        category: catalogItem?.category ?? 'other',
        substitutes: [],
      }
    }),
    calories: meal.calories,
    reason: meal.reason,
    tags: meal.tags,
    instructions: [],
  }

  return Response.json({ recipe, templateId: meal.templateId })
}

export async function GET() {
  return Response.json({
    info: 'Usa POST con { goal, mealType, history } para generar una receta',
    goals: ['weight_loss', 'muscle_gain', 'heart_health', 'energy'],
    mealTypes: ['breakfast', 'lunch', 'snack', 'dinner'],
  })
}
