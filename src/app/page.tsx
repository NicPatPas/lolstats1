import type { Metadata } from 'next'
import { SearchBar } from '@/components/search/SearchBar'
import { BarChart2, Zap, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LOLStats — League of Legends Stats Tracker',
}

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Ranked Stats',
    description: 'Solo/Duo, Flex rankings with LP, win rate and series tracker',
  },
  {
    icon: Zap,
    title: 'Match History',
    description: 'Recent games with KDA, items, CS, champion and more',
  },
  {
    icon: Shield,
    title: 'All Regions',
    description: 'NA, EUW, KR, and 13 more regions supported',
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
        {/* Brand */}
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-[#4E9AF5]/20 bg-[#4E9AF5]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#4E9AF5]">
            League of Legends
          </div>

          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="text-[#4E9AF5]">LOL</span>Stats
          </h1>

          <p className="max-w-md text-base text-[#8899AA] sm:text-lg">
            Your premium League of Legends stats tracker.
            Search any summoner, any region — instantly.
          </p>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Feature cards */}
        <div className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-xl border border-[#1E2D42] bg-[#0F1724] p-5 transition-colors hover:border-[#2A3D56]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#4E9AF5]/10">
                  <Icon className="h-5 w-5 text-[#4E9AF5]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-[#4A6080]">{f.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1E2D42] py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center">
          <p className="text-xs text-[#2A3D56]">
            LOLStats is not affiliated with Riot Games. Data provided by the Riot Games API.
          </p>
          <p className="text-xs text-[#2A3D56]">
            &ldquo;League of Legends&rdquo; is a trademark of Riot Games, Inc.
          </p>
        </div>
      </footer>
    </div>
  )
}
