import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { createClient } from '@supabase/supabase-js'

function authOk(req: NextRequest): boolean {
  const header = req.headers.get('x-admin-secret') ?? ''
  const secret = process.env.ADMIN_SECRET ?? ''
  if (!header || !secret) return false
  const a = Buffer.from(header)
  const b = Buffer.from(secret)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  if (!authOk(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ error: 'No DB' }, { status: 500 })
  const sb = createClient(url, key)
  const payload = await req.json()
  const { data, error } = await sb.from('vehicles').insert(payload).select('id').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ id: data.id })
}
