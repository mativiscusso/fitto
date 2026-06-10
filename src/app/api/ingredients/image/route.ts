import { INGREDIENT_CATALOG, findIngredientByName } from '@/lib/ingredients'

const UNSPLASH_BASE_URL = 'https://api.unsplash.com'

function getRandomSearchTerm(searchTerms: string[]): string {
  return searchTerms[Math.floor(Math.random() * searchTerms.length)]
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
      error: 'Unsplash API key not configured',
      url: `https://source.unsplash.com/200x200/?${encodeURIComponent(catalogItem.searchTerms[0])}`
    })
  }

  try {
    const searchTerm = getRandomSearchTerm(catalogItem.searchTerms)
    const query = `${searchTerm},food,ingredient`

    const response = await fetch(
      `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=square`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Unsplash API error:', response.status, errorText)
      throw new Error(`Unsplash API returned ${response.status}`)
    }

    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 5))
      const photo = data.results[randomIndex]

      return Response.json({
        url: photo.urls.small,
        fullUrl: photo.urls.regular,
        credit: {
          name: photo.user.name,
          link: photo.user.links.html,
        },
        alt: photo.alt_description || catalogItem.name,
      })
    }

    return Response.json({ error: 'No images found' }, { status: 404 })
  } catch (error) {
    console.error('Error fetching from Unsplash:', error)
    return Response.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    )
  }
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
          return { name, url: null, error: 'Not found in catalog' }
        }

        if (!accessKey) {
          return {
            name,
            url: `https://source.unsplash.com/200x200/?${encodeURIComponent(catalogItem.searchTerms[0])}`,
            credit: null,
          }
        }

        try {
          const searchTerm = getRandomSearchTerm(catalogItem.searchTerms)
          const query = `${searchTerm},food,ingredient`

          const response = await fetch(
            `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=square`,
            {
              headers: {
                Authorization: `Client-ID ${accessKey}`,
              },
            }
          )

          if (!response.ok) {
            throw new Error(`Unsplash API returned ${response.status}`)
          }

          const data = await response.json()

          if (data.results && data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * Math.min(data.results.length, 5))
            const photo = data.results[randomIndex]

            return {
              name,
              url: photo.urls.small,
              fullUrl: photo.urls.regular,
              credit: {
                name: photo.user.name,
                link: photo.user.links.html,
              },
            }
          }

          return { name, url: null, error: 'No images found' }
        } catch (err) {
          console.error(`Error fetching image for ${name}:`, err)
          return { name, url: null, error: 'Failed to fetch' }
        }
      })
    )

    return Response.json({ results })
  } catch (error) {
    console.error('Error in batch fetch:', error)
    return Response.json({ error: 'Failed to fetch images' }, { status: 500 })
  }
}