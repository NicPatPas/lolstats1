'use client'

import { useState, useMemo } from 'react'
import { InboxIcon } from 'lucide-react'
import { MatchCard } from './MatchCard'
import { MatchFilters } from './MatchFilters'
import type { ProcessedMatch } from '@/types/riot'

interface MatchHistoryProps {
  matches: ProcessedMatch[]
  puuid: string
  region: string
}

export function MatchHistory({ matches, puuid, region }: MatchHistoryProps) {
  const [queue, setQueue] = useState('all')
  const [result, setResult] = useState('all')

  const filtered = useMemo(() => {
    return matches.filter((m) => {
      if (queue !== 'all' && String(m.queueId) !== queue) return false
      if (result === 'win' && !m.win) return false
      if (result === 'loss' && m.win) return false
      return true
    })
  }, [matches, queue, result])

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-[#1E2D42] border-dashed bg-[#0F1724]/50 py-16">
        <InboxIcon className="h-10 w-10 text-[#2A3D56]" />
        <div className="text-center">
          <p className="font-medium text-[#4A6080]">No recent matches</p>
          <p className="text-sm text-[#2A3D56] mt-1">
            Play a game to see your match history here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <MatchFilters
        queue={queue}
        result={result}
        onQueueChange={setQueue}
        onResultChange={setResult}
      />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-[#1E2D42] border-dashed bg-[#0F1724]/50 py-12">
          <p className="text-sm text-[#4A6080]">No matches match the current filters</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((match) => (
            <MatchCard key={match.matchId} match={match} puuid={puuid} region={region} />
          ))}
        </div>
      )}
    </div>
  )
}
