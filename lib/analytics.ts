export type Prefs = {
  body_types: string[]      // ordered most-viewed first
  fuel_types: string[]
  transmissions: string[]
  price_min: number
  price_max: number
  makes: string[]
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('wd_session')
  if (!id) { id = crypto.randomUUID(); localStorage.setItem('wd_session', id) }
  return id
}

export async function track(event: string, payload?: Record<string, unknown>): Promise<void> {
  const sessionId = getSessionId()
  if (!sessionId) return
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, event, payload }),
    })
  } catch { /* best-effort */ }
}

export function scoreVehicle(v: { body_type?: string | null; fuel_type?: string; transmission?: string; price_szl?: number; make?: string }, prefs: Prefs): number {
  let score = 0
  if (v.body_type && prefs.body_types.includes(v.body_type)) score += 3
  if (v.fuel_type && prefs.fuel_types.includes(v.fuel_type)) score += 2
  if (v.transmission && prefs.transmissions.includes(v.transmission)) score += 2
  if (v.price_szl && v.price_szl >= prefs.price_min && v.price_szl <= prefs.price_max) score += 4
  if (v.make && prefs.makes.includes(v.make)) score += 3
  return score
}
