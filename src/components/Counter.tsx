import { useEffect, useState } from 'react'

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function Counter({ value, className }: { value: number; className?: string }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    // Always reset to 0 before animating
    setDisplay(0)

    if (value === 0) return

    const duration = 1200
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = easeOutCubic(progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        window.requestAnimationFrame(tick)
      }
    }

    // Small delay so the 0 renders first
    const timer = window.setTimeout(() => {
      window.requestAnimationFrame(tick)
    }, 50)

    return () => window.clearTimeout(timer)
  }, [value])

  return <span className={className}>{display}</span>
}
