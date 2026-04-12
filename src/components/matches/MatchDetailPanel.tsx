'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn, formatKDA, formatNumber } from '@/lib/utils'
import { ddragon } from '@/lib/ddragon'
import type { ProcessedMatch, ProcessedParticipant } from '@/types/riot'

interface MatchDetailPanelProps {
  match: ProcessedMatch
  viewerPuuid: string
  region: string
}

export function MatchDetailPanel({ match, viewerPuuid, region }: MatchDetailPanelProps) {
  const { detailParticipants, teamKills } = match

  const blueTeam = detailParticipants.filter((p) => p.teamId === 100)
  const redTeam = detailParticipants.filter((p) => p.teamId === 200)

  // Max damage across all players — used to size damage bars
  const maxDamage = Math.max(...detailParticipants.map((p) => p.totalDamageDealtToChampions), 1)

  const blueWin = blueTeam[0]?.win ?? false
  const redWin = redTeam[0]?.win ?? false

  return (
    <div className="border-t border-[#1E2D42] bg-[#080D16] px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-5">
        {/* Blue Team */}
        <TeamSection
          team={blueTeam}
          teamName="Blue Team"
          isWin={blueWin}
          viewerPuuid={viewerPuuid}
          region={region}
          maxDamage={maxDamage}
          teamKills={teamKills[100] ?? 0}
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-[#1E2D42]" />
          <span className="text-xs font-bold tracking-widest text-[#2A3D56]">VS</span>
          <div className="h-px flex-1 bg-[#1E2D42]" />
        </div>

        {/* Red Team */}
        <TeamSection
          team={redTeam}
          teamName="Red Team"
          isWin={redWin}
          viewerPuuid={viewerPuuid}
          region={region}
          maxDamage={maxDamage}
          teamKills={teamKills[200] ?? 0}
        />
      </div>
    </div>
  )
}

interface TeamSectionProps {
  team: ProcessedParticipant[]
  teamName: string
  isWin: boolean
  viewerPuuid: string
  region: string
  maxDamage: number
  teamKills: number
}

function TeamSection({
  team,
  teamName,
  isWin,
  viewerPuuid,
  region,
  maxDamage,
  teamKills,
}: TeamSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      {/* Team header */}
      <div className="flex items-center gap-2 mb-1">
        <span
          className={cn(
            'text-xs font-bold uppercase tracking-wider',
            isWin ? 'text-[#3D9A6A]' : 'text-[#C45252]',
          )}
        >
          {teamName}
        </span>
        <span
          className={cn(
            'rounded px-1.5 py-0.5 text-[10px] font-semibold',
            isWin
              ? 'bg-[#3D9A6A]/15 text-[#3D9A6A]'
              : 'bg-[#C45252]/15 text-[#C45252]',
          )}
        >
          {isWin ? 'Victory' : 'Defeat'}
        </span>

        {/* Column labels — hidden on small screens */}
        <div className="ml-auto hidden xl:flex items-center gap-0 text-[10px] font-semibold uppercase tracking-wider text-[#2A3D56]">
          <span className="w-[120px] text-center">KDA</span>
          <span className="w-[130px] text-center">Damage</span>
          <span className="w-[44px] text-center">CS</span>
          <span className="w-[44px] text-center">Gold</span>
          <span className="w-[44px] text-center">VS</span>
          <span className="w-[180px] text-center">Items</span>
        </div>
      </div>

      {/* Player rows */}
      <div className="flex flex-col gap-0.5">
        {team.map((p) => (
          <PlayerRow
            key={p.puuid}
            participant={p}
            isViewer={p.puuid === viewerPuuid}
            region={region}
            maxDamage={maxDamage}
            teamKills={teamKills}
          />
        ))}
      </div>
    </div>
  )
}

interface PlayerRowProps {
  participant: ProcessedParticipant
  isViewer: boolean
  region: string
  maxDamage: number
  teamKills: number
}

