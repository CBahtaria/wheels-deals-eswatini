'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import type { Vehicle } from '@/lib/supabase'

const STATUS_STYLE: Record<string, { label: string; bg: string; color: string }> = {
  available: { label: 'Available',  bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  reserved:  { label: 'Reserved',   bg: 'rgba(244,185,66,0.15)', color: '#f4b942' },
  sold:      { label: 'Sold',       bg: 'rgba(239,68,68,0.15)',  color: '#ef4444' },
}

function fmtPrice(n: number) {
  return `SZL ${n.toLocaleString('en-ZA')}`
}

function fmtMileage(n: number) {
  return `${n.toLocaleString('en-ZA')} km`
}

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const status = STATUS_STYLE[vehicle.status] ?? STATUS_STYLE.available
  const sold = vehicle.status === 'sold'
  const reduced = useReducedMotion()
  const wa = `https://wa.me/26879106129?text=Hi%2C+I%27m+interested+in+the+${encodeURIComponent(`${vehicle.year} ${vehicle.make} ${vehicle.model}`)}+listed+on+your+website`

  return (
    <motion.div
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={sold || reduced ? {} : { y: -4 }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        opacity: sold ? 0.55 : 1,
        transition: 'box-shadow 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        if (!sold) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 0 1px rgba(244,185,66,0.2), 0 8px 32px rgba(0,0,0,0.4)'
          ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(244,185,66,0.25)'
        }
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
      }}
    >
      {/* Image */}
      <div className="relative" style={{ paddingBottom: '60%' }}>
        <Image
          src={vehicle.images[0] ?? 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80'}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        {/* Status badge */}
        <span
          className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full"
          style={{ background: status.bg, color: status.color, backdropFilter: 'blur(8px)' }}
        >
          {status.label}
        </span>
        {/* Price overlay */}
        <span
          className="absolute bottom-3 right-3 font-bold text-sm px-3 py-1 rounded-lg"
          style={{ background: 'rgba(6,9,15,0.88)', color: 'var(--gold)', backdropFilter: 'blur(8px)' }}
        >
          {fmtPrice(vehicle.price_szl)}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--text)' }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            fmtMileage(vehicle.mileage_km),
            vehicle.transmission,
            vehicle.fuel_type,
            vehicle.condition,
          ].map(spec => (
            <span
              key={spec}
              className="text-[11px] px-2 py-0.5 rounded-full"
              style={{ background: 'var(--bg-card-2)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/stock/${vehicle.id}`}
            className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium transition-colors"
            style={{ background: 'var(--bg-card-2)', color: 'var(--text)', border: '1px solid var(--border)' }}
          >
            View Details
          </Link>
          {!sold && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--gold)', color: '#06090f' }}
            >
              Enquire
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
