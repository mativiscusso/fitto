import { INGREDIENT_CATALOG, findIngredientByName } from '@/lib/ingredients'

const UNSPLASH_BASE_URL = 'https://api.unsplash.com'

function getRandomSearchTerm(searchTerms: string[]): string {
  return searchTerms[Math.floor(Math.random() * searchTerms.length)]
}

async function fetchUnsplashImage(
  query: string,
  accessKey: string
): Promise<string | null> {
  const url = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=5`
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  })

  if (!response.ok) {
    return null
  }

  const data = await response.json()

  if (data.results && data.results.length > 0) {
    const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 5))
    return data.results[randomIndex].urls.small
  }

  return null
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ingredientName = searchParams.get('name')

  if (!ingredientName) {
    return Response.json({ error: 'Missing ingredient name' }, { status: 400 })
  }

  const catalogItem = findIngredientByName(ingredientName)

  if (!catalogItem) {
    return Response.json({ error: 'Ingredient not found in catalog' }, { status: 404 })
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  if (!accessKey) {
    return Response.json({
      url: `https://source.unsplash.com/200x200/?${encodeURIComponent(catalogItem.searchTerms[0])}`,
    })
  }

  const searchTerm = getRandomSearchTerm(catalogItem.searchTerms)
  const url = await fetchUnsplashImage(searchTerm, accessKey)
    ?? await fetchUnsplashImage(catalogItem.searchTerms[0].split(' ')[0], accessKey)

  if (!url) {
    return Response.json({ error: 'No images found' }, { status: 404 })
  }

  return Response.json({ url, alt: catalogItem.nameEs })
}

export async function POST(request: Request) {
  try {
    const { ingredients } = await request.json()

    if (!Array.isArray(ingredients)) {
      return Response.json({ error: 'Ingredients must be an array' }, { status: 400 })
    }

    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    const results = await Promise.all(
      ingredients.slice(0, 12).map(async (name: string) => {
        const catalogItem = findIngredientByName(name)

        if (!catalogItem) {
          return { name, url: null }
        }

        if (!accessKey) {
          return {
            name,
            url: `https://source.unsplash.com/200x200/?${encodeURIComponent(catalogItem.searchTerms[0])}`,
          }
        }

        try {
          const searchTerm = getRandomSearchTerm(catalogItem.searchTerms)

          // Primary query: full search term
          let url = await fetchUnsplashImage(searchTerm, accessKey)

          // Fallback: first word only (e.g. "whole wheat wrap" → "whole")
          if (!url) {
            const simpleQuery = catalogItem.searchTerms[0].split(' ')[0]
            url = await fetchUnsplashImage(simpleQuery, accessKey)
          }

          return { name, url }
        } catch {
          return { name, url: null }
        }
      })
    )

    return Response.json({ results })
  } catch {
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}
