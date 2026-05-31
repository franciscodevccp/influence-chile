export const stats = [
  { value: '+2.4M', label: 'Alcance gestionado' },
  { value: '+6', label: 'Marcas gestionadas' },
  { value: '9', label: 'Años de experiencia' },
  { value: '100%', label: 'Gestión personalizada' },
]

export type Plan = {
  name: string
  price: number
  tag: string | null
  features: string[]
}

export const plans: Plan[] = [
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
  { name: 'Resin Epoxic', instagram: 'resin.epoxic', logo: '/logo-tiendas/resin-epoxic.png' },
  { name: 'Yolé', instagram: 'colchones.yole', logo: '/logo-tiendas/yole.png' },
  // TODO: faltan los logos de Yeet y Onfayer en public/logo-tiendas/ (se muestra el nombre como respaldo).
  { name: 'Yeet', instagram: 'yeet.cl' },
  { name: 'Onfayer', instagram: 'onfayer' },
]

export const contact = {
  whatsapp: '56965450723',
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
