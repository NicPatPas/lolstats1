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
  const kda    = formatKDA(match.kills, match.deaths, match.assists)
  const cs     = match.totalMinionsKilled + match.neutralMinionsKilled
  const csPerMin = ((cs / match.gameDuration) * 60).toFixed(1)

  const allies  = match.participants.filter((p) => p.teamId === match.teamId && p.puuid !== puuid)
  const enemies = match.participants.filter((p) => p.teamId !== match.teamId)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border transition-colors',
        isWin
          ? ['border-[#1A3328] bg-[#091A13]', expanded && 'border-[#244D3A]']
          : ['border-[#351A1A] bg-[#180909]', expanded && 'border-[#4D2424]'],
      )}
    >
      {/* Left accent bar */}
      <div
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{ background: isWin ? 'var(--win)' : 'var(--loss)' }}
        aria-hidden="true"
      />

      {/* Summary row — clickable */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-label={`${isWin ? 'Victory' : 'Defeat'} with ${match.championName} — click to ${expanded ? 'collapse' : 'expand'} details`}
        className={cn(
          'flex w-full cursor-pointer items-center gap-3 py-3 pl-5 pr-3 text-left transition-colors sm:gap-4',
          isWin ? 'hover:bg-white/[0.02]' : 'hover:bg-white/[0.02]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E9AF5] focus-visible:outline-offset-[-2px]',
        )}
      >
        {/* Result / Queue / Time */}
        <div className="flex w-[68px] shrink-0 flex-col gap-0.5">
          <span className="font-display text-sm font-bold" style={{ color: isWin ? 'var(--win)' : 'var(--loss)' }}>
            {isWin ? 'Victory' : 'Defeat'}
          </span>
          <span className="text-[11px] text-[#435669]">{match.queueType}</span>
          <span className="text-[11px] text-[#435669]">{timeAgo(match.gameCreation)}</span>
          <span className="text-[11px] text-[#435669] nums">{formatDuration(match.gameDuration)}</span>
        </div>

        {/* Champion + spells + rune */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg border border-black/40">
            <Image src={ddragon.championSquare(match.championName)} alt={match.championName} fill className="object-cover" unoptimized />
            <div className="absolute bottom-0 right-0 rounded-tl bg-black/75 px-1 font-display text-[9px] font-bold text-white leading-tight nums">
              {match.champLevel}
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <SpellIcon spellId={match.summoner1Id} size={20} />
            <SpellIcon spellId={match.summoner2Id} size={20} />
          </div>
          <div className="flex flex-col gap-0.5">
            <RuneIcon runeId={match.primaryRuneId} size={20} />
            <div className="h-5 w-5 rounded overflow-hidden bg-black/30 border border-white/5" />
          </div>
        </div>

        {/* KDA */}
        <div className="flex w-[100px] shrink-0 flex-col items-center gap-0.5">
          <p className="font-display text-base font-bold leading-none nums">
            <span className="text-[#60A5FA]">{match.kills}</span>
            <span className="text-[#435669]"> / </span>
            <span style={{ color: 'var(--loss)' }}>{match.deaths}</span>
            <span className="text-[#435669]"> / </span>
            <span style={{ color: 'var(--win)' }}>{match.assists}</span>
          </p>
          <p className={cn('mt-0.5 font-display text-[11px] font-semibold nums', kda === 'Perfect' ? 'text-[var(--gold)]' : 'text-[#8BA4BE]')}>
            {kda === 'Perfect' ? 'Perfect' : `${kda} KDA`}
          </p>
          <p className="text-[11px] text-[#435669] nums">
            {cs} CS <span className="opacity-50">({csPerMin}/m)</span>
          </p>
        </div>

        {/* Items */}
        <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-[188px]">
          {match.items.slice(0, 6).map((id, i) => <ItemIcon key={i} itemId={id} />)}
          <ItemIcon itemId={match.items[6]} isTrinket />
        </div>

        {/* Mini participant list */}
        <div className="hidden lg:flex flex-col gap-1 ml-auto min-w-0">
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {allies.slice(0, 4).map((p, i) => (
              <span key={i} className="contents" onClick={(e) => e.stopPropagation()}>
                <a href={`/player/${region}/${encodeURIComponent(p.gameName)}/${encodeURIComponent(p.tagLine)}`}
                  className="flex items-center gap-1 text-[11px] text-[#435669] transition-colors hover:text-[#8BA4BE]">
                  <ParticipantChampIcon championName={p.championName} size={14} />
                  <span className="max-w-[58px] truncate">{p.gameName}</span>
                </a>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-0.5">
            {enemies.slice(0, 4).map((p, i) => (
              <span key={i} className="contents" onClick={(e) => e.stopPropagation()}>
                <a href={`/player/${region}/${encodeURIComponent(p.gameName)}/${encodeURIComponent(p.tagLine)}`}
                  className="flex items-center gap-1 text-[11px] text-[#435669] transition-colors hover:text-[#8BA4BE]">
                  <ParticipantChampIcon championName={p.championName} size={14} />
                  <span className="max-w-[58px] truncate">{p.gameName}</span>
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* Expand chevron */}
        <div className="ml-auto shrink-0 pl-2">
          <ChevronDown
            className={cn('h-4 w-4 text-[#435669] transition-transform duration-200', expanded && 'rotate-180')}
            aria-hidden="true"
          />
        </div>
      </button>

      {/* Expandable detail */}
      <div className={cn('grid transition-[grid-template-rows] duration-300 ease-in-out', expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
        <div className="overflow-hidden">
          <MatchDetailPanel match={match} viewerPuuid={puuid} region={region} />
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function ItemIcon({ itemId, isTrinket = false }: { itemId: number; isTrinket?: boolean }) {
  const src = ddragon.item(itemId)
  return (
    <div className={cn('relative h-8 w-8 overflow-hidden border border-black/30 bg-black/30', isTrinket ? 'rounded-full' : 'rounded')}>
      {src && <Image src={src} alt="" fill className="object-cover" unoptimized />}
    </div>
  )
}

function SpellIcon({ spellId, size }: { spellId: number; size: number }) {
  const src = ddragon.summonerSpell(spellId)
  return (
    <div className="overflow-hidden rounded border border-black/30 bg-black/30" style={{ width: size, height: size }}>
      {src && <Image src={src} alt="" width={size} height={size} unoptimized />}
    </div>
  )
}

function RuneIcon({ runeId, size }: { runeId: number; size: number }) {
  const src = ddragon.runeIcon(runeId)
  return (
    <div className="overflow-hidden rounded-full bg-black/30" style={{ width: size, height: size }}>
      {src && <Image src={src} alt="" width={size} height={size} unoptimized />}
    </div>
  )
}

function ParticipantChampIcon({ championName, size }: { championName: string; size: number }) {
  return (
    <div className="overflow-hidden rounded-sm" style={{ width: size, height: size }}>
      <Image src={ddragon.championSquare(championName)} alt={championName} width={size} height={size} className="object-cover" unoptimized />
    </div>
  )
}
