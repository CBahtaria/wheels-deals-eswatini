import Link from 'next/link'
import Image from 'next/image'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { VehicleCard } from '@/components/VehicleCard'
import { MOCK_VEHICLES } from '@/lib/vehicles'

const featured = MOCK_VEHICLES.filter(v => v.status === 'available').slice(0, 6)

const WHY = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Fair Prices',
    desc: 'We price all vehicles at market value — no inflated sticker prices, no hidden fees.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Quality Assured',
    desc: 'Every vehicle is inspected before listing. What you see in the photos is what you get.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: 'Easy Finance',
    desc: 'Access partnered finance options. Use our calculator to estimate your monthly payment.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    ),
    title: 'WhatsApp Response in &lt;1hr',
    desc: 'Send us a WhatsApp message and we respond within the hour during business hours.',
  },
]

const TESTIMONIALS = [
  {
    name: 'Sipho Dlamini',
    location: 'Manzini',
    text: 'Bought a Toyota Corolla from Wheels & Deals last year. Price was fair, the car was exactly as described, and the process was smooth. Would recommend to anyone in Eswatini.',
  },
  {
    name: 'Nomsa Nkosi',
    location: 'Mbabane',
    text: 'I sold my old VW Polo here. They gave me a fair valuation and paid the same day. No stress, no games. Very professional team.',
  },
  {
    name: 'Thabo Mhlanga',
    location: 'Matsapha',
    text: 'Used their finance calculator, sorted out my budget, then found a Hilux that fit perfectly. The WhatsApp communication was fast and helpful throughout.',
  },
]

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ────────────────────────────────────────────── */}
        <section
          className="hero-dark relative min-h-[100svh] flex flex-col items-center justify-center px-4 pt-16 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #06090f 0%, #0d1a2e 60%, #06090f 100%)' }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative max-w-4xl mx-auto text-center">
            <span className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid rgba(244,185,66,0.2)' }}>
              Matsapha, Eswatini
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: 'var(--text)' }}>
              Find Your Perfect<br />
              <span style={{ color: 'var(--gold)' }}>Car in Eswatini</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              Quality pre-owned vehicles in Matsapha — fair prices, no pressure, WhatsApp support.
            </p>

            {/* Search */}
            <form action="/stock" className="flex gap-2 max-w-xl mx-auto mb-10">
              <input
                type="text"
                name="q"
                placeholder="Search by make or model..."
                className="flex-1 px-4 py-3.5 rounded-xl text-sm"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text)' }}
              />
              <button type="submit"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>
                Search
              </button>
            </form>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <Link href="/stock"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm text-center"
                style={{ background: 'var(--gold)', color: '#06090f' }}>
                Browse All Stock
              </Link>
              <Link href="/sell"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm text-center"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text)' }}>
                Sell Your Car →
              </Link>
            </div>

            {/* Stats strip */}
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { label: 'Vehicles', value: '20+' },
                { label: 'Est.', value: '2020' },
                { label: 'Location', value: 'Matsapha' },
                { label: 'Response', value: '<1 Hour' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-bold mb-0.5" style={{ color: 'var(--gold)' }}>{s.value}</div>
                  <div className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Vehicles ───────────────────────────────── */}
        <section className="py-20 px-4 md:px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Available Now</p>
                <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Featured Vehicles</h2>
              </div>
              <Link href="/stock" className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ───────────────────────────────────── */}
        <section className="py-20 px-4 md:px-6" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Why Wheels & Deals</p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>The Right Choice</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY.map((w, i) => (
                <div key={i} className="p-6 rounded-xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                  <div className="mb-4" style={{ color: 'var(--gold)' }}>{w.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }} dangerouslySetInnerHTML={{ __html: w.title }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sell CTA ────────────────────────────────────────── */}
        <section className="py-20 px-4 md:px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>We Buy Cars</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>Sell Your Car Fast</h2>
                <p className="max-w-md" style={{ color: 'var(--text-muted)' }}>
                  Get a free, no-obligation valuation. We pay fair market value, same day. Bring your car to Matsapha or WhatsApp us first.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/sell"
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-center"
                  style={{ background: 'var(--gold)', color: '#06090f' }}>
                  Get Free Valuation
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Finance Preview ─────────────────────────────────── */}
        <section className="py-20 px-4 md:px-6" style={{ background: 'var(--bg-card)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Finance Options</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text)' }}>Drive Away Today</h2>
              <p className="text-lg mb-6" style={{ color: 'var(--text-muted)' }}>
                Use our finance calculator to estimate your monthly payment and find the budget that works for you.
              </p>
              <Link href="/finance"
                className="inline-block px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--blue-2)', color: 'white' }}>
                Open Calculator →
              </Link>
            </div>
            <div className="flex-1 max-w-sm">
              <div className="p-6 rounded-2xl" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div className="mb-4">
                  <p className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>Vehicle Price</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>SZL 185,000</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>Term / Deposit</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>48 months / SZL 20,000</p>
                </div>
                <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-subtle)' }}>Estimated Monthly</p>
                  <p className="text-3xl font-bold" style={{ color: 'var(--gold)' }}>SZL 4,280</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────── */}
        <section className="py-20 px-4 md:px-6" style={{ background: 'var(--bg)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>Customer Reviews</p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="flex mb-3">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} viewBox="0 0 20 20" fill="currentColor" width="16" height="16" style={{ color: 'var(--gold)' }}>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>{t.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Strip ─────────────────────────────────────── */}
        <section className="py-16 px-4 md:px-6" style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: 'var(--text)' }}>Ready to find your car?</h2>
              <p style={{ color: 'var(--text-muted)' }}>Matsapha, M200 · Mon–Fri 8–17 · Sat 8–13</p>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/26879106129" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{ background: '#25d366', color: 'white' }}>
                WhatsApp Us
              </a>
              <Link href="/stock" className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>
                Browse Stock
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
