import { Header } from '@/components/layout/Header'
import { ProfileSkeleton } from '@/components/profile/ProfileSkeleton'

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0A0F1A]">
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
        <ProfileSkeleton />
      </main>
    </div>
  )
}
