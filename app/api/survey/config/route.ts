import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ featured_body_types: [], layout_mode: 'default', cta_prominence: 'normal' })

  const sb = createClient(url, key)
  const { data } = await sb.from('site_config').select('key, value')

  const config: Record<string, unknown> = {
    featured_body_types: [],
    layout_mode: 'default',
    cta_prominence: 'normal',
  }
  for (const row of data ?? []) {
    config[row.key] = row.value
  }
  return NextResponse.json(config)
}
