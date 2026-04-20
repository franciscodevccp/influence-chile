'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Star } from 'lucide-react'
import { plans, whatsappUrl } from '@/lib/data'

export default function Plans() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="planes" ref={ref} className="relative px-5 py-20 sm:py-28 overflow-visible">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs bg-[var(--teal)]/15 text-[var(--teal-light)] border border-[var(--border)]">
            Community manager
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl" style={{ fontWeight: 600 }}>
            Elige el <span className="serif-accent text-[var(--teal-light)]">ritmo</span> de tu marca
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">
            Planes de gestión de redes y contenido · Precios mensuales · Valores + IVA
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => {
            const isRecommended = plan.tag === 'Recomendado'
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-3xl border p-6 pt-5 ${
                  isRecommended
                    ? 'border-[var(--teal)] bg-gradient-to-b from-[var(--teal)]/20 to-[var(--card)] shadow-[0_0_36px_rgba(20,184,190,0.28)]'
                    : 'border-[var(--border)] bg-[var(--card)]'
                }`}
              >
                <div className="mb-3 flex min-h-[36px] items-center justify-center">
                  {plan.tag ? (
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide ${
                        isRecommended
                          ? 'bg-gradient-to-r from-[var(--teal)] to-[var(--teal-deep)] text-white shadow-[0_4px_16px_rgba(20,184,190,0.45)]'
                          : 'border border-[var(--border)] bg-[var(--dark2)] text-[var(--teal-light)]'
                      }`}
                    >
                      {isRecommended && <Star size={11} fill="currentColor" className="shrink-0" aria-hidden />}
                      {plan.tag}
                    </span>
                  ) : null}
                </div>

                <h3 className="font-display text-xl" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                  {plan.name}
                </h3>

                <div className="mt-5 mb-6 border-b border-white/5 pb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-white/40" style={{ fontWeight: 400 }}>
                      $
                    </span>
                    <span className="num text-4xl" style={{ fontWeight: 500 }}>
                      {plan.price.toLocaleString('es-CL')}
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] uppercase tracking-widest text-[var(--muted)]">CLP mensual + IVA</p>
                </div>

                <ul className="flex-1 space-y-2.5 text-sm text-white/80">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          isRecommended ? 'bg-[var(--teal)]' : 'bg-[var(--teal)]/25'
                        }`}
                      >
                        <Check size={10} className="text-white" strokeWidth={3} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappUrl(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-full py-3 text-center text-sm font-semibold text-white transition ${
                    isRecommended
                      ? 'bg-gradient-to-r from-[var(--teal-light)] to-[var(--teal)] shadow-[0_8px_28px_rgba(20,184,190,0.4)] hover:brightness-110'
                      : 'bg-[var(--teal)] hover:bg-[var(--teal-light)] hover:text-[var(--dark)]'
                  }`}
                >
                  Cotizar por WhatsApp
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
