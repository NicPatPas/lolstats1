'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { REGIONS } from '@/lib/riot/regions'
import { buildProfileUrl } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('EUW')
  const [error, setError] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = query.trim()
    if (!trimmed) { setError('Enter a Summoner name'); return }

    const hashIndex = trimmed.lastIndexOf('#')
    if (hashIndex === -1) { setError('Include your tag — e.g. Faker#KR1'); return }

    const gameName = trimmed.slice(0, hashIndex).trim()
    const tagLine  = trimmed.slice(hashIndex + 1).trim()

    if (!gameName) { setError('Game name cannot be empty'); return }
    if (!tagLine)  { setError('Tag cannot be empty'); return }

    router.push(buildProfileUrl(region, gameName, tagLine))
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} role="search" aria-label="Search for a League of Legends player">
        <div
          className={`flex overflow-hidden rounded-2xl border bg-[#0C1220] shadow-2xl shadow-black/60 transition-colors duration-200 focus-within:border-[#4E9AF5]/60 ${error ? 'border-[#F87171]/50' : 'border-[#1A2840]'}`}
        >
          {/* Region */}
          <div className="relative flex shrink-0 items-stretch border-r border-[#1A2840]">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              aria-label="Select region"
              className="h-full w-[86px] appearance-none bg-transparent pl-3 pr-7 font-display text-sm font-semibold text-[#8BA4BE] outline-none cursor-pointer"
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id} className="bg-[#0C1220] text-white">
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#435669]" aria-hidden="true" />
          </div>

          {/* Input */}
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-4 h-4 w-4 text-[#435669]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (error) setError('') }}
              placeholder="GameName#TAG"
              autoFocus
              autoComplete="off"
              spellCheck={false}
              aria-label="Summoner name and tag"
              aria-describedby={error ? 'search-error' : undefined}
              className="w-full bg-transparent py-4 pl-11 pr-4 text-base text-white placeholder-[#435669] outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            aria-label="Search"
            className="flex shrink-0 items-center gap-2 bg-[#4E9AF5] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3D87E0] active:bg-[#2E74CD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60"
          >
            <span className="hidden sm:inline">Search</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {error && (
          <p id="search-error" role="alert" aria-live="polite" className="mt-2.5 px-1 text-sm text-[#F87171]">
            {error}
          </p>
        )}
      </form>

      <p className="mt-3 text-center text-xs text-[#435669]">
        Search by Riot&nbsp;ID&nbsp;—&nbsp;e.g.{' '}
        <span className="font-medium text-[#8BA4BE]">Faker#KR1</span>
      </p>
    </div>
  )
}
