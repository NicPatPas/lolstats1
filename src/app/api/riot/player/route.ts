import { NextRequest, NextResponse } from 'next/server'
import { getAccountByRiotId } from '@/lib/riot/account'
import { getSummonerByPuuid } from '@/lib/riot/summoner'
import { getRankedBySummonerId } from '@/lib/riot/ranked'
import { getRegion } from '@/lib/riot/regions'
import { RiotAPIError } from '@/lib/riot/client'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const regionId = searchParams.get('region')
  const gameName = searchParams.get('gameName')
  const tagLine = searchParams.get('tagLine')

  if (!regionId || !gameName || !tagLine) {
    return NextResponse.json(
      { error: 'Missing required parameters: region, gameName, tagLine' },
      { status: 400 },
    )
  }

  const region = getRegion(regionId)
  if (!region) {
    return NextResponse.json({ error: 'Invalid region' }, { status: 400 })
  }

  try {
    const account = await getAccountByRiotId(gameName, tagLine, region.regional)
    const summoner = await getSummonerByPuuid(account.puuid, region.platform)
    const rankedData = await getRankedBySummonerId(summoner.id, region.platform)

    return NextResponse.json({ account, summoner, rankedData })
  } catch (err) {
    if (err instanceof RiotAPIError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.status === 404 ? 404 : 502 },
      )
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
