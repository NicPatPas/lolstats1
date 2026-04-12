const DDRAGON_VERSION = '15.7.1'
const DDRAGON_BASE = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`
const DDRAGON_CDN = 'https://ddragon.leagueoflegends.com/cdn'

export const ddragon = {
  profileIcon: (iconId: number) =>
    `${DDRAGON_BASE}/img/profileicon/${iconId}.png`,

  championSquare: (championName: string) =>
    `${DDRAGON_BASE}/img/champion/${championName}.png`,

  item: (itemId: number) =>
    itemId > 0 ? `${DDRAGON_BASE}/img/item/${itemId}.png` : null,

  summonerSpell: (spellId: number) => {
    const name = SUMMONER_SPELL_MAP[spellId]
    return name ? `${DDRAGON_BASE}/img/spell/${name}.png` : null
  },

  runeIcon: (runeId: number) => {
    const path = RUNE_PATH_MAP[runeId]
    return path ? `${DDRAGON_CDN}/img/${path}` : null
  },

  rankEmblem: (tier: string) =>
    `/rank-emblems/${tier.toLowerCase()}.png`,
}

export const SUMMONER_SPELL_MAP: Record<number, string> = {
  1: 'SummonerBoost',
  3: 'SummonerExhaust',
  4: 'SummonerFlash',
  6: 'SummonerHaste',
  7: 'SummonerHeal',
  11: 'SummonerSmite',
  12: 'SummonerTeleport',
  13: 'SummonerMana',
  14: 'SummonerDot',
  21: 'SummonerBarrier',
  30: 'SummonerPoroRecall',
  31: 'SummonerPoroThrow',
  32: 'SummonerSnowball',
  39: 'SummonerSnowURFSnowball_Mark',
  54: 'Summoner_UltBookPlaceholder',
  55: 'Summoner_UltBookSmitePlaceholder',
}

export const RUNE_PATH_MAP: Record<number, string> = {
  8000: 'perk-images/Styles/7201_Precision.png',
  8100: 'perk-images/Styles/7200_Domination.png',
  8200: 'perk-images/Styles/7202_Sorcery.png',
  8300: 'perk-images/Styles/7203_Whimsy.png',
  8400: 'perk-images/Styles/7204_Resolve.png',
}

export const TIER_ORDER = [
  'IRON',
  'BRONZE',
  'SILVER',
  'GOLD',
  'PLATINUM',
  'EMERALD',
  'DIAMOND',
  'MASTER',
  'GRANDMASTER',
  'CHALLENGER',
]

export const TIER_COLORS: Record<string, string> = {
  IRON: '#6B6B6B',
  BRONZE: '#AD5E28',
  SILVER: '#8FA3B2',
  GOLD: '#C89B3C',
  PLATINUM: '#4DB2A3',
  EMERALD: '#50C878',
  DIAMOND: '#576BCE',
  MASTER: '#9B4FC4',
  GRANDMASTER: '#CF4C4C',
  CHALLENGER: '#F4C874',
}

export const QUEUE_IDS = {
  RANKED_SOLO: 420,
  RANKED_FLEX: 440,
  NORMAL_DRAFT: 400,
  NORMAL_BLIND: 430,
  ARAM: 450,
  ALL: undefined,
}
