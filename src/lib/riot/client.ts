const API_KEY = process.env.RIOT_API_KEY

if (!API_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('RIOT_API_KEY is not set')
}

export class RiotAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public endpoint: string,
  ) {
    super(message)
    this.name = 'RiotAPIError'
  }
}

export async function riotFetch<T>(
  baseUrl: string,
  path: string,
  options?: RequestInit,
): Promise<T> {
  if (!API_KEY) {
    throw new RiotAPIError('RIOT_API_KEY is not configured', 500, path)
  }

  const url = `https://${baseUrl}.api.riotgames.com${path}`

  const res = await fetch(url, {
    ...options,
    headers: {
      'X-Riot-Token': API_KEY,
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    const status = res.status
    let message = `Riot API error: ${status}`

    if (status === 404) message = 'Player not found'
    else if (status === 429) message = 'Rate limit exceeded. Please try again shortly.'
    else if (status === 403) message = 'Invalid API key'
    else if (status === 503) message = 'Riot API is temporarily unavailable'

    throw new RiotAPIError(message, status, path)
  }

  return res.json() as Promise<T>
}
