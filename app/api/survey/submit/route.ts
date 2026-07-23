import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { session_id, q_found_vehicle, q_ease_rating, q_device, q_improvements, q_open } = body
  if (!session_id) return NextResponse.json({ ok: false }, { status: 400 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ ok: true }) // no-op if unconfigured

  const sb = createClient(url, key)
  const { error } = await sb.from('survey_responses').insert({ session_id, q_found_vehicle, q_ease_rating, q_device, q_improvements, q_open })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  // Fire adaptive update without awaiting (fire-and-forget)
  triggerAdaptiveUpdate(url, key).catch(() => {})

  return NextResponse.json({ ok: true })
}

async function triggerAdaptiveUpdate(url: string, key: string): Promise<void> {
  const sb = createClient(url, key)

  // Aggregate last 50 survey responses
  const { data: surveys } = await sb.from('survey_responses').select('q_device, q_ease_rating').order('created_at', { ascending: false }).limit(50)
  if (!surveys || surveys.length === 0) return

  const mobileCount = surveys.filter((s: { q_device: string; q_ease_rating: number }) => s.q_device === 'mobile').length
  const avgRating = surveys.reduce((sum: number, s: { q_device: string; q_ease_rating: number }) => sum + (s.q_ease_rating ?? 0), 0) / surveys.length

  // Aggregate vehicle view events for body type demand
  const { data: events } = await sb.from('user_events').select('payload').eq('event', 'vehicle_view').limit(500)
  const bodyCount: Record<string, number> = {}
  for (const e of events ?? []) {
    const bt = (e.payload as Record<string, unknown> | null)?.body_type as string | undefined
    if (bt) bodyCount[bt] = (bodyCount[bt] ?? 0) + 1
  }
  const topBodies = Object.entries(bodyCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k)

  const updates = [
    sb.from('site_config').upsert({ key: 'featured_body_types', value: topBodies, updated_at: new Date().toISOString() }),
    sb.from('site_config').upsert({ key: 'layout_mode', value: mobileCount / surveys.length > 0.6 ? 'mobile-first' : 'default', updated_at: new Date().toISOString() }),
    sb.from('site_config').upsert({ key: 'cta_prominence', value: avgRating < 3.0 ? 'high' : 'normal', updated_at: new Date().toISOString() }),
  ]
  await Promise.all(updates)
}
