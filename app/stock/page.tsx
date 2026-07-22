'use client'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { VehicleCard } from '@/components/VehicleCard'
import { SearchFilter } from '@/components/SearchFilter'
import { MOCK_VEHICLES } from '@/lib/vehicles'
import type { Vehicle } from '@/lib/supabase'

const available = MOCK_VEHICLES.filter(v => v.status !== 'sold')
const unavailable = MOCK_VEHICLES.filter(v => v.status === 'sold')
const ALL = [...available, ...unavailable]

function StockContent() {
  const params = useSearchParams()
  const q = params.get('q') ?? ''
  const [filtered, setFiltered] = useState<Vehicle[]>(ALL)

  return (
    <>
      <Nav />
      <main className="pt-24 pb-16 px-4 md:px-6 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>All Vehicles</p>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
              Browse Stock
              <span className="ml-3 font-mono text-lg font-normal" style={{ color: 'var(--text-subtle)' }}>
                ({filtered.length})
              </span>
            </h1>
            {q && <p className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>Search results for &ldquo;{q}&rdquo;</p>}
          </div>

          <div className="flex gap-6">
            <SearchFilter vehicles={ALL} onFilter={setFiltered} />
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>No vehicles found</p>
                  <p style={{ color: 'var(--text-muted)' }}>Try adjusting your filters or WhatsApp us to find your car.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {filtered.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function StockPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Loading stock…</p>
      </div>
    }>
      <StockContent />
    </Suspense>
  )
}
