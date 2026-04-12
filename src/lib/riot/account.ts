import { riotFetch } from './client'
import type { RiotAccount } from '@/types/riot'

export async function getAccountByRiotId(
  gameName: string,
  tagLine: string,
  regional: string,
): Promise<RiotAccount> {
  const encodedName = encodeURIComponent(gameName)
  const encodedTag = encodeURIComponent(tagLine)
  return riotFetch<RiotAccount>(
    regional,
    `/riot/account/v1/accounts/by-riot-id/${encodedName}/${encodedTag}`,
  )
}

export async function getAccountByPuuid(
  puuid: string,
  regional: string,
): Promise<RiotAccount> {
  return riotFetch<RiotAccount>(
    regional,
    `/riot/account/v1/accounts/by-puuid/${puuid}`,
  )
}
