// Riot API Types

export interface RiotAccount {
  puuid: string
  gameName: string
  tagLine: string
}

export interface Summoner {
  id: string
  accountId: string
  puuid: string
  profileIconId: number
  revisionDate: number
  summonerLevel: number
}

export interface LeagueEntry {
  leagueId: string
  summonerId: string
  queueType: 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR' | 'RANKED_TFT'
  tier: string
  rank: string
  leaguePoints: number
  wins: number
  losses: number
  hotStreak: boolean
  veteran: boolean
  freshBlood: boolean
  inactive: boolean
  miniSeries?: MiniSeries
}

export interface MiniSeries {
  losses: number
  progress: string
  target: number
  wins: number
}

export interface MatchMetadata {
  dataVersion: string
  matchId: string
  participants: string[]
}

export interface MatchInfo {
  gameCreation: number
  gameDuration: number
  gameEndTimestamp: number
  gameId: number
  gameMode: string
  gameName: string
  gameStartTimestamp: number
  gameType: string
  gameVersion: string
  mapId: number
  participants: ParticipantDto[]
  platformId: string
  queueId: number
  teams: TeamDto[]
  tournamentCode?: string
}

export interface ParticipantDto {
  assists: number
  baronKills: number
  bountyLevel: number
  champExperience: number
  champLevel: number
  championId: number
  championName: string
  championTransform: number
  consumablesPurchased: number
  damageDealtToBuildings: number
  damageDealtToObjectives: number
  damageDealtToTurrets: number
  damageSelfMitigated: number
  deaths: number
  detectorWardsPlaced: number
  doubleKills: number
  dragonKills: number
  firstBloodAssist: boolean
  firstBloodKill: boolean
  firstTowerAssist: boolean
  firstTowerKill: boolean
  gameEndedInEarlySurrender: boolean
  gameEndedInSurrender: boolean
  goldEarned: number
  goldSpent: number
  individualPosition: string
  inhibitorKills: number
  inhibitorTakedowns: number
  inhibitorsLost: number
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  itemsPurchased: number
  killingSprees: number
  kills: number
  lane: string
  largestCriticalStrike: number
  largestKillingSpree: number
  largestMultiKill: number
  longestTimeSpentLiving: number
  magicDamageDealt: number
  magicDamageDealtToChampions: number
  magicDamageTaken: number
  neutralMinionsKilled: number
  nexusKills: number
  nexusTakedowns: number
  nexusLost: number
  objectivesStolen: number
  objectivesStolenAssists: number
  participantId: number
  pentaKills: number
  perks: Perks
  physicalDamageDealt: number
  physicalDamageDealtToChampions: number
  physicalDamageTaken: number
  placement: number
  playerAugment1: number
  playerAugment2: number
  playerAugment3: number
  playerAugment4: number
  playerSubteamId: number
  profileIcon: number
  puuid: string
  quadraKills: number
  riotIdGameName: string
  riotIdTagline: string
  role: string
  sightWardsBoughtInGame: number
  spell1Casts: number
  spell2Casts: number
  spell3Casts: number
  spell4Casts: number
  subteamPlacement: number
  summoner1Casts: number
  summoner1Id: number
  summoner2Casts: number
  summoner2Id: number
  summonerId: string
  summonerLevel: number
  summonerName: string
  teamEarlySurrendered: boolean
  teamId: number
  teamPosition: string
  timeCCingOthers: number
  timePlayed: number
  totalAllyJungleMinionsKilled: number
  totalDamageDealt: number
  totalDamageDealtToChampions: number
  totalDamageShieldedOnTeammates: number
  totalDamageTaken: number
  totalEnemyJungleMinionsKilled: number
  totalHeal: number
  totalHealsOnTeammates: number
  totalMinionsKilled: number
  totalTimeCCDealt: number
  totalTimeSpentDead: number
  totalUnitsHealed: number
  tripleKills: number
  trueDamageDealt: number
  trueDamageDealtToChampions: number
  trueDamageTaken: number
  turretKills: number
  turretTakedowns: number
  turretsLost: number
  unrealKills: number
  visionScore: number
  visionWardsBoughtInGame: number
  wardsKilled: number
  wardsPlaced: number
  win: boolean
}

export interface Perks {
  statPerks: StatPerks
  styles: PerkStyle[]
}

export interface StatPerks {
  defense: number
  flex: number
  offense: number
}

export interface PerkStyle {
  description: string
  selections: PerkStyleSelection[]
  style: number
}

export interface PerkStyleSelection {
  perk: number
  var1: number
  var2: number
  var3: number
}

export interface TeamDto {
  bans: BanDto[]
  objectives: ObjectivesDto
  teamId: number
  win: boolean
}

export interface BanDto {
  championId: number
  pickTurn: number
}

export interface ObjectivesDto {
  baron: ObjectiveDto
  champion: ObjectiveDto
  dragon: ObjectiveDto
  inhibitor: ObjectiveDto
  riftHerald: ObjectiveDto
  tower: ObjectiveDto
}

export interface ObjectiveDto {
  first: boolean
  kills: number
}

export interface Match {
  metadata: MatchMetadata
  info: MatchInfo
}

// App-level types

export type Region = {
  id: string
  label: string
  platform: string
  regional: string
}

export interface PlayerProfile {
  account: RiotAccount
  summoner: Summoner
  rankedData: LeagueEntry[]
}

export interface ProcessedMatch {
  matchId: string
  gameCreation: number
  gameDuration: number
  queueId: number
  queueType: string
  gameMode: string
  win: boolean
  kills: number
  deaths: number
  assists: number
  championName: string
  championId: number
  champLevel: number
  items: number[]
  summoner1Id: number
  summoner2Id: number
  primaryRuneId: number
  secondaryRuneStyle: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
  goldEarned: number
  visionScore: number
  teamId: number
  participants: {
    puuid: string
    gameName: string
    tagLine: string
    championName: string
    teamId: number
  }[]
}

export interface FilterState {
  queue: string
  result: string
  count: number
}
