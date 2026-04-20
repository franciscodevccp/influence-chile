import type { Metadata } from 'next'
import { Space_Grotesk, Inter_Tight, Instrument_Serif } from 'next/font/google'
import './globals.css'

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

export const metadata: Metadata = {
  title: 'Influence Chile · Community manager en redes sociales',
  description:
    'Community manager en Chile. Gestión de Instagram y redes: contenido, calendario, interacción con tu comunidad e informes claros para tu marca.',
  icons: {
    icon: '/logo/logo.PNG',
    apple: '/logo/logo.PNG',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body className="grain">{children}</body>
    </html>
  )
}
