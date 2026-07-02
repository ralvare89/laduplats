import { useState, useEffect, useCallback } from 'react'

export default function GalleryModal({ jersey, onClose, onAddToCart }) {
  const { name, team, images = [], yupooUrl, ninos } = jersey
  const [active, setActive] = useState(0)
  const [thumbErrors, setThumbErrors] = useState({})

  const go = useCallback((dir) => {
    setActive(i => (i + dir + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go, onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  if (!images.length) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          {ninos && (
            <span className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 font-semibold">NIÑOS</span>
          )}
          <div>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">{team}</p>
            <h2 className="text-white font-semibold text-sm leading-tight max-w-xs sm:max-w-md line-clamp-1">{name}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 text-xs hidden sm:block">
            {active + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center min-h-0 px-12 py-4">
        {/* Prev arrow */}
        {images.length > 1 && (
          <button
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 border border-zinc-700 hover:border-gold-500 flex items-center justify-center text-zinc-400 hover:text-gold-500 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Active image */}
        <div className="h-full w-full flex items-center justify-center">
          <img
            key={images[active]}
            src={images[active]}
            alt={`${name} - foto ${active + 1}`}
            className="max-h-full max-w-full object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Next arrow */}
        {images.length > 1 && (
          <button
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/60 border border-zinc-700 hover:border-gold-500 flex items-center justify-center text-zinc-400 hover:text-gold-500 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex-shrink-0 border-t border-zinc-800 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 justify-center" style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-shrink-0 w-14 h-14 border-2 overflow-hidden transition-all ${
                  i === active ? 'border-gold-500 opacity-100' : 'border-zinc-700 opacity-50 hover:opacity-80'
                }`}
              >
                {!thumbErrors[i] ? (
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={() => setThumbErrors(prev => ({ ...prev, [i]: true }))}
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer actions */}
      <div className="flex-shrink-0 border-t border-zinc-800 px-4 py-3 flex items-center justify-end gap-3">
        <button
          onClick={() => { onClose(); onAddToCart(jersey) }}
          className="btn-gold py-2 px-6 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          Pedir esta camiseta
        </button>
      </div>
    </div>
  )
}
