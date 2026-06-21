import type { Metadata } from 'next'
import { Space_Grotesk, Inter_Tight, Instrument_Serif } from 'next/font/google'
import './globals.css'
import MotionProvider from '@/components/MotionProvider'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
})

const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const SITE_URL = 'https://www.chileinfluence.cl'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Influence Chile · Community manager y marketing en redes',
    template: '%s · Influence Chile',
  },
  description:
    'Agencia de community manager y marketing en redes en Chile. Estrategia por rubro, contenido para Instagram y TikTok, gestión de comunidad e informes claros. +2.4M de alcance gestionado.',
  keywords: [
    'community manager Chile',
    'agencia de marketing digital Chile',
    'gestión de redes sociales',
    'community manager Santiago',
    'manejo de redes sociales Chile',
    'marketing en Instagram',
    'marketing en TikTok',
    'agencia de redes sociales',
    'community manager para restaurantes',
    'marketing inmobiliario Chile',
    'marketing para clínicas estéticas',
    'marketing para turismo',
  ],
  authors: [{ name: 'Influence Chile' }],
  creator: 'Influence Chile',
  publisher: 'Influence Chile',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Influence Chile',
    title: 'Influence Chile · Convertimos tus redes en clientes',
    description:
      'Community manager y marketing en redes en Chile. Estrategia por rubro para Instagram y TikTok, con informes claros. +2.4M de alcance gestionado.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Influence Chile — community manager y marketing en redes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Influence Chile · Convertimos tus redes en clientes',
    description:
      'Community manager y marketing en redes en Chile. Estrategia por rubro para Instagram y TikTok. +2.4M de alcance gestionado.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/logo/logo.PNG', type: 'image/png' }],
    apple: '/logo/logo.PNG',
  },
  category: 'marketing',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: 'Influence Chile',
  description:
    'Agencia de community manager y marketing en redes sociales en Chile. Gestión de Instagram y TikTok, contenido, estrategia por rubro e informes mensuales.',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/logo/logo.PNG`,
  telephone: '+56965450723',
  email: 'contacto@influencechile.com',
  priceRange: '$$',
  areaServed: { '@type': 'Country', name: 'Chile' },
  knowsLanguage: ['es'],
  sameAs: ['https://www.instagram.com/influence.chile'],
  founder: { '@type': 'Person', name: 'Sofía Cisternas' },
  slogan: 'Convertimos tus redes en clientes',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body className="grain">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[999] -translate-y-24 rounded-lg bg-[var(--teal)] px-4 py-2 text-sm font-semibold text-white transition-transform focus-visible:translate-y-0"
        >
          Ir al contenido
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
