'use client'
import { useRef, useState } from 'react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const YEARS = Array.from({ length: 36 }, (_, i) => 2025 - i)
const BODY_TYPES = ['Sedan', 'SUV', 'Hatchback', 'Bakkie', 'Minibus', 'Other']

function RadioPills({ name, options, value, setValue }: {
  name: string
  options: string[]
  value: string
  setValue: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <label
          key={opt}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border cursor-pointer text-sm"
          style={{
            background: value === opt ? 'var(--gold)' : 'var(--bg)',
            borderColor: value === opt ? 'var(--gold)' : 'var(--border)',
            color: value === opt ? '#06090f' : 'var(--text-muted)',
          }}
        >
          <input
            type="radio"
            className="hidden"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => setValue(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  )
}

function Field({ label, name, placeholder, required, type = 'text' }: {
  label: string
  name: string
  placeholder: string
  required?: boolean
  type?: string
}) {
  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-subtle)' }}>
        {label}{required && ' *'}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2.5 rounded-lg text-sm"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
      />
    </div>
  )
}

export default function AdminVehicleNewPage() {
  const [phase, setPhase] = useState<'gate' | 'form' | 'success'>('gate')
  const [gateError, setGateError] = useState('')
  const [gateLoading, setGateLoading] = useState(false)
  const [gatePassword, setGatePassword] = useState('')
  const passwordRef = useRef('')

  const [transmission, setTransmission] = useState('Manual')
  const [fuel, setFuel] = useState('Petrol')
  const [condition, setCondition] = useState('Good')
  const [status, setStatus] = useState('available')
  const [submitError, setSubmitError] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [newId, setNewId] = useState('')

  async function handleGate(e: React.FormEvent) {
    e.preventDefault()
    setGateLoading(true)
    setGateError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: gatePassword }),
    })
    const data = await res.json()
    setGateLoading(false)
    if (data.ok) {
      passwordRef.current = gatePassword
      setPhase('form')
    } else {
      setGateError('Incorrect password')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitLoading(true)
    setSubmitError('')
    const fd = new FormData(e.currentTarget)
    const images = [1, 2, 3, 4, 5]
      .map(n => (fd.get(`image_url_${n}`) as string) ?? '')
      .filter(Boolean)
    const features = ((fd.get('features') as string) ?? '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
    const payload = {
      make: fd.get('make'),
      model: fd.get('model'),
      year: parseInt(fd.get('year') as string),
      price_szl: parseFloat(fd.get('price_szl') as string),
      mileage_km: parseInt(fd.get('mileage_km') as string),
      transmission,
      fuel_type: fuel,
      condition,
      status,
      description: fd.get('description') || null,
      body_type: fd.get('body_type') || null,
      colour: fd.get('colour') || null,
      features,
      images,
    }
    const res = await fetch('/api/admin/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-secret': passwordRef.current,
      },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    setSubmitLoading(false)
    if (data.id) {
      setNewId(data.id)
      setPhase('success')
    } else {
      setSubmitError(data.error ?? 'Failed')
    }
  }

  function resetForm() {
    setTransmission('Manual')
    setFuel('Petrol')
    setCondition('Good')
    setStatus('available')
    setSubmitError('')
    setNewId('')
    setPhase('form')
  }

  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto">

          {phase === 'gate' && (
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h1 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                Admin — Add Vehicle
              </h1>
              <form onSubmit={handleGate} className="space-y-4">
                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    value={gatePassword}
                    onChange={e => setGatePassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 rounded-lg text-sm"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>
                {gateError && (
                  <p className="text-sm" style={{ color: 'var(--red, #ef4444)' }}>{gateError}</p>
                )}
                <button
                  type="submit"
                  disabled={gateLoading}
                  className="w-full py-3 rounded-xl font-semibold text-sm disabled:opacity-60"
                  style={{ background: 'var(--gold)', color: '#06090f' }}
                >
                  {gateLoading ? 'Checking…' : 'Unlock'}
                </button>
              </form>
            </div>
          )}

          {phase === 'form' && (
            <div
              className="rounded-2xl p-8"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <h1 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                Add New Vehicle
              </h1>
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Make" name="make" placeholder="e.g. Toyota" required />
                  <Field label="Model" name="model" placeholder="e.g. Corolla" required />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                      style={{ color: 'var(--text-subtle)' }}
                    >
                      Year *
                    </label>
                    <select
                      name="year"
                      required
                      className="w-full px-3 py-2.5 rounded-lg text-sm"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                    >
                      <option value="">Select year</option>
                      {YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  <Field label="Price SZL" name="price_szl" type="number" placeholder="e.g. 120000" required />
                </div>

                <Field label="Mileage km" name="mileage_km" type="number" placeholder="e.g. 80000" required />

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Transmission
                  </label>
                  <RadioPills
                    name="transmission"
                    options={['Manual', 'Automatic']}
                    value={transmission}
                    setValue={setTransmission}
                  />
                </div>

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Fuel
                  </label>
                  <RadioPills
                    name="fuel"
                    options={['Petrol', 'Diesel', 'Hybrid']}
                    value={fuel}
                    setValue={setFuel}
                  />
                </div>

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Condition
                  </label>
                  <RadioPills
                    name="condition"
                    options={['Excellent', 'Good', 'Fair']}
                    value={condition}
                    setValue={setCondition}
                  />
                </div>

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Body Type
                  </label>
                  <select
                    name="body_type"
                    className="w-full px-3 py-2.5 rounded-lg text-sm"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  >
                    <option value="">Select body type</option>
                    {BODY_TYPES.map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>

                <Field label="Colour" name="colour" placeholder="e.g. Silver" />

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Status
                  </label>
                  <RadioPills
                    name="status"
                    options={['available', 'reserved', 'sold']}
                    value={status}
                    setValue={setStatus}
                  />
                </div>

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    placeholder="Vehicle description..."
                    className="w-full px-3 py-2.5 rounded-lg text-sm resize-none"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>

                <div>
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest mb-1.5"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Features
                  </label>
                  <input
                    type="text"
                    name="features"
                    placeholder="Comma-separated, e.g. A/C, Sunroof"
                    className="w-full px-3 py-2.5 rounded-lg text-sm"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                  />
                </div>

                <div className="space-y-3">
                  <label
                    className="block font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: 'var(--text-subtle)' }}
                  >
                    Image URLs
                  </label>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n}>
                      <label
                        className="block font-mono text-[10px] uppercase tracking-widest mb-1"
                        style={{ color: 'var(--text-subtle)' }}
                      >
                        Image {n}
                      </label>
                      <input
                        type="text"
                        name={`image_url_${n}`}
                        placeholder={`https://...`}
                        className="w-full px-3 py-2.5 rounded-lg text-sm"
                        style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                      />
                    </div>
                  ))}
                </div>

                {submitError && (
                  <p className="text-sm" style={{ color: 'var(--red, #ef4444)' }}>{submitError}</p>
                )}

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm disabled:opacity-60"
                  style={{ background: 'var(--gold)', color: '#06090f' }}
                >
                  {submitLoading ? 'Adding Vehicle…' : 'Add Vehicle'}
                </button>
              </form>
            </div>
          )}

          {phase === 'success' && (
            <div
              className="rounded-2xl p-8 text-center"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
            >
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>Vehicle Added!</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                ID: <span className="font-mono" style={{ color: 'var(--text)' }}>{newId}</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`/stock/${newId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: 'var(--gold)', color: '#06090f' }}
                >
                  View on site
                </a>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}
                >
                  Add another
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
