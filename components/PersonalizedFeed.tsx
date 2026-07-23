'use client'
import { useEffect, useState } from 'react'
import { VehicleCard } from './VehicleCard'
import type { Vehicle } from '@/lib/supabase'
import { getSessionId, track, scoreVehicle, type Prefs } from '@/lib/analytics'
import { fetchSiteConfig, type SiteConfig } from '@/lib/adaptive'

interface Props {
  vehicles: Vehicle[]
}

const EMPTY_PREFS: Prefs = { body_types: [], fuel_types: [], transmissions: [], price_min: 0, price_max: Infinity, makes: [] }

export function PersonalizedFeed({ vehicles }: Props) {
  const [ordered, setOrdered] = useState<Vehicle[]>(vehicles)
  const [config, setConfig] = useState<SiteConfig>({ featured_body_types: [], layout_mode: 'default', cta_prominence: 'normal' })

  useEffect(() => {
    fetchSiteConfig().then(setConfig).catch(() => {})
  }, [])

  useEffect(() => {
    const sessionId = getSessionId()
    if (!sessionId) return
    fetch(`/api/analytics/preferences?session_id=${sessionId}`)
      .then(r => r.ok ? r.json() : EMPTY_PREFS)
      .then((prefs: Prefs) => {
        const hasPrefs = prefs.body_types.length > 0 || prefs.makes.length > 0
        const sorted = [...vehicles].sort((a, b) => {
          let scoreA = scoreVehicle(a, hasPrefs ? prefs : EMPTY_PREFS)
          let scoreB = scoreVehicle(b, hasPrefs ? prefs : EMPTY_PREFS)
          if (a.body_type && config.featured_body_types.includes(a.body_type)) scoreA += 5
          if (b.body_type && config.featured_body_types.includes(b.body_type)) scoreB += 5
          return scoreB - scoreA
        })
        if (hasPrefs || config.featured_body_types.length > 0) setOrdered(sorted)
      })
      .catch(() => { /* keep original order */ })
  }, [vehicles, config])

  function handleClick(v: Vehicle) {
    track('vehicle_view', {
      id: v.id,
      make: v.make,
      model: v.model,
      body_type: v.body_type,
      fuel_type: v.fuel_type,
      transmission: v.transmission,
      price_szl: v.price_szl,
    })
    window.dispatchEvent(new Event('wd_vehicle_viewed'))
  }

  return (
    <div className={config.layout_mode === 'mobile-first' ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'}>
      {ordered.map((v, i) => (
        <div key={v.id} onClick={() => handleClick(v)}>
          <VehicleCard vehicle={v} index={i} />
        </div>
      ))}
    </div>
  )
}
