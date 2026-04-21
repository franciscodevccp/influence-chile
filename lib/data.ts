export const stats = [
  { value: '3.9K', label: 'Comunidad Instagram' },
  { value: '65', label: 'Publicaciones' },
  { value: '9', label: 'Años en la industria' },
  { value: '6', label: 'Marcas gestionadas' },
]

export type Plan = {
  name: string
  price: number
  tag: string | null
  features: string[]
}

export const plans: Plan[] = [
  {
    name: 'Contenido Estratégico',
    price: 69990,
    tag: 'Solo ideas',
    features: [
      '3 ideas de Reels con guion',
      '12 ideas de Posts para el Feed',
      '12 ideas de Historias',
    ],
  },
  {
    name: 'Plan Presencia',
    price: 290000,
    tag: null,
    features: [
      '4 Reels mensuales',
      '4 publicaciones (post o carrusel)',
      '8 historias mensuales',
      'Edición de video',
      'Informe mensual',
    ],
  },
  {
    name: 'Plan Crecimiento',
    price: 450000,
    tag: 'Recomendado',
    features: [
      '8 Reels mensuales',
      '8 publicaciones',
      '12 historias mensuales',
      'Edición profesional',
      'Monitoreo de comentarios',
      'Informe mensual',
    ],
  },
  {
    name: 'Plan Autoridad',
    price: 749990,
    tag: 'Completo',
    features: [
      '12 Reels mensuales',
      '12 publicaciones',
      '20 historias mensuales',
      'Meta Ads incluido',
      'Optimización continua',
      'Informe mensual',
    ],
  },
]

/** Cuentas reales gestionadas. `instagram` = usuario sin @ (solo letras, números, . y _). */
export type Client = {
  name: string
  instagram: string
  logo?: string
  /** `cover`: recorta en círculo (p. ej. logo horizontal con fondo rectangular). Resto: `contain`. */
  logoFit?: 'contain' | 'cover'
}

/** Logos en `public/logo-tiendas/` — revisa extensiones (.png / .jpeg). */
export const clients: Client[] = [
  { name: 'Domos El Tabo', instagram: 'domoseltabo', logo: '/logo-tiendas/domos.png' },
  { name: 'Magic Resin', instagram: 'magicresin.cl', logo: '/logo-tiendas/magic.jpeg', logoFit: 'cover' },
  { name: 'Resin Epoxic', instagram: 'resinepoxicchile', logo: '/logo-tiendas/resin-epoxic.png' },
  { name: 'Yolé', instagram: 'yole.cl', logo: '/logo-tiendas/yole.png' },
  { name: 'Yeet', instagram: 'yeet.cl', logo: '/logo-tiendas/yeet.png' },
  { name: 'Onfayer', instagram: 'onfayer', logo: '/logo-tiendas/onfayer.png' },
]

export const contact = {
  whatsapp: '56999070115',
  instagram: 'influence.chile',
  email: 'contacto@influencechile.com',
}

export const whatsappUrl = (planName?: string) => {
  const base = `https://wa.me/${contact.whatsapp}`
  const msg = planName
    ? `Hola, me interesa el plan "${planName}" de community manager`
    : 'Hola, me interesa conocer el servicio de community manager'
  return `${base}?text=${encodeURIComponent(msg)}`
}
