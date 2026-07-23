import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const EMPTY_PREFS = { body_types: [], fuel_types: [], transmissions: [], price_min: 0, price_max: Infinity, makes: [] }

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')
  if (!sessionId) return NextResponse.json(EMPTY_PREFS)

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json(EMPTY_PREFS)

  const sb = createClient(url, key)
  const { data } = await sb
    .from('user_events')
    .select('payload')
    .eq('session_id', sessionId)
    .eq('event', 'vehicle_view')
    .limit(100)

  if (!data || data.length === 0) return NextResponse.json(EMPTY_PREFS)

  // Aggregate
  const bodyCount: Record<string, number> = {}
  const fuelCount: Record<string, number> = {}
  const transCount: Record<string, number> = {}
  const makeCount: Record<string, number> = {}
  const prices: number[] = []

  for (const row of data) {
    const p = row.payload as Record<string, unknown> | null
    if (!p) continue
    if (p.body_type) bodyCount[p.body_type as string] = (bodyCount[p.body_type as string] ?? 0) + 1
    if (p.fuel_type) fuelCount[p.fuel_type as string] = (fuelCount[p.fuel_type as string] ?? 0) + 1
    if (p.transmission) transCount[p.transmission as string] = (transCount[p.transmission as string] ?? 0) + 1
    if (p.make) makeCount[p.make as string] = (makeCount[p.make as string] ?? 0) + 1
    if (typeof p.price_szl === 'number') prices.push(p.price_szl)
  }

  const sortDesc = (m: Record<string, number>) => Object.entries(m).sort((a, b) => b[1] - a[1]).map(([k]) => k)
  const avgPrice = prices.length ? prices.reduce((a, b) => a + b, 0) / prices.length : 0

  return NextResponse.json({
    body_types: sortDesc(bodyCount),
    fuel_types: sortDesc(fuelCount),
    transmissions: sortDesc(transCount),
    makes: sortDesc(makeCount),
    price_min: avgPrice ? avgPrice * 0.6 : 0,
    price_max: avgPrice ? avgPrice * 1.4 : Infinity,
  })
}
