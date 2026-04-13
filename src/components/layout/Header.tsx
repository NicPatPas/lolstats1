'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { REGIONS } from '@/lib/riot/regions'
import { buildProfileUrl } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function Header() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('EUW')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    const hashIndex = trimmed.lastIndexOf('#')
    if (hashIndex === -1) return

    const gameName = trimmed.slice(0, hashIndex).trim()
    const tagLine  = trimmed.slice(hashIndex + 1).trim()
    if (!gameName || !tagLine) return

    router.push(buildProfileUrl(region, gameName, tagLine))
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A2840]/80 bg-[#070B13]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-0.5 font-display text-lg font-bold tracking-tight focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E9AF5]">
          <span className="text-[#4E9AF5]">LOL</span>
          <span className="text-white">Stats</span>
        </Link>

        {/* Inline search */}
        <form
          onSubmit={handleSearch}
          className="ml-2 flex flex-1 items-center gap-2"
          role="search"
          aria-label="Search for a player"
        >
          <Select value={region} onValueChange={(v) => v && setRegion(v)}>
            <SelectTrigger
              className="h-8 w-[76px] shrink-0 rounded-lg border-[#1A2840] bg-[#0C1220] font-display text-xs font-semibold text-[#8BA4BE] focus:ring-[#4E9AF5] dark:bg-[#0C1220] dark:hover:bg-[#0C1220]"
              aria-label="Select region"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#1A2840] bg-[#0C1220]">
              {REGIONS.map((r) => (
                <SelectItem key={r.id} value={r.id} className="text-white focus:bg-[#162032] focus:text-white">
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#435669]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="GameName#TAG"
              autoComplete="off"
              spellCheck={false}
              aria-label="Summoner name and tag"
              className="h-8 w-full rounded-lg border border-[#1A2840] bg-[#0C1220] pl-8 pr-8 text-sm text-white placeholder-[#435669] outline-none transition-colors focus:border-[#4E9AF5]/60 focus:ring-1 focus:ring-[#4E9AF5]/30"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-[#435669] transition-colors hover:text-[#4E9AF5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4E9AF5]"
            >
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
    </header>
  )
}
