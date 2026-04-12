import Link from 'next/link'
import { AlertCircle, Search, WifiOff } from 'lucide-react'

interface ErrorStateProps {
  type: 'not_found' | 'api_error' | 'rate_limit' | 'generic'
  message?: string
}

const ERROR_CONFIG = {
  not_found: {
    icon: Search,
    title: 'Player not found',
    description: 'Check the summoner name and tagline, then try again.',
    iconClass: 'text-[#4A6080]',
  },
  rate_limit: {
    icon: AlertCircle,
    title: 'Rate limit reached',
    description: 'The API is temporarily limited. Please wait a moment and try again.',
    iconClass: 'text-yellow-500',
  },
  api_error: {
    icon: WifiOff,
    title: 'Service unavailable',
    description: 'Riot API is temporarily unavailable. Please try again shortly.',
    iconClass: 'text-red-400',
  },
  generic: {
    icon: AlertCircle,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    iconClass: 'text-red-400',
  },
}

export function ErrorState({ type, message }: ErrorStateProps) {
  const config = ERROR_CONFIG[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-[#1E2D42] bg-[#0F1724] py-16 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#131E2E]">
        <Icon className={`h-8 w-8 ${config.iconClass}`} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white">{config.title}</h2>
        <p className="mt-1.5 text-sm text-[#4A6080] max-w-sm">
          {message ?? config.description}
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-[#1A2840] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#253650]"
      >
        Back to search
      </Link>
    </div>
  )
}
