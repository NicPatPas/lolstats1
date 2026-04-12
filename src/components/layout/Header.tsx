'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'
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
  const [region, setRegion] = useState('NA')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    const hashIndex = trimmed.lastIndexOf('#')
    if (hashIndex === -1) return

    const gameName = trimmed.slice(0, hashIndex).trim()
    const tagLine = trimmed.slice(hashIndex + 1).trim()
    if (!gameName || !tagLine) return

    router.push(buildProfileUrl(region, gameName, tagLine))
    setQuery('')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E2D42] bg-[#0A0F1A]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="text-[#4E9AF5]">LOL</span>
          <span className="text-white">Stats</span>
        </Link>

        <form onSubmit={handleSearch} className="ml-4 flex flex-1 items-center gap-2">
          <Select value={region} onValueChange={(v) => v && setRegion(v)}>
            <SelectTrigger className="w-[80px] shrink-0 border-[#1E2D42] bg-[#0F1724] text-sm text-white focus:ring-[#4E9AF5]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-[#1E2D42] bg-[#0F1724]">
              {REGIONS.map((r) => (
                <SelectItem
                  key={r.id}
                  value={r.id}
                  className="text-white hover:bg-[#1A2840]"
                >
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4A6080]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="GameName#TAG"
              className="w-full rounded-md border border-[#1E2D42] bg-[#0F1724] py-1.5 pl-9 pr-3 text-sm text-white placeholder-[#4A6080] outline-none transition-colors focus:border-[#4E9AF5] focus:ring-1 focus:ring-[#4E9AF5]"
            />
          </div>
        </form>
      </div>
    </header>
  )
}
