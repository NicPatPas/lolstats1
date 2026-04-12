'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn, formatKDA, formatDuration, timeAgo } from '@/lib/utils'
import { ddragon } from '@/lib/ddragon'
import { MatchDetailPanel } from './MatchDetailPanel'
import type { ProcessedMatch } from '@/types/riot'

interface MatchCardProps {
  match: ProcessedMatch
  puuid: string
  region: string
}

export function MatchCard({ match, puuid, region }: MatchCardProps) {
  const [expanded, setExpanded] = useState(false)

  const isWin = match.win
  const kda = formatKDA(match.kills, match.deaths, match.assists)
  const cs = match.totalMinionsKilled + match.neutralMinionsKilled
  const csPerMin = ((cs / match.gameDuration) * 60).toFixed(1)

  const allies = match.participants.filter((p) => p.teamId === match.teamId && p.puuid !== puuid)
  const enemies = match.participants.filter((p) => p.teamId !== match.teamId)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border transition-colors',
        isWin
          ? 'border-[#1E3A2F] bg-[#0B1F18]'
          : 'border-[#3A1E1E] bg-[#1F0B0B]',
        expanded && (isWin ? 'border-[#2A5040]' : 'border-[#502A2A]'),
      )}
    >
      {/* Win/Loss accent bar */}
      <div
        className={cn(
          'absolute left-0 top-0 h-full w-1',
          isWin ? 'bg-[#3D9A6A]' : 'bg-[#C45252]',
        )}
      />

      {/* Clickable summary row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 py-3 pl-4 pr-3 text-left transition-colors sm:gap-4 sm:pl-5',
          isWin ? 'hover:bg-[#3D9A6A]/5' : 'hover:bg-[#C45252]/5',
        )}
        aria-expanded={expanded}
      >
        {/* Result + Queue + Time */}
        <div className="flex w-16 shrink-0 flex-col items-start gap-0.5">
          <span
            className={cn(
              'text-sm font-bold',
              isWin ? 'text-[#3D9A6A]' : 'text-[#C45252]',
            )}
          >
            {isWin ? 'Victory' : 'Defeat'}
          </span>
          <span className="text-xs text-[#4A6080]">{match.queueType}</span>
          <span className="text-xs text-[#4A6080]">{timeAgo(match.gameCreation)}</span>
          <span className="text-xs text-[#4A6080]">{formatDuration(match.gameDuration)}</span>
        </div>

        {/* Champion icon + spells + rune */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-[#1E2D42]">
            <Image
              src={ddragon.championSquare(match.championName)}
              alt={match.championName}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute bottom-0 right-0 rounded-tl-md bg-black/80 px-1 text-[9px] font-bold text-white">
              {match.champLevel}
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <SpellIcon spellId={match.summoner1Id} size={20} />
            <SpellIcon spellId={match.summoner2Id} size={20} />
          </div>

          <div className="flex flex-col gap-0.5">
            <RuneIcon runeId={match.primaryRuneId} size={20} />
            <div className="h-5 w-5 rounded overflow-hidden bg-[#1A2840] border border-[#1E2D42]" />
          </div>
        </div>

        {/* KDA */}
        <div className="flex w-24 shrink-0 flex-col items-center gap-0.5">
          <p className="text-base font-bold text-white">
            <span className="text-[#4E9AF5]">{match.kills}</span>
            <span className="text-[#4A6080]"> / </span>
            <span className="text-[#C45252]">{match.deaths}</span>
            <span className="text-[#4A6080]"> / </span>
            <span className="text-[#3D9A6A]">{match.assists}</span>
          </p>
          <p
            className={cn(
              'text-xs font-semibold',
              kda === 'Perfect' ? 'text-[#C89B3C]' : 'text-[#8899AA]',
            )}
          >
            {kda === 'Perfect' ? 'Perfect KDA' : `${kda} KDA`}
          </p>
          <p className="text-xs text-[#4A6080]">
            {cs} CS <span className="text-[#4A6080]/60">({csPerMin}/m)</span>
          </p>
        </div>

        {/* Items */}
        <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-[180px]">
          {match.items.slice(0, 6).map((itemId, i) => (
            <ItemIcon key={i} itemId={itemId} />
          ))}
          <ItemIcon itemId={match.items[6]} isTrinket />
        </div>

        {/* Participants mini */}
        <div className="hidden lg:flex flex-col gap-1">
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {allies.slice(0, 4).map((p, i) => (
              <span
                key={i}
                onClick={(e) => e.stopPropagation()}
                className="contents"
              >
                <a
                  href={`/player/${region}/${encodeURIComponent(p.gameName)}/${encodeURIComponent(p.tagLine)}`}
                  className="flex items-center gap-1 text-xs text-[#6B7A8E] hover:text-[#8899AA] transition-colors"
                >
                  <ParticipantChampIcon championName={p.championName} size={14} />
                  <span className="max-w-[60px] truncate">{p.gameName}</span>
                </a>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {enemies.slice(0, 4).map((p, i) => (
              <span
                key={i}
                onClick={(e) => e.stopPropagation()}
                className="contents"
              >
                <a
                  href={`/player/${region}/${encodeURIComponent(p.gameName)}/${encodeURIComponent(p.tagLine)}`}
                  className="flex items-center gap-1 text-xs text-[#6B7A8E] hover:text-[#8899AA] transition-colors"
                >
                  <ParticipantChampIcon championName={p.championName} size={14} />
                  <span className="max-w-[60px] truncate">{p.gameName}</span>
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* Expand chevron */}
        <div className="ml-auto shrink-0 pl-2">
          <ChevronDown
            className={cn(
              'h-4 w-4 text-[#4A6080] transition-transform duration-200',
              expanded && 'rotate-180',
            )}
          />
        </div>
      </button>

      {/* Expandable detail panel — smooth CSS grid animation */}
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <MatchDetailPanel match={match} viewerPuuid={puuid} region={region} />
        </div>
      </div>
    </div>
  )
}

function ItemIcon({ itemId, isTrinket = false }: { itemId: number; isTrinket?: boolean }) {
  const src = ddragon.item(itemId)
  return (
    <div
      className={cn(
        'relative h-8 w-8 overflow-hidden rounded border border-[#1E2D42] bg-[#0A0F1A]',
        isTrinket && 'rounded-full',
      )}
    >
      {src && (
        <Image src={src} alt="" fill className="object-cover" unoptimized />
      )}
    </div>
  )
}

function SpellIcon({ spellId, size }: { spellId: number; size: number }) {
  const src = ddragon.summonerSpell(spellId)
  return (
    <div
      className="overflow-hidden rounded border border-[#1E2D42] bg-[#0A0F1A]"
      style={{ width: size, height: size }}
    >
      {src && (
        <Image src={src} alt="" width={size} height={size} unoptimized />
      )}
    </div>
  )
}

function RuneIcon({ runeId, size }: { runeId: number; size: number }) {
  const src = ddragon.runeIcon(runeId)
  return (
    <div
      className="overflow-hidden rounded-full bg-[#0A0F1A]"
      style={{ width: size, height: size }}
    >
      {src && (
        <Image src={src} alt="" width={size} height={size} unoptimized />
      )}
    </div>
  )
}

function ParticipantChampIcon({ championName, size }: { championName: string; size: number }) {
  return (
    <div className="overflow-hidden rounded-sm" style={{ width: size, height: size }}>
      <Image
        src={ddragon.championSquare(championName)}
        alt={championName}
        width={size}
        height={size}
        className="object-cover"
        unoptimized
      />
    </div>
  )
}
