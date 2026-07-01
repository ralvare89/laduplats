import { useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import { CATEGORIES, JERSEYS } from '../data/catalog'
import LeagueIcon from './LeagueIcon'
import { useCart } from '../store/useCart'

// Strip "Fan " prefix and trailing jersey-type qualifiers, iterating until stable
function cleanTeamName(raw) {
  let name = raw.trim().replace(/^Fan\s+/i, '')
  const qualRe = /\s+(Home|Away|Third|GK|Hom|Awa|Ho|F)$/i
  let prev
  do { prev = name; name = name.replace(qualRe, '').trim() } while (name !== prev)
  return name
}

// Build grouped teams per category at module load (one-time cost)
const CATS = CATEGORIES.filter(c => c.id !== 'all')
const TEAMS_BY_CAT = {}

CATS.forEach(cat => {
  const groups = new Map() // cleanName → Set of original team values
  JERSEYS.forEach(j => {
    if (j.cat !== cat.id) return
    if (/zip\s*training/i.test(j.team)) return   // exclude Zip Training items
    const clean = cleanTeamName(j.team)
    if (!groups.has(clean)) groups.set(clean, new Set())
    groups.get(clean).add(j.team)
  })
  TEAMS_BY_CAT[cat.id] = Array.from(groups.entries())
    .map(([display, originalsSet]) => ({ display, originals: [...originalsSet] }))
    .sort((a, b) => a.display.localeCompare(b.display))
})

const MAX = 8

function MegaMenu({ onSelect, onMouseEnter, onMouseLeave }) {
  const visibleCats = CATS.filter(c => (TEAMS_BY_CAT[c.id] || []).length > 0)

  return (
    <div
      className="absolute left-0 right-0 top-full bg-black shadow-[0_8px_40px_rgba(0,0,0,0.95)]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Gold accent line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-7">
          {visibleCats.map(cat => {
            const teams = TEAMS_BY_CAT[cat.id] || []
            return (
              <div key={cat.id}>
                {/* Category header */}
                <button
                  onClick={() => onSelect(cat.id, null)}
                  className="flex items-center gap-2 mb-3 w-full text-left group"
                >
                  <LeagueIcon id={cat.id} size={22} className="flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-500 group-hover:text-gold-400 transition-colors">
                    {cat.label}
                  </span>
                </button>

                {/* Team list — grouped & cleaned */}
                <ul className="space-y-1.5">
                  {teams.slice(0, MAX).map(({ display, originals }) => (
                    <li key={display}>
                      <button
                        onClick={() => onSelect(cat.id, originals)}
                        className="flex items-start gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors text-left leading-tight w-full group/item"
                      >
                        <span className="text-zinc-700 group-hover/item:text-gold-500 transition-colors mt-px">·</span>
                        {display}
                      </button>
                    </li>
                  ))}
                  {teams.length > MAX && (
                    <li>
                      <button
                        onClick={() => onSelect(cat.id, null)}
                        className="text-[10px] text-zinc-600 hover:text-gold-500 transition-colors mt-1 pl-3"
                      >
                        +{teams.length - MAX} más →
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom border with gold glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
    </div>
  )
}

export default function Navbar({ onSizeGuide, onCartOpen }) {
  const [scrolled, setScrolled]       = useState(false)
  const [open, setOpen]               = useState(false)
  const [catalogOpen, setCatalogOpen] = useState(false)
  const closeTimer                    = useRef(null)
  const cartItems                     = useCart()
  const cartCount                     = cartItems.reduce((s, i) => s + i.qty, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openCatalog = () => { clearTimeout(closeTimer.current); setCatalogOpen(true) }
  const closeCatalog = () => { closeTimer.current = setTimeout(() => setCatalogOpen(false), 180) }

  // originals = array of original j.team values for the grouped team, or null for category-only
  const handleSelect = (cat, originals) => {
    setCatalogOpen(false)
    setOpen(false)
    window.dispatchEvent(new CustomEvent('catalog-filter', {
      detail: { cat, teamOriginals: originals || null }
    }))
    setTimeout(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }), 60)
  }

  const otherLinks = [
    { label: 'Cómo Pedir',   href: '#como-pedir' },
    { label: 'Hacer Pedido', href: '#pedido' },
    { label: 'Contacto',     href: '#contacto' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-zinc-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <img src={logo} alt="La Dupla T&S" className="h-10 w-10 object-contain" />
          <span className="font-display text-2xl tracking-widest text-white">
            LA DUPLA <span className="font-brand font-black text-gold-500">T&S</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <div onMouseEnter={openCatalog} onMouseLeave={closeCatalog}>
            <a
              href="#catalogo"
              className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors flex items-center gap-1"
            >
              Catálogo
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${catalogOpen ? 'rotate-180 text-gold-500' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {otherLinks.map(l => (
            <a key={l.href} href={l.href} className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
              {l.label}
            </a>
          ))}

          <button onClick={onSizeGuide} className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
            Guía de Tallas
          </button>

          {/* Cart button */}
          <button
            onClick={onCartOpen}
            className="relative text-zinc-300 hover:text-gold-500 transition-colors p-1"
            title="Carrito"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-[9px] font-black w-4 h-4 flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

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

      {/* Mega menu — desktop only */}
      {catalogOpen && (
        <MegaMenu
          onSelect={handleSelect}
          onMouseEnter={openCatalog}
          onMouseLeave={closeCatalog}
        />
      )}

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-zinc-800 px-6 py-4 flex flex-col gap-4">
          <a href="#catalogo" onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
            Catálogo
          </a>
          {otherLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { onSizeGuide(); setOpen(false) }}
            className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors text-left"
          >
            Guía de Tallas
          </button>
          <button
            onClick={() => { setOpen(false); onCartOpen() }}
            className="text-sm font-semibold uppercase tracking-widest text-zinc-300 hover:text-gold-500 transition-colors text-left flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Carrito {cartCount > 0 && <span className="bg-gold-500 text-black text-[10px] font-black px-1.5 py-0.5 leading-none">{cartCount}</span>}
          </button>
          <a href="#pedido" onClick={() => setOpen(false)} className="btn-gold text-center">Pedir Ahora</a>
        </div>
      )}
    </nav>
  )
}
