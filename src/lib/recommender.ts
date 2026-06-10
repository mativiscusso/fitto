import { Goal, MealType } from '@/types/recipe'
import { findIngredientById, IngredientCatalogItem } from './ingredients'

export type GeneratedIngredient = {
  id: string
  name: string       // Spanish name
  icon: string       // boxicon class (legacy, kept for swap logic)
  emoji: string      // category emoji shown in UI
  serving: string    // e.g. "150g", "½ taza"
  searchTerms: string[]
}

export type GeneratedMeal = {
  id: string
  templateId: string
  name: string
  mealType: MealType
  ingredients: GeneratedIngredient[]
  calories: number
  reason: string
  tags: string[]
  instructions: string[]
}

// --- Ingredient ID groups ---

const LEAN_PROTEINS = ['chicken_breast', 'chicken_thigh', 'turkey_breast', 'lean_beef', 'pork_tenderloin']
const FISH = ['tuna', 'salmon', 'sardines', 'mackerel', 'hake', 'shrimp']
const EGGS = ['eggs', 'egg_whites']
const DAIRY_PROTEIN = ['greek_yogurt', 'natural_yogurt', 'cottage_cheese', 'ricotta_light']
const LEGUMES = ['lentils', 'chickpeas', 'black_beans', 'kidney_beans', 'peas', 'edamame']
const PLANT_PROTEIN = ['tofu', 'tempeh', 'seitan']
const GRAINS = ['brown_rice', 'white_rice', 'quinoa', 'barley', 'couscous']
const BREADS = ['whole_grain_toast', 'whole_wheat_bread', 'whole_wheat_wrap', 'corn_tortilla']
const FRUITS = ['banana', 'apple', 'pear', 'orange', 'blueberries', 'strawberries', 'kiwi', 'mango', 'pineapple', 'grapes', 'peach', 'raspberries', 'blackberries']
const BERRIES = ['blueberries', 'strawberries', 'raspberries', 'blackberries']
const NUTS = ['walnuts', 'almonds', 'cashews', 'hazelnuts', 'pistachios', 'peanuts']
const SEEDS = ['chia_seeds', 'flax_seeds', 'pumpkin_seeds', 'sunflower_seeds', 'sesame_seeds']
const VEGS_LEAFY = ['lettuce', 'spinach', 'arugula', 'kale', 'chard']
const VEGS_CRUCIFEROUS = ['broccoli', 'cauliflower', 'cabbage', 'bok_choy']
const VEGS_COLORFUL = ['carrot', 'pumpkin', 'bell_pepper_red', 'bell_pepper_yellow', 'tomato', 'beetroot']
const VEGS_OTHER = ['zucchini', 'eggplant', 'cucumber', 'mushrooms', 'green_beans', 'asparagus', 'celery', 'corn']
const ALL_VEGS = [...VEGS_LEAFY, ...VEGS_CRUCIFEROUS, ...VEGS_COLORFUL, ...VEGS_OTHER]
const SALAD_VEGS = ['lettuce', 'spinach', 'arugula', 'tomato', 'cucumber', 'cherry_tomato', 'red_onion']

// --- Goal boost definitions ---

const GOAL_BOOSTS: Record<Goal, string[]> = {
  weight_loss: [
    'chicken_breast', 'egg_whites', 'greek_yogurt', 'tuna', 'turkey_breast', 'hake',
    'broccoli', 'spinach', 'cauliflower', 'kale', 'cucumber', 'zucchini', 'arugula',
    'oats', 'blueberries', 'strawberries', 'raspberries', 'lentils', 'chickpeas', 'chia_seeds',
  ],
  muscle_gain: [
    'chicken_breast', 'lean_beef', 'eggs', 'salmon', 'tuna', 'greek_yogurt', 'whey_protein',
    'oats', 'brown_rice', 'quinoa', 'sweet_potato', 'banana', 'lentils', 'chickpeas', 'black_beans',
  ],
  heart_health: [
    'salmon', 'sardines', 'mackerel', 'tuna', 'hake',
    'lentils', 'chickpeas', 'black_beans', 'oats',
    'olive_oil', 'walnuts', 'almonds', 'avocado', 'chia_seeds', 'flax_seeds',
    'spinach', 'kale', 'broccoli', 'blueberries', 'strawberries',
  ],
  energy: [
    'oats', 'banana', 'orange', 'brown_rice', 'quinoa', 'sweet_potato',
    'eggs', 'greek_yogurt', 'walnuts', 'almonds', 'dates', 'pumpkin',
    'spinach', 'kale', 'pineapple', 'mango',
  ],
}

// --- Goal reasons ---

