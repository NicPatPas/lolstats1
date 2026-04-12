import { riotFetch } from './client'
import type { Match, ProcessedMatch } from '@/types/riot'

export async function getMatchIdsByPuuid(
  puuid: string,
  regional: string,
  options: {
    queue?: number
    count?: number
    start?: number
  } = {},
): Promise<string[]> {
  const params = new URLSearchParams()
  if (options.queue !== undefined) params.set('queue', String(options.queue))
  params.set('count', String(options.count ?? 20))
  if (options.start !== undefined) params.set('start', String(options.start))

  const query = params.toString()
  return riotFetch<string[]>(
    regional,
    `/lol/match/v5/matches/by-puuid/${puuid}/ids?${query}`,
  )
}

export async function getMatch(
  matchId: string,
  regional: string,
): Promise<Match> {
  return riotFetch<Match>(regional, `/lol/match/v5/matches/${matchId}`)
}

export async function getMatchesByPuuid(
  puuid: string,
  regional: string,
  options: {
    queue?: number
    count?: number
    start?: number
  } = {},
): Promise<Match[]> {
  const ids = await getMatchIdsByPuuid(puuid, regional, options)

  if (ids.length === 0) return []

  const matches = await Promise.allSettled(
    ids.map((id) => getMatch(id, regional)),
  )

  return matches
    .filter((r): r is PromiseFulfilledResult<Match> => r.status === 'fulfilled')
    .map((r) => r.value)
}

export function processMatch(match: Match, puuid: string): ProcessedMatch {
  const participant = match.info.participants.find((p) => p.puuid === puuid)

  if (!participant) {
    throw new Error(`Participant ${puuid} not found in match ${match.metadata.matchId}`)
  }

  const primaryStyle = participant.perks?.styles?.find(
    (s) => s.description === 'primaryStyle',
  )
  const subStyle = participant.perks?.styles?.find(
    (s) => s.description === 'subStyle',
  )

  // Pre-compute team kill totals for kill participation
  const teamKills: Record<number, number> = {}
  for (const p of match.info.participants) {
    teamKills[p.teamId] = (teamKills[p.teamId] ?? 0) + p.kills
  }

  // Full participant data — extracted once, reused for both the summary list and expanded detail
  const detailParticipants = match.info.participants.map((p) => {
    const pPrimary = p.perks?.styles?.find((s) => s.description === 'primaryStyle')
    const pSub = p.perks?.styles?.find((s) => s.description === 'subStyle')
    return {
      puuid: p.puuid,
      gameName: p.riotIdGameName || p.summonerName,
      tagLine: p.riotIdTagline,
      championName: p.championName,
      championId: p.championId,
      champLevel: p.champLevel,
      teamId: p.teamId,
      teamPosition: p.teamPosition || p.individualPosition || '',
      kills: p.kills,
      deaths: p.deaths,
      assists: p.assists,
      items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6],
      summoner1Id: p.summoner1Id,
      summoner2Id: p.summoner2Id,
      primaryRuneId: pPrimary?.selections?.[0]?.perk ?? 0,
      secondaryRuneStyle: pSub?.style ?? 0,
      totalMinionsKilled: p.totalMinionsKilled,
      neutralMinionsKilled: p.neutralMinionsKilled,
      goldEarned: p.goldEarned,
      visionScore: p.visionScore,
      totalDamageDealtToChampions: p.totalDamageDealtToChampions,
      totalDamageTaken: p.totalDamageTaken,
      win: p.win,
    }
  })

  return {
    matchId: match.metadata.matchId,
    gameCreation: match.info.gameCreation,
    gameDuration: match.info.gameDuration,
    queueId: match.info.queueId,
    queueType: getQueueLabel(match.info.queueId),
    gameMode: match.info.gameMode,
    win: participant.win,
    kills: participant.kills,
    deaths: participant.deaths,
    assists: participant.assists,
    championName: participant.championName,
    championId: participant.championId,
    champLevel: participant.champLevel,
    items: [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
      participant.item6,
    ],
    summoner1Id: participant.summoner1Id,
    summoner2Id: participant.summoner2Id,
    primaryRuneId: primaryStyle?.selections?.[0]?.perk ?? 0,
    secondaryRuneStyle: subStyle?.style ?? 0,
    totalMinionsKilled: participant.totalMinionsKilled,
    neutralMinionsKilled: participant.neutralMinionsKilled,
    goldEarned: participant.goldEarned,
    visionScore: participant.visionScore,
    teamId: participant.teamId,
    participants: detailParticipants.map((p) => ({
      puuid: p.puuid,
      gameName: p.gameName,
      tagLine: p.tagLine,
      championName: p.championName,
      teamId: p.teamId,
    })),
    detailParticipants,
    teamKills,
  }
}

export function getQueueLabel(queueId: number): string {
  const queueMap: Record<number, string> = {
    420: 'Ranked Solo',
    440: 'Ranked Flex',
    400: 'Normal Draft',
    430: 'Normal Blind',
    450: 'ARAM',
    700: 'Clash',
    830: 'Co-op vs AI',
    840: 'Co-op vs AI',
    850: 'Co-op vs AI',
    900: 'URF',
    1020: 'One for All',
    1300: 'Nexus Blitz',
    1400: 'Spellbook',
    2000: 'Tutorial',
    2010: 'Tutorial',
    2020: 'Tutorial',
  }
  return queueMap[queueId] ?? 'Custom'
}
