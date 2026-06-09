export type MealType = 'desayuno' | 'almuerzo' | 'merienda' | 'cena'

export type Goal = 'bajar_colesterol_ldl' | 'bajar_trigliceridos' | 'controlar_glucosa' | 'bajar_presion'

export type Recipe = {
  id: string
  name: string
  image?: string
  ingredients: Ingredient[]
  tags: string[]
  mealType: MealType[]
  calories?: number
  instructions?: string[]
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
}

export const GOALS: GoalInfo[] = [
  {
    id: 'bajar_colesterol_ldl',
    label: 'Bajar colesterol LDL',
    icon: '❤️',
    description: 'Mejorá tu perfil lipídico',
    tags: ['omega3', 'high_fiber', 'low_sat_fat', 'plant_protein'],
  },
  {
    id: 'bajar_trigliceridos',
    label: 'Bajar triglicéridos',
    icon: '💧',
    description: 'Reduce los triglicéridos en sangre',
    tags: ['omega3', 'low_sat_fat', 'high_fiber', 'low_calorie'],
  },
  {
    id: 'controlar_glucosa',
    label: 'Controlar glucosa',
    icon: '🍬',
    description: 'Mantené niveles estables de azúcar',
    tags: ['high_fiber', 'complex_carb', 'low_carb', 'lean_protein'],
  },
  {
    id: 'bajar_presion',
    label: 'Bajar presión',
    icon: '📊',
    description: 'Ayudá a controlar la hipertensión',
    tags: ['low_sat_fat', 'high_fiber', 'low_sodium', 'omega3'],
  },
]

export const MEAL_TYPES: { id: MealType; label: string; icon: string }[] = [
  { id: 'desayuno', label: 'Desayuno', icon: '🌅' },
  { id: 'almuerzo', label: 'Almuerzo', icon: '☀️' },
  { id: 'merienda', label: 'Merienda', icon: '🌤️' },
  { id: 'cena', label: 'Cena', icon: '🌙' },
]

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