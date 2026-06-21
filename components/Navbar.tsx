'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'

const links = [
  { href: '/#rubros', label: 'Rubros' },
  { href: '/#planes', label: 'Planes' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#clientes', label: 'Clientes' },
  { href: '/#faq', label: 'Preguntas' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(14,14,14,0.55)] border-b border-[var(--border)]"
    >
      <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Influence Chile — inicio"
          onClick={() => setOpen(false)}
        >
          <Logo size={40} priority />
          <span className="font-display text-sm font-semibold tracking-tight text-white/90">
            Influence Chile
          </span>
        </a>

        {/* Navegación escritorio */}
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition">
              {l.label}
            </a>
          ))}
          <a
            href="/#contacto"
            className="px-3 py-1.5 rounded-full bg-[var(--pink)] text-white hover:bg-[var(--pink-light)] transition"
          >
            Contacto
          </a>
        </nav>

        {/* Botón menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-white/90 transition hover:bg-white/5"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="sm:hidden overflow-hidden border-t border-[var(--border)] bg-[rgba(14,14,14,0.92)] backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-white/85 transition hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/#contacto"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-full bg-[var(--pink)] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[var(--pink-light)]"
              >
                Contacto
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
