'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { clients, type Client } from '@/lib/data'

function ClientCard({
  name,
  instagram,
  logo,
  logoFit = 'contain',
  index,
  isInView,
}: Pick<Client, 'name' | 'instagram' | 'logo'> & {
  logoFit?: Client['logoFit']
  index: number
  isInView: boolean
}) {
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = logo && !logoFailed
  const href = `https://www.instagram.com/${instagram}/`
  const isCover = logoFit === 'cover'

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -4 }}
      className="group flex min-h-[200px] flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-6 text-center transition hover:border-[var(--teal)]/50 sm:min-h-[220px]"
    >
      <div
        className={`flex h-[120px] w-[120px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--dark2)] ring-1 ring-[var(--border)]/80 sm:h-[136px] sm:w-[136px] ${isCover ? 'p-0' : 'p-3 sm:p-4'}`}
      >
        {showLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={name}
            className={
              isCover
                ? 'h-full w-full rounded-full object-cover object-center opacity-90 transition group-hover:opacity-100'
                : 'max-h-full max-w-full object-contain object-center opacity-90 transition group-hover:opacity-100'
            }
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span
            className="font-display px-2 text-center text-xs leading-tight text-white/80 transition group-hover:text-white sm:text-sm"
            style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            {name}
          </span>
        )}
      </div>
      <span className="text-xs text-white/55 transition group-hover:text-[var(--teal-light)] sm:text-sm">
        @{instagram}
      </span>
    </motion.a>
  )
}

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="clientes" ref={ref} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--pink)]/15 px-3 py-1 text-xs text-[var(--pink-light)]">
            Casos y cuentas
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl" style={{ fontWeight: 600 }}>
            Marcas que <span className="serif-accent text-[var(--pink-light)]">confían</span> en nosotros
          </h2>
          <p className="mt-3 text-sm text-white/55 sm:text-base">
            Algunas redes donde hago community manager y contenido.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {clients.map((c, i) => (
            <ClientCard
              key={c.instagram}
              name={c.name}
              instagram={c.instagram}
              logo={c.logo}
              logoFit={c.logoFit}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
