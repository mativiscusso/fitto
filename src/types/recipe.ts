export type MealType = 'desayuno' | 'almuerzo' | 'merienda' | 'cena'

export type Goal = 'bajar_grasa' | 'ganar_musculo' | 'reducir_colesterol' | 'otro'

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
  name: string
  icon: string
  substitutes?: string[]
}

export type GoalInfo = {
  id: Goal
  label: string
  icon: string
  description: string
  tags: string[]
  promptHint: string
}

export const GOALS: GoalInfo[] = [
  {
    id: 'bajar_grasa',
    label: 'Bajar grasa corporal',
    icon: 'bx bx-flame',
    description: 'Reduce grasa corporal con déficit calórico inteligente',
    tags: ['high_protein', 'low_carb', 'high_fiber', 'low_calorie'],
    promptHint: 'Para bajar grasa corporal: déficit calórico con alta proteína para preservar músculo, vegetales abundantes, grasas saludables moderadas, evitar azucares y harinas refinadas.',
  },
  {
    id: 'ganar_musculo',
    label: 'Ganar masa muscular',
    icon: 'bx bx-dumbbell',
    description: 'Construí músculo con nutrición estratégica',
    tags: ['high_protein', 'calorie_surplus', 'complex_carb', 'timing'],
    promptHint: 'Para ganar músculo: superávit calórico moderado, proteína alta (1.6-2g por kg), carbohidratos complejos para energía, horarios de comida regulares, buena kali y zinc.',
  },
  {
    id: 'reducir_colesterol',
    label: 'Reducir colesterol',
    icon: 'bx bx-heart',
    description: 'Mejorá tu perfil lipídico naturalmente',
    tags: ['omega3', 'high_fiber', 'low_sat_fat', 'plant_protein'],
    promptHint: 'Para reducir colesterol: beta-glucano de avena, omega-3 de pescados azules, fibra soluble de legumbres, reducir saturadas y evitar grasas trans.',
  },
  {
    id: 'otro',
    label: 'Otra que quieras',
    icon: 'bx bx-star',
    description: 'Personalizá tu objetivo de salud',
    tags: ['balanced', 'wholesome', 'nutrient_dense'],
    promptHint: 'Para objetivo general de salud: comida real, variada, colores naturales en cada plato, proteína en cada comida, vegetales la mitad del plato.',
  },
]

export const MEAL_TYPES: { id: MealType; label: string; icon: string }[] = [
  { id: 'desayuno', label: 'Desayuno', icon: 'bx bx-sun' },
  { id: 'almuerzo', label: 'Almuerzo', icon: 'bx bx-restaurant' },
  { id: 'merienda', label: 'Merienda', icon: 'bx bx-coffee' },
  { id: 'cena', label: 'Cena', icon: 'bx bx-moon' },
]

export const FOOD_IMAGES = [
  '/oatmeal.jpg',
  '/salad.jpg',
  '/fish.jpg',
  '/pancakes.jpg',
  '/breakfast2.jpg',
  '/bowl.jpg',
  '/chicken.jpg',
  '/toast.jpg',
  '/smoothie.jpg',
]

export function getRandomFoodImage(): string {
  return FOOD_IMAGES[Math.floor(Math.random() * FOOD_IMAGES.length)]
}

