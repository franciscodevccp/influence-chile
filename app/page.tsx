import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Plans from '@/components/Plans'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Plans />
      <Portfolio />
      <Contact />
      <footer className="py-10 text-center text-xs">
        <p className="leading-relaxed">
          <span className="text-[var(--teal-light)]">© {new Date().getFullYear()} Influence Chile</span>
          <span className="text-white/35"> · </span>
          <span className="text-[var(--muted)]">Community manager</span>
        </p>
      </footer>
    </main>
  )
}
