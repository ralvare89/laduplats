import { useState, useEffect, useRef } from 'react'
import { JERSEYS } from '../data/catalog'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = (val) => {
    setQuery(val)
    onSearch(val)
    if (val.length > 1) {
      const q = val.toLowerCase()
      setSuggestions(
        JERSEYS.filter(j =>
          (j.name || '').toLowerCase().includes(q) || (j.team || '').toLowerCase().includes(q)
        ).slice(0, 6)
      )
      setOpen(true)
    } else {
      setSuggestions([])
      setOpen(false)
    }
  }

  const select = (jersey) => {
    setQuery(jersey.name)
    onSearch(jersey.name)
    setOpen(false)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
  }

  const clear = () => { setQuery(''); onSearch(''); setSuggestions([]); setOpen(false) }

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={e => handleChange(e.target.value)}
          onFocus={() => suggestions.length && setOpen(true)}
          placeholder="Buscar equipo o camiseta..."
          className="w-full bg-zinc-900 border border-zinc-700 focus:border-gold-500 text-white pl-12 pr-12 py-4 outline-none transition-colors text-sm placeholder-zinc-600"
        />
        {query && (
          <button onClick={clear} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-zinc-900 border border-zinc-700 border-t-0 shadow-2xl">
          {suggestions.map(j => (
            <button
              key={j.id}
              onClick={() => select(j)}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-zinc-800 transition-colors text-left group"
            >
              {/* Thumbnail */}
              <div className="w-8 h-8 flex-shrink-0 rounded-sm border border-zinc-700 bg-zinc-800 overflow-hidden">
                {j.img && <img src={j.img} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{j.name}</p>
                <p className="text-zinc-500 text-xs">{j.team}</p>
              </div>
              <svg className="w-4 h-4 text-zinc-600 group-hover:text-gold-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
          <div className="px-4 py-2 border-t border-zinc-800 text-xs text-zinc-600 text-right">
            {JERSEYS.filter(j => (j.name||'').toLowerCase().includes(query.toLowerCase()) || (j.team||'').toLowerCase().includes(query.toLowerCase())).length} camisetas encontradas
          </div>
        </div>
      )}
    </div>
  )
}
