import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'About Us' }

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">

          {/* Story */}
          <section className="mb-20">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Our Story</p>
            <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--text)' }}>Built for Eswatini</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                  Wheels &amp; Deals Eswatini was founded in Manzini with one goal: to make car ownership accessible to every Swazi family. We saw that the used-car market lacked transparency — inflated prices, hidden problems, and pressure tactics. We decided to do things differently.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Today we operate from Manzini Industrial Area, serving buyers and sellers across Eswatini. Every vehicle we sell is inspected, honestly described, and fairly priced. Every customer gets a direct WhatsApp line to our team.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', height: '280px' }}>
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl mb-4 mx-auto font-bold text-2xl"
                    style={{ background: 'var(--gold)', color: '#06090f' }}>W&D</div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>Wheels &amp; Deals Team</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Manzini, Eswatini</p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { emoji: '🤝', title: 'Honest Pricing', desc: 'We show the real price — no add-ons, no last-minute fees. The price you see is what you pay.' },
                { emoji: '🏘️', title: 'Community First', desc: 'We are local. Our success depends on the trust of the Eswatini community, not on one-time sales.' },
                { emoji: '🔍', title: 'Quality Assured', desc: 'We check every vehicle before listing. If it has issues, we say so — and price it accordingly.' },
              ].map(v => (
                <div key={v.title} className="p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="text-3xl mb-4">{v.emoji}</div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>Find Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-subtle)' }}>Address</p>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Manzini Industrial Area<br />Manzini, Eswatini</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-subtle)' }}>Trading Hours</p>
                  <p style={{ color: 'var(--text)' }}>Monday – Friday: 08:00 – 17:00</p>
                  <p style={{ color: 'var(--text)' }}>Saturday: 08:00 – 13:00</p>
                  <p style={{ color: 'var(--text-subtle)' }}>Sunday: Closed</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--text-subtle)' }}>Contact</p>
                  <a href="https://wa.me/26878000000" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-sm mb-2"
                    style={{ color: '#25d366' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    </svg>
                    +268 7800 0000
                  </a>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minHeight: '280px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.8!2d31.37!3d-26.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI5JzI0LjAiUyAzMcKwMjInMTIuMCJF!5e0!3m2!1sen!2ssz!4v1700000000000!5m2!1sen!2ssz"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '280px', filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Manzini, Eswatini map"
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 rounded-2xl"
            style={{ background: 'linear-gradient(135deg, #0d1a2e, #111d30)', border: '1px solid rgba(244,185,66,0.15)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Ready to Find Your Car?</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Browse our stock or send us a WhatsApp — we&apos;ll reply within the hour.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/stock" className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>Browse Stock</a>
              <a href="https://wa.me/26878000000" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: '#25d366', color: 'white' }}>WhatsApp Us</a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
