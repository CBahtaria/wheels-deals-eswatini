import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const secret = process.env.ADMIN_SECRET ?? ''
  if (!password || !secret) return NextResponse.json({ ok: false }, { status: 401 })
  const a = Buffer.from(password)
  const b = Buffer.from(secret)
  const ok = a.length === b.length && timingSafeEqual(a, b)
  return NextResponse.json({ ok }, { status: ok ? 200 : 401 })
}
