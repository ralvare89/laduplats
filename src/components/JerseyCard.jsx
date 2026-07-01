import { useState } from 'react'

export default function JerseyCard({ jersey, onGallery, onAddToCart }) {
  const [imgError, setImgError] = useState(false)
  const { name, team, img, imgProd, ninos, images = [] } = jersey

  const displayImg = (!imgError && (img || imgProd)) ? (img || imgProd) : null
  const hasGallery = images.length > 0

  return (
    <div
      className="group relative bg-zinc-950 border border-zinc-800 hover:border-gold-500/60 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => hasGallery && onGallery(jersey)}
    >
      {/* Image area */}
      <div className="relative h-52 bg-zinc-900 overflow-hidden flex items-center justify-center">
        {displayImg ? (
          <img
            src={displayImg}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-700">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Sin imagen</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {hasGallery && (
            <div className="flex items-center gap-1.5 text-white text-xs font-semibold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {images.length} foto{images.length !== 1 ? 's' : ''}
            </div>
          )}
          <p className="text-zinc-400 text-xs">Ver galería</p>
        </div>

        {/* Photo count badge */}
        {images.length > 1 && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
            </svg>
            {images.length}
          </div>
        )}

      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-zinc-500 text-xs uppercase tracking-widest truncate">{team}</p>
        <h3 className="text-white text-xs font-semibold leading-snug mt-0.5 line-clamp-2">{name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-zinc-600">{ninos ? 'XXXS – XL' : 'S – 4XL'}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(jersey) }}
            className="text-gold-500 hover:text-gold-400 transition-colors"
            title="Agregar al carrito"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
