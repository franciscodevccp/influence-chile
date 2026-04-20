# Landing Page — Agencia Influence Marketing
## Instrucciones de instalación y estructura del proyecto

---

## 1. Requisitos previos

Asegúrate de tener instalado:

- Node.js v18 o superior
- pnpm (si no lo tienes: `npm install -g pnpm`)
- Git

---

## 2. Crear el proyecto

```bash
pnpm create next-app@latest influence-landing
```

Al correr el comando, selecciona estas opciones:

```
Would you like to use TypeScript? → Yes
Would you like to use ESLint? → Yes
Would you like to use Tailwind CSS? → Yes
Would you like to use the src/ directory? → No
Would you like to use App Router? → Yes
Would you like to customize the default import alias? → No
```

---

## 3. Instalar dependencias adicionales

```bash
cd influence-landing
pnpm add framer-motion lucide-react
```

---

## 4. Configurar exportación estática para Cloudflare Pages

Edita `next.config.js` para exportar el proyecto como sitio estático:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

> `images: { unoptimized: true }` es obligatorio cuando se usa `output: 'export'`
> porque el optimizador de imágenes de Next.js requiere un servidor.

---

## 5. Estructura de carpetas

```
influence-landing/
├── app/
│   ├── layout.tsx          # Layout global (fuentes, metadata, favicon)
│   ├── page.tsx            # Página principal (importa todas las secciones)
│   └── globals.css         # Estilos globales y variables CSS
│
├── components/
│   ├── Hero.tsx            # Sección hero con nombre, frase y botón CTA
│   ├── Stats.tsx           # Sección de estadísticas (2.4M, 140k, 9 años)
│   ├── Plans.tsx           # Sección de planes con precios interactivos
│   ├── Portfolio.tsx       # Logos de clientes (Domos, Yolé, Magic Resin...)
│   ├── Contact.tsx         # Botones de WhatsApp, Instagram y Email
│   └── Navbar.tsx          # Barra superior fija con logo (opcional)
│
├── public/
│   ├── logo.png            # Logo de la agencia
│   └── clients/            # Logos de los clientes en PNG fondo transparente
│       ├── domos.png
│       ├── yole.png
│       ├── magic-resin.png
│       ├── resin-epoxic.png
│       ├── jolie.png
│       └── vivero-vila.png
│
├── lib/
│   └── data.ts             # Datos de planes, stats y clientes (centralizado)
│
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 6. Variables CSS (globals.css)

Agrega estas variables en `app/globals.css` para mantener la paleta de la agencia:

```css
:root {
  --pink: #C8185A;
  --pink-light: #f0437a;
  --dark: #0e0e0e;
  --dark2: #161616;
  --card: #1a1a1a;
  --border: rgba(200, 24, 90, 0.2);
  --text: #f5f0f2;
  --muted: #8a7880;
}
```

---

## 7. Fuentes (layout.tsx)

Usa Google Fonts con next/font para mejor rendimiento:

```tsx
import { Syne, DM_Sans } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
})
```

---

## 8. Datos centralizados (lib/data.ts)

Centraliza toda la información aquí para no repetir datos en cada componente:

```ts
export const stats = [
  { value: '2.4M', label: 'Seguidores TikTok' },
  { value: '140K', label: 'Seguidores Domos' },
  { value: '9',   label: 'Años de experiencia' },
  { value: '7+',  label: 'Marcas gestionadas' },
]

export const plans = [
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

export const clients = [
  { name: 'Domos El Tabo',      logo: '/clients/domos.png' },
  { name: 'Yolé',               logo: '/clients/yole.png' },
  { name: 'Magic Resin',        logo: '/clients/magic-resin.png' },
  { name: 'Resin Epoxic',       logo: '/clients/resin-epoxic.png' },
  { name: 'Jolie Santofagasta', logo: '/clients/jolie.png' },
  { name: 'Vivero Vila',        logo: '/clients/vivero-vila.png' },
]

export const contact = {
  whatsapp: '56999070115',
  instagram: 'influence.chile',
  email: 'contacto@influencechile.com',
}
```

---

## 9. Secciones y su contenido

### Hero
- Logo de la agencia con animación de entrada
- Nombre: Sofia Cisternas
- Cargo: Community Manager · 9 años de experiencia
- Frase gancho: "Hago crecer marcas en redes sociales"
- Botón CTA: "Cotiza tu plan" → scrollea a sección Planes

### Stats
- 4 tarjetas con los números clave
- Animación de contador al entrar en pantalla (Framer Motion + useInView)

### Plans
- 4 planes en cards verticales
- Resaltar "Plan Crecimiento" como recomendado
- Indicar que los precios son + IVA
- Botón en cada plan que abre WhatsApp con mensaje predefinido

### Portfolio
- Grid de logos de clientes
- Fondo oscuro con logos en blanco o color
- Título: "Marcas que confían en nosotros"

### Contact
- 3 botones grandes para mobile: WhatsApp, Instagram, Email
- Iconos de Lucide React
- Botón WhatsApp abre `https://wa.me/56999070115`
- Botón Instagram abre `https://instagram.com/influence.chile`

---

## 10. Animaciones con Framer Motion

Patrón base para animar cada sección al hacer scroll:

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ref = useRef(null)
const isInView = useInView(ref, { once: true })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.5, ease: 'easeOut' }}
>
  ...
</motion.div>
```

---

## 11. Build y deploy en Cloudflare Pages

### Build local

```bash
pnpm run build
```

Esto genera la carpeta `/out` con el sitio estático listo para subir.

### Deploy desde GitHub (recomendado)

1. Sube el proyecto a un repositorio en GitHub
2. Entra a [pages.cloudflare.com](https://pages.cloudflare.com)
3. Clic en "Create a project" → "Connect to Git"
4. Selecciona el repositorio `influence-landing`
5. Configura el build así:

```
Framework preset:   Next.js (Static HTML Export)
Build command:      pnpm run build
Build output dir:   out
```

6. Clic en "Save and Deploy"

Cloudflare Pages hace deploy automático en cada push a la rama principal.

### Deploy manual con Wrangler

```bash
pnpm run build
pnpm dlx wrangler pages deploy out --project-name=influence-landing
```

---

## 12. Orden de desarrollo recomendado

1. Crear el proyecto e instalar dependencias
2. Configurar `next.config.js` con `output: 'export'`
3. Configurar `globals.css` con las variables y el fondo oscuro
4. Configurar fuentes en `layout.tsx`
5. Crear `lib/data.ts` con todos los datos
6. Desarrollar sección por sección: Hero → Stats → Plans → Portfolio → Contact
7. Agregar animaciones con Framer Motion al final
8. Correr `pnpm run build` y verificar que la carpeta `/out` se genere sin errores
9. Revisar en móvil antes de hacer deploy

---

## Notas finales

- La página es mobile-first. Todo debe verse bien en pantallas de 375px a 430px antes de revisar desktop.
- Los precios van formateados con `toLocaleString('es-CL')` para mostrar el separador de miles correcto en Chile.
- Todos los botones de contacto deben abrir en nueva pestaña con `target="_blank" rel="noopener noreferrer"`.
- El botón de WhatsApp puede incluir un mensaje predefinido en la URL:
  `https://wa.me/56999070115?text=Hola%20Sofia%2C%20me%20interesa%20cotizar%20un%20plan`
- Cloudflare Pages no tiene restricciones comerciales, a diferencia de Vercel que limita el uso en proyectos de clientes bajo su plan gratuito.
