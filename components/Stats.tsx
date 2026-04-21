'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { stats } from '@/lib/data'

function parseTarget(value: string) {
  const match = value.match(/([\d.]+)([A-Za-z+]*)/)
  if (!match) return { num: 0, suffix: value }
  return { num: parseFloat(match[1]), suffix: match[2] }
}

function Counter({ value, inView }: { value: string; inView: boolean }) {
  const { num, suffix } = parseTarget(value)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    num < 10 ? Math.round(v).toString() : v.toFixed(num % 1 === 0 ? 0 : 1),
  )
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, num, { duration: 1.6, ease: 'easeOut' })
    const unsub = rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [inView, num, count, rounded])

  return (
    <span className="num text-4xl sm:text-5xl bg-gradient-to-br from-white to-[var(--teal-light)] bg-clip-text text-transparent" style={{ fontWeight: 600 }}>
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
