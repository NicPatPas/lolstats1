import Image from 'next/image'
import { ddragon, TIER_COLORS } from '@/lib/ddragon'
import { getRankDisplay } from '@/lib/utils'
import type { PlayerProfile } from '@/types/riot'

interface ProfileHeaderProps {
  profile: PlayerProfile
  region: string
}

export function ProfileHeader({ profile, region }: ProfileHeaderProps) {
  const { account, summoner } = profile
  const soloRanked  = profile.rankedData.find((r) => r.queueType === 'RANKED_SOLO_5x5')
  const tierColor   = soloRanked ? (TIER_COLORS[soloRanked.tier] ?? '#8BA4BE') : null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1A2840] bg-[#0C1220]">
      {/* Top glow strip */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: tierColor
            ? `linear-gradient(90deg, transparent 0%, ${tierColor}50 40%, ${tierColor}80 50%, ${tierColor}50 60%, transparent 100%)`
            : 'linear-gradient(90deg, transparent 0%, #4E9AF5 40 50%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: tierColor
            ? `radial-gradient(ellipse 60% 100% at 0% 50%, ${tierColor}08 0%, transparent 60%)`
            : 'radial-gradient(ellipse 60% 100% at 0% 50%, rgba(78,154,245,0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        {/* Profile icon */}
        <div className="relative shrink-0 self-start">
          <div className="relative h-[88px] w-[88px] overflow-hidden rounded-xl border-2 border-[#1A2840] shadow-lg">
            <Image
              src={ddragon.profileIcon(summoner.profileIconId)}
              alt={`${account.gameName}'s profile icon`}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </div>
          {/* Level pill */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#1A2840] bg-[#070B13] px-2.5 py-0.5 font-display text-[11px] font-semibold text-[#8BA4BE] nums">
            Lv.{summoner.summonerLevel}
          </div>
        </div>

        {/* Player info */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl" style={{ textWrap: 'balance' }}>
              {account.gameName}
            </h1>
            <span className="rounded-lg bg-[#162032] px-2.5 py-1 font-display text-sm font-semibold text-[#4E9AF5]">
              #{account.tagLine}
            </span>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1A2840] bg-[#0C1220] px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wider text-[#8BA4BE]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4E9AF5]/60" aria-hidden="true" />
              {region.toUpperCase()}
            </span>

            {soloRanked && (
              <span
                className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-display text-xs font-bold uppercase tracking-wider"
                style={{
                  color: tierColor!,
                  borderColor: `${tierColor}30`,
                  backgroundColor: `${tierColor}10`,
                }}
              >
                {getRankDisplay(soloRanked.tier, soloRanked.rank)}
                <span className="opacity-60 nums">·</span>
                <span className="nums">{soloRanked.leaguePoints} LP</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
