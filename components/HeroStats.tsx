'use client'
import { useEffect, useRef, useState } from 'react'

type Stat = { label: string; from: number; to: number; suffix: string; static?: string }

const STATS: Stat[] = [
  { label: 'Vehicles',  from: 0,    to: 20,   suffix: '+' },
  { label: 'Est.',      from: 2016, to: 2020, suffix: ''  },
  { label: 'Location',  from: 0,    to: 0,    suffix: '',  static: 'Matsapha' },
  { label: 'Response',  from: 0,    to: 0,    suffix: '',  static: '<1 Hour'  },
]

const DURATION = 1400

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

export function HeroStats() {
  const [counts, setCounts] = useState(STATS.map(s => s.from))
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const rafRef     = useRef<number>(0)
  const startRef   = useRef<number | null>(null)
  const triggered  = useRef(false)

  useEffect(() => {
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)')
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || triggered.current) return
      triggered.current = true

      if (pref.matches) {
        setCounts(STATS.map(s => s.to))
        setRevealed(true)
        return
      }

      const loop = (ts: number) => {
        if (startRef.current === null) startRef.current = ts
        const elapsed = ts - startRef.current
        const progress = easeOut(Math.min(elapsed / DURATION, 1))

        setCounts(STATS.map(s => Math.round(s.from + (s.to - s.from) * progress)))

        if (elapsed < DURATION) {
          rafRef.current = requestAnimationFrame(loop)
        } else {
          setCounts(STATS.map(s => s.to))
          setRevealed(true)
        }
      }
      rafRef.current = requestAnimationFrame(loop)
    }, { threshold: 0.5 })

    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => { obs.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <div ref={sectionRef} className="flex flex-wrap justify-center gap-8">
      {STATS.map((s, i) => {
        const display = s.static
          ? (revealed ? s.static : '···')
          : `${counts[i]}${s.suffix}`
        return (
          <div key={s.label} className="text-center">
            <div className="text-xl font-bold mb-0.5 tabular-nums" style={{ color: 'var(--gold)' }}>
              {display}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>
              {s.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}
