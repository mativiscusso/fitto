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
    icon: '🔥',
    description: 'Reduce grasa corporal con déficit calórico inteligente',
    tags: ['high_protein', 'low_carb', 'high_fiber', 'low_calorie'],
    promptHint: 'Para bajar grasa corporal: déficit calórico con alta proteína para preservar músculo, vegetales abundantes, grasas saludables moderadas, evitar azucares y harinas refinadas.',
  },
  {
    id: 'ganar_musculo',
    label: 'Ganar masa muscular',
    icon: '💪',
    description: 'Construí músculo con nutrición estratégica',
    tags: ['high_protein', 'calorie_surplus', 'complex_carb', 'timing'],
    promptHint: 'Para ganar músculo: superávit calórico moderado, proteína alta (1.6-2g por kg), carbohidratos complejos para energía, horarios de comida regulares, buena kali y zinc.',
  },
  {
    id: 'reducir_colesterol',
    label: 'Reducir colesterol',
    icon: '❤️',
    description: 'Mejorá tu perfil lipídico naturalmente',
    tags: ['omega3', 'high_fiber', 'low_sat_fat', 'plant_protein'],
    promptHint: 'Para reducir colesterol: omega-3 de pescados, fibra soluble de avena y legumbres, grasas monoinsaturadas de aceite de oliva y palta, reducir saturadas y colesterol dietary.',
  },
  {
    id: 'otro',
    label: 'Otra que quieras',
    icon: '✨',
    description: 'Personalizá tu objetivo de salud',
    tags: ['balanced', 'wholesome', 'nutrient_dense'],
    promptHint: 'Para objetivo general de salud: comida real, variada, colores naturales en cada plato, proteína en cada comida, vegetales la mitad del plato, agua y dormir bien.',
  },
]

export const MEAL_TYPES: { id: MealType; label: string; icon: string }[] = [
  { id: 'desayuno', label: 'Desayuno', icon: '🌅' },
  { id: 'almuerzo', label: 'Almuerzo', icon: '☀️' },
  { id: 'merienda', label: 'Merienda', icon: '🌤️' },
  { id: 'cena', label: 'Cena', icon: '🌙' },
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
  avena: '🥣',
  'avena en hojuelas': '🥣',
  manzana: '🍎',
  nueces: '🥜',
  almendras: '🥜',
  'nueces pecan': '🥜',
  yogur: '🥛',
  'yogur griego': '🥛',
  'yogur natural': '🥛',
  lentejas: '🫘',
  'lentejas cocidas': '🫘',
  tomate: '🍅',
  'tomate cherry': '🍅',
  cebolla: '🧅',
  'cebolla de verdeo': '🧅',
  'aceite de oliva': '🫒',
  'aceite de oliva extra virgen': '🫒',
  merluza: '🐟',
  'merluza fresca': '🐟',
  zucchini: '🥒',
  'zucchini pequeño': '🥒',
  zanahoria: '🥕',
  'arroz integral': '🍚',
  brócoli: '🥦',
  espinaca: '🥬',
  'espinaca fresca': '🥬',
  palta: '🥑',
  salmón: '🐟',
  'salmón fresco': '🐟',
  quinoa: '🌾',
  frutillas: '🍓',
  'frutos del bosque': '🍓',
  banana: '🍌',
  miel: '🍯',
  'miel pura': '🍯',
  chia: '🌱',
  'semillas de chia': '🌱',
  linaza: '🌻',
  'semillas de linaza': '🌻',
  pavo: '🦃',
  'panceta de pavo': '🦃',
  pollo: '🍗',
  'pechuga de pollo': '🍗',
  batata: '🍠',
  'batata rosada': '🍠',
  morrón: '🫑',
  'morrón rojo': '🫑',
  ajo: '🧄',
  limón: '🍋',
  'jugo de limón': '🍋',
  pepino: '🥒',
  rúcula: '🌿',
  'queso fresco': '🧀',
  'queso cottage': '🧀',
  atún: '🐟',
  'atún al natural': '🐟',
  garbanzos: '🫘',
  'garbanzos cocidos': '🫘',
  'pan integral': '🍞',
  'pan sourdough': '🍞',
  'leche': '🥛',
  'leche descremada': '🥛',
  'leche de almendras': '🌱',
  canela: '🌿',
  vainilla: '🍦',
  clara: '🥚',
  'clara de huevo': '🥚',
  'huevo entero': '🥚',
  'huevo': '🥚',
  'sal': '🧂',
  'pimienta': '🌶️',
  'jengibre': '🫚',
  'jengibre fresco': '🫚',
  apio: '🥬',
  pera: '🍐',
  'fruta de estación': '🍎',
  granola: '🌾',
  té: '🍵',
  infusión: '🍵',
  'galletitas integrales': '🍪',
  'verduras mixtas': '🥗',
  berenjena: '🍆',
  'queso mozzarella': '🧀',
  'tocino turkey': '🥓',
  sardina: '🐟',
  'sardinas al natural': '🐟',
  tilapia: '🐟',
  bacalao: '🐟',
}

export function getIngredientIcon(ingredient: string): string {
  const normalized = ingredient.toLowerCase().trim()
  return INGREDIENT_ICONS[normalized] || '🥄'
}