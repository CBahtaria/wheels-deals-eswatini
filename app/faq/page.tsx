'use client'
import { useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const FAQS = [
  {
    category: 'Buying a Car',
    items: [
      {
        q: 'How do I buy a car from Wheels & Deals?',
        a: 'Browse our stock online, find a car you like, then WhatsApp us on +268 7910 6129 or visit our showroom in Matsapha on the M200. We\'ll arrange a test drive, answer questions, and guide you through the paperwork.',
      },
      {
        q: 'Can I test drive a vehicle before buying?',
        a: 'Yes — test drives are available during trading hours (Mon–Fri 08:00–17:00, Sat 08:00–13:00). WhatsApp us first to confirm the vehicle is available.',
      },
      {
        q: 'What documents do I need to buy a car?',
        a: 'You\'ll need a valid Swazi ID or passport, proof of address (utility bill not older than 3 months), and your driver\'s licence. For finance applications, you\'ll also need 3 months of bank statements.',
      },
      {
        q: 'Are the prices negotiable?',
        a: 'Our prices are competitive and fairly set. We\'re open to reasonable offers, especially on vehicles that have been listed for some time. Contact us to discuss.',
      },
      {
        q: 'Do you offer a warranty?',
        a: 'Pre-owned vehicles are sold in "as inspected" condition. We do not offer a blanket warranty, but we disclose all known faults honestly. We recommend an independent mechanical inspection before purchase.',
      },
    ],
  },
  {
    category: 'Finance',
    items: [
      {
        q: 'Can you help me get finance?',
        a: 'Yes. We work with partnered financial institutions and can facilitate introductions. WhatsApp us with your income details and we\'ll guide you through the process. Approval is subject to credit assessment.',
      },
      {
        q: 'How accurate is the finance calculator?',
        a: 'The calculator gives a reasonable estimate based on the inputs you provide. Actual monthly payments depend on the lender\'s approved rate and term, which may differ. Use it as a planning tool, not a guaranteed quote.',
      },
      {
        q: 'What deposit is typically required?',
        a: 'Most lenders require a 10–20% deposit. A larger deposit reduces your monthly instalment and the total interest you pay. We can advise based on your specific situation.',
      },
      {
        q: 'What is the minimum income required for finance?',
        a: 'This depends on the lender and the vehicle price. Generally, your monthly instalment should not exceed 30% of your net monthly income. Contact us and we\'ll give you a realistic assessment.',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        q: 'Do you deliver vehicles?',
        a: 'Yes, we offer delivery across Eswatini. Delivery fees depend on your location and are agreed upfront. The vehicle must be paid for in full before delivery is arranged.',
      },
      {
        q: 'Can I buy online and collect in person?',
        a: 'Yes — our Pickup In-store option lets you complete the purchase process remotely (via WhatsApp and EFT), then collect at our Matsapha yard at a convenient time.',
      },
      {
        q: 'Can I sell my car to you?',
        a: 'Yes. WhatsApp us photos and the details of your vehicle. We\'ll give an initial estimate, then inspect the car in person before making a formal offer. If agreed, we can settle same day.',
      },
    ],
  },
  {
    category: 'General',
    items: [
      {
        q: 'Where are you located?',
        a: 'We are based in Matsapha on the M200, Eswatini — conveniently accessible from Manzini and Mbabane.',
      },
      {
        q: 'What are your trading hours?',
        a: 'Monday to Friday: 08:00–17:00. Saturday: 08:00–13:00. Sunday: Closed. WhatsApp messages outside of these hours will be answered the next business day.',
      },
      {
        q: 'How quickly do you respond to WhatsApp messages?',
        a: 'During business hours we aim to respond within 1 hour. Messages sent in the evening or on Sunday will be replied to first thing the next business day.',
      },
      {
        q: 'Are you on Facebook?',
        a: 'Yes. Search "Wheels and Deals Eswatini" on Facebook to find our page and see vehicle photos and updates.',
      },
    ],
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left py-4 flex items-center justify-between gap-4"
      >
        <span className="font-medium text-sm" style={{ color: 'var(--text)' }}>{q}</span>
        <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-transform"
          style={{ color: 'var(--gold)', transform: open ? 'rotate(45deg)' : 'none' }}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M8 2v12M2 8h12"/>
          </svg>
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{a}</p>
      )}
    </div>
  )
}

export default function FAQPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Help</p>
          <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--text)' }}>Frequently Asked Questions</h1>
          <p className="mb-12" style={{ color: 'var(--text-muted)' }}>
            Can&apos;t find your answer below? WhatsApp us on{' '}
            <a href="https://wa.me/26879106129" style={{ color: 'var(--gold)' }}>+268 7910 6129</a>
            {' '}and we&apos;ll reply within the hour.
          </p>

          <div className="space-y-10">
            {FAQS.map(cat => (
              <section key={cat.category}>
                <h2 className="font-mono text-[10px] uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
                  {cat.category}
                </h2>
                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div className="px-5">
                    {cat.items.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 p-8 rounded-2xl text-center" style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)' }}>
            <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Still have a question?</p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Our team is on WhatsApp — fastest response during business hours.</p>
            <a href="https://wa.me/26879106129?text=Hi%2C+I+have+a+question+about+Wheels+%26+Deals+Eswatini"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
              style={{ background: '#25d366', color: 'white' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
