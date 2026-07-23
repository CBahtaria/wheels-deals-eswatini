import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateFileHeader, enqueueJob } from '@/lib/media-pipeline'

const MAX_SIZE = 20 * 1024 * 1024 // 20 MB

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  if (file.size > MAX_SIZE)
    return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 413 })

  const buf = Buffer.from(await file.arrayBuffer())
  const mime = validateFileHeader(buf)
  if (!mime) return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key)
    return NextResponse.json({ error: 'Storage not configured' }, { status: 500 })

  const sb = createClient(url, key)
  const ext = mime.split('/')[1]
  const rawPath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error: uploadError } = await sb.storage
    .from('raw-uploads')
    .upload(rawPath, buf, { contentType: mime })
  if (uploadError)
    return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const uploadId = await enqueueJob(rawPath)
  return NextResponse.json({ uploadId, status: 'processing' })
}
