import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatKDA(kills: number, deaths: number, assists: number): string {
  if (deaths === 0) return 'Perfect'
  return ((kills + assists) / deaths).toFixed(2)
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function getWinRate(wins: number, losses: number): number {
  const total = wins + losses
  if (total === 0) return 0
  return Math.round((wins / total) * 100)
}

export function timeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(timestamp).toLocaleDateString()
}

export function getRankDisplay(tier: string, rank: string): string {
  const noRankTiers = ['MASTER', 'GRANDMASTER', 'CHALLENGER']
  if (noRankTiers.includes(tier.toUpperCase())) return tier
  return `${tier} ${rank}`
}

export function buildProfileUrl(
  region: string,
  gameName: string,
  tagLine: string,
): string {
  return `/player/${region.toLowerCase()}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
}
