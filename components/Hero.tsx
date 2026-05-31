'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { whatsappUrl } from '@/lib/data'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-16 px-5 sm:pt-40 sm:pb-24 flex flex-col items-center text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-4xl sm:text-6xl leading-[1.02] max-w-3xl"
        style={{ fontWeight: 600 }}
      >
        Community manager para{' '}
        <span className="serif-accent bg-gradient-to-r from-[var(--teal)] to-[var(--teal-light)] bg-clip-text text-transparent">
          marcas
        </span>
        {' '}que crecen en redes
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mt-6 text-base sm:text-lg text-white/65 max-w-xl leading-relaxed"
      >
        Estrategia, contenido y gestión de tus redes en Chile — con informes claros y resultados que se notan.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
      >
        <motion.a
          href="#planes"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--teal)] px-6 py-3.5 font-medium text-white shadow-glow transition hover:bg-[var(--teal-light)] hover:text-[var(--dark)] sm:w-auto"
        >
          Cotiza tu plan
          <ArrowRight size={18} />
        </motion.a>
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white/[0.03] px-6 py-3.5 font-medium text-white/90 transition hover:border-[var(--teal)] hover:bg-white/[0.06] sm:w-auto"
        >
          Escríbenos por WhatsApp
        </motion.a>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-7 text-xs text-white/45"
      >
        9 años de experiencia · +2.4M de alcance gestionado · Domos El Tabo, Magic Resin y más
      </motion.p>
    </section>
  )
}
