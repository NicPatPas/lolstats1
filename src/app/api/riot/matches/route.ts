import { NextRequest, NextResponse } from 'next/server'
import { getMatchesByPuuid, processMatch } from '@/lib/riot/matches'
import { getRegion } from '@/lib/riot/regions'
import { RiotAPIError } from '@/lib/riot/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const regionId = searchParams.get('region')
  const puuid = searchParams.get('puuid')
  const count = parseInt(searchParams.get('count') ?? '20', 10)
  const start = parseInt(searchParams.get('start') ?? '0', 10)
  const queue = searchParams.get('queue')

  if (!regionId || !puuid) {
    return NextResponse.json(
      { error: 'Missing required parameters: region, puuid' },
      { status: 400 },
    )
  }

  const region = getRegion(regionId)
  if (!region) {
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })
  }

  try {
    const matches = await getMatchesByPuuid(puuid, region.regional, {
      count: Math.min(count, 20),
      start,
      queue: queue ? parseInt(queue, 10) : undefined,
    })

    const processed = matches.map((m) => processMatch(m, puuid))
    return NextResponse.json({ matches: processed })
  } catch (err) {
    if (err instanceof RiotAPIError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status === 429 ? 429 : 502 },
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
