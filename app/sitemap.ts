import type { MetadataRoute } from 'next'
import { sectors } from '@/lib/data'

export const dynamic = 'force-static'

const SITE_URL = 'https://www.chileinfluence.cl'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...sectors.map((s) => ({
      url: `${SITE_URL}/planes/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
