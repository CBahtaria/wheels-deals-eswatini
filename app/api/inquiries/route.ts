import { NextRequest, NextResponse } from 'next/server'
import { submitInquiry } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid request' }, { status: 400 })

  const { name, phone, message, type, email, vehicle_id, make, model, year, mileage, condition, asking_price } = body

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: 'Name and phone are required' }, { status: 422 })
  }

  const validTypes = ['buy', 'sell', 'finance', 'general']
  const inquiryType = validTypes.includes(type) ? type : 'general'

  const fullMessage = type === 'sell'
    ? `SELL ENQUIRY — ${make} ${model} (${year}) | ${mileage}km | Condition: ${condition} | Asking: ${asking_price ?? 'Not specified'} | Notes: ${message ?? '—'}`
    : (message ?? '—')

  await submitInquiry({
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() ?? null,
    message: fullMessage,
    vehicle_id: vehicle_id ?? null,
    type: inquiryType as 'buy' | 'sell' | 'finance' | 'general',
  })

  return NextResponse.json({
    success: true,
    message: "We'll be in touch via WhatsApp within 1 hour.",
  })
}
