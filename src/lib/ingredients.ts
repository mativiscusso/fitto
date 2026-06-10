export type IngredientCatalogItem = {
  id: string
  name: string
  nameEs: string
  searchTerms: string[]
  category: 'protein' | 'carb' | 'vegetable' | 'fruit' | 'fat' | 'dairy' | 'other'
  calories: number // kcal per typical serving
}

export const INGREDIENT_CATALOG: IngredientCatalogItem[] = [
  // Proteins - Meat & Fish
  { id: 'chicken_breast', name: 'Chicken Breast', nameEs: 'Pechuga de pollo', searchTerms: ['chicken breast', 'grilled chicken'], category: 'protein', calories: 220 },
  { id: 'chicken_thigh', name: 'Chicken Thigh', nameEs: 'Muslo de pollo', searchTerms: ['chicken thigh', 'chicken leg'], category: 'protein', calories: 240 },
  { id: 'turkey_breast', name: 'Turkey Breast', nameEs: 'Pechuga de pavo', searchTerms: ['turkey breast', 'smoked turkey'], category: 'protein', calories: 190 },
  { id: 'lean_beef', name: 'Lean Beef', nameEs: 'Carne magra', searchTerms: ['lean beef', 'ground beef'], category: 'protein', calories: 250 },
  { id: 'sirloin', name: 'Sirloin', nameEs: 'Bife de chorizo', searchTerms: ['sirloin steak', 'beef steak'], category: 'protein', calories: 270 },
  { id: 'pork_tenderloin', name: 'Pork Tenderloin', nameEs: 'Lomo de cerdo', searchTerms: ['pork tenderloin', 'lean pork'], category: 'protein', calories: 210 },
  { id: 'tuna', name: 'Tuna', nameEs: 'Atún', searchTerms: ['tuna steak', 'canned tuna'], category: 'protein', calories: 180 },
  { id: 'salmon', name: 'Salmon', nameEs: 'Salmón', searchTerms: ['salmon fillet', 'fresh salmon'], category: 'protein', calories: 200 },
  { id: 'sardines', name: 'Sardines', nameEs: 'Sardinas', searchTerms: ['sardines', 'canned sardines'], category: 'protein', calories: 170 },
  { id: 'mackerel', name: 'Mackerel', nameEs: 'Caballa', searchTerms: ['mackerel', 'atlantic mackerel'], category: 'protein', calories: 190 },
  { id: 'hake', name: 'Hake', nameEs: 'Merluza', searchTerms: ['hake fish', 'white fish'], category: 'protein', calories: 160 },
  { id: 'shrimp', name: 'Shrimp', nameEs: 'Camarones', searchTerms: ['shrimp', 'prawns'], category: 'protein', calories: 150 },

  // Proteins - Eggs & Dairy
  { id: 'eggs', name: 'Eggs', nameEs: 'Huevos', searchTerms: ['eggs', 'egg'], category: 'protein', calories: 150 },
  { id: 'egg_whites', name: 'Egg Whites', nameEs: 'Claras de huevo', searchTerms: ['egg whites', 'egg'], category: 'protein', calories: 80 },
  { id: 'greek_yogurt', name: 'Greek Yogurt', nameEs: 'Yogur griego', searchTerms: ['greek yogurt', 'yogurt'], category: 'dairy', calories: 120 },
  { id: 'natural_yogurt', name: 'Natural Yogurt', nameEs: 'Yogur natural', searchTerms: ['natural yogurt', 'plain yogurt'], category: 'dairy', calories: 110 },
  { id: 'cottage_cheese', name: 'Cottage Cheese', nameEs: 'Queso cottage', searchTerms: ['cottage cheese'], category: 'dairy', calories: 110 },
  { id: 'ricotta_light', name: 'Ricotta Light', nameEs: 'Ricota light', searchTerms: ['ricotta cheese', 'light ricotta'], category: 'dairy', calories: 120 },

  // Proteins - Plant-based
  { id: 'tofu', name: 'Tofu', nameEs: 'Tofu', searchTerms: ['tofu', 'soybean curd'], category: 'protein', calories: 140 },
  { id: 'tempeh', name: 'Tempeh', nameEs: 'Tempeh', searchTerms: ['tempeh'], category: 'protein', calories: 180 },
  { id: 'seitan', name: 'Seitan', nameEs: 'Seitán', searchTerms: ['seitan', 'wheat gluten'], category: 'protein', calories: 200 },
  { id: 'lentils', name: 'Lentils', nameEs: 'Lentejas', searchTerms: ['lentils', 'cooked lentils'], category: 'protein', calories: 230 },
  { id: 'chickpeas', name: 'Chickpeas', nameEs: 'Garbanzos', searchTerms: ['chickpeas', 'garbanzo beans'], category: 'protein', calories: 240 },
  { id: 'black_beans', name: 'Black Beans', nameEs: 'Porotos negros', searchTerms: ['black beans'], category: 'protein', calories: 220 },
  { id: 'kidney_beans', name: 'Kidney Beans', nameEs: 'Porotos rojos', searchTerms: ['kidney beans', 'red beans'], category: 'protein', calories: 220 },
  { id: 'peas', name: 'Peas', nameEs: 'Arvejas', searchTerms: ['peas', 'green peas'], category: 'protein', calories: 130 },
  { id: 'edamame', name: 'Edamame', nameEs: 'Edamame', searchTerms: ['edamame', 'soybeans'], category: 'protein', calories: 150 },
  { id: 'whey_protein', name: 'Whey Protein', nameEs: 'Proteína de suero', searchTerms: ['whey protein powder', 'protein shake'], category: 'protein', calories: 140 },

  // Carbs - Grains
  { id: 'oats', name: 'Oats', nameEs: 'Avena', searchTerms: ['oats', 'rolled oats', 'oatmeal'], category: 'carb', calories: 190 },
  { id: 'brown_rice', name: 'Brown Rice', nameEs: 'Arroz integral', searchTerms: ['brown rice', 'cooked rice'], category: 'carb', calories: 210 },
  { id: 'white_rice', name: 'White Rice', nameEs: 'Arroz blanco', searchTerms: ['white rice', 'cooked rice'], category: 'carb', calories: 200 },
  { id: 'quinoa', name: 'Quinoa', nameEs: 'Quinoa', searchTerms: ['quinoa', 'cooked quinoa'], category: 'carb', calories: 220 },
  { id: 'barley', name: 'Barley', nameEs: 'Cebada', searchTerms: ['barley', 'pearl barley'], category: 'carb', calories: 190 },
  { id: 'buckwheat', name: 'Buckwheat', nameEs: 'Trigo sarraceno', searchTerms: ['buckwheat', 'buckwheat groats'], category: 'carb', calories: 200 },
  { id: 'couscous', name: 'Couscous', nameEs: 'Cuscús', searchTerms: ['couscous', 'moroccan couscous'], category: 'carb', calories: 190 },

  // Carbs - Roots
  { id: 'sweet_potato', name: 'Sweet Potato', nameEs: 'Batata', searchTerms: ['sweet potato', 'baked sweet potato'], category: 'carb', calories: 130 },
  { id: 'potato', name: 'Potato', nameEs: 'Papa', searchTerms: ['potato', 'boiled potato'], category: 'carb', calories: 150 },

  // Carbs - Bread & Wraps
  { id: 'whole_wheat_bread', name: 'Whole Wheat Bread', nameEs: 'Pan integral', searchTerms: ['whole wheat bread', 'bread slice'], category: 'carb', calories: 160 },
  { id: 'whole_grain_toast', name: 'Whole Grain Toast', nameEs: 'Tostada integral', searchTerms: ['whole wheat toast', 'multigrain toast'], category: 'carb', calories: 140 },
  { id: 'whole_wheat_wrap', name: 'Whole Wheat Wrap', nameEs: 'Wrap integral', searchTerms: ['whole wheat wrap', 'tortilla wrap'], category: 'carb', calories: 170 },
  { id: 'corn_tortilla', name: 'Corn Tortilla', nameEs: 'Tortilla de maíz', searchTerms: ['corn tortilla', 'taco shell'], category: 'carb', calories: 130 },
  { id: 'whole_wheat_pasta', name: 'Whole Wheat Pasta', nameEs: 'Pasta integral', searchTerms: ['whole wheat pasta', 'pasta'], category: 'carb', calories: 210 },

  // Carbs - Simple/Snack
  { id: 'granola', name: 'Granola', nameEs: 'Granola', searchTerms: ['granola', 'healthy granola'], category: 'carb', calories: 200 },
  { id: 'rice_cakes', name: 'Rice Cakes', nameEs: 'Galletas de arroz', searchTerms: ['rice cakes', 'rice crackers'], category: 'carb', calories: 80 },
  { id: 'whole_grain_crackers', name: 'Whole Grain Crackers', nameEs: 'Galletas integrales', searchTerms: ['whole grain crackers', 'rye crackers'], category: 'carb', calories: 100 },
  { id: 'dates', name: 'Dates', nameEs: 'Dátiles', searchTerms: ['dates', 'medjool dates'], category: 'carb', calories: 120 },
  { id: 'raisins', name: 'Raisins', nameEs: 'Pasas de uva', searchTerms: ['raisins', 'dried raisins'], category: 'carb', calories: 100 },

  // Fruits
  { id: 'banana', name: 'Banana', nameEs: 'Banana', searchTerms: ['banana', 'ripe banana'], category: 'fruit', calories: 90 },
  { id: 'apple', name: 'Apple', nameEs: 'Manzana', searchTerms: ['apple', 'red apple'], category: 'fruit', calories: 80 },
  { id: 'pear', name: 'Pear', nameEs: 'Pera', searchTerms: ['pear', 'green pear'], category: 'fruit', calories: 75 },
  { id: 'orange', name: 'Orange', nameEs: 'Naranja', searchTerms: ['orange fruit', 'fresh orange'], category: 'fruit', calories: 70 },
  { id: 'mandarin', name: 'Mandarin', nameEs: 'Mandarina', searchTerms: ['mandarin', 'clementine'], category: 'fruit', calories: 65 },
  { id: 'grapefruit', name: 'Grapefruit', nameEs: 'Pomelo', searchTerms: ['grapefruit', 'pink grapefruit'], category: 'fruit', calories: 60 },
  { id: 'kiwi', name: 'Kiwi', nameEs: 'Kiwi', searchTerms: ['kiwi', 'kiwifruit'], category: 'fruit', calories: 70 },
  { id: 'mango', name: 'Mango', nameEs: 'Mango', searchTerms: ['mango', 'ripe mango'], category: 'fruit', calories: 100 },
  { id: 'pineapple', name: 'Ananá', nameEs: 'Ananá', searchTerms: ['pineapple', 'fresh pineapple'], category: 'fruit', calories: 75 },
  { id: 'papaya', name: 'Papaya', nameEs: 'Papaya', searchTerms: ['papaya', 'fresh papaya'], category: 'fruit', calories: 70 },
  { id: 'watermelon', name: 'Watermelon', nameEs: 'Sandía', searchTerms: ['watermelon', 'fresh watermelon'], category: 'fruit', calories: 60 },
  { id: 'melon', name: 'Melon', nameEs: 'Melón', searchTerms: ['melon', 'cantaloupe'], category: 'fruit', calories: 65 },
  { id: 'peach', name: 'Peach', nameEs: 'Durazno', searchTerms: ['peach', 'ripe peach'], category: 'fruit', calories: 70 },
  { id: 'plum', name: 'Plum', nameEs: 'Ciruela', searchTerms: ['plum', 'fresh plum'], category: 'fruit', calories: 65 },
  { id: 'apricot', name: 'Apricot', nameEs: 'Damasco', searchTerms: ['apricot', 'fresh apricot'], category: 'fruit', calories: 60 },
  { id: 'grapes', name: 'Grapes', nameEs: 'Uvas', searchTerms: ['grapes', 'green grapes'], category: 'fruit', calories: 85 },
  { id: 'strawberries', name: 'Strawberries', nameEs: 'Frutillas', searchTerms: ['strawberries', 'fresh strawberries'], category: 'fruit', calories: 60 },
  { id: 'blueberries', name: 'Blueberries', nameEs: 'Arándanos', searchTerms: ['blueberries', 'fresh blueberries'], category: 'fruit', calories: 65 },
  { id: 'raspberries', name: 'Raspberries', nameEs: 'Frambuesas', searchTerms: ['raspberries', 'fresh raspberries'], category: 'fruit', calories: 55 },
  { id: 'blackberries', name: 'Blackberries', nameEs: 'Moras', searchTerms: ['blackberries', 'fresh blackberries'], category: 'fruit', calories: 60 },
  { id: 'pomegranate', name: 'Pomegranate', nameEs: 'Granada', searchTerms: ['pomegranate', 'pomegranate seeds'], category: 'fruit', calories: 80 },
  { id: 'fig', name: 'Fig', nameEs: 'Higo', searchTerms: ['fig', 'fresh fig'], category: 'fruit', calories: 75 },
  { id: 'avocado', name: 'Avocado', nameEs: 'Palta', searchTerms: ['avocado', 'half avocado'], category: 'fat', calories: 160 },
  { id: 'coconut', name: 'Coconut', nameEs: 'Coco', searchTerms: ['coconut', 'fresh coconut'], category: 'fruit', calories: 90 },

  // Vegetables - Leafy greens
  { id: 'lettuce', name: 'Lettuce', nameEs: 'Lechuga', searchTerms: ['lettuce', 'green lettuce'], category: 'vegetable', calories: 20 },
  { id: 'spinach', name: 'Spinach', nameEs: 'Espinaca', searchTerms: ['spinach', 'fresh spinach'], category: 'vegetable', calories: 25 },
  { id: 'arugula', name: 'Arugula', nameEs: 'Rúcula', searchTerms: ['arugula', 'rocket lettuce'], category: 'vegetable', calories: 20 },
  { id: 'kale', name: 'Kale', nameEs: 'Kale', searchTerms: ['kale', 'fresh kale'], category: 'vegetable', calories: 30 },
  { id: 'chard', name: 'Chard', nameEs: 'Acelga', searchTerms: ['chard', 'swiss chard'], category: 'vegetable', calories: 25 },
  { id: 'watercress', name: 'Watercress', nameEs: 'Berro', searchTerms: ['watercress', 'fresh watercress'], category: 'vegetable', calories: 20 },

  // Vegetables - Cruciferous
  { id: 'broccoli', name: 'Broccoli', nameEs: 'Brócoli', searchTerms: ['broccoli', 'fresh broccoli'], category: 'vegetable', calories: 55 },
  { id: 'cauliflower', name: 'Cauliflower', nameEs: 'Coliflor', searchTerms: ['cauliflower', 'fresh cauliflower'], category: 'vegetable', calories: 50 },
  { id: 'cabbage', name: 'Cabbage', nameEs: 'Repollo', searchTerms: ['cabbage', 'green cabbage'], category: 'vegetable', calories: 40 },
  { id: 'bok_choy', name: 'Bok Choy', nameEs: 'Bok choy', searchTerms: ['bok choy', 'pak choi'], category: 'vegetable', calories: 30 },

  // Vegetables - Root & Colorful
  { id: 'carrot', name: 'Carrot', nameEs: 'Zanahoria', searchTerms: ['carrot', 'fresh carrot'], category: 'vegetable', calories: 50 },
  { id: 'pumpkin', name: 'Pumpkin', nameEs: 'Zapallo', searchTerms: ['pumpkin', 'butternut squash'], category: 'vegetable', calories: 60 },
  { id: 'beetroot', name: 'Beetroot', nameEs: 'Remolacha', searchTerms: ['beetroot', 'beet'], category: 'vegetable', calories: 60 },
  { id: 'corn', name: 'Corn', nameEs: 'Choclo', searchTerms: ['corn', 'sweet corn'], category: 'vegetable', calories: 80 },

  // Vegetables - Peppers & Tomatoes
  { id: 'tomato', name: 'Tomato', nameEs: 'Tomate', searchTerms: ['tomato', 'fresh tomato'], category: 'vegetable', calories: 30 },
  { id: 'cherry_tomato', name: 'Cherry Tomato', nameEs: 'Tomate cherry', searchTerms: ['cherry tomatoes', 'grape tomatoes'], category: 'vegetable', calories: 30 },
  { id: 'bell_pepper_red', name: 'Red Bell Pepper', nameEs: 'Morrón rojo', searchTerms: ['red bell pepper', 'red capsicum'], category: 'vegetable', calories: 40 },
  { id: 'bell_pepper_yellow', name: 'Yellow Bell Pepper', nameEs: 'Morrón amarillo', searchTerms: ['yellow bell pepper', 'yellow capsicum'], category: 'vegetable', calories: 40 },
  { id: 'bell_pepper_green', name: 'Green Bell Pepper', nameEs: 'Morrón verde', searchTerms: ['green bell pepper', 'green capsicum'], category: 'vegetable', calories: 35 },

  // Vegetables - Other
  { id: 'zucchini', name: 'Zucchini', nameEs: 'Zucchini', searchTerms: ['zucchini', 'courgette'], category: 'vegetable', calories: 35 },
  { id: 'eggplant', name: 'Eggplant', nameEs: 'Berenjena', searchTerms: ['eggplant', 'aubergine'], category: 'vegetable', calories: 40 },
  { id: 'cucumber', name: 'Cucumber', nameEs: 'Pepino', searchTerms: ['cucumber', 'fresh cucumber'], category: 'vegetable', calories: 20 },
  { id: 'mushrooms', name: 'Mushrooms', nameEs: 'Hongos', searchTerms: ['mushrooms', 'fresh mushrooms'], category: 'vegetable', calories: 35 },
  { id: 'green_beans', name: 'Green Beans', nameEs: 'Chauchas', searchTerms: ['green beans', 'french beans'], category: 'vegetable', calories: 40 },
  { id: 'asparagus', name: 'Asparagus', nameEs: 'Espárragos', searchTerms: ['asparagus', 'fresh asparagus'], category: 'vegetable', calories: 40 },
  { id: 'onion', name: 'Onion', nameEs: 'Cebolla', searchTerms: ['onion', 'white onion'], category: 'vegetable', calories: 40 },
  { id: 'red_onion', name: 'Red Onion', nameEs: 'Cebolla morada', searchTerms: ['red onion', 'purple onion'], category: 'vegetable', calories: 40 },
  { id: 'green_onion', name: 'Green Onion', nameEs: 'Cebollita de verdeo', searchTerms: ['green onion', 'scallion'], category: 'vegetable', calories: 20 },
  { id: 'celery', name: 'Celery', nameEs: 'Apio', searchTerms: ['celery', 'celery stalks'], category: 'vegetable', calories: 15 },
  { id: 'leek', name: 'Leek', nameEs: 'Puerro', searchTerms: ['leek', 'fresh leek'], category: 'vegetable', calories: 45 },
  { id: 'radish', name: 'Radish', nameEs: 'Rabanito', searchTerms: ['radish', 'fresh radish'], category: 'vegetable', calories: 20 },
  { id: 'artichoke', name: 'Artichoke', nameEs: 'Alcaucil', searchTerms: ['artichoke', 'globe artichoke'], category: 'vegetable', calories: 60 },
  { id: 'sprouts', name: 'Sprouts', nameEs: 'Brotes', searchTerms: ['bean sprouts', 'sprouts'], category: 'vegetable', calories: 25 },

  // Healthy Fats - Oils
  { id: 'olive_oil', name: 'Olive Oil', nameEs: 'Aceite de oliva', searchTerms: ['olive oil', 'extra virgin olive oil'], category: 'fat', calories: 120 },

  // Healthy Fats - Nuts
  { id: 'walnuts', name: 'Walnuts', nameEs: 'Nueces', searchTerms: ['walnuts', 'half walnuts'], category: 'fat', calories: 190 },
  { id: 'almonds', name: 'Almonds', nameEs: 'Almendras', searchTerms: ['almonds', 'raw almonds'], category: 'fat', calories: 180 },
  { id: 'cashews', name: 'Cashews', nameEs: 'Castañas de cajú', searchTerms: ['cashews', 'raw cashews'], category: 'fat', calories: 185 },
  { id: 'hazelnuts', name: 'Hazelnuts', nameEs: 'Avellanas', searchTerms: ['hazelnuts', 'raw hazelnuts'], category: 'fat', calories: 185 },
  { id: 'pistachios', name: 'Pistachios', nameEs: 'Pistachos', searchTerms: ['pistachios', 'pistachio nuts'], category: 'fat', calories: 175 },
  { id: 'peanuts', name: 'Peanuts', nameEs: 'Maníes', searchTerms: ['peanuts', 'dry roasted peanuts'], category: 'fat', calories: 180 },

  // Healthy Fats - Seeds
  { id: 'chia_seeds', name: 'Chia Seeds', nameEs: 'Semillas de chía', searchTerms: ['chia seeds', 'chia'], category: 'fat', calories: 90 },
  { id: 'flax_seeds', name: 'Flax Seeds', nameEs: 'Linaza', searchTerms: ['flax seeds', 'ground flaxseed'], category: 'fat', calories: 90 },
  { id: 'pumpkin_seeds', name: 'Pumpkin Seeds', nameEs: 'Semillas de zapallo', searchTerms: ['pumpkin seeds', 'pepitas'], category: 'fat', calories: 100 },
  { id: 'sunflower_seeds', name: 'Sunflower Seeds', nameEs: 'Semillas de girasol', searchTerms: ['sunflower seeds', 'sunflower kernels'], category: 'fat', calories: 95 },
  { id: 'sesame_seeds', name: 'Sesame Seeds', nameEs: 'Semillas de sésamo', searchTerms: ['sesame seeds', 'white sesame'], category: 'fat', calories: 90 },

  // Healthy Fats - Spreads
  { id: 'peanut_butter', name: 'Peanut Butter', nameEs: 'Manteca de maní', searchTerms: ['peanut butter', 'natural peanut butter'], category: 'fat', calories: 190 },
  { id: 'tahini', name: 'Tahini', nameEs: 'Tahini', searchTerms: ['tahini', 'sesame paste'], category: 'fat', calories: 180 },

  // Other
  { id: 'honey', name: 'Honey', nameEs: 'Miel', searchTerms: ['honey', 'natural honey'], category: 'other', calories: 60 },
  { id: 'cinnamon', name: 'Cinnamon', nameEs: 'Canela', searchTerms: ['cinnamon', 'cinnamon spice'], category: 'other', calories: 10 },
  { id: 'lemon', name: 'Lemon', nameEs: 'Limón', searchTerms: ['lemon', 'fresh lemon'], category: 'fruit', calories: 15 },
  { id: 'garlic', name: 'Garlic', nameEs: 'Ajo', searchTerms: ['garlic', 'garlic cloves'], category: 'vegetable', calories: 15 },
  { id: 'ginger', name: 'Ginger', nameEs: 'Jengibre', searchTerms: ['ginger', 'fresh ginger'], category: 'vegetable', calories: 15 },
  { id: 'milk', name: 'Milk', nameEs: 'Leche', searchTerms: ['milk', 'cow milk'], category: 'dairy', calories: 90 },
  { id: 'almond_milk', name: 'Almond Milk', nameEs: 'Leche de almendras', searchTerms: ['almond milk', 'unsweetened almond milk'], category: 'dairy', calories: 40 },
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
