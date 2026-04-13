import Image from 'next/image'
import { cn, formatKDA, getWinRate } from '@/lib/utils'
import { ddragon } from '@/lib/ddragon'
import type { ProcessedMatch } from '@/types/riot'

interface ChampionStatsProps {
  matches: ProcessedMatch[]
}

interface ChampionAggregate {
  championName: string
  games: number
  wins: number
  losses: number
  kills: number
  deaths: number
  assists: number
  totalCS: number
  totalDuration: number
}

function aggregateByChampion(matches: ProcessedMatch[]): ChampionAggregate[] {
  const map = new Map<string, ChampionAggregate>()

  for (const m of matches) {
    const existing = map.get(m.championName)
    const cs = m.totalMinionsKilled + m.neutralMinionsKilled

    if (existing) {
      existing.games++
      existing.wins += m.win ? 1 : 0
      existing.losses += m.win ? 0 : 1
      existing.kills += m.kills
      existing.deaths += m.deaths
      existing.assists += m.assists
      existing.totalCS += cs
      existing.totalDuration += m.gameDuration
    } else {
      map.set(m.championName, {
        championName: m.championName,
        games: 1,
        wins: m.win ? 1 : 0,
        losses: m.win ? 0 : 1,
        kills: m.kills,
        deaths: m.deaths,
        assists: m.assists,
        totalCS: cs,
        totalDuration: m.gameDuration,
      })
    }
  }

  return [...map.values()].sort((a, b) => b.games - a.games)
}

export function ChampionStats({ matches }: ChampionStatsProps) {
  if (matches.length === 0) return null

  const champions = aggregateByChampion(matches).slice(0, 5)
  const maxGames = champions[0]?.games ?? 1

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#1E2D42] bg-[#0F1724] p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-[#4A6080]">
        Champions · Last {matches.length} Games
      </h3>

      <div className="flex flex-col gap-0.5">
        {champions.map((champ) => {
          const wr = getWinRate(champ.wins, champ.losses)
          const avgKDA = formatKDA(
            champ.kills / champ.games,
            champ.deaths / champ.games,
            champ.assists / champ.games,
          )
          const avgCS = champ.totalCS / champ.games
          const avgCSPerMin = champ.totalDuration > 0
            ? ((champ.totalCS / champ.totalDuration) * 60).toFixed(1)
            : '0.0'
          const gamesBarWidth = (champ.games / maxGames) * 100

          return (
            <div
              key={champ.championName}
              className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-[#131E2E]"
            >
              {/* Champion icon */}
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-[#1E2D42]">
                <Image
                  src={ddragon.championSquare(champ.championName)}
                  alt={champ.championName}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Stats */}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {/* Row 1: name + winrate */}
                <div className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-xs font-semibold text-[#C8D6E5]">
                    {champ.championName}
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-xs font-bold',
                      wr >= 60
                        ? 'text-[#C89B3C]'
                        : wr >= 50
                          ? 'text-[#3D9A6A]'
                          : 'text-[#C45252]',
                    )}
                  >
                    {wr}%
                  </span>
                </div>

                {/* Row 2: games bar + secondary stats */}
                <div className="flex items-center gap-2">
                  {/* Games played bar */}
                  <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-[#1A2840]">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        wr >= 60
                          ? 'bg-[#C89B3C]'
                          : wr >= 50
                            ? 'bg-[#3D9A6A]'
                            : 'bg-[#C45252]',
                      )}
                      style={{ width: `${gamesBarWidth}%` }}
                    />
                  </div>

                  {/* Game count */}
                  <span className="shrink-0 text-[10px] text-[#4A6080]">
                    {champ.games}G
                  </span>
                </div>

                {/* Row 3: W/L · KDA · CS/min */}
                <div className="flex items-center gap-1.5 text-[10px] text-[#4A6080]">
                  <span>
                    <span className="text-[#3D9A6A]">{champ.wins}W</span>
                    <span className="text-[#2A3D56]">/</span>
                    <span className="text-[#C45252]">{champ.losses}L</span>
                  </span>
                  <span className="text-[#2A3D56]">·</span>
                  <span className={cn(avgKDA === 'Perfect' ? 'text-[#C89B3C]' : 'text-[#8899AA]')}>
                    {avgKDA === 'Perfect' ? '∞' : avgKDA} KDA
                  </span>
                  <span className="text-[#2A3D56]">·</span>
                  <span>{avgCSPerMin} CS/m</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
