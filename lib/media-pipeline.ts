import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

// Magic bytes for supported image types
const MAGIC: Record<string, string> = {
  'image/jpeg': 'ffd8ff',
  'image/png':  '89504e47',
  'image/webp': '52494646',
  'image/gif':  '47494638',
}

export function validateFileHeader(buf: Buffer): string | null {
  const hex = buf.slice(0, 4).toString('hex')
  for (const [mime, magic] of Object.entries(MAGIC)) {
    if (hex.startsWith(magic)) return mime
  }
  return null
}

export async function readExifTimestamp(buf: Buffer): Promise<Date | null> {
  try {
    const meta = await sharp(buf).metadata()
    // exif is a Buffer; parse DateTimeOriginal manually (not always present)
    if (!meta.exif) return null
    const exifStr = meta.exif.toString('latin1')
    const match = exifStr.match(/(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})/)
    if (!match) return null
    const [, yr, mo, dy, hr, mn, sc] = match
    return new Date(`${yr}-${mo}-${dy}T${hr}:${mn}:${sc}`)
  } catch {
    return null
  }
}

export async function processImage(rawBuf: Buffer): Promise<{ small: Buffer; medium: Buffer; large: Buffer }> {
  const [small, medium, large] = await Promise.all([
    sharp(rawBuf).resize(150, null, { withoutEnlargement: true }).webp({ quality: 80 }).withMetadata().toBuffer(),
    sharp(rawBuf).resize(400, null, { withoutEnlargement: true }).webp({ quality: 82 }).withMetadata().toBuffer(),
    sharp(rawBuf).resize(800, null, { withoutEnlargement: true }).webp({ quality: 85 }).withMetadata().toBuffer(),
  ])
  return { small, medium, large }
}

function getSb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function enqueueJob(rawPath: string): Promise<string> {
  const sb = getSb()
  if (!sb) throw new Error('No Supabase client')
  const { data, error } = await sb
    .from('media_jobs')
    .insert({ raw_path: rawPath, bucket: 'raw-uploads', status: 'pending' })
    .select('id')
    .single()
  if (error) throw error
  return data.id
}
