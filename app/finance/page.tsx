'use client'
import { useState, useMemo } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

function calcMonthly(price: number, deposit: number, termMonths: number, rate: number): number {
  const principal = price - deposit
  if (principal <= 0) return 0
  const r = rate / 100 / 12
  if (r === 0) return principal / termMonths
  return principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1)
}

function fmtSZL(n: number) {
  return `SZL ${Math.round(n).toLocaleString('en-ZA')}`
}

export default function FinancePage() {
  const [price, setPrice] = useState(185000)
  const [deposit, setDeposit] = useState(20000)
  const [term, setTerm] = useState(48)
  const [rate, setRate] = useState(12.5)

  const monthly = useMemo(() => calcMonthly(price, deposit, term, rate), [price, deposit, term, rate])
  const total = monthly * term + deposit
  const interest = total - price

  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Finance Calculator</p>
            <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>Calculate Your Monthly Payment</h1>
            <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
              Estimate your monthly instalment before visiting us. Finance subject to approval.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Inputs */}
            <div className="lg:col-span-3 space-y-6 rounded-2xl p-6 md:p-8" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Slider label="Vehicle Price" value={price} min={50000} max={500000} step={5000}
                onChange={setPrice} format={fmtSZL} />
              <Slider label="Deposit" value={deposit} min={0} max={Math.max(0, price - 10000)} step={5000}
                onChange={setDeposit} format={fmtSZL} />
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>
                  Loan Term
                </label>
                <div className="flex gap-2 flex-wrap">
                  {[12, 24, 36, 48, 60].map(t => (
                    <button key={t} onClick={() => setTerm(t)}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{
                        background: term === t ? 'var(--gold)' : 'var(--bg)',
                        color: term === t ? '#06090f' : 'var(--text-muted)',
                        border: '1px solid var(--border)',
                      }}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <Slider label="Interest Rate (% p.a.)" value={rate} min={8} max={24} step={0.5}
                onChange={setRate} format={v => `${v.toFixed(1)}%`} />
            </div>

            {/* Output */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #0d1a2e, #111d30)', border: '1px solid rgba(244,185,66,0.15)' }}>
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--text-subtle)' }}>Monthly Payment</p>
                <p className="text-4xl md:text-5xl font-bold mb-1" style={{ color: 'var(--gold)' }}>
                  {fmtSZL(monthly)}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-subtle)' }}>per month × {term} months</p>
              </div>

              <div className="rounded-2xl p-5 space-y-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                {[
                  ['Vehicle Price', fmtSZL(price)],
                  ['Deposit', fmtSZL(deposit)],
                  ['Amount Financed', fmtSZL(Math.max(0, price - deposit))],
                  ['Total Interest', fmtSZL(Math.max(0, interest))],
                  ['Total Payable', fmtSZL(Math.max(price, total))],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-sm py-1.5" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-subtle)' }}>
                For illustrative purposes only. Actual rates and terms depend on credit approval. Contact us for partnered finance options.
              </p>

              <a href="https://wa.me/26878000000?text=Hi%2C+I%27d+like+to+enquire+about+finance+options"
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-sm"
                style={{ background: '#25d366', color: 'white' }}>
                WhatsApp to Apply
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Slider({ label, value, min, max, step, onChange, format }: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void; format: (v: number) => string
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>{label}</label>
        <span className="font-semibold text-sm" style={{ color: 'var(--gold)' }}>{format(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to right, var(--gold) 0%, var(--gold) ${((value - min) / (max - min)) * 100}%, var(--bg-card-2) ${((value - min) / (max - min)) * 100}%, var(--bg-card-2) 100%)` }}
      />
      <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--text-subtle)' }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  )
}
