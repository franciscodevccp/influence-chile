'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { sectors } from '@/lib/data'
import { Icon } from '@/components/icons'
import type { CSSProperties } from 'react'

export default function SectorIndex() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="rubros" ref={ref} className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:mb-16"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Estrategia por rubro
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl" style={{ fontWeight: 600 }}>
            No hacemos lo mismo para{' '}
            <span className="serif-accent bg-gradient-to-r from-[var(--teal)] to-[var(--teal-light)] bg-clip-text text-transparent">
              todos
            </span>
            .
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55 sm:text-base">
            Elige tu industria y mira la estrategia exacta con la que te hacemos crecer. Sin recetas genéricas.
          </p>
        </motion.div>

        <div>
          {sectors.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border-b border-white/10 first:border-t"
            >
              <Link
                href={`/planes/${s.slug}`}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-6 sm:gap-6 sm:py-8"
                style={{ '--accent': s.accentHex } as CSSProperties}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 0% 50%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 62%)',
                  }}
                />

                <div className="relative flex items-center gap-3 sm:gap-5">
                  <span className="num hidden text-sm text-white/30 sm:inline">{s.indexNumber}</span>
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border transition group-hover:scale-105"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--accent) 32%, transparent)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon name={s.lucideIcon} size={20} aria-hidden />
                  </span>
                </div>

                <div className="relative min-w-0">
                  <h3
                    className="font-display text-lg text-white/90 transition group-hover:text-white sm:text-3xl"
                    style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-1 truncate text-xs text-white/45 sm:text-base">{s.hook}</p>
                </div>

                <div className="relative flex items-center gap-2 text-white/45 transition group-hover:text-[var(--accent)]">
                  <span className="hidden text-xs sm:inline">Ver estrategia</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-white/50">
          5 rubros · una estrategia distinta para cada uno
        </p>
      </div>
    </section>
  )
}
