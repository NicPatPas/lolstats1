import Image from 'next/image'
import { Shield } from 'lucide-react'
import { ddragon, TIER_COLORS } from '@/lib/ddragon'
import { getRankDisplay } from '@/lib/utils'
import type { PlayerProfile } from '@/types/riot'

interface ProfileHeaderProps {
  profile: PlayerProfile
  region: string
}

export function ProfileHeader({ profile, region }: ProfileHeaderProps) {
  const { account, summoner } = profile
  const soloRanked = profile.rankedData.find(
    (r) => r.queueType === 'RANKED_SOLO_5x5',
  )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1E2D42] bg-[#0F1724]">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4E9AF5]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-start">
        {/* Profile Icon */}
        <div className="relative shrink-0">
          <div className="relative h-20 w-20 overflow-hidden rounded-xl border-2 border-[#1E2D42] sm:h-24 sm:w-24">
            <Image
              src={ddragon.profileIcon(summoner.profileIconId)}
              alt="Profile Icon"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          {/* Summoner Level Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-[#1E2D42] bg-[#131E2E] px-2 py-0.5 text-xs font-semibold text-[#8899AA]">
            {summoner.summonerLevel}
          </div>
        </div>

        {/* Player Info */}
        <div className="flex flex-1 flex-col gap-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {account.gameName}
            </h1>
            <span className="shrink-0 rounded-md bg-[#1A2840] px-2 py-0.5 text-sm text-[#4E9AF5]">
              #{account.tagLine}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className="inline-flex items-center gap-1 rounded-md bg-[#131E2E] px-2.5 py-1 text-xs font-medium text-[#8899AA] border border-[#1E2D42]">
              <Shield className="h-3 w-3" />
              {region.toUpperCase()}
            </span>
            {soloRanked && (
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: TIER_COLORS[soloRanked.tier] ?? '#8899AA' }}
              >
                {getRankDisplay(soloRanked.tier, soloRanked.rank)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
