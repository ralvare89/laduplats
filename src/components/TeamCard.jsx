import { useState } from 'react'

export default function TeamCard({ jerseys, onSelect }) {
  const [imgErr, setImgErr] = useState(false)
  const lead = jerseys[0]
  const { team, img, imgProd, ninos } = lead
  const displayImg = !imgErr && (img || imgProd)
  const count = jerseys.length

  return (
    <div
      className="group relative bg-zinc-950 border border-zinc-800 hover:border-gold-500/60 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onSelect(jerseys)}
    >
      {/* Image */}
      <div className="relative h-52 bg-zinc-900 overflow-hidden flex items-center justify-center">
        {displayImg ? (
          <img
            src={displayImg}
            alt={team}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-700">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <p className="text-white text-xs font-semibold">Ver uniformes</p>
        </div>

        {/* Jersey count badge */}
        {count > 1 && (
          <div className="absolute top-2 right-2 bg-gold-500 text-black text-[10px] font-bold px-1.5 py-0.5 leading-none">
            {count}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white text-xs font-semibold truncate">{team}</h3>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-[10px] text-zinc-600">{ninos ? 'XXXS – XL' : 'S – 4XL'}</span>
          <span className="text-[10px] text-zinc-600">
            {count} uniforme{count !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
