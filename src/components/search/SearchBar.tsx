'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown } from 'lucide-react'
import { REGIONS } from '@/lib/riot/regions'
import { buildProfileUrl } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('NA')
  const [error, setError] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const trimmed = query.trim()
    if (!trimmed) {
      setError('Enter a Summoner name')
      return
    }

    const hashIndex = trimmed.lastIndexOf('#')
    if (hashIndex === -1) {
      setError('Include your tag: GameName#TAG')
      return
    }

    const gameName = trimmed.slice(0, hashIndex).trim()
    const tagLine = trimmed.slice(hashIndex + 1).trim()

    if (!gameName) {
      setError('Game name cannot be empty')
      return
    }
    if (!tagLine) {
      setError('Tag cannot be empty')
      return
    }

    router.push(buildProfileUrl(region, gameName, tagLine))
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        <div className="flex overflow-hidden rounded-xl border border-[#1E2D42] bg-[#0F1724] shadow-2xl shadow-black/50 focus-within:border-[#4E9AF5] transition-colors">
          {/* Region selector */}
          <Select value={region} onValueChange={(v) => v && setRegion(v)}>
            <SelectTrigger className="w-[90px] shrink-0 rounded-none border-0 border-r border-[#1E2D42] bg-transparent px-3 text-sm font-medium text-[#8899AA] focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#1E2D42] bg-[#0F1724]">
              {REGIONS.map((r) => (
                <SelectItem
                  key={r.id}
                  value={r.id}
                  className="text-white focus:bg-[#1A2840] focus:text-white"
                >
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Input */}
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-4 h-5 w-5 text-[#4A6080]" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                if (error) setError('')
              }}
              placeholder="GameName#TAG"
              autoFocus
              className="w-full bg-transparent py-4 pl-12 pr-4 text-base text-white placeholder-[#4A6080] outline-none"
            />
          </div>

          {/* Search button */}
          <button
            type="submit"
            className="shrink-0 bg-[#4E9AF5] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#3D87E0] active:bg-[#2E74CD]"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 px-1">{error}</p>
        )}
      </form>

      <p className="mt-3 text-sm text-[#4A6080]">
        Search by Riot ID — e.g. <span className="text-[#8899AA]">Faker#KR1</span>
      </p>
    </div>
  )
}
