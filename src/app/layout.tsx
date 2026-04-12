import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'LOLStats — League of Legends Stats',
    template: '%s | LOLStats',
  },
  description:
    'Track your League of Legends stats, ranked performance, and match history. A premium OP.GG alternative.',
  keywords: ['league of legends', 'lol stats', 'op.gg', 'summoner stats', 'match history'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#0A0F1A] text-[#E8EEF6] antialiased">
        <TooltipProvider delay={300}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
