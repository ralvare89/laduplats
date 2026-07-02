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
        <a href="#inicio" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img src={logo} alt="La Dupla T&S" className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 object-contain" />
          <span className="font-display text-lg sm:text-2xl tracking-wide sm:tracking-widest text-white whitespace-nowrap">
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

          {/* Social icons */}
          <div className="flex items-center gap-3 border-r border-zinc-800 pr-6">
            <a
              href="https://www.instagram.com/laduplatys/"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="text-zinc-500 hover:text-[#E1306C] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578351904282&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              className="text-zinc-500 hover:text-[#1877F2] transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>

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

        {/* Mobile: cart + burger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={onCartOpen}
            className="relative text-zinc-300 hover:text-gold-500 transition-colors p-2"
            title="Carrito"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-gold-500 text-black text-[9px] font-black w-4 h-4 flex items-center justify-center leading-none">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setOpen(!open)} className="text-white p-2">
            <div className="space-y-1.5">
              <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
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

          {/* Social — mobile */}
          <div className="flex items-center gap-4 pt-2 border-t border-zinc-800">
            <a
              href="https://www.instagram.com/laduplatys/"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#E1306C] transition-colors font-semibold"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578351904282&sk=about"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-[#1877F2] transition-colors font-semibold"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
