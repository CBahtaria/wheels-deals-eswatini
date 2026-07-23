'use client'
import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const YEARS = Array.from({ length: 25 }, (_, i) => (2024 - i).toString())

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'sell' }),
      })
      if (!res.ok) throw new Error('Failed')
      const captured = { ...data }
      setFormData(captured)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please WhatsApp us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: copy */}
            <div className="lg:pt-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>We Buy Cars</p>
              <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>Get a Free Valuation</h1>
              <p className="text-lg mb-8" style={{ color: 'var(--text-muted)' }}>
                Tell us about your car and we&apos;ll come back to you with a fair market offer. No pressure, no obligation.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '💰', title: 'Fair Valuation', desc: 'We price against live market data to give you the best realistic offer.' },
                  { icon: '⚡', title: 'Same-Day Decision', desc: 'Bring your car in or send photos via WhatsApp — we decide fast.' },
                  { icon: '✅', title: 'Hassle-Free Process', desc: 'We handle the paperwork. You just hand over the keys and get paid.' },
                ].map(item => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{item.title}</h3>
                      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✅</div>
                  <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Request Received!</h2>
                  <p className="mb-6" style={{ color: 'var(--text-muted)' }}>
                    We&apos;ll review your details and get back to you via WhatsApp within 1 business hour.
                  </p>
                  {(() => {
                    const waText = encodeURIComponent(`Hi Wheels & Deals, I just submitted a valuation request.\n\nCar: ${formData.make} ${formData.model} (${formData.year})\nMileage: ${formData.mileage} km\nCondition: ${formData.condition}\nAsking: SZL ${formData.asking_price || 'open to offer'}\n\nName: ${formData.name} | ${formData.phone}\n\nI'm sending photos now 📸`)
                    const waUrl = `https://wa.me/26879106129?text=${waText}`
                    return (
                      <a href={waUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                        style={{ background: '#25d366', color: 'white' }}>
                        Continue on WhatsApp
                      </a>
                    )
                  })()}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--text)' }}>Your Vehicle Details</h2>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Make" name="make" placeholder="e.g. Toyota" required />
                    <Field label="Model" name="model" placeholder="e.g. Corolla" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-subtle)' }}>Year *</label>
                      <select name="year" required className="w-full px-3 py-2.5 rounded-lg text-sm"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
                        <option value="">Select year</option>
                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <Field label="Mileage (km)" name="mileage" type="number" placeholder="e.g. 80000" required />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-subtle)' }}>Condition *</label>
                    <div className="flex gap-3">
                      {['Excellent', 'Good', 'Fair'].map(c => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="condition" value={c} required className="accent-yellow-400" />
                          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Field label="Asking Price (SZL, optional)" name="asking_price" type="number" placeholder="e.g. 120000" />

                  <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>Your Contact</p>
                    <div className="space-y-3">
                      <Field label="Name" name="name" placeholder="Your name" required />
                      <Field label="Phone / WhatsApp" name="phone" placeholder="+268 7910 6129" required />
                      <div>
                        <label className="block font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-subtle)' }}>Additional Notes</label>
                        <textarea name="message" rows={3} placeholder="Any extras, service history, recent work done..."
                          className="w-full px-3 py-2.5 rounded-lg text-sm resize-none"
                          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-sm" style={{ color: 'var(--red)' }}>{error}</p>}

                  <button type="submit" disabled={loading}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60"
                    style={{ background: 'var(--gold)', color: '#06090f' }}>
                    {loading ? 'Submitting…' : 'Submit Valuation Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Field({ label, name, placeholder, required, type = 'text' }: {
  label: string; name: string; placeholder: string; required?: boolean; type?: string
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-subtle)' }}>
        {label}{required && ' *'}
      </label>
      <input type={type} name={name} placeholder={placeholder} required={required}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} />
    </div>
  )
}
