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
  // Correo confirmado por el cliente. Ojo: el dominio del correo (influencechile.com) es distinto al del sitio (chileinfluence.cl).
  email: 'contacto@influencechile.com',
}

export const whatsappUrl = (planName?: string) => {
  const base = `https://wa.me/${contact.whatsapp}`
  const msg = planName
    ? `Hola, me interesa el plan "${planName}" de community manager`
    : 'Hola, me interesa conocer el servicio de community manager'
  return `${base}?text=${encodeURIComponent(msg)}`
}

/** Mensaje contextual por rubro y tier para los botones "Tomar plan". */
export const whatsappPlanUrl = (rubro: string, tier?: string) => {
  const base = `https://wa.me/${contact.whatsapp}`
  const msg = tier
    ? `Hola, me interesa el plan ${rubro} - ${tier}.`
    : `Hola, me interesa la estrategia de ${rubro} para mi marca.`
  return `${base}?text=${encodeURIComponent(msg)}`
}

/* ------------------------------------------------------------------ */
/* Tiers base — compartidos por todos los rubros                       */
/* ------------------------------------------------------------------ */

export type Tier = {
  name: string
  price: number
  tag: 'Recomendado' | 'Completo' | null
  /** true: muestra la píldora BONUS de influencers. false: muestra el candado de upsell. */
  bonus: boolean
  features: string[]
}

