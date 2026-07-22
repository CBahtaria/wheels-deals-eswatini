'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/stock',   label: 'Stock' },
  { href: '/sell',    label: 'Sell Your Car' },
  { href: '/finance', label: 'Finance' },
  { href: '/about',   label: 'About' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(6,9,15,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-lg font-bold text-sm"
            style={{ background: 'var(--gold)', color: '#06090f', letterSpacing: '-0.5px' }}
          >
            W&D
          </span>
          <div className="leading-none">
            <span className="block font-semibold text-sm" style={{ color: 'var(--text)' }}>Wheels &amp; Deals</span>
            <span className="block font-mono text-[9px] uppercase tracking-widest" style={{ color: 'var(--gold)' }}>Eswatini</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm transition-colors hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="https://wa.me/26878000000?text=Hi%2C+I%27m+interested+in+a+vehicle"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: 'var(--gold)', color: '#06090f' }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
          </svg>
          WhatsApp Us
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <motion.span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--text)' }}
            animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={{ duration: 0.2 }} />
          <motion.span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--text)' }}
            animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }} />
          <motion.span className="w-6 h-0.5 rounded-full" style={{ background: 'var(--text)' }}
            animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={{ duration: 0.2 }} />
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(6,9,15,0.98)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {LINKS.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-base font-medium py-2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="https://wa.me/26878000000?text=Hi%2C+I%27m+interested+in+a+vehicle"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold mt-2"
                style={{ background: 'var(--gold)', color: '#06090f' }}
                onClick={() => setOpen(false)}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