const GOAL_REASONS: Record<Goal, string[]> = {
  weight_loss: [
    'Alta proteína magra para preservar músculo durante el déficit calórico, con vegetales que aportan volumen y saciedad sin calorías extra.',
    'Proteína de alta calidad y fibra soluble para mantener la saciedad más tiempo y reducir el apetito entre comidas.',
    'Bajo índice glucémico y alto contenido proteico: ideal para controlar el hambre y maximizar la quema de grasa.',
    'La combinación proteína + fibra mantiene la saciedad 3-4 horas, fundamental para sostener un déficit calórico sin pasar hambre.',
  ],
  muscle_gain: [
    'Proteína completa con aminoácidos esenciales para la síntesis muscular, combinada con carbohidratos para recargar el glucógeno post-entrenamiento.',
    'Alta densidad de leucina, el aminoácido clave que activa la síntesis de proteína muscular tras el ejercicio.',
    'La combinación proteína + carbs complejos optimiza la recuperación muscular y prepara el cuerpo para el próximo entrenamiento.',
    'Superávit calórico limpio: calorías de calidad de proteína magra y carbohidratos complejos para construir músculo sin exceso de grasa.',
  ],
  heart_health: [
    'Rico en omega-3 antiinflamatorio y fibra beta-glucano, la dupla más estudiada para reducir el colesterol LDL y proteger el corazón.',
    'Grasas monoinsaturadas y antioxidantes que reducen la inflamación crónica y mejoran el perfil lipídico cardiovascular.',
    'Fibra soluble de legumbres junto a omega-3 de pescado azul: la combinación más efectiva para la salud cardiovascular.',
    'Polifenoles, fibra y grasas saludables trabajan juntos para reducir el riesgo cardiovascular y mejorar la presión arterial.',
  ],
  energy: [
    'Carbohidratos complejos de liberación lenta que mantienen el azúcar en sangre estable, evitando los bajones de energía a media mañana.',
    'Hierro, vitaminas B y carbohidratos de calidad: la combinación perfecta para combatir el cansancio y mantener la vitalidad.',
    'Glucosa de calidad de cereales integrales más proteína para mantener la concentración y la energía mental durante horas.',
    'Magnesio de frutos secos y vitaminas del complejo B optimizan la producción de ATP, la energía celular del organismo.',
  ],
}

// --- Template definitions ---
// Each slot is a list of ingredient IDs (one will be picked from each slot)

type Slot = string[]

type Template = {
  id: string
  mealTypes: MealType[]
  slots: Slot[]
}

