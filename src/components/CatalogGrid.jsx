import { useState, useMemo, useEffect } from 'react'
import { CATEGORIES, JERSEYS } from '../data/catalog'
import JerseyCard from './JerseyCard'

const PER_PAGE = 20

export default function CatalogGrid({ searchQuery, onOrder, onGallery }) {
  const [activecat, setActivecat] = useState('selecciones')
  const [page, setPage] = useState(1)

  // Reset to page 1 whenever category or search changes
  useEffect(() => { setPage(1) }, [activecat, searchQuery])

  const filtered = useMemo(() => {
    if (searchQuery && searchQuery.length > 1) {
      const q = searchQuery.toLowerCase()
      return JERSEYS.filter(j =>
        j.name.toLowerCase().includes(q) ||
        j.team.toLowerCase().includes(q)
      )
    }
    if (activecat === 'all') return JERSEYS
    return JERSEYS.filter(j => j.cat === activecat)
  }, [activecat, searchQuery])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const isSearching = searchQuery && searchQuery.length > 1

  const scrollToTop = () =>
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })

  const goTo = (p) => {
    setPage(p)
    scrollToTop()
  }

  // Build page number list: first, ...ellipsis..., current±1, ...ellipsis..., last
  const pageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = new Set([1, totalPages, page, page - 1, page + 1].filter(p => p >= 1 && p <= totalPages))
    return Array.from(pages).sort((a, b) => a - b)
  }

  return (
    <section id="catalogo" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-3">
            {filtered.length.toLocaleString()} camisetas disponibles
          </p>
          <h2 className="section-title">Catálogo</h2>
        </div>

        {/* Category tabs */}
        {!isSearching && (
          <div className="flex overflow-x-auto gap-0 mb-10 pb-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActivecat(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                  activecat === cat.id
                    ? 'border-gold-500 text-gold-500 bg-gold-500/5'
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Search result header */}
        {isSearching && (
          <div className="mb-8 flex items-center gap-3">
            <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-zinc-400 text-sm">
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para{' '}
              <span className="text-white font-semibold">"{searchQuery}"</span>
            </span>
          </div>
        )}

        {/* Grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginated.map(jersey => (
              <JerseyCard key={jersey.id} jersey={jersey} onOrder={onOrder} onGallery={onGallery} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-zinc-600 text-4xl mb-4">⚽</p>
            <p className="text-zinc-400">No se encontraron camisetas para <span className="text-white">"{searchQuery}"</span></p>
          </div>
        )}

        {/* Paginator */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={() => goTo(page - 1)}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-gold-500 hover:text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page numbers */}
              {pageNumbers().map((n, i, arr) => (
                <>
                  {i > 0 && arr[i - 1] !== n - 1 && (
                    <span key={`dot-${n}`} className="w-9 h-9 flex items-center justify-center text-zinc-600 text-sm">…</span>
                  )}
                  <button
                    key={n}
                    onClick={() => goTo(n)}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold transition-all border ${
                      n === page
                        ? 'border-gold-500 bg-gold-500 text-black'
                        : 'border-zinc-700 text-zinc-400 hover:border-gold-500 hover:text-gold-500'
                    }`}
                  >
                    {n}
                  </button>
                </>
              ))}

              {/* Next */}
              <button
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-gold-500 hover:text-gold-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-zinc-600 text-xs">
              Página {page} de {totalPages} · {filtered.length} camisetas
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
