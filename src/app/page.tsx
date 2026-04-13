import type { Metadata } from 'next'
import { SearchBar } from '@/components/search/SearchBar'
import { BarChart2, Zap, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'LOLStats — League of Legends Stats Tracker',
}

const FEATURES = [
  {
    num: '01',
    icon: BarChart2,
    title: 'Ranked Stats',
    description: 'Solo/Duo and Flex rankings — LP, win rate, series tracker, and more.',
  },
  {
    num: '02',
    icon: Zap,
    title: 'Match History',
    description: 'Deep match breakdowns — KDA, items, CS, damage, full team stats.',
  },
  {
    num: '03',
    icon: Globe,
    title: 'All Regions',
    description: 'NA, EUW, KR, and 13 more regions — instant results worldwide.',
  },
]

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">

      {/* ── Atmospheric background ─────────────────────────── */}
      {/* Grid lines */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(78,154,245,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(78,154,245,0.035) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
        aria-hidden="true"
      />
      {/* Central glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -translate-x-1/2"
        style={{
          width: '900px',
          height: '500px',
          background:
            'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(78,154,245,0.13) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 h-40"
        style={{ background: 'linear-gradient(to top, #070B13 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-24">

        {/* Badge */}
        <div className="animate-fade-up mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4E9AF5]/25 bg-[#4E9AF5]/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4E9AF5]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4E9AF5] [animation:pulse-glow_2s_ease-in-out_infinite]" aria-hidden="true" />
            League of Legends
          </span>
        </div>

        {/* Brand name */}
        <h1 className="animate-fade-up-1 mb-5 font-display text-[72px] font-bold leading-none tracking-tight sm:text-[96px] lg:text-[120px]">
          <span className="animate-shimmer-text">LOL</span>
          <span className="text-white">Stats</span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-2 mb-10 max-w-sm text-center text-base leading-relaxed text-[#8BA4BE] sm:text-lg">
          Track. Analyze. Dominate.<br />
          <span className="text-[#435669]">Search any summoner, any region — instantly.</span>
        </p>

        {/* Search */}
        <div className="animate-fade-up-3 w-full max-w-xl">
          <SearchBar />
        </div>

        {/* ── Feature cards ─────────────────────────────── */}
        <div className="animate-fade-up-4 mt-20 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-[#1A2840] bg-[#0C1220]/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#243656] hover:bg-[#0E1628]"
              >
                {/* Subtle top-edge highlight on hover */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4E9AF5]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />

                {/* Large ghost number */}
                <span
                  className="pointer-events-none absolute right-3 top-2 font-display text-5xl font-bold text-[#4E9AF5]/6 select-none"
                  aria-hidden="true"
                >
                  {f.num}
                </span>

                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#4E9AF5]/10 ring-1 ring-[#4E9AF5]/20">
                  <Icon className="h-4 w-4 text-[#4E9AF5]" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#435669]">
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="relative border-t border-[#1A2840]/60 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs text-[#2A3D56]">
            LOLStats is not affiliated with Riot Games. Data provided by the Riot Games API.{' '}
            <span className="opacity-50">&ldquo;League of Legends&rdquo; is a trademark of Riot Games, Inc.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