export const INGREDIENT_ICONS: Record<string, string> = {
  avena: 'bx bx-bowl-rice',
  'avena en hojuelas': 'bx bx-bowl-rice',
  manzana: 'bx bx-apple',
  nueces: 'bx bx-wheat',
  almendras: 'bx bx-wheat',
  'nueces pecan': 'bx bx-wheat',
  yogur: 'bx bx-cup',
  'yogur griego': 'bx bx-cup',
  'yogur natural': 'bx bx-cup',
  lentejas: 'bx bx-sprout',
  'lentejas cocidas': 'bx bx-sprout',
  tomate: 'bx bx-tomato',
  'tomate cherry': 'bx bx-tomato',
  cebolla: 'bx bx-onion',
  'cebolla de verdeo': 'bx bx-onion',
  'aceite de oliva': 'bx bx-droplet',
  'aceite de oliva extra virgen': 'bx bx-droplet',
  merluza: 'bx bx-fish',
  'merluza fresca': 'bx bx-fish',
  zucchini: 'bx bx-leaf',
  'zucchini pequeño': 'bx bx-leaf',
  zanahoria: 'bx bx-carrot',
  'arroz integral': 'bx bx-bowl-rice',
  brócoli: 'bx bx-bulb',
  espinaca: 'bx bx-leaf',
  'espinaca fresca': 'bx bx-leaf',
  palta: 'bx bx-pear',
  salmón: 'bx bx-fish',
  'salmón fresco': 'bx bx-fish',
  quinoa: 'bx bx-sprout',
  frutillas: 'bx bx草莓',
  'frutos del bosque': 'bx bx-sprout',
  banana: 'bx bx-banana',
  miel: 'bx bx-honey',
  'miel pura': 'bx bx-honey',
  chia: 'bx bx-sprout',
  'semillas de chia': 'bx bx-sprout',
  linaza: 'bx bx-sun',
  'semillas de linaza': 'bx bx-sun',
  pavo: 'bx bx-bowl-meat',
  'panceta de pavo': 'bx bx-bowl-meat',
  pollo: 'bx bx-drumstick-bite',
  'pechuga de pollo': 'bx bx-drumstick-bite',
  batata: 'bx bx-tuber',
  'batata rosada': 'bx bx-tuber',
  morrón: 'bx bx-pepper',
  'morrón rojo': 'bx bx-pepper',
  ajo: 'bx bx-clove',
  limón: 'bx bx-lemon',
  'jugo de limón': 'bx bx-lemon',
  pepino: 'bx bx-cucumber',
  rúcula: 'bx bx-leaf',
  'queso fresco': 'bx bx-cheese',
  'queso cottage': 'bx bx-cheese',
  atún: 'bx bx-fish',
  'atún al natural': 'bx bx-fish',
  garbanzos: 'bx bx-sprout',
  'garbanzos cocidos': 'bx bx-sprout',
  'pan integral': 'bx bx-bread',
  'pan sourdough': 'bx bx-bread',
  'leche': 'bx bx牛奶',
  'leche descremada': 'bx bx牛奶',
  'leche de almendras': 'bx bx-drop',
  canela: 'bx bx-spice',
  vainilla: 'bx bx-spice',
  clara: 'bx bx-egg',
  'clara de huevo': 'bx bx-egg',
  'huevo entero': 'bx bx-egg',
  'huevo': 'bx bx-egg',
  'sal': 'bx bx-capsule',
  'pimienta': 'bx bx-spice',
  'jengibre': 'bx bx-root',
  'jengibre fresco': 'bx bx-root',
  apio: 'bx bx-stalk',
  pera: 'bx bx-pear',
  'fruta de estación': 'bx bx-apple',
  granola: 'bx bx-bowl',
  té: 'bx bx-tea',
  infusión: 'bx bx-tea',
  'galletitas integrales': 'bx bx-cookie',
  'verduras mixtas': 'bx bx-basket',
  berenjena: 'bx bx-aubergine',
  'queso mozzarella': 'bx bx-cheese',
  'tocino turkey': 'bx bx-bacon',
  sardina: 'bx bx-fish',
  'sardinas al natural': 'bx bx-fish',
  tilapia: 'bx bx-fish',
  bacalao: 'bx bx-fish',
}

export function getIngredientIcon(ingredient: string): string {
  const normalized = ingredient.toLowerCase().trim()
  return INGREDIENT_ICONS[normalized] || 'bx bx-food'
}

export const GOAL_ICON_COLORS: Record<Goal, string> = {
  'bajar_grasa': '#ff6b6b',
  'ganar_musculo': '#4dabf7',
  'reducir_colesterol': '#f8b4c4',
  'otro': '#ffd43b',
}