function PlayerRow({ participant: p, isViewer, region, maxDamage, teamKills }: PlayerRowProps) {
  const cs = p.totalMinionsKilled + p.neutralMinionsKilled
  const kp = teamKills > 0
    ? Math.round(((p.kills + p.assists) / teamKills) * 100)
    : 0
  const damagePercent = maxDamage > 0 ? (p.totalDamageDealtToChampions / maxDamage) * 100 : 0
  const kda = formatKDA(p.kills, p.deaths, p.assists)

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-2.5 py-2 transition-colors',
        isViewer
          ? 'bg-[#4E9AF5]/8 ring-1 ring-[#4E9AF5]/20'
          : 'hover:bg-[#0F1724]',
      )}
    >
      {/* Champion icon + name */}
      <div className="flex min-w-[140px] flex-1 items-center gap-2">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md border border-[#1E2D42]">
          <Image
            src={ddragon.championSquare(p.championName)}
            alt={p.championName}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute bottom-0 right-0 rounded-tl bg-black/80 px-0.5 text-[8px] font-bold text-white leading-tight">
            {p.champLevel}
          </div>
        </div>

        {/* Spells */}
        <div className="flex flex-col gap-0.5 shrink-0">
          <MiniSpellIcon spellId={p.summoner1Id} />
          <MiniSpellIcon spellId={p.summoner2Id} />
        </div>

        {/* Name */}
        <div className="flex min-w-0 flex-col">
          <Link
            href={`/player/${region}/${encodeURIComponent(p.gameName)}/${encodeURIComponent(p.tagLine)}`}
            className={cn(
              'truncate text-xs font-medium leading-tight transition-colors hover:text-white',
              isViewer ? 'text-[#4E9AF5]' : 'text-[#C8D6E5]',
            )}
          >
            {p.gameName}
          </Link>
          <span className="truncate text-[10px] text-[#4A6080]">{p.championName}</span>
        </div>
      </div>

      {/* KDA */}
      <div className="flex w-[115px] shrink-0 flex-col items-center gap-0.5">
        <span className="text-xs font-bold text-white">
          <span className="text-[#4E9AF5]">{p.kills}</span>
          <span className="text-[#4A6080]">/</span>
          <span className="text-[#C45252]">{p.deaths}</span>
          <span className="text-[#4A6080]">/</span>
          <span className="text-[#3D9A6A]">{p.assists}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              'text-[10px] font-medium',
              kda === 'Perfect' ? 'text-[#C89B3C]' : 'text-[#4A6080]',
            )}
          >
            {kda === 'Perfect' ? 'Perfect' : `${kda}`}
          </span>
          <span className="text-[10px] text-[#2A3D56]">·</span>
          <span className="text-[10px] text-[#4A6080]">
            KP <span className="text-[#8899AA]">{kp}%</span>
          </span>
        </div>
      </div>

      {/* Damage bar + number */}
      <div className="flex w-[125px] shrink-0 flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-[#4A6080]">DMG</span>
          <span className="text-[10px] font-medium text-[#8899AA]">
            {formatNumber(p.totalDamageDealtToChampions)}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-[#1A2840]">
          <div
            className="h-full rounded-full bg-[#C45252]"
            style={{ width: `${damagePercent}%` }}
          />
        </div>
      </div>

      {/* CS */}
      <div className="flex w-[40px] shrink-0 flex-col items-center">
        <span className="text-xs font-medium text-[#C8D6E5]">{cs}</span>
        <span className="text-[10px] text-[#4A6080]">CS</span>
      </div>

      {/* Gold */}
      <div className="flex w-[44px] shrink-0 flex-col items-center">
        <span className="text-xs font-medium text-[#C89B3C]">
          {formatNumber(p.goldEarned)}
        </span>
        <span className="text-[10px] text-[#4A6080]">Gold</span>
      </div>

      {/* Vision */}
      <div className="flex w-[36px] shrink-0 flex-col items-center">
        <span className="text-xs font-medium text-[#C8D6E5]">{p.visionScore}</span>
        <span className="text-[10px] text-[#4A6080]">VS</span>
      </div>

      {/* Items */}
      <div className="flex items-center gap-0.5">
        {p.items.slice(0, 6).map((itemId, i) => (
          <MiniItemIcon key={i} itemId={itemId} />
        ))}
        <MiniItemIcon itemId={p.items[6]} isTrinket />
      </div>
    </div>
  )
}

function MiniItemIcon({ itemId, isTrinket = false }: { itemId: number; isTrinket?: boolean }) {
  const src = ddragon.item(itemId)
  return (
    <div
      className={cn(
        'relative h-6 w-6 shrink-0 overflow-hidden border border-[#1E2D42] bg-[#080D16]',
        isTrinket ? 'rounded-full' : 'rounded',
      )}
    >
      {src && (
        <Image src={src} alt="" fill className="object-cover" unoptimized />
      )}
    </div>
  )
}

function MiniSpellIcon({ spellId }: { spellId: number }) {
  const src = ddragon.summonerSpell(spellId)
  return (
    <div className="h-[14px] w-[14px] overflow-hidden rounded border border-[#1E2D42] bg-[#080D16]">
      {src && <Image src={src} alt="" width={14} height={14} unoptimized />}
    </div>
  )
}
