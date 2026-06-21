import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import SectorIndex from '@/components/SectorIndex'
import Plans from '@/components/Plans'
import ComoTrabajamos from '@/components/ComoTrabajamos'
import Portfolio from '@/components/Portfolio'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import FloatingWhatsApp from '@/components/FloatingWhatsApp'
import { sectorFaq } from '@/lib/data'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: sectorFaq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main id="main" className="relative overflow-hidden">
        <Navbar />
        <Hero />
        <Stats />
        <SectorIndex />
        <Plans />
        <ComoTrabajamos />
        <Portfolio />
        <FAQ />
        <Contact />
        <footer className="py-10 text-center text-xs">
          <p className="leading-relaxed">
            <span className="text-[var(--teal-light)]">© {new Date().getFullYear()} Influence Chile</span>
            <span className="text-white/50"> · </span>
            <span className="text-[var(--muted)]">Community manager</span>
          </p>
        </footer>
      </main>
      <FloatingWhatsApp />
    </>
  )
}
