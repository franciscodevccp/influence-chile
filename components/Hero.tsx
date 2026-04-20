'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-20 px-5 sm:pt-40 sm:pb-28 flex flex-col items-center text-center"
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
        Gestión integral de redes en Chile: estrategia, contenido, calendario, interacción con tu comunidad e informes que puedes entender.
      </motion.p>

      <motion.a
        href="#planes"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--teal)] hover:bg-[var(--teal-light)] hover:text-[var(--dark)] transition font-medium text-white shadow-glow"
      >
        Cotiza tu plan
        <ArrowRight size={18} />
      </motion.a>
    </section>
  )
}
