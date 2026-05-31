'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { stats } from '@/lib/data'

function parseTarget(value: string) {
  // Captura prefijo (+), número y sufijo (K, M, %, …) → "+2.4M" => {prefix:'+', num:2.4, suffix:'M'}
  const match = value.match(/^([^\d.-]*)([\d.]+)(.*)$/)
  if (!match) return { prefix: '', num: 0, suffix: value }
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] }
}

function Counter({ value, inView }: { value: string; inView: boolean }) {
  const { prefix, num, suffix } = parseTarget(value)
  const ref = useRef<HTMLSpanElement>(null)
  // Si el objetivo tiene decimales (p. ej. 3.9K) mostramos 1 decimal; si no, entero con separador de miles.
  const isDecimal = !Number.isInteger(num)

  useEffect(() => {
    if (!inView) return
    const format = (v: number) =>
      isDecimal ? v.toFixed(1) : Math.round(v).toLocaleString('es-CL')
    const controls = animate(0, num, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, num, isDecimal])

  return (
    <span className="num text-4xl sm:text-5xl bg-gradient-to-br from-white to-[var(--teal-light)] bg-clip-text text-transparent" style={{ fontWeight: 600 }}>
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl bg-[var(--card)] border border-[var(--border)] p-5 sm:p-6 text-center"
          >
            <Counter value={s.value} inView={isInView} />
            <p className="mt-3 text-xs sm:text-sm text-[var(--muted)] leading-snug tracking-wide uppercase" style={{ fontSize: '11px', letterSpacing: '0.08em' }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
