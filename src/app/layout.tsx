import type { Metadata, Viewport } from 'next'
import { Chakra_Petch, Outfit } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const chakraPetch = Chakra_Petch({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
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

export const viewport: Viewport = {
  themeColor: '#070B13',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${outfit.variable} dark`}
      style={{ colorScheme: 'dark' }}
    >
      <head>
        <link rel="preconnect" href="https://ddragon.leagueoflegends.com" />
      </head>
      <body className="min-h-screen bg-[#070B13] font-body text-[#EEF4FF] antialiased">
        <TooltipProvider delay={300}>{children}</TooltipProvider>
      </body>
    </html>
  )
}
