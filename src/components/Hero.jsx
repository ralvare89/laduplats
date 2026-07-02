import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollDown = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Nebula — colorful glow at the top */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-16 w-[650px] h-[650px] rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(76,29,149,0.2) 45%, transparent 70%)', filter: 'blur(80px)', animationDuration: '7s' }}
        />
        <div
          className="absolute -top-20 -right-16 w-[520px] h-[520px] rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(14,116,144,0.15) 45%, transparent 70%)', filter: 'blur(75px)', animationDuration: '5s', animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-[600px] h-[220px]"
          style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.22) 0%, transparent 70%)', filter: 'blur(55px)' }}
        />
      </div>
      {/* Dark gradient — transparent at top so nebula bleeds through */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/65 to-black" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto pt-20 md:pt-0">
        <img src={logo} alt="La Dupla T&S" className="w-36 h-36 md:w-48 md:h-48 object-contain drop-shadow-2xl mb-6" />

        <p className="text-base md:text-4xl font-semibold uppercase tracking-[0.08em] md:tracking-[0.4em] text-gold-500 mb-4 px-2">Camisetas deportivas de alta calidad</p>

        <p className="text-zinc-400 text-base md:text-lg max-w-xl leading-relaxed mb-10">
          Tu equipo favorito, tu estilo. Pedidos por encargo con envío a todo el país.
          Más de 100 equipos disponibles.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#catalogo" className="btn-gold">Ver Catálogo</a>
          <a href="#pedido" className="btn-outline">Hacer un Pedido</a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16 text-center">
          {[
            { num: '100+',     label: 'Equipos' },
            { num: '₡15K+',   label: 'Desde' },
            { num: '🚚',       label: 'Envío CR' },
          ].map(({ num, label }) => (
            <div key={label}>
              <p className="font-display text-4xl md:text-5xl text-gold-500">{num}</p>
              <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — desaparece al bajar, clickeable */}
      <button
        onClick={scrollDown}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 cursor-pointer group ${
          scrolled ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover:text-gold-500 transition-colors">Scroll</span>
        <svg
          className="w-4 h-4 text-zinc-500 group-hover:text-gold-500 transition-colors animate-bounce"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  )
}
