import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MOCK_VEHICLES } from '@/lib/vehicles'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { VehicleCard } from '@/components/VehicleCard'
import { VehicleGallery } from '@/components/VehicleGallery'

export async function generateStaticParams() {
  return MOCK_VEHICLES.map(v => ({ id: v.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const v = MOCK_VEHICLES.find(x => x.id === id)
  if (!v) return {}
  return {
    title: `${v.year} ${v.make} ${v.model} — SZL ${v.price_szl.toLocaleString('en-ZA')}`,
    description: v.description ?? `${v.year} ${v.make} ${v.model} for sale in Manzini, Eswatini.`,
  }
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const vehicle = MOCK_VEHICLES.find(v => v.id === id)
  if (!vehicle) notFound()

  const related = MOCK_VEHICLES
    .filter(v => v.id !== id && v.status === 'available' && (v.make === vehicle.make || Math.abs(v.price_szl - vehicle.price_szl) < 60000))
    .slice(0, 3)

  const wa = `https://wa.me/26878000000?text=Hi%2C+I%27m+interested+in+the+${encodeURIComponent(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)}`

  const SPEC_ROWS = [
    ['Year', vehicle.year.toString()],
    ['Make', vehicle.make],
    ['Model', vehicle.model],
    ['Mileage', `${vehicle.mileage_km.toLocaleString('en-ZA')} km`],
    ['Transmission', vehicle.transmission],
    ['Fuel Type', vehicle.fuel_type],
    ['Body Type', vehicle.body_type ?? '—'],
    ['Colour', vehicle.colour ?? '—'],
    ['Condition', vehicle.condition],
  ]

  const STATUS_COLOR: Record<string, string> = {
    available: '#10b981',
    reserved: '#f4b942',
    sold: '#ef4444',
  }

  return (
    <>
      <Nav />
      <main className="pt-20 pb-16 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm" style={{ color: 'var(--text-subtle)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/stock" className="hover:text-white transition-colors">Stock</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-muted)' }}>{vehicle.year} {vehicle.make} {vehicle.model}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Gallery */}
            <VehicleGallery images={vehicle.images} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />

            {/* Details */}
            <div>
              {/* Status */}
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full mb-3"
                style={{ background: `${STATUS_COLOR[vehicle.status]}20`, color: STATUS_COLOR[vehicle.status] }}>
                {vehicle.status === 'available' ? 'Available' : vehicle.status === 'reserved' ? 'Reserved' : 'Sold'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-3xl font-bold mb-6" style={{ color: 'var(--gold)' }}>
                SZL {vehicle.price_szl.toLocaleString('en-ZA')}
              </p>

              {vehicle.description && (
                <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{vehicle.description}</p>
              )}

              {/* Spec table */}
              <div className="rounded-xl overflow-hidden mb-6" style={{ border: '1px solid var(--border)' }}>
                {SPEC_ROWS.map(([k, v], i) => (
                  <div key={k} className="flex justify-between px-4 py-2.5 text-sm"
                    style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-card-2)', borderBottom: i < SPEC_ROWS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              {vehicle.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text)' }}>Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {vehicle.features.map(f => (
                      <span key={f} className="text-xs px-3 py-1.5 rounded-full"
                        style={{ background: 'var(--bg-card-2)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              {vehicle.status !== 'sold' && (
                <div className="flex flex-col gap-3">
                  <a href={wa} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm"
                    style={{ background: '#25d366', color: 'white' }}>
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
                    </svg>
                    WhatsApp to Enquire
                  </a>
                  <Link href="/finance"
                    className="flex items-center justify-center py-4 rounded-xl font-semibold text-sm transition-colors"
                    style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
                    Calculate Finance
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>You Might Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((v, i) => <VehicleCard key={v.id} vehicle={v} index={i} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
