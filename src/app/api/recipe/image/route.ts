const UNSPLASH_BASE_URL = 'https://api.unsplash.com'

export async function POST(request: Request) {
  const { ingredientNames } = await request.json()

  if (!Array.isArray(ingredientNames) || ingredientNames.length === 0) {
    return Response.json({ url: null })
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    return Response.json({ url: null })
  }

  // Build query from top 3 English ingredient names
  const terms = ingredientNames.slice(0, 3).join(' ')
  const query = `${terms} healthy food`

  const url = `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=10`
  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  })

  if (!res.ok) return Response.json({ url: null })

  const data = await res.json()
  if (!data.results?.length) return Response.json({ url: null })

  const pick = data.results[Math.floor(Math.random() * Math.min(5, data.results.length))]
  return Response.json({ url: pick.urls.regular })
}
