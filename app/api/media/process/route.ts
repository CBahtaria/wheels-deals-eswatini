import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { processImage } from '@/lib/media-pipeline'

export async function POST(_req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  const sb = createClient(url, key)

  // Pick oldest pending job
  const { data: job } = await sb
    .from('media_jobs')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })
    .limit(1)
    .single()
  if (!job) return NextResponse.json({ message: 'No pending jobs' })

  // Download raw file
  const { data: rawData, error: dlErr } = await sb.storage
    .from(job.bucket)
    .download(job.raw_path)
  if (dlErr || !rawData)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })

  const rawBuf = Buffer.from(await rawData.arrayBuffer())
  const { small, medium, large } = await processImage(rawBuf)

  const base = `${job.id}`
  const uploads = await Promise.all([
    sb.storage
      .from('processed-media')
      .upload(`${base}/small.webp`, small, { contentType: 'image/webp', upsert: true }),
    sb.storage
      .from('processed-media')
      .upload(`${base}/medium.webp`, medium, { contentType: 'image/webp', upsert: true }),
    sb.storage
      .from('processed-media')
      .upload(`${base}/large.webp`, large, { contentType: 'image/webp', upsert: true }),
  ])

  if (uploads.some(u => u.error))
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })

  const urls = {
    small:  sb.storage.from('processed-media').getPublicUrl(`${base}/small.webp`).data.publicUrl,
    medium: sb.storage.from('processed-media').getPublicUrl(`${base}/medium.webp`).data.publicUrl,
    large:  sb.storage.from('processed-media').getPublicUrl(`${base}/large.webp`).data.publicUrl,
  }

  await sb.from('media_jobs').update({ status: 'done', result: urls }).eq('id', job.id)
  return NextResponse.json({ id: job.id, urls })
}
