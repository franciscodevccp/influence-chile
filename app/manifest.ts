import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Influence Chile',
    short_name: 'Influence',
    description: 'Community manager y marketing en redes en Chile.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0e0e0e',
    theme_color: '#14B8BE',
    icons: [{ src: '/logo/logo.PNG', sizes: '256x256', type: 'image/png' }],
  }
}
