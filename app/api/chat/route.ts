import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getVehicles } from '@/lib/supabase'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function buildInventoryContext(): Promise<string> {
  try {
    const vehicles = await getVehicles()
    const available = vehicles.filter(v => v.status === 'available')
    if (available.length === 0) return 'No vehicles currently listed — direct customers to WhatsApp for latest stock.'
    return available.map(v =>
      `• ${v.year} ${v.make} ${v.model} — SZL ${v.price_szl.toLocaleString('en-ZA')} | ${v.mileage_km.toLocaleString('en-ZA')}km | ${v.transmission} | ${v.fuel_type} | ${v.condition} condition | ID: ${v.id}`
    ).join('\n')
  } catch {
    return 'Inventory temporarily unavailable — direct customers to WhatsApp for current stock.'
  }
}

const SYSTEM_PROMPT_BASE = `You are Thandi, the friendly car sales assistant for Wheels & Deals Eswatini — a used car dealership in Manzini, Eswatini.

Your personality:
- Warm, helpful, and knowledgeable about cars
- You speak in a friendly, conversational way
- You understand the Eswatini market: prices in SZL, local conditions, customer budget concerns
- You never pressure customers — you help them find what fits their needs and budget
- Keep responses concise and practical (2-4 sentences max per topic unless asked for details)
- You can communicate in English and basic siSwati greetings (Sawubona = Hello, Ngiyabonga = Thank you)

Your capabilities:
- Help customers find vehicles that match their budget, needs, and preferences
- Explain vehicle specs, features, and condition honestly
- Provide finance estimates (monthly payment = P×[r(1+r)^n]/[(1+r)^n-1] where r = monthly rate)
- Explain the buying and selling process
- Direct customers to WhatsApp (+268 7910 6129) for viewings and formal enquiries
- Never invent vehicles not in the inventory list

Business info:
- Location: Matsapha, M200, Eswatini
- Trading hours: Mon–Fri 08:00–17:00, Sat 08:00–13:00, Sun closed
- WhatsApp: +268 7910 6129 (fastest response)
- Phone: +268 7970 2853
- Facebook: Wheels and Deals Eswatini
- All prices in SZL (Swazi Lilangeni, 1:1 with ZAR)

Services offered:
- Delivery: we can deliver the vehicle to your location in Eswatini
- In-store: visit our Matsapha showroom on the M200 for test drives and viewings
- Pickup In-store shopping: purchase remotely then collect at our yard

Finance guidance:
- Typical interest rates: 12–16% per annum
- Terms: 12–60 months
- We facilitate introductions to finance partners
- For a quick estimate: share price, deposit, and preferred term and I'll calculate

When to direct to WhatsApp:
- Booking viewings
- Making an offer
- Formal finance applications
- Selling your car
- Negotiating price`

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'Messages required' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      role: 'assistant',
      content: "Sawubona! I'm Thandi 👋 For the fastest help with our current stock, WhatsApp us directly at +268 7910 6129 — we'll get back to you right away! 🚗",
    })
  }

  const inventoryContext = await buildInventoryContext()
  const systemPrompt = `${SYSTEM_PROMPT_BASE}\n\nCurrent available inventory:\n${inventoryContext}`

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    system: systemPrompt,
    messages: messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  return NextResponse.json({ role: 'assistant', content: text })
}
