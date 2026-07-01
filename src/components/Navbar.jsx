import { useState, useEffect } from 'react'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Catálogo', href: '#catalogo' },
    { label: 'Cómo Pedir', href: '#como-pedir' },
    { label: 'Hacer Pedido', href: '#pedido' },
    { label: 'Contacto', href: '#contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="La Dupla T&S" className="h-10 w-10 object-contain" />
          <span className="font-display text-2xl tracking-widest text-white">LA DUPLA <span className="font-brand font-black text-gold-500">T&S</span></span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#pedido" className="btn-gold text-xs py-2 px-5">Pedir Ahora</a>
        </div>

        {/* Mobile burger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#pedido" onClick={() => setOpen(false)} className="btn-gold text-center">Pedir Ahora</a>
        </div>
      )}
    </nav>
  )
}
