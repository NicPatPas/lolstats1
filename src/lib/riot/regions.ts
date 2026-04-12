import type { Region } from '@/types/riot'

export const REGIONS: Region[] = [
  { id: 'NA', label: 'NA', platform: 'na1', regional: 'americas' },
  { id: 'EUW', label: 'EUW', platform: 'euw1', regional: 'europe' },
  { id: 'EUNE', label: 'EUNE', platform: 'eun1', regional: 'europe' },
  { id: 'KR', label: 'KR', platform: 'kr', regional: 'asia' },
  { id: 'JP', label: 'JP', platform: 'jp1', regional: 'asia' },
  { id: 'BR', label: 'BR', platform: 'br1', regional: 'americas' },
  { id: 'LAN', label: 'LAN', platform: 'la1', regional: 'americas' },
  { id: 'LAS', label: 'LAS', platform: 'la2', regional: 'americas' },
  { id: 'OCE', label: 'OCE', platform: 'oc1', regional: 'sea' },
  { id: 'TR', label: 'TR', platform: 'tr1', regional: 'europe' },
  { id: 'RU', label: 'RU', platform: 'ru', regional: 'europe' },
  { id: 'PH', label: 'PH', platform: 'ph2', regional: 'sea' },
  { id: 'SG', label: 'SG', platform: 'sg2', regional: 'sea' },
  { id: 'TH', label: 'TH', platform: 'th2', regional: 'sea' },
  { id: 'TW', label: 'TW', platform: 'tw2', regional: 'sea' },
  { id: 'VN', label: 'VN', platform: 'vn2', regional: 'sea' },
]

export function getRegion(regionId: string): Region | undefined {
  return REGIONS.find((r) => r.id.toLowerCase() === regionId.toLowerCase())
}

export const DEFAULT_REGION = REGIONS[0]
