import { riotFetch } from './client'
import type { Summoner } from '@/types/riot'

export async function getSummonerByPuuid(
  puuid: string,
  platform: string,
): Promise<Summoner> {
  return riotFetch<Summoner>(
    platform,
    `/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  )
}