export const tiers: Tier[] = [
  {
    name: 'Plan Presencia',
    price: 290000,
    tag: null,
    bonus: false,
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
    bonus: true,
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
    bonus: true,
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

/* ------------------------------------------------------------------ */
/* Rubros / sectores                                                   */
/* ------------------------------------------------------------------ */

export type SectorPillar = { icon: string; title: string; desc: string }
export type SectorMetric = { value: string; label: string }
export type SectorFaq = { q: string; a: string }

export type Sector = {
  slug: string
  name: string
  /** Nombre del ícono lucide-react (resuelto en components/icons.tsx). */
  lucideIcon: string
  indexNumber: string
  accentHex: string
  accentSoftHex: string
  /** Subcadena exacta del headline que va en serif itálico acentuado. */
  serifWords: string
  headline: string
  subhead: string
  /** Gancho corto para la fila del índice en el home. */
  hook: string
  valueProp: string
  strategyParagraph: string
  pillars: SectorPillar[]
  trustElements: string[]
  objections: string[]
  idealClient: string
  ctaText: string
}

/** Métricas reales de la agencia (aplican a cualquier rubro). */
export const sectorMetrics: SectorMetric[] = [
  { value: '9', label: 'años creando contenido' },
  { value: '+2.4M', label: 'alcance gestionado' },
  { value: '+140K', label: 'seguidores de clientes' },
]

export const sectorFaq: SectorFaq[] = [
  {
    q: '¿Tienen permanencia o contrato largo?',
    a: 'No amarramos a nadie con cláusulas. Trabajamos mes a mes: te quedas porque ves resultados, no porque un contrato te obligue.',
  },
  {
    q: '¿Qué necesito entregar para empezar?',
    a: 'El acceso a tus cuentas (usuario y contraseña) y una carpeta con fotos y videos de tu marca. Del resto nos encargamos nosotros.',
  },
  {
    q: '¿La pauta publicitaria está incluida?',
    a: 'La gestión y creación de las campañas sí. El presupuesto de pauta (lo que se invierte en Meta o Google) lo defines tú y va por separado, con una tarjeta prepago.',
  },
  {
    q: '¿Cómo son los pagos?',
    a: 'Un abono inicial del 50% para arrancar y el resto el día 1 del mes siguiente. Pagos mensuales, simples y sin sorpresas.',
  },
  {
    q: '¿Cuándo empiezo a ver resultados?',
    a: 'El crecimiento orgánico real toma entre 1 y 3 meses. Desde el primer informe mensual verás métricas claras de alcance, interacción y desempeño.',
  },
]

export const sectors: Sector[] = [
  {
    slug: 'salud-estetica',
    name: 'Salud y Estética',
    lucideIcon: 'Stethoscope',
    indexNumber: '01',
    accentHex: '#14B8BE',
    accentSoftHex: '#5CE1E6',
    serifWords: 'más segura',
    headline: 'Tu paciente no busca el precio más bajo, busca la decisión más segura',
    subhead:
      'Construimos la autoridad médica de tu clínica en redes para que cada paciente llegue convencido, informado y listo para agendar.',
    hook: 'Confianza médica que llena tu agenda',
    valueProp: 'Convertimos la confianza en tu equipo médico en pacientes que agendan sin dudar.',
    strategyParagraph:
      'En salud y estética no se gana por precio, se gana por prestigio. Por eso nuestra estrategia ataca el verdadero freno del paciente: el miedo. Mostramos resultados reales con antes y después autorizados, ponemos cara y credenciales a tu equipo, exhibimos tu tecnología y educamos para derribar mitos, hasta que agendar contigo se sienta como la decisión más segura. Cada pieza está pensada para que el prospecto sienta que tu clínica domina su especialidad mucho antes de cruzar la puerta.',
    pillars: [
      { icon: 'Images', title: 'Antes y después autorizados', desc: 'Resultados reales y comprobables que demuestran tu trabajo.' },
      { icon: 'BadgeCheck', title: 'Equipo médico al frente', desc: 'Credenciales, formación y trayectoria que generan confianza.' },
      { icon: 'GraduationCap', title: 'Educación que derriba miedos', desc: 'Mitos, riesgos reales y respuestas a las dudas más comunes.' },
      { icon: 'Microscope', title: 'Tecnología y protocolos', desc: 'Tus equipos, la bioseguridad y el estándar de tu clínica.' },
      { icon: 'MessageSquareQuote', title: 'Testimonios en video', desc: 'Pacientes que cuentan su experiencia y su transformación.' },
    ],
    trustElements: [
      'Antes y después reales con consentimiento del paciente',
      'Profesionales con registro y credenciales visibles',
      'Protocolos de bioseguridad y tecnología de punta',
      'Reseñas y testimonios verificados de pacientes',
    ],
    objections: [
      'Me da miedo el procedimiento o que algo salga mal',
      'No sé si vale lo que cuesta frente a opciones más baratas',
      'No conozco al equipo ni sé si tienen la experiencia para tratarme',
    ],
    idealClient:
      'Clínicas estéticas, centros de medicina estética, dermatología, odontología y centros dentales que compiten por prestigio y resultados, no por precio.',
    ctaText: 'Quiero llenar mi agenda',
  },
  {
    slug: 'inmobiliario-construccion',
    name: 'Inmobiliario y Construcción',
    lucideIcon: 'Building2',
    indexNumber: '02',
    accentHex: '#5CE1E6',
    accentSoftHex: '#5CE1E6',
    serifWords: 'despertar',
    headline: 'No vendemos metros cuadrados. Vendemos el lugar donde tu cliente quiere despertar',
    subhead:
      'Estrategia de contenido aspiracional para inmobiliarias, constructoras y corredoras que apuntan a compradores ABC1. Convertimos tus proyectos en deseo, y el deseo en cotizaciones calificadas.',
    hook: 'Proyectos que se venden por deseo, no por precio',
    valueProp: 'Posicionamos tu proyecto como un estilo de vida deseable y captamos compradores listos para cotizar.',
    strategyParagraph:
      'El comprador de alto valor no decide por el precio del metro cuadrado: decide por la vida que imagina dentro de ese espacio y por la confianza en quien lo construye. Diseñamos una narrativa visual impecable y aspiracional —recorridos, lifestyle, avances de obra y respaldo de marca— que despierta el deseo y filtra a los curiosos de los compradores reales. Cada pieza está pensada para que tu proyecto se sienta exclusivo, seguro y una inversión inteligente, llenando tu CRM de cotizaciones calificadas, no de clics vacíos.',
    pillars: [
      { icon: 'Building2', title: 'Recorridos que venden estilo de vida', desc: 'No solo la planta: la vida que se imagina dentro del espacio.' },
      { icon: 'HardHat', title: 'Avance de obra y respaldo de marca', desc: 'Confianza que cierra ventas y filtra compradores reales.' },
      { icon: 'TrendingUp', title: 'Contenido de inversión', desc: 'Plusvalía, financiamiento y compra en verde, explicados claro.' },
      { icon: 'MapPin', title: 'Lifestyle del entorno', desc: 'Barrio, comuna y la experiencia de vivir ahí.' },
      { icon: 'KeyRound', title: 'Entregas y testimonios reales', desc: 'La prueba de que cumples lo que prometes.' },
    ],
    trustElements: [
      'Segmentación de pauta hacia perfiles ABC1 con intención real de compra',
      'Material visual de nivel showroom, coherente con tu marca',
      'Captación y filtro de leads calificados directo a tu equipo comercial',
      'Informe mensual con cotizaciones generadas y desempeño por proyecto',
    ],
    objections: [
      'Mi proyecto es de alto valor y no quiero que se vea barato ni masivo',
      'Recibo muchos mensajes pero casi ninguno califica ni llega a cotizar',
      'Vender en verde es difícil: el cliente no logra proyectar lo que aún no existe',
    ],
    idealClient:
      'Inmobiliarias, constructoras, corredoras y proyectos residenciales o de inversión que apuntan a compradores de alto poder adquisitivo (ABC1).',
    ctaText: 'Quiero más cotizaciones',
  },
  {
    slug: 'servicios-profesionales',
    name: 'Servicios Profesionales',
    lucideIcon: 'Briefcase',
    indexNumber: '03',
    accentHex: '#14B8BE',
    accentSoftHex: '#5CE1E6',
    serifWords: 'autoridad',
    headline: 'Tu expertise ya vale. Falta que el mercado lo vea como autoridad',
    subhead:
      'Contenido B2B para abogados, consultoras, contadores y asesores que quieren atraer empresas y decisores de alto nivel, no solo seguidores.',
    hook: 'Autoridad B2B que atrae clientes corporativos',
    valueProp: 'Posicionamos tu firma como la voz experta de tu sector, para que los clientes corporativos lleguen ya convencidos.',
    strategyParagraph:
      'En servicios profesionales no se vende con descuentos ni con feed bonito: se vende con autoridad. Construimos tu liderazgo intelectual traduciendo temas complejos —normativa, riesgos, contratos, gestión— en contenido claro y ejecutivo que un gerente entiende en 15 segundos. Trabajamos formatos que generan credibilidad real y los sostenemos en el tiempo, porque la confianza B2B se gana de forma progresiva. El resultado: cuando una empresa necesita lo que tú haces, ya te ve como el referente y llega lista para contratar.',
    pillars: [
      { icon: 'Lightbulb', title: 'Liderazgo intelectual', desc: 'Tu lectura experta de cambios normativos, fallos y tendencias.' },
      { icon: 'GraduationCap', title: 'Educación ejecutiva', desc: 'Temas complejos traducidos a lenguaje claro y accionable.' },
      { icon: 'ClipboardCheck', title: 'Casos y metodología', desc: 'Cómo resuelves problemas reales, sin revelar lo confidencial.' },
      { icon: 'Award', title: 'Prueba social corporativa', desc: 'Clientes, resultados y reconocimientos que validan tu trayectoria.' },
      { icon: 'Users', title: 'Detrás del experto', desc: 'Tu criterio y tu equipo, para humanizar la firma.' },
    ],
    trustElements: [
      'Años de trayectoria y especialización del equipo',
      'Casos de éxito y resultados medibles con clientes empresa',
      'Reconocimientos, certificaciones y membresías profesionales',
      'Cartera de clientes corporativos y testimonios de decisores',
    ],
    objections: [
      'Mi rubro es muy técnico y serio para redes sociales',
      'Mis clientes llegan por recomendación, no por Instagram',
      'No tengo tiempo ni quiero exponerme generando contenido',
    ],
    idealClient:
      'Estudios jurídicos, consultoras, firmas contables y asesores B2B que ya tienen expertise pero cuya presencia digital no comunica la autoridad que respaldan sus resultados.',
    ctaText: 'Posicionar mi firma',
  },
  {
    slug: 'gastronomia',
    name: 'Gastronomía',
    lucideIcon: 'UtensilsCrossed',
    indexNumber: '04',
    accentHex: '#e11d74',
    accentSoftHex: '#ff6ba3',
    serifWords: 'todos hablan',
    headline: 'El local del que todos hablan este fin de semana',
    subhead:
      'Contenido que da hambre, tendencias que se viralizan y mesas que se llenan. Convertimos tu cocina en el panorama que tu ciudad no se quiere perder.',
    hook: 'Contenido que da hambre y llena mesas',
    valueProp: 'Llenamos tus mesas con contenido que da hambre y se vuelve viral.',
    strategyParagraph:
      'En gastronomía no vendemos un plato, vendemos el antojo. La gente decide dónde comer mirando redes antes de abrir el mapa, así que atacamos ese momento exacto: food porn en Reels y TikTok bajo 30 segundos, sonido que provoca y tendencias montadas el día que están calientes. Después convertimos ese alcance en reservas con Historias que llevan directo a tu mesa, y sostenemos el tráfico con prueba social y contenido constante para que el local nunca pase de moda.',
    pillars: [
      { icon: 'Camera', title: 'Food porn en Reels y TikTok', desc: 'Tu plato estrella filmado para dar hambre con solo verlo.' },
      { icon: 'TrendingUp', title: 'Tendencias virales', desc: 'Montadas sobre tu carta el día exacto que están en su peak.' },
      { icon: 'Users', title: 'Prueba social masiva', desc: 'Clientes, fila en la puerta y mesas llenas que generan confianza.' },
      { icon: 'CalendarCheck', title: 'Historias que convierten', desc: 'Del antojo a la reserva o el pedido en un solo toque.' },
      { icon: 'Megaphone', title: 'Calendario de panoramas', desc: 'Promos de fin de semana y fechas clave para tráfico diario.' },
    ],
    trustElements: [
      '+2.4M de alcance gestionado en redes de marcas de consumo',
      '9 años creando contenido que se vuelve tendencia en Instagram y TikTok',
      'Foco en reservas y tráfico real, no solo en likes',
      'Reporte mensual con alcance, crecimiento y resultados',
    ],
    objections: [
      'Ya posteo mis platos y no pasa nada',
      'El delivery y las apps se llevan todo el margen',
      'Las redes no se traducen en ventas reales',
    ],
    idealClient:
      'Restaurantes de tendencia, cafeterías de especialidad, comida rápida premium, food trucks y locales nuevos que quieren llenar mesas todos los días.',
    ctaText: 'Quiero llenar mis mesas',
  },
  {
    slug: 'turismo',
    name: 'Turismo',
    lucideIcon: 'Tent',
    indexNumber: '05',
    accentHex: '#5CE1E6',
    accentSoftHex: '#5CE1E6',
    serifWords: 'nadie quiere perderse',
    headline: 'Que tu lugar sea el panorama que nadie quiere perderse',
    subhead:
      'Domos, cabañas, glampings y hostales boutique. Convertimos tu naturaleza, tu diseño y tu desconexión en reservas a precio full, todo el año, sin depender de descuentos.',
    hook: 'Reservas directas, a precio full, todo el año',
    valueProp: 'Llenamos tu calendario con huéspedes que reservan por deseo, no por descuento.',
    strategyParagraph:
      'En turismo no vendemos una noche de alojamiento: vendemos la sensación de "necesito estar ahí". Tu competencia compite por precio en las OTAs; nosotros construimos deseo. Mostramos el amanecer entre la neblina, el tinto frente a la tina caliente, el silencio que tu huésped no encuentra en la ciudad, y lo combinamos con escasez real para que la reserva se sienta urgente. El resultado: un huésped que llega por emoción, no por comparar tarifas, y que paga full porque ya se enamoró del lugar antes de escribirte.',
    pillars: [
      { icon: 'Video', title: 'Reels de inmersión', desc: 'El lugar como experiencia: amanecer, tina caliente, naturaleza.' },
      { icon: 'Flame', title: 'FOMO y escasez', desc: 'Disponibilidad limitada y fines de semana que se agotan.' },
      { icon: 'Gem', title: 'Estética aspiracional', desc: 'Tu domo o cabaña digno de pantalla completa.' },
      { icon: 'Star', title: 'Prueba social y UGC', desc: 'Huéspedes reales y reseñas que validan la experiencia.' },
      { icon: 'CalendarCheck', title: 'Reservas directas', desc: 'Del Reel al WhatsApp, sin intermediarios que se coman tu margen.' },
    ],
    trustElements: [
      'Experiencia gestionando Domos El Tabo: +140.000 seguidores',
      'Contenido pensado para temporada alta, fines de semana largos y feriados',
      'Foco en reserva directa por WhatsApp, sin comisión de plataformas',
      'Estrategia de escasez real, sin quemar tu marca con descuentos',
    ],
    objections: [
      'Mi lugar es lindo pero no se llena entre semana ni en temporada baja',
      'Dependo de Booking y Airbnb y me como la comisión en cada reserva',
      'No quiero bajar precios ni vivir de promociones para llenar el calendario',
    ],
    idealClient:
      'Dueños de domos, cabañas, glampings y hostales boutique con un lugar de alto valor estético que hoy se llena solo en temporada alta o depende de OTAs.',
    ctaText: 'Quiero llenar mi calendario',
  },
]

export const findSector = (slug: string) => sectors.find((s) => s.slug === slug)
