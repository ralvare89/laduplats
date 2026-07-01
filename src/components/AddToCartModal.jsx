import { useState, useEffect } from 'react'
import { cartAdd } from '../store/useCart'

const KIDS_SIZES  = ['XXXS (16)', 'XXS (18)', 'XS (20)', 'S (22)', 'M (24)', 'L (26)', 'XL (28)']
const ADULT_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL']

const DORSALES = ['Sin número', ...Array.from({ length: 99 }, (_, i) => String(i + 1))]

export default function AddToCartModal({ jersey, onClose, onSizeGuide }) {
  const sizes = jersey?.sizes || (jersey?.ninos ? KIDS_SIZES : ADULT_SIZES)
  const [size, setSize]                       = useState(sizes[2] || sizes[0])
  const [qty, setQty]                         = useState(1)
  const [number, setNumber]                   = useState('Sin número')
  const [personalization, setPersonalization] = useState('')
  const [added, setAdded]                     = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  const handleAdd = () => {
    cartAdd(jersey, size, qty, number === 'Sin número' ? '' : number, personalization)
    setAdded(true)
    setTimeout(onClose, 800)
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-zinc-950 border border-zinc-800 w-full sm:max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-zinc-800">
          {(jersey.img || jersey.imgProd) && (
            <img
              src={jersey.img || jersey.imgProd}
              alt={jersey.name}
              className="w-16 h-16 object-cover flex-shrink-0 border border-zinc-800"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-zinc-500 text-[10px] uppercase tracking-widest truncate">{jersey.team}</p>
            <h3 className="text-white text-sm font-semibold leading-snug mt-0.5 line-clamp-2">{jersey.name}</h3>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors flex-shrink-0 p-1">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Size selector */}
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="label">Talla</label>
              {onSizeGuide && (
                <button type="button" onClick={onSizeGuide} className="text-[10px] text-gold-500/70 hover:text-gold-500 transition-colors">
                  Guía de tallas →
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 text-xs font-semibold border transition-all ${
                    size === s
                      ? 'border-gold-500 text-gold-500 bg-gold-500/10'
                      : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div>
            <label className="label mb-2">Cantidad</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-lg"
              >
                −
              </button>
              <span className="text-white font-bold text-xl w-6 text-center">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(10, q + 1))}
                className="w-9 h-9 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Dorsal / Número */}
          <div>
            <label className="label">Número / Dorsal <span className="text-zinc-600 normal-case font-normal">(opcional)</span></label>
            <select
              value={number}
              onChange={e => setNumber(e.target.value)}
              className="input-field"
            >
              {DORSALES.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Nombre personalizado */}
          <div>
            <label className="label">Nombre en la camiseta <span className="text-zinc-600 normal-case font-normal">(opcional)</span></label>
            <input
              value={personalization}
              onChange={e => setPersonalization(e.target.value)}
              className="input-field"
              placeholder="Ej: MESSI, RONALDO, tu nombre…"
            />
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`btn-gold w-full py-3.5 flex items-center justify-center gap-2 text-sm ${added ? 'opacity-80' : ''}`}
          >
            {added ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                ¡Agregada al carrito!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
