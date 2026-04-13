import { TrendingUp, Flame, Zap } from 'lucide-react'
import { TIER_COLORS } from '@/lib/ddragon'
import { getWinRate } from '@/lib/utils'
import type { LeagueEntry } from '@/types/riot'

interface RankedCardProps {
  entry: LeagueEntry
}

const QUEUE_LABELS: Record<string, string> = {
  RANKED_SOLO_5x5: 'Ranked Solo / Duo',
  RANKED_FLEX_SR:  'Ranked Flex',
}

const RANK_ROMAN: Record<string, string> = { I: 'I', II: 'II', III: 'III', IV: 'IV' }

export function RankedCard({ entry }: RankedCardProps) {
  const winRate   = getWinRate(entry.wins, entry.losses)
  const total     = entry.wins + entry.losses
  const tierColor = TIER_COLORS[entry.tier] ?? '#8BA4BE'
  const isApex    = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(entry.tier)

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-[#1A2840] bg-[#0C1220] p-5 transition-colors hover:border-[#243656]"
    >
      {/* Tier-coloured top edge */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${tierColor}60, transparent)` }}
        aria-hidden="true"
      />

      {/* Queue label + badges */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="font-display text-[10px] font-semibold uppercase tracking-[0.15em] text-[#435669]">
          {QUEUE_LABELS[entry.queueType] ?? entry.queueType}
        </span>
        <div className="flex items-center gap-1.5">
          {entry.hotStreak && (
            <span className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold text-orange-400">
              <Flame className="h-3 w-3" aria-hidden="true" />Hot
            </span>
          )}
          {entry.veteran && (
            <span className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-[11px] font-semibold text-yellow-400">
              <Zap className="h-3 w-3" aria-hidden="true" />Vet
            </span>
          )}
        </div>
      </div>

      {/* Rank display */}
      <div className="flex items-center gap-3 mb-5">
        {/* Emblem circle */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-2xl font-bold"
          style={{
            background: `radial-gradient(circle, ${tierColor}18 0%, ${tierColor}06 100%)`,
            border: `2px solid ${tierColor}35`,
            color: tierColor,
          }}
          aria-label={entry.tier}
        >
          {entry.tier[0]}
        </div>

        <div>
          <div className="font-display text-xl font-bold leading-none" style={{ color: tierColor }}>
            {entry.tier}
            {!isApex && (
              <span className="ml-1.5 text-base opacity-70">
                {RANK_ROMAN[entry.rank] ?? entry.rank}
              </span>
            )}
          </div>
          <div className="mt-1 font-display text-sm text-[#8BA4BE] nums">
            {entry.leaguePoints.toLocaleString()} LP
          </div>
        </div>
      </div>

      {/* W/L + progress */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#435669] nums">{total.toLocaleString()} games</span>
          <span
            className="font-display font-bold nums"
            style={{ color: winRate >= 50 ? 'var(--win)' : 'var(--loss)' }}
          >
            {winRate}%
          </span>
        </div>

        {/* Bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#162032]" role="progressbar" aria-valuenow={winRate} aria-valuemin={0} aria-valuemax={100} aria-label={`${winRate}% win rate`}>
          <div
            className="h-full rounded-full transition-[width] duration-700"
            style={{
              width: `${winRate}%`,
              background: winRate >= 60
                ? 'var(--gold)'
                : winRate >= 50
                  ? 'var(--win)'
                  : 'var(--loss)',
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-display text-xs nums">
            <span style={{ color: 'var(--win)' }}>{entry.wins}W</span>
            <span className="mx-1 text-[#2A3D56]">/</span>
            <span style={{ color: 'var(--loss)' }}>{entry.losses}L</span>
          </span>

          {entry.miniSeries && (
            <div className="flex items-center gap-1" aria-label="Promotion series">
              {entry.miniSeries.progress.split('').map((c, i) => (
                <span
                  key={i}
                  className="flex h-4 w-4 items-center justify-center rounded-full font-display text-[9px] font-bold"
                  style={{
                    background: c === 'W' ? 'var(--win)' : c === 'L' ? 'var(--loss)' : '#162032',
                    color: c !== 'N' ? 'white' : '#435669',
                  }}
                  aria-label={c === 'W' ? 'Win' : c === 'L' ? 'Loss' : 'Pending'}
                >
                  {c !== 'N' ? c : ''}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function NoRankedCard() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#1A2840] border-dashed bg-[#0C1220]/50 p-6 text-center">
      <TrendingUp className="h-7 w-7 text-[#243656]" aria-hidden="true" />
      <div>
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-[#435669]">Unranked</p>
        <p className="mt-0.5 text-xs text-[#2A3D56]">No ranked games this season</p>
      </div>
    </div>
  )
}
