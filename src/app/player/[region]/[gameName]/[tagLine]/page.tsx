import type { Metadata } from 'next'
import { getAccountByRiotId } from '@/lib/riot/account'
import { getSummonerByPuuid } from '@/lib/riot/summoner'
import { getRankedBySummonerId } from '@/lib/riot/ranked'
import { getMatchesByPuuid, processMatch } from '@/lib/riot/matches'
import { getRegion } from '@/lib/riot/regions'
import { RiotAPIError } from '@/lib/riot/client'
import { Header } from '@/components/layout/Header'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { RankedCard, NoRankedCard } from '@/components/profile/RankedCard'
import { ChampionStats } from '@/components/profile/ChampionStats'
import { MatchHistory } from '@/components/matches/MatchHistory'
import { ErrorState } from '@/components/common/ErrorState'
import type { PlayerProfile } from '@/types/riot'

interface PageParams {
  region: string
  gameName: string
  tagLine: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { gameName, tagLine, region } = await params
  const name = `${decodeURIComponent(gameName)}#${decodeURIComponent(tagLine)}`
  return {
    title: `${name} — ${region.toUpperCase()} — LOLStats`,
    description: `View ${name}'s League of Legends ranked stats and match history on LOLStats.`,
  }
}

interface FetchResult {
  profile?: PlayerProfile
  matches?: ReturnType<typeof processMatch>[]
  error?: { type: 'not_found' | 'rate_limit' | 'api_error' | 'generic'; message?: string }
}

async function fetchPlayerData(
  region: string,
  gameName: string,
  tagLine: string,
): Promise<FetchResult> {
  const decodedName = decodeURIComponent(gameName)
  const decodedTag = decodeURIComponent(tagLine)

  const regionData = getRegion(region)
  if (!regionData) {
    return { error: { type: 'generic', message: 'Invalid region specified.' } }
  }

  try {
    const account = await getAccountByRiotId(decodedName, decodedTag, regionData.regional)
    const summoner = await getSummonerByPuuid(account.puuid, regionData.platform)
    const rankedEntries = await getRankedBySummonerId(summoner.id, regionData.platform).catch(() => [])

    const profile: PlayerProfile = { account, summoner, rankedData: rankedEntries }

    const rawMatches = await getMatchesByPuuid(account.puuid, regionData.regional, {
      count: 20,
    }).catch(() => [])

    const matches = rawMatches.map((m) => processMatch(m, account.puuid))

    return { profile, matches }
  } catch (err) {
    if (err instanceof RiotAPIError) {
      if (err.status === 404) return { error: { type: 'not_found' } }
      if (err.status === 429) return { error: { type: 'rate_limit', message: err.message } }
      if (err.status >= 500) return { error: { type: 'api_error', message: err.message } }
      return { error: { type: 'generic', message: err.message } }
    }
    return { error: { type: 'generic' } }
  }
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { region, gameName, tagLine } = await params
  const result = await fetchPlayerData(region, gameName, tagLine)

  const rankedPriority = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'] as const

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F1A]">
      <Header />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        {result.error ? (
          <div className="py-12">
            <ErrorState type={result.error.type} message={result.error.message} />
          </div>
        ) : result.profile ? (
          <div className="flex flex-col gap-6">
            {/* Profile header */}
            <ProfileHeader profile={result.profile} region={region} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
              {/* Left sidebar — Ranked cards */}
              <aside className="flex flex-col gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#4A6080]">
                  Ranked
                </h2>

                {result.profile.rankedData.length === 0 ? (
                  <NoRankedCard />
                ) : (
                  <>
                    {rankedPriority.map((queueType) => {
                      const entry = result.profile!.rankedData.find(
                        (r) => r.queueType === queueType,
                      )
                      return entry ? (
                        <RankedCard key={queueType} entry={entry} />
                      ) : null
                    })}
                    {result.profile.rankedData
                      .filter((r) => !rankedPriority.includes(r.queueType as typeof rankedPriority[number]))
                      .map((entry) => (
                        <RankedCard key={entry.queueType} entry={entry} />
                      ))}
                  </>
                )}

                {/* Champion performance summary */}
                {(result.matches?.length ?? 0) > 0 && (
                  <ChampionStats matches={result.matches!} />
                )}
              </aside>

              {/* Main content — Match history */}
              <div className="flex flex-col gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#4A6080]">
                  Match History
                </h2>
                <MatchHistory
                  matches={result.matches ?? []}
                  puuid={result.profile.account.puuid}
                  region={region}
                />
              </div>
            </div>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-[#1E2D42] py-4">
        <p className="text-center text-xs text-[#2A3D56]">
          LOLStats is not affiliated with Riot Games.
        </p>
      </footer>
    </div>
  )
}
