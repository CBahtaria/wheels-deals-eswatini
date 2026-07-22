import Link from 'next/link'

const FB_URL = 'https://www.facebook.com/search/top?q=Wheels+and+Deals+Eswatini'

export function Footer() {
  return (
    <footer style={{ background: 'var(--bg-card-2)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm"
                style={{ background: 'var(--gold)', color: '#06090f' }}>W&D</span>
              <div>
                <span className="block font-semibold text-sm" style={{ color: 'var(--text)' }}>Wheels &amp; Deals</span>
                <span className="block font-mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--gold)' }}>Eswatini</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
              Quality pre-owned vehicles at fair prices. Serving Matsapha and greater Eswatini since 2020.
            </p>

            {/* Social / contact links */}
            <div className="flex flex-col gap-2.5">
              <a href="https://wa.me/26879106129" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold"
                style={{ color: '#25d366' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                </svg>
                +268 7910 6129
              </a>
              <a href="tel:+26879702853" className="inline-flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                +268 7970 2853
              </a>
              <a href={FB_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm" style={{ color: '#1877f2' }}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Wheels and Deals Eswatini
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/stock',   label: 'Browse Stock' },
                { href: '/sell',    label: 'Sell Your Car' },
                { href: '/finance', label: 'Finance Calculator' },
                { href: '/about',   label: 'About Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-muted)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold text-sm mt-6 mb-3" style={{ color: 'var(--text)' }}>Services</h3>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              {['Delivery', 'In-store', 'Pickup In-store shopping'].map(s => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <span style={{ color: 'var(--gold)' }}>✓</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Contact &amp; Hours</h3>
            <div className="space-y-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
              <p>Matsapha, M200<br />Eswatini</p>
              <div>
                <p>Mon–Fri: 08:00 – 17:00</p>
                <p>Saturday: 08:00 – 13:00</p>
                <p style={{ color: 'var(--text-subtle)' }}>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
            © 2025 Wheels &amp; Deals Eswatini. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {[
              { href: '/terms',   label: 'Terms & Conditions' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/faq',     label: 'FAQs' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-xs transition-colors hover:text-white"
                style={{ color: 'var(--text-subtle)' }}>{l.label}</Link>
            ))}
            <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
              Prices in SZL · Subject to change
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
