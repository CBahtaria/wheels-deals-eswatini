'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getSessionId } from '@/lib/analytics'

type Step = 1 | 2 | 3 | 4 | 'done' | 'hidden'

const IMPROVEMENTS = ['Search & filters', 'More photos', 'Clearer pricing', 'Finance options', 'Compare vehicles', 'Faster loading']

export function SurveyWidget() {
  const [step, setStep] = useState<Step>('hidden')
  const [found, setFound] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [picks, setPicks] = useState<string[]>([])
  const [open, setOpen] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem('wd_survey_done')) return

    let timeoutId: ReturnType<typeof setTimeout>

    // Check periodically if user has viewed ≥2 vehicles
    const intervalId = setInterval(() => {
      const stored = parseInt(localStorage.getItem('wd_view_count') ?? '0', 10)
      if (stored >= 2 && step === 'hidden') {
        setStep(1)
        clearInterval(intervalId)
        clearTimeout(timeoutId)
      }
    }, 3000)

    // Time-based fallback: 90s
    timeoutId = setTimeout(() => {
      if (step === 'hidden') setStep(1)
      clearInterval(intervalId)
    }, 90000)

    return () => { clearInterval(intervalId); clearTimeout(timeoutId) }
  }, [step])

  // Track view count in localStorage for trigger
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handler = () => {
      const count = parseInt(localStorage.getItem('wd_view_count') ?? '0', 10)
      localStorage.setItem('wd_view_count', String(count + 1))
    }
    window.addEventListener('wd_vehicle_viewed', handler)
    return () => window.removeEventListener('wd_vehicle_viewed', handler)
  }, [])

  async function submit() {
    setSubmitting(true)
    const sessionId = getSessionId()
    const device = window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1024 ? 'tablet' : 'desktop'
    await fetch('/api/survey/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, q_found_vehicle: found, q_ease_rating: rating, q_device: device, q_improvements: picks, q_open: open }),
    }).catch(() => {})
    localStorage.setItem('wd_survey_done', '1')
    setStep('done')
    setTimeout(() => setStep('hidden'), 2200)
    setSubmitting(false)
  }

  const cardStyle: React.CSSProperties = {
    position: 'fixed', bottom: '1.5rem', right: '5.5rem', zIndex: 50,
    width: 300, background: 'var(--bg-card)', border: '1px solid var(--border)',
    borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
  }

  return (
    <AnimatePresence>
      {step !== 'hidden' && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          style={cardStyle}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--gold)' }}>Quick feedback</p>
            <button onClick={() => setStep('hidden')} className="text-xs" style={{ color: 'var(--text-subtle)' }}>✕</button>
          </div>

          {step === 'done' && (
            <p className="text-center py-4 font-semibold" style={{ color: 'var(--text)' }}>Thanks! 🙏</p>
          )}

          {step === 1 && (
            <>
              <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>Did you find what you were looking for?</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Found it ✓', 'Still browsing', 'Not yet'].map(opt => (
                  <button key={opt} onClick={() => setFound(opt)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border transition-colors"
                    style={{ background: found === opt ? 'var(--gold)' : 'transparent', color: found === opt ? '#06090f' : 'var(--text-muted)', borderColor: found === opt ? 'var(--gold)' : 'var(--border)' }}>
                    {opt}
                  </button>
                ))}
              </div>
              <button disabled={!found} onClick={() => setStep(2)}
                className="w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-40"
                style={{ background: 'var(--gold)', color: '#06090f' }}>
                Next →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>Rate your experience</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setRating(n)}
                    className="text-xl transition-transform hover:scale-110"
                    style={{ opacity: rating >= n ? 1 : 0.3 }}>
                    ★
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="flex-1 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>← Back</button>
                <button disabled={!rating} onClick={() => setStep(3)} className="flex-1 py-2 rounded-lg text-sm font-semibold disabled:opacity-40" style={{ background: 'var(--gold)', color: '#06090f' }}>Next →</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>What would help most?</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {IMPROVEMENTS.map(imp => {
                  const selected = picks.includes(imp)
                  return (
                    <button key={imp} onClick={() => setPicks(p => selected ? p.filter(x => x !== imp) : [...p, imp])}
                      className="px-2.5 py-1 rounded-full text-[11px] border transition-colors"
                      style={{ background: selected ? 'var(--gold)' : 'transparent', color: selected ? '#06090f' : 'var(--text-muted)', borderColor: selected ? 'var(--gold)' : 'var(--border)' }}>
                      {imp}
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setStep(2)} className="flex-1 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>← Back</button>
                <button onClick={() => setStep(4)} className="flex-1 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--gold)', color: '#06090f' }}>Next →</button>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <p className="text-sm mb-2" style={{ color: 'var(--text)' }}>Anything else? <span style={{ color: 'var(--text-subtle)' }}>(optional)</span></p>
              <textarea value={open} onChange={e => setOpen(e.target.value)} maxLength={200} rows={3} placeholder="Tell us more..."
                className="w-full px-3 py-2 rounded-lg text-sm resize-none mb-3"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
              <div className="flex gap-2">
                <button onClick={() => setStep(3)} className="flex-1 py-2 rounded-lg text-sm border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>← Back</button>
                <button disabled={submitting} onClick={submit} className="flex-1 py-2 rounded-lg text-sm font-semibold disabled:opacity-60" style={{ background: 'var(--gold)', color: '#06090f' }}>
                  {submitting ? '…' : 'Submit'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
