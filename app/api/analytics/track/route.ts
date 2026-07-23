import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { session_id, event, payload } = await req.json()
  if (!session_id || !event) return NextResponse.json({ ok: false }, { status: 400 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ ok: true }) // graceful no-op if unconfigured

  const sb = createClient(url, key)
  await sb.from('user_events').insert({ session_id, event, payload: payload ?? null })
  return NextResponse.json({ ok: true })
}
