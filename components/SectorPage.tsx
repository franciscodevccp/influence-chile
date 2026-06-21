'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Crown,
  Lock,
  Megaphone,
  Gift,
  X,
  BadgeCheck,
  ChevronDown,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { Icon, WhatsAppIcon } from '@/components/icons'
import {
  sectors,
  tiers,
  sectorMetrics,
  sectorFaq,
  whatsappPlanUrl,
  type Sector,
} from '@/lib/data'

/* ---------- helpers ---------- */

function Headline({ text, serif }: { text: string; serif: string }) {
  const idx = text.indexOf(serif)
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span className="serif-accent" style={{ color: 'var(--accent)' }}>
        {serif}
      </span>
      {text.slice(idx + serif.length)}
    </>
  )
}

function Counter({ value, inView }: { value: string; inView: boolean }) {
  const match = value.match(/([\d.]+)/)
  const prefix = value.match(/^[^\d]*/)?.[0] ?? ''
  const suffix = value.match(/[^\d.]*$/)?.[0] ?? ''
  const num = match ? parseFloat(match[1]) : 0
  const decimals = match && match[1].includes('.') ? 1 : 0
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => v.toFixed(decimals))
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
    <span
      className="num text-4xl sm:text-5xl"
      style={{
        fontWeight: 600,
        color: 'var(--accent)',
      }}
    >
      {prefix}
      <span ref={ref}>0</span>
      {suffix}
    </span>
  )
}

/* ---------- section: hero ---------- */

