import { useEffect, useState } from 'react'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function ScoreRing({ value, label, tone }: { value: number; label: string; tone: string }) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    // Always start from 0 for a fresh animation
    setAnimatedValue(0)

    if (value === 0) return

    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(progress)
      setAnimatedValue(Math.round(eased * value))
      if (progress < 1) {
        window.requestAnimationFrame(tick)
      }
    }

    // Small delay to ensure the 0-state renders first
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(tick)
    }, 50)

    return () => window.clearTimeout(timer)
  }, [value])

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative flex h-28 w-28 items-center justify-center rounded-full transition-[background] duration-100"
        style={{ background: `conic-gradient(${tone} ${animatedValue}%, rgba(15,23,42,0.08) 0)` }}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-900">
          {animatedValue}%
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-600">{label}</p>
    </div>
  )
}
