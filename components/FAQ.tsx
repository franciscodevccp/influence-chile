'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { sectorFaq } from '@/lib/data'

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" ref={ref} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-14"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Preguntas frecuentes
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl" style={{ fontWeight: 600 }}>
            Lo que más nos{' '}
            <span className="serif-accent bg-gradient-to-r from-[var(--teal)] to-[var(--teal-light)] bg-clip-text text-transparent">
              preguntan
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/55 sm:text-base">
            Sin letra chica. Si te queda otra duda, escríbenos por WhatsApp y te respondemos al toque.
          </p>
        </motion.div>

        <div className="space-y-3">
          {sectorFaq.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03]"
                >
                  <span
                    className="font-display text-base text-white/90 sm:text-lg"
                    style={{ fontWeight: 600, letterSpacing: '-0.02em' }}
                  >
                    {item.q}
                  </span>
                  <Plus
                    size={20}
                    className={`shrink-0 text-[var(--teal-light)] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                      id={`faq-a-${i}`}
                      role="region"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-white/65 sm:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