function SectorHero({ sector }: { sector: Sector }) {
  return (
    <section className="relative overflow-hidden px-5 pt-32 pb-16 text-center sm:pt-40 sm:pb-20">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% -10%, color-mix(in srgb, var(--accent) 24%, transparent), transparent 60%)',
        }}
      />
      <span
        aria-hidden
        className="num pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none text-[8rem] leading-none text-white/[0.035] sm:text-[13rem]"
      >
        {sector.indexNumber}
      </span>

      <div className="relative mx-auto max-w-3xl">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 text-xs text-white/40"
        >
          <Link href="/" className="transition hover:text-white/70">
            Influence
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/#rubros" className="transition hover:text-white/70">
            Rubros
          </Link>
          <span className="mx-1.5">/</span>
          <span style={{ color: 'var(--accent)' }}>{sector.name}</span>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
            borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
            color: 'var(--accent)',
          }}
        >
          <Icon name={sector.lucideIcon} size={15} aria-hidden />
          {sector.name}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl"
          style={{ fontWeight: 600 }}
        >
          <Headline text={sector.headline} serif={sector.serifWords} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg"
        >
          {sector.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href="#planes"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium text-white transition hover:brightness-110 sm:w-auto"
            style={{
              background: 'linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 60%, #000))',
              boxShadow: '0 8px 28px color-mix(in srgb, var(--accent) 35%, transparent)',
            }}
          >
            {sector.ctaText}
            <ArrowRight size={18} />
          </a>
          <a
            href={whatsappPlanUrl(sector.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] px-6 py-3.5 font-medium text-white/85 transition hover:border-white/30 hover:text-white sm:w-auto"
          >
            <WhatsAppIcon size={18} />
            Hablar por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- section: pain / gain ---------- */

function SectorPainGain({ sector }: { sector: Sector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <section ref={ref} className="px-5 py-16 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Sin estrategia</p>
          <ul className="space-y-3">
            {sector.objections.map((o) => (
              <li key={o} className="flex gap-3 text-sm text-white/55">
                <X size={17} className="mt-0.5 shrink-0 text-white/30" />
                {o}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-3xl border p-6 sm:p-7"
          style={{
            borderColor: 'color-mix(in srgb, var(--accent) 35%, transparent)',
            background: 'color-mix(in srgb, var(--accent) 7%, transparent)',
          }}
        >
          <p className="mb-4 text-xs uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Con Influence
          </p>
          <ul className="space-y-3">
            {sector.trustElements.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-white/80">
                <BadgeCheck size={17} className="mt-0.5 shrink-0" style={{ color: 'var(--accent)' }} />
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- section: strategy (sticky editorial) ---------- */

function SectorStrategy({ sector }: { sector: Sector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <section ref={ref} className="px-5 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">La estrategia</span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl" style={{ fontWeight: 600 }}>
              Así te hacemos{' '}
              <span className="serif-accent" style={{ color: 'var(--accent)' }}>
                crecer
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/65 sm:text-base">
              {sector.strategyParagraph}
            </p>
          </motion.div>
        </div>

        <div>
          {sector.pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="flex gap-4 border-b border-white/10 py-5 first:border-t"
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 12%, transparent)',
                  borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                <Icon name={p.icon} size={18} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-base text-white/90" style={{ fontWeight: 600 }}>
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-white/55">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- section: metrics ---------- */

function SectorMetrics() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <section ref={ref} className="px-5 py-8">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-3xl border border-white/10 bg-[var(--card)]/60 px-6 py-8 sm:gap-x-16">
        {sectorMetrics.map((m) => (
          <div key={m.label} className="text-center">
            <Counter value={m.value} inView={inView} />
            <p className="mt-2 text-[11px] uppercase tracking-wider text-[var(--muted)]">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- section: plans (3 tiers) ---------- */

function PlanCard({ tier, sectorName, i, inView }: { tier: (typeof tiers)[number]; sectorName: string; i: number; inView: boolean }) {
  const recommended = tier.tag === 'Recomendado'
  const complete = tier.tag === 'Completo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`relative flex flex-col rounded-3xl border p-6 pt-5 sm:p-7 ${
        recommended ? 'lg:-translate-y-2 lg:scale-[1.04]' : ''
      }`}
      style={
        recommended
          ? {
              borderColor: 'var(--accent)',
              background: 'linear-gradient(to bottom, color-mix(in srgb, var(--accent) 14%, var(--card)), var(--card))',
              boxShadow: '0 0 48px color-mix(in srgb, var(--accent) 30%, transparent)',
            }
          : {
              borderColor: complete
                ? 'color-mix(in srgb, var(--accent) 40%, transparent)'
                : 'var(--border)',
              background: 'var(--card)',
            }
      }
    >
      <div className="mb-3 flex min-h-[34px] items-center justify-center">
        {tier.tag ? (
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-semibold tracking-wide"
            style={
              recommended
                ? {
                    background: 'linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 55%, #000))',
                    color: '#fff',
                    boxShadow: '0 4px 16px color-mix(in srgb, var(--accent) 45%, transparent)',
                  }
                : {
                    border: '1px solid color-mix(in srgb, var(--accent) 40%, transparent)',
                    color: 'var(--accent)',
                  }
            }
          >
            {recommended ? <Star size={11} fill="currentColor" /> : <Crown size={12} />}
            {tier.tag}
          </span>
        ) : null}
      </div>

      <h3 className="font-display text-xl" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
        {tier.name}
      </h3>

      <div className="mt-5 mb-5 border-b border-white/5 pb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-white/40">$</span>
          <span className="num text-4xl" style={{ fontWeight: 500 }}>
            {tier.price.toLocaleString('es-CL')}
          </span>
        </div>
        <p className="mt-2 text-[10px] uppercase tracking-widest text-[var(--muted)]">CLP mensual · + IVA</p>
      </div>

      {tier.bonus ? (
        <div
          className="mb-4 flex items-center gap-2.5 rounded-2xl px-3 py-2.5"
          style={{
            background: 'color-mix(in srgb, var(--pink) 12%, transparent)',
            border: '1px solid color-mix(in srgb, var(--pink-light) 30%, transparent)',
          }}
        >
          <Megaphone size={16} className="shrink-0 text-[var(--pink-light)]" />
          <p className="text-xs font-semibold leading-tight text-white/85">
            BONUS · 2 campañas con influencers a costo{' '}
            <span className="num text-[var(--pink-light)]">$0</span>
          </p>
        </div>
      ) : (
        <div className="mb-4 flex items-center gap-2 px-1 text-xs text-white/35">
          <Lock size={13} className="shrink-0" />
          Campañas con influencers: desde Plan Crecimiento
        </div>
      )}

      <ul className="flex-1 space-y-2.5 text-sm text-white/80">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{
                background: recommended ? 'var(--accent)' : 'color-mix(in srgb, var(--accent) 25%, transparent)',
              }}
            >
              <Check size={10} className="text-white" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={whatsappPlanUrl(sectorName, tier.name)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
        style={
          recommended
            ? {
                background: 'linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 60%, #000))',
                boxShadow: '0 8px 28px color-mix(in srgb, var(--accent) 40%, transparent)',
              }
            : { background: 'var(--accent)', color: '#0e0e0e' }
        }
      >
        <WhatsAppIcon size={17} />
        Tomar plan
      </a>
    </motion.div>
  )
}

function SectorPlans({ sector }: { sector: Sector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  return (
    <section id="planes" ref={ref} className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">Planes</span>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl" style={{ fontWeight: 600 }}>
            Planes para{' '}
            <span className="serif-accent" style={{ color: 'var(--accent)' }}>
              {sector.name}
            </span>
          </h2>
          <p className="mt-3 text-sm text-white/55">
            Valores mensuales CLP · + IVA · Todos incluyen informe mensual
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
          {tiers.map((t, i) => (
            <PlanCard key={t.name} tier={t} sectorName={sector.name} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- section: bonus band ---------- */

function BonusInfluencers({ sector }: { sector: Sector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <section ref={ref} className="px-5 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="bonus-band mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-3xl border border-white/10 px-6 py-10 text-center sm:flex-row sm:gap-7 sm:px-10 sm:text-left"
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[var(--pink)]/15 text-[var(--pink-light)] ring-1 ring-[var(--pink-light)]/30">
          <Gift size={26} />
        </span>
        <div className="flex-1">
          <h3 className="font-display text-xl sm:text-2xl" style={{ fontWeight: 600 }}>
            2 campañas con influencers, todos los meses, a costo{' '}
            <span className="num text-[var(--pink-light)]">$0</span>
          </h3>
          <p className="mt-2 text-sm text-white/65">
            Incluido en los planes Crecimiento y Autoridad. Cortesía de Influencer Chile SPA, nuestra agencia de influencers.
          </p>
        </div>
        <a
          href={whatsappPlanUrl(sector.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--pink)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--pink-light)]"
        >
          <WhatsAppIcon size={16} />
          Quiero el bonus
        </a>
      </motion.div>
    </section>
  )
}

/* ---------- section: faq ---------- */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-base text-white/90" style={{ fontWeight: 500 }}>
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          style={open ? { color: 'var(--accent)' } : undefined}
        />
      </button>
      <div
        className="grid transition-all duration-300"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm leading-relaxed text-white/60">{a}</p>
        </div>
      </div>
    </div>
  )
}

function SectorFaq() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <section ref={ref} className="px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-display text-3xl sm:text-4xl"
          style={{ fontWeight: 600 }}
        >
          Preguntas{' '}
          <span className="serif-accent" style={{ color: 'var(--accent)' }}>
            frecuentes
          </span>
        </motion.h2>
        <div>
          {sectorFaq.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- section: closing cta ---------- */

function ClosingCta({ sector }: { sector: Sector }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  return (
    <section ref={ref} className="px-5 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-12 text-center sm:py-16"
        style={{ background: 'color-mix(in srgb, var(--accent) 8%, var(--card))' }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 50% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)',
          }}
        />
        <h2 className="relative font-display text-3xl sm:text-4xl" style={{ fontWeight: 600 }}>
          ¿Listos para hacer crecer tu{' '}
          <span className="serif-accent" style={{ color: 'var(--accent)' }}>
            {sector.name.toLowerCase()}
          </span>
          ?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-sm text-white/60">
          Agenda una reunión inicial por Zoom, sin costo. Te mostramos exactamente cómo aplicaríamos esta estrategia a tu marca.
        </p>
        <a
          href={whatsappPlanUrl(sector.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-white transition hover:brightness-110"
          style={{
            background: 'linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 60%, #000))',
            boxShadow: '0 8px 28px color-mix(in srgb, var(--accent) 35%, transparent)',
          }}
        >
          <WhatsAppIcon size={18} />
          Conversemos por WhatsApp
        </a>
      </motion.div>
    </section>
  )
}

/* ---------- section: cross-nav ---------- */

function SectorCrossNav({ current }: { current: string }) {
  const others = sectors.filter((s) => s.slug !== current)
  return (
    <section className="px-5 pb-20">
      <div className="mx-auto max-w-5xl">
        <p className="mb-5 text-center text-xs uppercase tracking-widest text-white/40">Otros rubros</p>
        <div className="flex flex-wrap justify-center gap-3">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/planes/${s.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--card)] px-4 py-2 text-sm text-white/70 transition hover:text-white"
              style={{ '--accent': s.accentHex } as CSSProperties}
            >
              <span style={{ color: 'var(--accent)' }}>
                <Icon name={s.lucideIcon} size={16} aria-hidden />
              </span>
              {s.name}
              <ArrowUpRight size={14} className="text-white/30 transition group-hover:text-[var(--accent)]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- page ---------- */

export default function SectorPage({ sector }: { sector: Sector }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ '--accent': sector.accentHex, '--accent-soft': sector.accentSoftHex } as CSSProperties}
    >
      <Navbar />
      <SectorHero sector={sector} />
      <SectorPainGain sector={sector} />
      <SectorStrategy sector={sector} />
      <SectorMetrics />
      <SectorPlans sector={sector} />
      <BonusInfluencers sector={sector} />
      <SectorFaq />
      <ClosingCta sector={sector} />
      <SectorCrossNav current={sector.slug} />
      <FloatingWhatsApp href={whatsappPlanUrl(sector.name)} />
    </div>
  )
}
