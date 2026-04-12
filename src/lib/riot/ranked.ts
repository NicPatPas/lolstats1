import { riotFetch } from './client'
import type { LeagueEntry } from '@/types/riot'

export async function getRankedBySummonerId(
  summonerId: string,
  platform: string,
): Promise<LeagueEntry[]> {
  return riotFetch<LeagueEntry[]>(
    platform,
    `/lol/league/v4/entries/by-summoner/${summonerId}`,
  )
}
