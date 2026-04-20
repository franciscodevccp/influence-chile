'use client'

import { motion } from 'framer-motion'
import Logo from '@/components/Logo'

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(14,14,14,0.55)] border-b border-[var(--border)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Influence Chile — inicio">
          <Logo size={44} priority />
          <span className="font-display hidden text-sm font-semibold tracking-tight text-white/90 sm:inline">
            Influence Chile
          </span>
        </a>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
          <a href="#planes" className="hover:text-white transition">Planes</a>
          <a href="#clientes" className="hover:text-white transition">Clientes</a>
          <a
            href="#contacto"
            className="px-3 py-1.5 rounded-full bg-[var(--pink)] text-white hover:bg-[var(--pink-light)] transition"
          >
            Contacto
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
