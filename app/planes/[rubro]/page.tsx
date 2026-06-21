import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { sectors, findSector } from '@/lib/data'
import SectorPage from '@/components/SectorPage'

export const dynamicParams = false

export function generateStaticParams() {
  return sectors.map((s) => ({ rubro: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ rubro: string }>
}): Promise<Metadata> {
  const { rubro } = await params
  const sector = findSector(rubro)
  if (!sector) return { title: 'Rubro no encontrado' }
  const url = `/planes/${sector.slug}`
  const name = sector.name.toLowerCase()
  return {
    title: `${sector.name} · Estrategia de redes`,
    description: `${sector.valueProp} Community manager y marketing en redes para ${name} en Chile.`,
    keywords: [
      `community manager ${name}`,
      `marketing para ${name} Chile`,
      `redes sociales ${name}`,
      'gestión de Instagram',
      'TikTok',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: 'Influence Chile',
      title: `${sector.name} · Influence Chile`,
      description: sector.subhead,
      images: ['/og-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sector.name} · Influence Chile`,
      description: sector.subhead,
      images: ['/og-image.png'],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ rubro: string }> }) {
  const { rubro } = await params
  const sector = findSector(rubro)
  if (!sector) notFound()
  return <SectorPage sector={sector} />
}
