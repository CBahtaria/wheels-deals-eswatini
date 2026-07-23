export type SiteConfig = {
  featured_body_types: string[]
  layout_mode: 'default' | 'mobile-first'
  cta_prominence: 'normal' | 'high'
}

export async function fetchSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch('/api/survey/config', { next: { revalidate: 300 } })
    if (!res.ok) throw new Error('fetch failed')
    return res.json()
  } catch {
    return { featured_body_types: [], layout_mode: 'default', cta_prominence: 'normal' }
  }
}
