import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ background: '#030508', borderTop: '1px solid var(--border)' }}>
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
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              Quality pre-owned vehicles at fair prices. Serving Manzini and greater Eswatini since 2020.
            </p>
            <a
              href="https://wa.me/26878000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: '#25d366' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
              +268 7800 0000
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/stock', label: 'Browse Stock' },
                { href: '/sell', label: 'Sell Your Car' },
                { href: '/finance', label: 'Finance Calculator' },
                { href: '/about', label: 'About Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:text-white" style={{ color: 'var(--text-muted)' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--text)' }}>Contact & Hours</h3>
            <div className="space-y-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
              <p>Manzini Industrial Area<br />Manzini, Eswatini</p>
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
          <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>
            Prices in SZL (Swazi Lilangeni). Subject to change without notice.
          </p>
        </div>
      </div>
    </footer>
  )
}