const TEMPLATES: Template[] = [
  // ==================== BREAKFAST ====================
  { id: 'b_oats_fruit_nuts', mealTypes: ['breakfast'], slots: [['oats'], FRUITS, NUTS] },
  { id: 'b_oats_fruit_yogurt', mealTypes: ['breakfast'], slots: [['oats'], FRUITS, DAIRY_PROTEIN] },
  { id: 'b_oats_whey_fruit', mealTypes: ['breakfast'], slots: [['oats'], ['whey_protein'], FRUITS] },
  { id: 'b_gyogurt_fruit_seeds', mealTypes: ['breakfast'], slots: [['greek_yogurt'], FRUITS, SEEDS] },
  { id: 'b_gyogurt_granola_fruit', mealTypes: ['breakfast'], slots: [['greek_yogurt'], ['granola'], FRUITS] },
  { id: 'b_eggs_toast', mealTypes: ['breakfast'], slots: [EGGS, BREADS] },
  { id: 'b_eggwhite_toast_avocado', mealTypes: ['breakfast'], slots: [['egg_whites'], BREADS, ['avocado']] },
  { id: 'b_omelette_vegs', mealTypes: ['breakfast'], slots: [EGGS, VEGS_LEAFY, VEGS_COLORFUL] },
  { id: 'b_smoothie_protein', mealTypes: ['breakfast'], slots: [['whey_protein'], BERRIES, ['banana']] },
  { id: 'b_banana_pb', mealTypes: ['breakfast'], slots: [['banana'], ['peanut_butter']] },
  { id: 'b_ricecakes_cottage', mealTypes: ['breakfast'], slots: [['rice_cakes'], ['cottage_cheese'], BERRIES] },
  { id: 'b_toast_avocado', mealTypes: ['breakfast'], slots: [BREADS, ['avocado'], EGGS] },
  { id: 'b_toast_ricotta_fruit', mealTypes: ['breakfast'], slots: [BREADS, ['ricotta_light', 'cottage_cheese'], FRUITS] },
  { id: 'b_yogurt_strawberries', mealTypes: ['breakfast'], slots: [DAIRY_PROTEIN, ['strawberries'], SEEDS] },
  { id: 'b_yogurt_blueberries', mealTypes: ['breakfast'], slots: [DAIRY_PROTEIN, ['blueberries'], NUTS] },
  { id: 'b_overnight_oats', mealTypes: ['breakfast'], slots: [['oats'], DAIRY_PROTEIN, BERRIES, SEEDS] },
  { id: 'b_protein_pancakes', mealTypes: ['breakfast'], slots: [['oats'], EGGS, ['banana'], BERRIES] },
  { id: 'b_fruitbowl_yogurt', mealTypes: ['breakfast'], slots: [FRUITS, FRUITS, DAIRY_PROTEIN] },
  { id: 'b_fruitbowl_nuts', mealTypes: ['breakfast'], slots: [FRUITS, FRUITS, NUTS] },
  { id: 'b_oats_apple_cinnamon', mealTypes: ['breakfast'], slots: [['oats'], ['apple'], ['cinnamon'], NUTS] },
  { id: 'b_oats_pear_walnuts', mealTypes: ['breakfast'], slots: [['oats'], ['pear'], ['walnuts']] },
  { id: 'b_toast_eggs', mealTypes: ['breakfast'], slots: [BREADS, EGGS] },
  { id: 'b_toast_turkey', mealTypes: ['breakfast'], slots: [BREADS, ['turkey_breast'], ['avocado']] },
  { id: 'b_toast_tuna', mealTypes: ['breakfast'], slots: [BREADS, ['tuna'], SALAD_VEGS] },
  { id: 'b_toast_cottage', mealTypes: ['breakfast'], slots: [BREADS, ['cottage_cheese'], FRUITS] },

  // ==================== LUNCH ====================
  { id: 'l_chicken_rice_vegs', mealTypes: ['lunch'], slots: [['chicken_breast', 'chicken_thigh'], GRAINS, ALL_VEGS, ALL_VEGS] },
  { id: 'l_chicken_sweetpotato_vegs', mealTypes: ['lunch'], slots: [['chicken_breast', 'chicken_thigh'], ['sweet_potato'], ALL_VEGS, ALL_VEGS] },
  { id: 'l_chicken_quinoa_vegs', mealTypes: ['lunch'], slots: [['chicken_breast', 'chicken_thigh'], ['quinoa'], ALL_VEGS, ALL_VEGS] },
  { id: 'l_beef_rice_vegs', mealTypes: ['lunch'], slots: [['lean_beef', 'sirloin'], GRAINS, ALL_VEGS, ALL_VEGS] },
  { id: 'l_beef_potato_vegs', mealTypes: ['lunch'], slots: [['lean_beef', 'sirloin'], ['potato'], ALL_VEGS, ALL_VEGS] },
  { id: 'l_tuna_salad', mealTypes: ['lunch'], slots: [['tuna'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
  { id: 'l_salmon_vegs', mealTypes: ['lunch'], slots: [['salmon'], ALL_VEGS, ALL_VEGS, GRAINS] },
  { id: 'l_hake_rice', mealTypes: ['lunch'], slots: [['hake'], GRAINS, ALL_VEGS] },
  { id: 'l_hake_sweetpotato', mealTypes: ['lunch'], slots: [['hake'], ['sweet_potato'], ALL_VEGS] },
  { id: 'l_lentil_salad', mealTypes: ['lunch'], slots: [['lentils'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
  { id: 'l_chickpea_salad', mealTypes: ['lunch'], slots: [['chickpeas'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
  { id: 'l_bean_bowl', mealTypes: ['lunch'], slots: [['black_beans', 'kidney_beans'], GRAINS, ALL_VEGS] },
  { id: 'l_turkey_wrap', mealTypes: ['lunch'], slots: [['turkey_breast'], ['whole_wheat_wrap', 'corn_tortilla'], SALAD_VEGS, ['avocado']] },
  { id: 'l_chicken_wrap', mealTypes: ['lunch'], slots: [['chicken_breast'], ['whole_wheat_wrap', 'corn_tortilla'], SALAD_VEGS, ['avocado']] },
  { id: 'l_tuna_wrap', mealTypes: ['lunch'], slots: [['tuna'], ['whole_wheat_wrap', 'corn_tortilla'], SALAD_VEGS] },
  { id: 'l_quinoa_bowl', mealTypes: ['lunch'], slots: [['quinoa'], LEAN_PROTEINS, ALL_VEGS, ['olive_oil']] },
  { id: 'l_rice_bowl', mealTypes: ['lunch'], slots: [GRAINS, LEAN_PROTEINS, ALL_VEGS, ['olive_oil']] },
  { id: 'l_protein_salad', mealTypes: ['lunch'], slots: [[...LEAN_PROTEINS, ...FISH, 'eggs'], SALAD_VEGS, SALAD_VEGS, NUTS] },
  { id: 'l_chicken_stirfry', mealTypes: ['lunch'], slots: [['chicken_breast', 'chicken_thigh'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'l_beef_stirfry', mealTypes: ['lunch'], slots: [['lean_beef'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'l_tofu_stirfry', mealTypes: ['lunch'], slots: [['tofu'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'l_tempeh_bowl', mealTypes: ['lunch'], slots: [['tempeh'], GRAINS, ALL_VEGS] },
  { id: 'l_chicken_pumpkin', mealTypes: ['lunch'], slots: [['chicken_breast', 'chicken_thigh'], ['pumpkin'], ALL_VEGS] },
  { id: 'l_turkey_rice', mealTypes: ['lunch'], slots: [['turkey_breast'], GRAINS, ALL_VEGS] },
  { id: 'l_salmon_quinoa', mealTypes: ['lunch'], slots: [['salmon'], ['quinoa'], ALL_VEGS] },
  { id: 'l_sardines_salad', mealTypes: ['lunch'], slots: [['sardines'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
  { id: 'l_egg_salad', mealTypes: ['lunch'], slots: [['eggs'], SALAD_VEGS, SALAD_VEGS] },
  { id: 'l_pasta_chicken', mealTypes: ['lunch'], slots: [['whole_wheat_pasta'], ['chicken_breast'], ['tomato', 'spinach', 'mushrooms']] },
  { id: 'l_pasta_tuna', mealTypes: ['lunch'], slots: [['whole_wheat_pasta'], ['tuna'], ['tomato', 'spinach', 'arugula']] },
  { id: 'l_bean_chili', mealTypes: ['lunch'], slots: [['black_beans', 'kidney_beans'], ['tomato', 'bell_pepper_red'], ['onion'], GRAINS] },
  { id: 'l_lentil_stew', mealTypes: ['lunch'], slots: [['lentils'], ALL_VEGS, ALL_VEGS, ['olive_oil']] },
  { id: 'l_veg_soup_protein', mealTypes: ['lunch'], slots: [[...LEAN_PROTEINS, ...LEGUMES], ALL_VEGS, ALL_VEGS] },
  { id: 'l_buddha_bowl', mealTypes: ['lunch'], slots: [GRAINS, [...LEAN_PROTEINS, ...LEGUMES], VEGS_LEAFY, VEGS_COLORFUL, ['olive_oil', 'tahini']] },

  // ==================== SNACK ====================
  { id: 's_yogurt_fruit', mealTypes: ['snack'], slots: [DAIRY_PROTEIN, FRUITS] },
  { id: 's_yogurt_nuts', mealTypes: ['snack'], slots: [DAIRY_PROTEIN, NUTS] },
  { id: 's_fruit_nuts', mealTypes: ['snack'], slots: [FRUITS, NUTS] },
  { id: 's_fruit_pb', mealTypes: ['snack'], slots: [FRUITS, ['peanut_butter']] },
  { id: 's_protein_shake', mealTypes: ['snack'], slots: [['whey_protein'], FRUITS] },
  { id: 's_ricecakes_pb', mealTypes: ['snack'], slots: [['rice_cakes'], ['peanut_butter']] },
  { id: 's_ricecakes_cottage', mealTypes: ['snack'], slots: [['rice_cakes'], ['cottage_cheese'], BERRIES] },
  { id: 's_toast_avocado', mealTypes: ['snack'], slots: [BREADS, ['avocado']] },
  { id: 's_toast_turkey', mealTypes: ['snack'], slots: [BREADS, ['turkey_breast']] },
  { id: 's_toast_tuna', mealTypes: ['snack'], slots: [BREADS, ['tuna']] },
  { id: 's_smoothie', mealTypes: ['snack'], slots: [FRUITS, BERRIES, DAIRY_PROTEIN] },
  { id: 's_fruitbowl', mealTypes: ['snack'], slots: [FRUITS, FRUITS, FRUITS] },
  { id: 's_gyogurt_seeds', mealTypes: ['snack'], slots: [['greek_yogurt'], SEEDS, FRUITS] },
  { id: 's_apple_walnuts', mealTypes: ['snack'], slots: [['apple'], ['walnuts']] },
  { id: 's_banana_pb', mealTypes: ['snack'], slots: [['banana'], ['peanut_butter']] },
  { id: 's_pear_almonds', mealTypes: ['snack'], slots: [['pear'], ['almonds']] },
  { id: 's_orange_nuts', mealTypes: ['snack'], slots: [['orange'], NUTS] },
  { id: 's_cottage_fruit', mealTypes: ['snack'], slots: [['cottage_cheese'], FRUITS, SEEDS] },

  // ==================== DINNER ====================
  { id: 'd_salmon_vegs', mealTypes: ['dinner'], slots: [['salmon'], VEGS_LEAFY, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'd_hake_vegs', mealTypes: ['dinner'], slots: [['hake'], ALL_VEGS, ALL_VEGS, ['olive_oil']] },
  { id: 'd_chicken_vegs', mealTypes: ['dinner'], slots: [['chicken_breast', 'chicken_thigh'], ALL_VEGS, ALL_VEGS] },
  { id: 'd_chicken_stirfry', mealTypes: ['dinner'], slots: [['chicken_breast'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'd_turkey_stirfry', mealTypes: ['dinner'], slots: [['turkey_breast'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['olive_oil']] },
  { id: 'd_tofu_stirfry', mealTypes: ['dinner'], slots: [['tofu'], VEGS_CRUCIFEROUS, VEGS_COLORFUL, ['sesame_seeds', 'olive_oil']] },
  { id: 'd_veg_omelette', mealTypes: ['dinner'], slots: [EGGS, VEGS_LEAFY, VEGS_COLORFUL] },
  { id: 'd_protein_omelette', mealTypes: ['dinner'], slots: [EGGS, ['turkey_breast', 'tuna', 'cottage_cheese'], VEGS_LEAFY] },
  { id: 'd_lentil_soup', mealTypes: ['dinner'], slots: [['lentils'], ALL_VEGS, ALL_VEGS, ['olive_oil']] },
  { id: 'd_bean_soup', mealTypes: ['dinner'], slots: [['black_beans', 'kidney_beans'], ALL_VEGS, ALL_VEGS] },
  { id: 'd_veg_soup_protein', mealTypes: ['dinner'], slots: [[...LEAN_PROTEINS, 'tuna', 'eggs'], ALL_VEGS, ALL_VEGS] },
  { id: 'd_chickpea_salad', mealTypes: ['dinner'], slots: [['chickpeas'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
  { id: 'd_tuna_salad', mealTypes: ['dinner'], slots: [['tuna'], SALAD_VEGS, SALAD_VEGS, ['olive_oil', 'avocado']] },
  { id: 'd_protein_salad', mealTypes: ['dinner'], slots: [[...LEAN_PROTEINS, ...FISH, 'eggs'], VEGS_LEAFY, SALAD_VEGS] },
  { id: 'd_quinoa_salad', mealTypes: ['dinner'], slots: [['quinoa'], LEAN_PROTEINS, SALAD_VEGS, ['olive_oil']] },
  { id: 'd_chicken_bowl', mealTypes: ['dinner'], slots: [['chicken_breast', 'chicken_thigh'], GRAINS, ALL_VEGS] },
  { id: 'd_turkey_bowl', mealTypes: ['dinner'], slots: [['turkey_breast'], GRAINS, ALL_VEGS] },
  { id: 'd_beef_vegs', mealTypes: ['dinner'], slots: [['lean_beef', 'sirloin'], ALL_VEGS, ALL_VEGS] },
  { id: 'd_pumpkin_chicken', mealTypes: ['dinner'], slots: [['chicken_breast'], ['pumpkin'], ALL_VEGS] },
  { id: 'd_sweetpotato_fish', mealTypes: ['dinner'], slots: [['salmon', 'hake', 'tuna'], ['sweet_potato'], ALL_VEGS] },
  { id: 'd_stuffed_peppers', mealTypes: ['dinner'], slots: [['bell_pepper_red', 'bell_pepper_yellow'], [...LEAN_PROTEINS, 'lentils', 'chickpeas'], ['tomato', 'onion']] },
  { id: 'd_stuffed_zucchini', mealTypes: ['dinner'], slots: [['zucchini'], [...LEAN_PROTEINS, 'tuna'], ['tomato', 'onion']] },
  { id: 'd_veg_frittata', mealTypes: ['dinner'], slots: [EGGS, VEGS_LEAFY, VEGS_COLORFUL, VEGS_OTHER] },
  { id: 'd_chicken_skewers', mealTypes: ['dinner'], slots: [['chicken_breast'], ['bell_pepper_red', 'zucchini', 'mushrooms'], ['olive_oil']] },
  { id: 'd_fish_skewers', mealTypes: ['dinner'], slots: [['salmon', 'hake', 'shrimp'], ['bell_pepper_red', 'zucchini'], ['olive_oil']] },
  { id: 'd_tofu_bowl', mealTypes: ['dinner'], slots: [['tofu'], GRAINS, ALL_VEGS] },
  { id: 'd_tempeh_bowl', mealTypes: ['dinner'], slots: [['tempeh'], GRAINS, ALL_VEGS] },
  { id: 'd_chicken_wrap', mealTypes: ['dinner'], slots: [['chicken_breast'], ['whole_wheat_wrap'], SALAD_VEGS] },
  { id: 'd_turkey_wrap', mealTypes: ['dinner'], slots: [['turkey_breast'], ['whole_wheat_wrap'], SALAD_VEGS, ['avocado']] },
  { id: 'd_pasta_tuna', mealTypes: ['dinner'], slots: [['whole_wheat_pasta'], ['tuna'], ['tomato', 'spinach']] },
  { id: 'd_pasta_chicken', mealTypes: ['dinner'], slots: [['whole_wheat_pasta'], ['chicken_breast'], ['tomato', 'mushrooms', 'spinach']] },
  { id: 'd_veg_curry', mealTypes: ['dinner'], slots: [['sweet_potato', 'chickpeas', 'tofu'], ALL_VEGS, ALL_VEGS, ['olive_oil']] },
  { id: 'd_lentil_curry', mealTypes: ['dinner'], slots: [['lentils'], ALL_VEGS, ALL_VEGS, ['olive_oil']] },
  { id: 'd_sardines_salad', mealTypes: ['dinner'], slots: [['sardines', 'mackerel'], SALAD_VEGS, SALAD_VEGS, ['olive_oil']] },
]

// --- Icon mapping (legacy, kept for swap logic) ---

const ICON_MAP: Record<string, string> = {
  protein: 'bx bx-bowl-rice',
  carb: 'bx bx-bowl-rice',
  vegetable: 'bx bx-leaf',
  fruit: 'bx bx-apple',
  fat: 'bx bx-droplet',
  dairy: 'bx bx-cup',
  other: 'bx bx-food',
}

function getIngredientIcon(item: IngredientCatalogItem): string {
  return ICON_MAP[item.category] || 'bx bx-food'
}

// --- Category emoji ---

function getCategoryEmoji(item: IngredientCatalogItem): string {
  const id = item.id
  if (['chicken_breast', 'chicken_thigh', 'turkey_breast'].includes(id)) return '🍗'
  if (['lean_beef', 'sirloin', 'pork_tenderloin'].includes(id)) return '🥩'
  if (['tuna', 'salmon', 'sardines', 'mackerel', 'hake'].includes(id)) return '🐟'
  if (id === 'shrimp') return '🦐'
  if (EGGS.includes(id)) return '🥚'
  if (DAIRY_PROTEIN.includes(id)) return '🥛'
  if (item.category === 'dairy') return '🧀'
  if (LEGUMES.includes(id)) return '🫘'
  if (['tofu', 'tempeh', 'seitan', 'whey_protein'].includes(id)) return '🌱'
  if (id === 'avocado') return '🥑'
  if (['olive_oil', 'coconut_oil'].includes(id)) return '🫒'
  if (['peanut_butter', 'tahini'].includes(id)) return '🥜'
  if (NUTS.includes(id)) return '🥜'
  if (SEEDS.includes(id)) return '🌱'
  if (id === 'oats') return '🌾'
  if (GRAINS.includes(id)) return '🌾'
  if (['whole_wheat_wrap', 'corn_tortilla'].includes(id)) return '🌮'
  if (['whole_wheat_pasta'].includes(id)) return '🍝'
  if (['sweet_potato', 'potato'].includes(id)) return '🥔'
  if (BREADS.includes(id)) return '🍞'
  if (['granola', 'rice_cakes'].includes(id)) return '🌾'
  if (id === 'banana') return '🍌'
  if (BERRIES.includes(id)) return '🍓'
  if (item.category === 'fruit') return '🍎'
  if (item.category === 'vegetable') return '🥦'
  return '🍽️'
}

// --- Serving sizes ---

function getServing(item: IngredientCatalogItem): string {
  const id = item.id
  if (id === 'egg_whites') return '3 claras'
  if (id === 'eggs') return '2 unidades'
  if (['banana', 'apple', 'pear', 'orange', 'peach', 'kiwi', 'mango'].includes(id)) return '1 unidad'
  if (BERRIES.includes(id)) return '½ taza'
  if (['pineapple', 'grapes'].includes(id)) return '1 taza'
  if (id === 'avocado') return '½ unidad'
  if (['olive_oil', 'coconut_oil'].includes(id)) return '1 cdita'
  if (['peanut_butter', 'tahini'].includes(id)) return '1 cda'
  if (NUTS.includes(id)) return '30g'
  if (SEEDS.includes(id)) return '1 cda'
  if (['whole_wheat_wrap', 'corn_tortilla'].includes(id)) return '1 unidad'
  if (['whole_wheat_bread', 'whole_grain_toast'].includes(id)) return '2 rebanadas'
  if (id === 'rice_cakes') return '2 unidades'
  if (id === 'granola') return '¼ taza'
  if (id === 'cinnamon') return '1 cdita'
  if (id === 'dates') return '3 unidades'
  if (id === 'whey_protein') return '1 scoop (30g)'
  if (['sweet_potato', 'potato'].includes(id)) return '1 mediana'
  if (id === 'whole_wheat_pasta') return '80g'
  if (id === 'oats') return '¾ taza (60g)'
  if (GRAINS.includes(id)) return '½ taza'
  if (LEGUMES.includes(id)) return '½ taza'
  if ([...LEAN_PROTEINS, ...FISH].includes(id)) return '150g'
  if (['tofu', 'tempeh', 'seitan'].includes(id)) return '150g'
  if (DAIRY_PROTEIN.includes(id)) return '150g'
  if (item.category === 'dairy') return '100g'
  if (item.category === 'vegetable') return '1 taza'
  if (item.category === 'carb') return '80g'
  return '1 porción'
}

// --- Preparation instructions ---

function generateInstructions(templateId: string, ingredients: IngredientCatalogItem[]): string[] {
  const hasOats    = ingredients.some(i => i.id === 'oats')
  const hasEggs    = ingredients.some(i => EGGS.includes(i.id))
  const hasMeat    = ingredients.some(i => LEAN_PROTEINS.includes(i.id))
  const hasFish    = ingredients.some(i => FISH.includes(i.id))
  const hasLegumes = ingredients.some(i => LEGUMES.includes(i.id))
  const hasVegs    = ingredients.some(i => i.category === 'vegetable')
  const hasDairy   = ingredients.some(i => DAIRY_PROTEIN.includes(i.id))
  const hasFruits  = ingredients.some(i => i.category === 'fruit')
  const hasGrain   = ingredients.some(i => GRAINS.includes(i.id))
  const hasBreads  = ingredients.some(i => BREADS.includes(i.id))
  const hasWrap    = ingredients.some(i => ['whole_wheat_wrap', 'corn_tortilla'].includes(i.id))
  const hasOil     = ingredients.some(i => ['olive_oil', 'coconut_oil'].includes(i.id))
  const hasNuts    = ingredients.some(i => NUTS.includes(i.id) || SEEDS.includes(i.id))
  const hasPasta   = ingredients.some(i => i.id === 'whole_wheat_pasta')
  const hasWhey    = ingredients.some(i => i.id === 'whey_protein')

  // Smoothie / protein shake
  if (hasWhey || templateId.includes('smoothie') || templateId.includes('shake')) {
    return [
      'Colocar todos los ingredientes en la licuadora.',
      'Agregar ½ taza de agua o leche vegetal.',
      'Licuar hasta obtener una mezcla suave.',
      'Servir frío de inmediato.',
    ]
  }

  // Overnight oats
  if (hasOats && hasDairy && templateId.includes('overnight')) {
    return [
      'Mezclar la avena con el yogur en un frasco.',
      hasFruits ? 'Agregar la fruta cortada y mezclar.' : '',
      'Tapar y refrigerar al menos 6 horas (ideal toda la noche).',
      hasNuts ? 'Al servir, decorar con semillas o frutos secos.' : '',
    ].filter(Boolean)
  }

  // Oatmeal
  if (hasOats) {
    return [
      'Llevar ¾ taza de agua a hervor en una cacerola.',
      'Agregar la avena y cocinar 5 minutos a fuego medio revolviendo.',
      hasFruits ? 'Incorporar la fruta cortada y mezclar.' : '',
      hasDairy ? 'Servir con el yogur al lado.' : '',
      hasNuts ? 'Terminar con semillas o frutos secos encima.' : '',
    ].filter(Boolean)
  }

  // Wrap / tortilla
  if (hasWrap) {
    return [
      'Calentar la tortilla en sartén seco 30 segundos por lado.',
      (hasMeat || hasFish) ? 'Cocinar la proteína a la plancha con sal y pimienta.' : '',
      hasVegs ? 'Lavar y cortar las verduras frescas.' : '',
      'Distribuir el relleno en el centro de la tortilla.',
      'Doblar los laterales y enrollar. Cortar al medio.',
    ].filter(Boolean)
  }

  // Toast / bread
  if (hasBreads) {
    return [
      'Tostar el pan a punto dorado.',
      hasEggs ? 'Cocinar los huevos a gusto (revueltos, pochados o fritos).' : '',
      hasMeat ? 'Calentar la proteína en sartén 2-3 minutos.' : '',
      hasFruits || hasDairy ? 'Preparar los ingredientes frescos.' : '',
      'Montar todos los ingredientes sobre la tostada y servir.',
    ].filter(Boolean)
  }

  // Omelette / egg base
  if (hasEggs && !hasMeat && !hasFish && !hasGrain) {
    return [
      'Batir los huevos con sal y pimienta.',
      hasVegs ? 'Saltear las verduras en sartén con unas gotas de aceite.' : '',
      'Volcar los huevos batidos sobre las verduras.',
      'Cocinar a fuego medio hasta que cuaje por debajo.',
      'Doblar la tortilla a la mitad y servir caliente.',
    ].filter(Boolean)
  }

  // Pasta
  if (hasPasta) {
    return [
      'Cocinar la pasta en agua hirviendo con sal según el paquete (al dente).',
      (hasMeat || hasFish) ? 'En paralelo, cocinar la proteína a la plancha.' : '',
      hasVegs ? 'Saltear las verduras en sartén con aceite.' : '',
      'Mezclar la pasta escurrida con los demás ingredientes.',
      'Servir caliente con sal y pimienta a gusto.',
    ].filter(Boolean)
  }

  // Fish
  if (hasFish) {
    return [
      hasGrain ? 'Cocinar el cereal según instrucciones del paquete.' : '',
      'Secar el pescado y condimentar con sal, pimienta y limón.',
      'Cocinar en sartén caliente con aceite 3-4 minutos por lado.',
      hasVegs ? 'Saltear o cocer las verduras al vapor en paralelo.' : '',
      'Servir el pescado junto al acompañamiento.',
    ].filter(Boolean)
  }

  // Legume salad / soup
  if (hasLegumes && !hasMeat) {
    return [
      hasGrain ? 'Cocinar el cereal según instrucciones.' : '',
      'Escurrir y enjuagar las legumbres si son de lata.',
      hasVegs ? 'Lavar y cortar las verduras en trozos.' : '',
      'Combinar todos los ingredientes en un bowl.',
      hasOil ? 'Aliñar con aceite de oliva, sal, pimienta y limón al gusto.' : 'Condimentar al gusto.',
    ].filter(Boolean)
  }

  // Meat / poultry + veg (most common)
  if (hasMeat && hasVegs) {
    return [
      hasGrain ? 'Cocinar el cereal en agua según las instrucciones (15-20 min).' : '',
      'Condimentar la proteína con sal, pimienta y especias a gusto.',
      'Cocinar a la plancha o en sartén con aceite, 5-7 min por lado.',
      'Saltear o cocer las verduras al vapor hasta tiernas.',
      'Servir la proteína junto al cereal y las verduras.',
    ].filter(Boolean)
  }

  // Yogurt / dairy + fruit (snack)
  if (hasDairy && hasFruits) {
    return [
      'Servir el yogur en un bowl.',
      'Cortar y agregar la fruta encima.',
      hasNuts ? 'Espolvorear semillas o frutos secos.' : '',
    ].filter(Boolean)
  }

  // Fruit + nuts snack
  if (hasFruits && hasNuts && !hasDairy && !hasMeat) {
    return [
      'Lavar y preparar la fruta.',
      'Servir junto a los frutos secos o untado de mantequilla.',
    ]
  }

  // Fallback
  return [
    hasVegs ? 'Lavar y preparar las verduras.' : '',
    (hasEggs || hasMeat || hasFish) ? 'Cocinar la proteína a la plancha o en sartén.' : '',
    hasGrain ? 'Cocinar el cereal según instrucciones.' : '',
    'Combinar todos los ingredientes y condimentar al gusto.',
  ].filter(Boolean)
}

// --- Core logic ---

function pickFrom(options: string[], boosts: string[], usedIds: Set<string>): string | null {
  // Filter out already-used ingredients
  const available = options.filter(id => !usedIds.has(id))
  if (available.length === 0) return options[Math.floor(Math.random() * options.length)]

  const boosted = available.filter(id => boosts.includes(id))

  // 65% chance to pick from boosted pool if available
  if (boosted.length > 0 && Math.random() < 0.65) {
    return boosted[Math.floor(Math.random() * boosted.length)]
  }
  return available[Math.floor(Math.random() * available.length)]
}

function buildName(ingredients: IngredientCatalogItem[]): string {
  if (ingredients.length === 0) return 'Plato saludable'
  if (ingredients.length === 1) return ingredients[0].nameEs

  const [first, ...rest] = ingredients
  if (rest.length === 1) return `${first.nameEs} con ${rest[0].nameEs}`

  const last = rest[rest.length - 1]
  const middle = rest.slice(0, -1).map(i => i.nameEs).join(', ')
  return `${first.nameEs} con ${middle} y ${last.nameEs}`
}

function estimateCalories(ingredients: IngredientCatalogItem[]): number {
  const total = ingredients.reduce((sum, i) => sum + i.calories, 0)
  // Round to nearest 10
  return Math.round(total / 10) * 10
}

export function generateMeal(goal: Goal, mealType: MealType, history: string[] = []): GeneratedMeal {
  const boosts = GOAL_BOOSTS[goal]
  const reasons = GOAL_REASONS[goal]

  // Get eligible templates for this meal type
  const eligible = TEMPLATES.filter(t => t.mealTypes.includes(mealType))

  // Exclude recently seen templates by name
  const notRecent = eligible.filter(t => !history.includes(t.id))
  const pool = notRecent.length > 0 ? notRecent : eligible

  // Weight templates toward those that use boosted ingredients in their first slot
  const boosted = pool.filter(t =>
    t.slots.some(slot => slot.some(id => boosts.includes(id)))
  )
  const templatePool = boosted.length > 0 && Math.random() < 0.75 ? boosted : pool

  const template = templatePool[Math.floor(Math.random() * templatePool.length)]

  // Fill each slot
  const usedIds = new Set<string>()
  const resolvedIngredients: IngredientCatalogItem[] = []

  for (const slot of template.slots) {
    const picked = pickFrom(slot, boosts, usedIds)
    if (!picked) continue

    const item = findIngredientById(picked)
    if (!item) continue

    usedIds.add(picked)
    resolvedIngredients.push(item)
  }

  const name = buildName(resolvedIngredients)
  const calories = estimateCalories(resolvedIngredients)
  const reason = reasons[Math.floor(Math.random() * reasons.length)]

  const ingredients: GeneratedIngredient[] = resolvedIngredients.map(item => ({
    id: item.id,
    name: item.nameEs,
    icon: getIngredientIcon(item),
    emoji: getCategoryEmoji(item),
    serving: getServing(item),
    searchTerms: item.searchTerms,
  }))

  const instructions = generateInstructions(template.id, resolvedIngredients)

  return {
    id: template.id + '_' + Date.now(),
    templateId: template.id,
    name,
    mealType,
    ingredients,
    calories,
    reason,
    tags: [goal, mealType],
    instructions,
  }
}
