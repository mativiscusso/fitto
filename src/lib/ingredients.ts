export type IngredientCatalogItem = {
  id: string
  name: string
  nameEs: string
  searchTerms: string[]
  category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'fat' | 'dairy' | 'other'
}

export const INGREDIENT_CATALOG: IngredientCatalogItem[] = [
  { id: 'chicken_breast', name: 'Chicken Breast', nameEs: 'Pechuga de pollo', searchTerms: ['chicken breast', 'grilled chicken'], category: 'protein' },
  { id: 'chicken_thigh', name: 'Chicken Thigh', nameEs: 'Muslo de pollo', searchTerms: ['chicken thigh', 'chicken leg'], category: 'protein' },
  { id: 'turkey_breast', name: 'Turkey Breast', nameEs: 'Panceta de pavo', searchTerms: ['turkey breast', 'smoked turkey'], category: 'protein' },
  { id: 'lean_beef', name: 'Lean Beef', nameEs: 'Carne magra', searchTerms: ['lean beef', 'ground beef'], category: 'protein' },
  { id: 'sirloin', name: 'Sirloin', nameEs: 'Bife de chorizo', searchTerms: ['sirloin steak', 'beef steak'], category: 'protein' },
  { id: 'tuna', name: 'Tuna', nameEs: 'Atún', searchTerms: ['tuna steak', 'canned tuna'], category: 'protein' },
  { id: 'salmon', name: 'Salmon', nameEs: 'Salmón', searchTerms: ['salmon fillet', 'fresh salmon'], category: 'protein' },
  { id: 'sardines', name: 'Sardines', nameEs: 'Sardinas', searchTerms: ['sardines', 'canned sardines'], category: 'protein' },
  { id: 'hake', name: 'Hake', nameEs: 'Merluza', searchTerms: ['hake fish', 'white fish'], category: 'protein' },
  { id: 'shrimp', name: 'Shrimp', nameEs: 'Camarones', searchTerms: ['shrimp', 'prawns'], category: 'protein' },
  { id: 'eggs', name: 'Eggs', nameEs: 'Huevos', searchTerms: ['eggs', 'egg'], category: 'protein' },
  { id: 'egg_whites', name: 'Egg Whites', nameEs: 'Claras de huevo', searchTerms: ['egg whites', 'egg'], category: 'protein' },
  { id: 'greek_yogurt', name: 'Greek Yogurt', nameEs: 'Yogur griego', searchTerms: ['greek yogurt', 'yogurt'], category: 'dairy' },
  { id: 'cottage_cheese', name: 'Cottage Cheese', nameEs: 'Queso cottage', searchTerms: ['cottage cheese'], category: 'dairy' },
  { id: 'tofu', name: 'Tofu', nameEs: 'Tofu', searchTerms: ['tofu', 'soybean curd'], category: 'protein' },
  { id: 'tempeh', name: 'Tempeh', nameEs: 'Tempeh', searchTerms: ['tempeh'], category: 'protein' },
  { id: 'lentils', name: 'Lentils', nameEs: 'Lentejas', searchTerms: ['lentils', 'cooked lentils'], category: 'protein' },
  { id: 'chickpeas', name: 'Chickpeas', nameEs: 'Garbanzos', searchTerms: ['chickpeas', 'garbanzo beans'], category: 'protein' },
  { id: 'black_beans', name: 'Black Beans', nameEs: 'Porotos negros', searchTerms: ['black beans'], category: 'protein' },
  { id: 'whey_protein', name: 'Whey Protein', nameEs: 'Proteína de suero', searchTerms: ['whey protein powder', 'protein shake'], category: 'protein' },
  { id: 'oats', name: 'Oats', nameEs: 'Avena', searchTerms: ['oats', 'rolled oats', 'oatmeal'], category: 'carb' },
  { id: 'brown_rice', name: 'Brown Rice', nameEs: 'Arroz integral', searchTerms: ['brown rice', 'cooked rice'], category: 'carb' },
  { id: 'quinoa', name: 'Quinoa', nameEs: 'Quinoa', searchTerms: ['quinoa', 'cooked quinoa'], category: 'carb' },
  { id: 'sweet_potato', name: 'Sweet Potato', nameEs: 'Batata', searchTerms: ['sweet potato', 'baked sweet potato'], category: 'carb' },
  { id: 'whole_wheat_bread', name: 'Whole Wheat Bread', nameEs: 'Pan integral', searchTerms: ['whole wheat bread', 'bread slice'], category: 'carb' },
  { id: 'granola', name: 'Granola', nameEs: 'Granola', searchTerms: ['granola', 'healthy granola'], category: 'carb' },
  { id: 'banana', name: 'Banana', nameEs: 'Banana', searchTerms: ['banana', 'ripe banana'], category: 'fruit' },
  { id: 'apple', name: 'Apple', nameEs: 'Manzana', searchTerms: ['apple', 'red apple'], category: 'fruit' },
  { id: 'strawberries', name: 'Strawberries', nameEs: 'Frutillas', searchTerms: ['strawberries', 'fresh strawberries'], category: 'fruit' },
  { id: 'blueberries', name: 'Blueberries', nameEs: 'Arándanos', searchTerms: ['blueberries', 'fresh blueberries'], category: 'fruit' },
  { id: 'pear', name: 'Pear', nameEs: 'Pera', searchTerms: ['pear', 'green pear'], category: 'fruit' },
  { id: 'orange', name: 'Orange', nameEs: 'Naranja', searchTerms: ['orange fruit', 'fresh orange'], category: 'fruit' },
  { id: 'avocado', name: 'Avocado', nameEs: 'Palta', searchTerms: ['avocado', 'half avocado'], category: 'fat' },
  { id: 'olive_oil', name: 'Olive Oil', nameEs: 'Aceite de oliva', searchTerms: ['olive oil', 'extra virgin olive oil'], category: 'fat' },
  { id: 'almonds', name: 'Almonds', nameEs: 'Almendras', searchTerms: ['almonds', 'raw almonds'], category: 'fat' },
  { id: 'walnuts', name: 'Walnuts', nameEs: 'Nueces', searchTerms: ['walnuts', 'half walnuts'], category: 'fat' },
  { id: 'peanut_butter', name: 'Peanut Butter', nameEs: 'Manteca de maní', searchTerms: ['peanut butter', 'natural peanut butter'], category: 'fat' },
  { id: 'chia_seeds', name: 'Chia Seeds', nameEs: 'Semillas de chia', searchTerms: ['chia seeds', 'chia'], category: 'fat' },
  { id: 'flax_seeds', name: 'Flax Seeds', nameEs: 'Linaza', searchTerms: ['flax seeds', 'ground flaxseed'], category: 'fat' },
  { id: 'broccoli', name: 'Broccoli', nameEs: 'Brócoli', searchTerms: ['broccoli', 'fresh broccoli'], category: 'vegetable' },
  { id: 'spinach', name: 'Spinach', nameEs: 'Espinaca', searchTerms: ['spinach', 'fresh spinach'], category: 'vegetable' },
  { id: 'kale', name: 'Kale', nameEs: 'Kale', searchTerms: ['kale', 'fresh kale'], category: 'vegetable' },
  { id: 'carrot', name: 'Carrot', nameEs: 'Zanahoria', searchTerms: ['carrot', 'fresh carrot'], category: 'vegetable' },
  { id: 'zucchini', name: 'Zucchini', nameEs: 'Zucchini', searchTerms: ['zucchini', 'courgette'], category: 'vegetable' },
  { id: 'tomato', name: 'Tomato', nameEs: 'Tomate', searchTerms: ['tomato', 'fresh tomato'], category: 'vegetable' },
  { id: 'onion', name: 'Onion', nameEs: 'Cebolla', searchTerms: ['onion', 'white onion'], category: 'vegetable' },
  { id: 'bell_pepper', name: 'Bell Pepper', nameEs: 'Morrón', searchTerms: ['bell pepper', 'red pepper'], category: 'vegetable' },
  { id: 'cucumber', name: 'Cucumber', nameEs: 'Pepino', searchTerms: ['cucumber', 'fresh cucumber'], category: 'vegetable' },
  { id: 'lettuce', name: 'Lettuce', nameEs: 'Lechuga', searchTerms: ['lettuce', 'green lettuce'], category: 'vegetable' },
  { id: 'arugula', name: 'Arugula', nameEs: 'Rúcula', searchTerms: ['arugula', 'rocket lettuce'], category: 'vegetable' },
  { id: 'mushrooms', name: 'Mushrooms', nameEs: 'Hongos', searchTerms: ['mushrooms', 'fresh mushrooms'], category: 'vegetable' },
  { id: 'cauliflower', name: 'Cauliflower', nameEs: 'Coliflor', searchTerms: ['cauliflower', 'fresh cauliflower'], category: 'vegetable' },
  { id: 'pumpkin', name: 'Pumpkin', nameEs: 'Zapallo', searchTerms: ['pumpkin', 'butternut squash'], category: 'vegetable' },
  { id: 'celery', name: 'Celery', nameEs: 'Apio', searchTerms: ['celery', 'celery stalks'], category: 'vegetable' },
  { id: 'ginger', name: 'Ginger', nameEs: 'Jengibre', searchTerms: ['ginger', 'fresh ginger'], category: 'vegetable' },
  { id: 'garlic', name: 'Garlic', nameEs: 'Ajo', searchTerms: ['garlic', 'garlic cloves'], category: 'vegetable' },
  { id: 'lemon', name: 'Lemon', nameEs: 'Limón', searchTerms: ['lemon', 'fresh lemon'], category: 'fruit' },
  { id: 'honey', name: 'Honey', nameEs: 'Miel', searchTerms: ['honey', 'natural honey'], category: 'other' },
  { id: 'cinnamon', name: 'Cinnamon', nameEs: 'Canela', searchTerms: ['cinnamon', 'cinnamon spice'], category: 'other' },
  { id: 'vanilla', name: 'Vanilla', nameEs: 'Vainilla', searchTerms: ['vanilla extract', 'vanilla'], category: 'other' },
  { id: 'milk', name: 'Milk', nameEs: 'Leche', searchTerms: ['milk', 'cow milk'], category: 'dairy' },
  { id: 'almond_milk', name: 'Almond Milk', nameEs: 'Leche de almendras', searchTerms: ['almond milk', 'unsweetened almond milk'], category: 'dairy' },
]

export function findIngredientByName(name: string): IngredientCatalogItem | undefined {
  const normalized = name.toLowerCase().trim()
  return INGREDIENT_CATALOG.find(item =>
    item.nameEs.toLowerCase() === normalized ||
    item.name.toLowerCase() === normalized ||
    item.nameEs.toLowerCase().includes(normalized) ||
    normalized.includes(item.nameEs.toLowerCase())
  )
}

export function findIngredientById(id: string): IngredientCatalogItem | undefined {
  return INGREDIENT_CATALOG.find(item => item.id === id)
}