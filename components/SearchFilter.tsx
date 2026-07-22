'use client'
import { useState, useEffect, useCallback } from 'react'
import type { Vehicle } from '@/lib/supabase'

const MAKES = ['All', 'Toyota', 'Volkswagen', 'Nissan', 'Hyundai', 'Mazda']
const BODY_TYPES = ['All', 'Sedan', 'Hatchback', 'SUV', 'Bakkie']
const TRANSMISSIONS = ['All', 'Manual', 'Automatic']
const FUEL_TYPES = ['All', 'Petrol', 'Diesel', 'Hybrid']

type Filters = {
  q: string
  make: string
  minPrice: string
  maxPrice: string
  transmission: string
  bodyType: string
  fuelType: string
}

const DEFAULT: Filters = { q: '', make: 'All', minPrice: '', maxPrice: '', transmission: 'All', bodyType: 'All', fuelType: 'All' }

function applyFilters(vehicles: Vehicle[], f: Filters): Vehicle[] {
  return vehicles.filter(v => {
    if (f.q && !`${v.make} ${v.model}`.toLowerCase().includes(f.q.toLowerCase())) return false
    if (f.make !== 'All' && v.make !== f.make) return false
    if (f.minPrice && v.price_szl < parseInt(f.minPrice)) return false
    if (f.maxPrice && v.price_szl > parseInt(f.maxPrice)) return false
    if (f.transmission !== 'All' && v.transmission !== f.transmission) return false
    if (f.bodyType !== 'All' && v.body_type !== f.bodyType) return false
    if (f.fuelType !== 'All' && v.fuel_type !== f.fuelType) return false
    return true
  })
}

function activeCount(f: Filters): number {
  let c = 0
  if (f.q) c++
  if (f.make !== 'All') c++
  if (f.minPrice) c++
  if (f.maxPrice) c++
  if (f.transmission !== 'All') c++
  if (f.bodyType !== 'All') c++
  if (f.fuelType !== 'All') c++
  return c
}

export function SearchFilter({ vehicles, onFilter }: { vehicles: Vehicle[]; onFilter: (v: Vehicle[]) => void }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT)
  const [open, setOpen] = useState(false)

  const apply = useCallback((f: Filters) => {
    const result = applyFilters(vehicles, f)
    const available = result.filter(v => v.status !== 'sold')
    const unavailable = result.filter(v => v.status === 'sold')
    onFilter([...available, ...unavailable])
  }, [vehicles, onFilter])

  useEffect(() => { apply(filters) }, [filters, apply])

  const set = (key: keyof Filters, val: string) => setFilters(p => ({ ...p, [key]: val }))
  const reset = () => setFilters(DEFAULT)
  const count = activeCount(filters)

  const sel = (label: string, key: keyof Filters, opts: string[]) => (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>{label}</label>
      <select
        value={filters[key]}
        onChange={e => set(key, e.target.value)}
        className="px-3 py-2 rounded-lg text-sm"
        style={{ background: 'var(--bg-card-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
      >
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )

  const filterBody = (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-subtle)' }}>Search</label>
        <input
          type="text"
          placeholder="Make or model..."
          value={filters.q}
          onChange={e => set('q', e.target.value)}
          className="px-3 py-2 rounded-lg text-sm placeholder:text-slate-600"
          style={{ background: 'var(--bg-card-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
        />
      </div>
      {sel('Make', 'make', MAKES)}
      {sel('Transmission', 'transmission', TRANSMISSIONS)}
      {sel('Body Type', 'bodyType', BODY_TYPES)}
      {sel('Fuel Type', 'fuelType', FUEL_TYPES)}
      {/* Price range */}
      <div>
        <label className="font-mono text-[10px] uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-subtle)' }}>Price Range (SZL)</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Min" value={filters.minPrice} onChange={e => set('minPrice', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'var(--bg-card-2)', color: 'var(--text)', border: '1px solid var(--border)' }} />
          <input type="number" placeholder="Max" value={filters.maxPrice} onChange={e => set('maxPrice', e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm" style={{ background: 'var(--bg-card-2)', color: 'var(--text)', border: '1px solid var(--border)' }} />
        </div>
      </div>
      {count > 0 && (
        <button onClick={reset} className="text-sm underline" style={{ color: 'var(--gold)' }}>Clear all filters</button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
        >
          Filters
          {count > 0 && (
            <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
              style={{ background: 'var(--gold)', color: '#06090f' }}>{count}</span>
          )}
        </button>
        {open && <div className="mt-4 p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>{filterBody}</div>}
      </div>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-60 shrink-0">
        <div className="sticky top-24 p-5 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Filters {count > 0 && <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold" style={{ background: 'var(--gold)', color: '#06090f' }}>{count}</span>}</h2>
          </div>
          {filterBody}
        </div>
      </aside>
    </>
  )
}
