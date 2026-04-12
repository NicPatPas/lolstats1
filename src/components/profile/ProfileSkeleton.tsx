import { Skeleton } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Profile header skeleton */}
      <div className="rounded-2xl border border-[#1E2D42] bg-[#0F1724] p-6">
        <div className="flex gap-5">
          <Skeleton className="h-24 w-24 rounded-xl bg-[#1A2840]" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-8 w-48 rounded-lg bg-[#1A2840]" />
            <Skeleton className="h-5 w-32 rounded-lg bg-[#1A2840]" />
            <Skeleton className="h-5 w-24 rounded-lg bg-[#1A2840]" />
          </div>
        </div>
      </div>

      {/* Ranked cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-[#1E2D42] bg-[#0F1724] p-5"
          >
            <Skeleton className="mb-4 h-4 w-32 rounded bg-[#1A2840]" />
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-14 w-14 rounded-full bg-[#1A2840]" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-6 w-24 rounded bg-[#1A2840]" />
                <Skeleton className="h-4 w-16 rounded bg-[#1A2840]" />
              </div>
            </div>
            <Skeleton className="h-1.5 w-full rounded-full bg-[#1A2840]" />
            <Skeleton className="mt-2 h-4 w-28 rounded bg-[#1A2840]" />
          </div>
        ))}
      </div>

      {/* Match history skeleton */}
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-[#1E2D42] bg-[#0F1724] p-4"
          >
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-lg bg-[#1A2840]" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-24 rounded bg-[#1A2840]" />
                <Skeleton className="h-4 w-16 rounded bg-[#1A2840]" />
              </div>
              <Skeleton className="h-10 w-20 rounded bg-[#1A2840]" />
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-8 w-8 rounded bg-[#1A2840]" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
