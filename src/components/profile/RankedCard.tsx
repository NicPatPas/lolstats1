import { TrendingUp, Flame, Star } from 'lucide-react'
import { TIER_COLORS } from '@/lib/ddragon'
import { getWinRate, getRankDisplay } from '@/lib/utils'
import type { LeagueEntry } from '@/types/riot'

interface RankedCardProps {
  entry: LeagueEntry
}

const QUEUE_LABELS: Record<string, string> = {
  RANKED_SOLO_5x5: 'Ranked Solo/Duo',
  RANKED_FLEX_SR: 'Ranked Flex',
}

const RANK_NUMERALS = ['I', 'II', 'III', 'IV']

export function RankedCard({ entry }: RankedCardProps) {
  const winRate = getWinRate(entry.wins, entry.losses)
  const total = entry.wins + entry.losses
  const tierColor = TIER_COLORS[entry.tier] ?? '#8899AA'
  const isApex = ['MASTER', 'GRANDMASTER', 'CHALLENGER'].includes(entry.tier)

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#1E2D42] bg-[#0F1724] p-5 transition-colors hover:border-[#2A3D56]">
      {/* Queue type label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4A6080]">
          {QUEUE_LABELS[entry.queueType] ?? entry.queueType}
        </span>
        <div className="flex items-center gap-1.5">
          {entry.hotStreak && (
            <span title="Hot Streak" className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs text-orange-400">
              <Flame className="h-3 w-3" />
              Streak
            </span>
          )}
          {entry.veteran && (
            <span title="Veteran" className="flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
              <Star className="h-3 w-3" />
              Veteran
            </span>
          )}
        </div>
      </div>

      {/* Rank info */}
      <div className="flex items-center gap-4">
        {/* Rank emblem placeholder */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl font-black"
          style={{ backgroundColor: `${tierColor}15`, color: tierColor, border: `2px solid ${tierColor}30` }}
        >
          {entry.tier[0]}
        </div>

        <div className="flex flex-col">
          <span className="text-xl font-bold text-white" style={{ color: tierColor }}>
            {entry.tier}
            {!isApex && (
              <span className="ml-1.5 text-lg text-white/70">
                {RANK_NUMERALS[['I', 'II', 'III', 'IV'].indexOf(entry.rank)] ?? entry.rank}
              </span>
            )}
          </span>
          <span className="text-sm text-[#8899AA]">
            {entry.leaguePoints} LP
          </span>
        </div>
      </div>

      {/* Win/Loss stats */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#8899AA]">{total} games</span>
          <span
            className={winRate >= 50 ? 'font-semibold text-[#3D9A6A]' : 'font-semibold text-[#C45252]'}
          >
            {winRate}% WR
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2840]">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${winRate}%`,
              backgroundColor: winRate >= 50 ? '#3D9A6A' : '#C45252',
            }}
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8899AA]">
          <span>
            <span className="font-semibold text-[#3D9A6A]">{entry.wins}W</span>{' '}
            <span className="text-[#4A6080]">/</span>{' '}
            <span className="font-semibold text-[#C45252]">{entry.losses}L</span>
          </span>
          {entry.miniSeries && (
            <span className="ml-auto flex items-center gap-0.5">
              {entry.miniSeries.progress.split('').map((c, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-full text-[8px] flex items-center justify-center font-bold ${
                    c === 'W'
                      ? 'bg-[#3D9A6A] text-white'
                      : c === 'L'
                        ? 'bg-[#C45252] text-white'
                        : 'bg-[#1A2840] text-[#4A6080]'
                  }`}
                >
                  {c !== 'N' ? c : ''}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function NoRankedCard() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-[#1E2D42] border-dashed bg-[#0F1724]/50 p-6 text-center">
      <TrendingUp className="h-8 w-8 text-[#2A3D56]" />
      <div>
        <p className="text-sm font-medium text-[#4A6080]">Unranked</p>
        <p className="text-xs text-[#2A3D56] mt-0.5">No ranked games this season</p>
      </div>
    </div>
  )
}
