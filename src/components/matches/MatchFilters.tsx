'use client'

import { cn } from '@/lib/utils'

interface MatchFiltersProps {
  queue: string
  result: string
  onQueueChange: (queue: string) => void
  onResultChange: (result: string) => void
}

const QUEUE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: '420', label: 'Solo/Duo' },
  { value: '440', label: 'Flex' },
  { value: '400', label: 'Normal' },
  { value: '450', label: 'ARAM' },
]

const RESULT_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'win', label: 'Win' },
  { value: 'loss', label: 'Loss' },
]

export function MatchFilters({ queue, result, onQueueChange, onResultChange }: MatchFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Queue filter */}
      <div className="flex items-center rounded-lg border border-[#1E2D42] bg-[#0F1724] p-0.5">
        {QUEUE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onQueueChange(opt.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              queue === opt.value
                ? 'bg-[#1A2840] text-white'
                : 'text-[#4A6080] hover:text-[#8899AA]',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Result filter */}
      <div className="flex items-center rounded-lg border border-[#1E2D42] bg-[#0F1724] p-0.5">
        {RESULT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onResultChange(opt.value)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              result === opt.value
                ? 'bg-[#1A2840] text-white'
                : opt.value === 'win' && result === 'win'
                  ? 'text-[#3D9A6A]'
                  : opt.value === 'loss' && result === 'loss'
                    ? 'text-[#C45252]'
                    : 'text-[#4A6080] hover:text-[#8899AA]',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
