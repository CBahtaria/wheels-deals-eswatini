import { NextRequest, NextResponse } from 'next/server'
import { getVehicles } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const make = searchParams.get('make')
  const status = searchParams.get('status')
  const minPrice = searchParams.get('min_price')
  const maxPrice = searchParams.get('max_price')

  let vehicles = await getVehicles()

  if (make) vehicles = vehicles.filter(v => v.make.toLowerCase() === make.toLowerCase())
  if (status) vehicles = vehicles.filter(v => v.status === status)
  if (minPrice) vehicles = vehicles.filter(v => v.price_szl >= parseInt(minPrice))
  if (maxPrice) vehicles = vehicles.filter(v => v.price_szl <= parseInt(maxPrice))

  return NextResponse.json(vehicles)
}
