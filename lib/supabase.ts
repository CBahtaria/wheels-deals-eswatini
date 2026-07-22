import { createClient } from '@supabase/supabase-js'

export type Vehicle = {
  id: string
  make: string
  model: string
  year: number
  mileage_km: number
  price_szl: number
  transmission: 'Manual' | 'Automatic'
  fuel_type: 'Petrol' | 'Diesel' | 'Hybrid'
  condition: 'Excellent' | 'Good' | 'Fair'
  description: string | null
  status: 'available' | 'sold' | 'reserved'
  images: string[]
  body_type: string | null
  colour: string | null
  features: string[]
  created_at: string
}

export type Inquiry = {
  id?: string
  name: string
  phone: string
  email?: string | null
  message: string
  vehicle_id?: string | null
  type: 'buy' | 'sell' | 'finance' | 'general'
  created_at?: string
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function getVehicles(): Promise<Vehicle[]> {
  const sb = getSupabase()
  if (!sb) {
    const { MOCK_VEHICLES } = await import('./vehicles')
    return MOCK_VEHICLES
  }
  try {
    const { data, error } = await sb.from('vehicles').select('*').order('created_at', { ascending: false })
    if (error || !data) throw error
    return data as Vehicle[]
  } catch {
    const { MOCK_VEHICLES } = await import('./vehicles')
    return MOCK_VEHICLES
  }
}

export async function getVehicle(id: string): Promise<Vehicle | null> {
  const sb = getSupabase()
  if (!sb) {
    const { MOCK_VEHICLES } = await import('./vehicles')
    return MOCK_VEHICLES.find(v => v.id === id) ?? null
  }
  try {
    const { data, error } = await sb.from('vehicles').select('*').eq('id', id).single()
    if (error || !data) throw error
    return data as Vehicle
  } catch {
    const { MOCK_VEHICLES } = await import('./vehicles')
    return MOCK_VEHICLES.find(v => v.id === id) ?? null
  }
}

export async function submitInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at'>): Promise<boolean> {
  const sb = getSupabase()
  if (!sb) return true
  try {
    const { error } = await sb.from('inquiries').insert(inquiry)
    return !error
  } catch {
    return false
  }
}
