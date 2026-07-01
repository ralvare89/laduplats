import { useState } from 'react'

export default function JerseyCard({ jersey, onGallery, onOrder }) {
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
          <span className="text-xs text-zinc-600">S – 4XL</span>
          <button
            onClick={(e) => { e.stopPropagation(); onOrder(jersey) }}
            className="text-gold-500 hover:text-gold-400 transition-colors"
            title="Pedir"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
