import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

export const metadata = { title: 'About Us' }

const FB_URL = 'https://www.facebook.com/search/top?q=Wheels+and+Deals+Eswatini'

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
                  Wheels &amp; Deals Eswatini was founded in Matsapha with one goal: to make car ownership accessible to every Swazi family. We saw that the used-car market lacked transparency — inflated prices, hidden problems, and pressure tactics. We decided to do things differently.
                </p>
                <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Today we operate from Matsapha on the M200, serving buyers and sellers across Eswatini. Every vehicle we sell is inspected, honestly described, and fairly priced. Every customer gets a direct WhatsApp line to our team.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', height: '280px' }}>
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl mb-4 mx-auto font-bold text-2xl"
                    style={{ background: 'var(--gold)', color: '#06090f' }}>W&D</div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>Wheels &amp; Deals Team</p>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Matsapha, Eswatini</p>
                </div>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>How We Serve You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                      <path d="M1 3h15l2 9H3L1 3z"/><path d="M1 3l2 9h15"/><circle cx="9" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M3 12l14 0"/>
                    </svg>
                  ),
                  title: 'Delivery',
                  desc: 'We can arrange delivery of your vehicle to your door anywhere in Eswatini. Ask us for a delivery quote when you enquire.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  ),
                  title: 'In-Store',
                  desc: 'Visit us at our Matsapha showroom on the M200. Browse our full stock in person, test drive, and meet our team face to face.',
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  title: 'Pickup In-Store',
                  desc: 'Purchase online or via WhatsApp, then collect your vehicle at our yard at a time that suits you. Simple and convenient.',
                },
              ].map(s => (
                <div key={s.title} className="p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="mb-4" style={{ color: 'var(--gold)' }}>{s.icon}</div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Values */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: 'Honest Pricing', desc: 'We show the real price — no add-ons, no last-minute fees. The price you see is what you pay.' },
                { title: 'Community First', desc: 'We are local. Our success depends on the trust of the Eswatini community, not on one-time sales.' },
                { title: 'Quality Assured', desc: 'We check every vehicle before listing. If it has issues, we say so — and price it accordingly.' },
              ].map(v => (
                <div key={v.title} className="p-6 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'var(--gold-dim)', color: 'var(--gold)' }}>
                    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.5 6.5l-4 4a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06L7 8.94l3.44-3.44a.75.75 0 111.06 1.06z"/>
                    </svg>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact & Map */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--text)' }}>Find Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl space-y-5" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-subtle)' }}>Address</p>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Matsapha, M200<br />Eswatini</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{ color: 'var(--text-subtle)' }}>Trading Hours</p>
                  <p style={{ color: 'var(--text)' }}>Monday – Friday: 08:00 – 17:00</p>
                  <p style={{ color: 'var(--text)' }}>Saturday: 08:00 – 13:00</p>
                  <p style={{ color: 'var(--text-subtle)' }}>Sunday: Closed</p>
                </div>
                <div className="space-y-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Contact</p>
                  <a href="https://wa.me/26879106129" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-sm" style={{ color: '#25d366' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    </svg>
                    WhatsApp: +268 7910 6129
                  </a>
                  <a href="tel:+26879702853"
                    className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    Phone: +268 7970 2853
                  </a>
                  <a href={FB_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm" style={{ color: '#1877f2' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Wheels and Deals Eswatini
                  </a>
                </div>
              </div>

              {/* Map — Matsapha, M200 */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', minHeight: '320px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3584.2!2d31.3142!3d-26.4897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ee8d3a1a1a1a1a1%3A0x0!2sMatsapha%2C+Eswatini!5e0!3m2!1sen!2ssz!4v1700000000000!5m2!1sen!2ssz"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: 'block', filter: 'var(--map-filter, none)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Matsapha, Eswatini map"
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12 rounded-2xl"
            style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>Ready to Find Your Car?</h2>
            <p className="mb-6" style={{ color: 'var(--text-muted)' }}>Browse our stock or send us a WhatsApp — we&apos;ll reply within the hour.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/stock" className="px-8 py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>Browse Stock</a>
              <a href="https://wa.me/26879106129" target="_blank" rel="noopener noreferrer"
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
