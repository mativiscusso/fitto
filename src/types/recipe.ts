export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner'

export type Goal = 'weight_loss' | 'muscle_gain' | 'heart_health' | 'energy'

export type Recipe = {
  id: string
  name: string
  image?: string
  ingredients: Ingredient[]
  tags: string[]
  mealType: MealType[]
  calories?: number
  instructions?: string[]
  reason?: string
}

export type Ingredient = {
  id?: string
  name: string
  icon: string
  category?: string
  image?: string
  substitutes?: string[]
}

export type GoalInfo = {
  id: Goal
  label: string
  description: string
  icon: string
  tags: string[]
  benefit1: string
  benefit2: string
}

export const GOALS: GoalInfo[] = [
  {
    id: 'weight_loss',
    label: 'Bajar de peso',
    description: 'Perder grasa corporal de forma saludable',
    icon: 'bx bx-trending-down',
    tags: ['high_protein', 'low_carb', 'high_fiber', 'low_calorie'],
    benefit1: 'Alta en proteína',
    benefit2: 'Baja en calorías',
  },
  {
    id: 'muscle_gain',
    label: 'Ganar músculo',
    description: 'Construir masa muscular con buena nutrición',
    icon: 'bx bx-dumbbell',
    tags: ['high_protein', 'calorie_surplus', 'complex_carb'],
    benefit1: 'Rica en proteína',
    benefit2: 'Carbos complejos',
  },
  {
    id: 'heart_health',
    label: 'Cuidar el corazón',
    description: 'Mejorar la salud cardiovascular',
    icon: 'bx bx-heart',
    tags: ['omega3', 'high_fiber', 'low_sat_fat'],
    benefit1: 'Rica en omega-3',
    benefit2: 'Alta en fibra',
  },
  {
    id: 'energy',
    label: 'Tener más energía',
    description: 'Sentirse con más vitalidad durante el día',
    icon: 'bx bx-bolt',
    tags: ['complex_carb', 'iron', 'b_vitamins'],
    benefit1: 'Energía sostenida',
    benefit2: 'Carbos complejos',
  },
]

export const MEAL_TYPES: { id: MealType; label: string; icon: string; prepMin: number }[] = [
  { id: 'breakfast', label: 'Desayuno', icon: 'bx bx-sun', prepMin: 10 },
  { id: 'lunch', label: 'Almuerzo', icon: 'bx bx-restaurant', prepMin: 20 },
  { id: 'snack', label: 'Merienda', icon: 'bx bx-coffee', prepMin: 5 },
  { id: 'dinner', label: 'Cena', icon: 'bx bx-moon', prepMin: 25 },
]

const FOOD_IMAGES_BY_MEAL: Record<MealType, string[]> = {
  breakfast: ['/oatmeal.jpg', '/pancakes.jpg', '/breakfast2.jpg', '/toast.jpg'],
  lunch: ['/salad.jpg', '/bowl.jpg', '/chicken.jpg'],
  snack: ['/smoothie.jpg', '/bowl.jpg'],
  dinner: ['/fish.jpg', '/bowl.jpg', '/chicken.jpg'],
}

export function getFoodImageForMeal(mealType: MealType): string {
  const images = FOOD_IMAGES_BY_MEAL[mealType]
  return images[Math.floor(Math.random() * images.length)]
}
