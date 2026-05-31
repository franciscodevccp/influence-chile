'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Reunión inicial',
    desc: 'Una videollamada para entender tu marca, definir objetivos y armar el plan de trabajo a tu medida.',
  },
  {
    n: '02',
    title: 'Acuerdo y onboarding',
    desc: 'Elegimos el plan, fijamos el abono inicial y el calendario de pagos mensuales. Sin letra chica.',
  },
  {
    n: '03',
    title: 'Accesos seguros',
    desc: 'Nos das acceso a tus redes vía Meta Business Suite —nunca contraseñas— y un medio de pago para la pauta.',
  },
  {
    n: '04',
    title: 'Archivos de marca',
    desc: 'Compartes una carpeta con tus fotos y videos; nosotros nos encargamos de convertirlo en contenido.',
  },
  {
    n: '05',
    title: 'Informes mensuales',
    desc: 'Cada mes recibes un reporte claro de métricas, desempeño de campañas y los próximos pasos.',
  },
]

export default function ComoTrabajamos() {
  return (
    <section id="proceso" className="px-5 py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Columna izquierda: título editorial, asimétrico y fijo al hacer scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="inline-block rounded-full border border-[var(--border)] bg-[var(--teal)]/15 px-3 py-1 text-xs text-[var(--teal-light)]">
            Cómo trabajamos
          </span>
          <h2 className="mt-4 font-display text-3xl leading-[1.05] sm:text-5xl" style={{ fontWeight: 600 }}>
            Un proceso simple
            <br />
            y transparente
          </h2>
          <p className="mt-4 max-w-sm text-sm text-white/60 sm:text-base">
            Desde la primera llamada hasta el informe mensual, siempre sabes qué esperar.
          </p>
        </motion.div>

        {/* Columna derecha: timeline de pasos */}
        <ol className="relative space-y-9 border-l border-[var(--border)] pl-7 sm:pl-9">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative"
            >
              <span
                className="absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--teal)] ring-4 ring-[var(--dark)] -left-[37px] sm:-left-[45px]"
                aria-hidden
              />
              <div className="num text-sm tracking-widest text-[var(--teal-light)]">{s.n}</div>
              <h3 className="mt-1 font-display text-lg" style={{ fontWeight: 600, letterSpacing: '-0.02em' }}>
                {s.title}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-white/65">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
