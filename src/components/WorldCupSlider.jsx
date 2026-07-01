import { useState, useEffect, useCallback } from 'react'
import { WC2026_SLIDER } from '../data/catalog'

function JerseyPhoto({ item, size = 'lg' }) {
  const [err, setErr] = useState(false)
  const isLg = size === 'lg'

  if (!item.img || err) {
    // SVG fallback
    const gid = `jg-${item.flag}-${size}`
    return (
      <div className={`relative ${isLg ? 'w-48 h-56' : 'w-32 h-38'} flex items-center justify-center`}>
        <svg viewBox="0 0 160 190" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={item.bg} />
              <stop offset="100%" stopColor={item.badge} stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <path d="M15 45 L0 80 L30 85 L35 55 Z" fill={`url(#${gid})`} />
          <path d="M145 45 L160 80 L130 85 L125 55 Z" fill={`url(#${gid})`} />
          <path d="M55 20 Q80 35 105 20" fill="none" stroke={item.accent} strokeWidth="4" />
          <path d="M35 40 L15 45 L30 85 L38 180 L122 180 L130 85 L145 45 L125 40 Q105 20 80 25 Q55 20 35 40 Z" fill={`url(#${gid})`} />
          <circle cx="58" cy="65" r="14" fill={item.badge} opacity="0.9" />
          <text x="58" y="70" textAnchor="middle" fontSize="14" fill="white">{item.flag}</text>
        </svg>
      </div>
    )
  }

  return (
    <div className={`relative ${isLg ? 'w-56 h-72' : 'w-32 h-40'} overflow-hidden`}>
      <img
        src={item.img}
        alt={item.team}
        onError={() => setErr(true)}
        className="w-full h-full object-cover object-top"
        style={{ filter: isLg ? 'drop-shadow(0 20px 50px rgba(0,0,0,0.7))' : 'none' }}
      />
    </div>
  )
}

export default function WorldCupSlider({ onOrder }) {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const go = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setActive((idx + WC2026_SLIDER.length) % WC2026_SLIDER.length)
      setAnimating(false)
    }, 200)
  }, [animating])

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 4500)
    return () => clearInterval(t)
  }, [active, go])

  const cur  = WC2026_SLIDER[active]
  const prev = WC2026_SLIDER[(active - 1 + WC2026_SLIDER.length) % WC2026_SLIDER.length]
  const next = WC2026_SLIDER[(active + 1) % WC2026_SLIDER.length]

  return (
    <section className="relative overflow-hidden py-20 bg-black border-t border-zinc-900">
      {/* Animated color background */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${cur.bg}18 0%, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 px-4 py-1.5 mb-4">
            <span className="text-gold-500 text-xs font-bold tracking-widest uppercase">Mundial 2026 · USA · México · Canadá</span>
          </div>
          <h2 className="font-display text-6xl md:text-8xl text-white tracking-widest">
            MUNDIAL <span className="text-gold-500">2026</span>
          </h2>
          <p className="text-zinc-500 mt-3 text-sm tracking-widest">Las camisetas oficiales de los mejores equipos del planeta</p>
        </div>

        {/* Slider */}
        <div className="flex items-end justify-center gap-6 md:gap-16">
          {/* Previous */}
          <div
            className="hidden md:flex flex-col items-center gap-3 cursor-pointer opacity-30 hover:opacity-60 transition-all"
            onClick={() => go(active - 1)}
          >
            <JerseyPhoto item={prev} size="sm" />
            <p className="text-zinc-500 text-xs font-semibold">{prev.team}</p>
          </div>

          {/* Active */}
          <div
            className={`flex flex-col items-center gap-6 transition-all duration-300 ${animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            style={{ minWidth: '280px' }}
          >
            <div className="relative">
              {/* Glow behind jersey */}
              <div
                className="absolute inset-0 blur-3xl rounded-full"
                style={{ background: `${cur.bg}50`, transform: 'scale(1.3)' }}
              />
              <JerseyPhoto item={cur} size="lg" />
            </div>

            {/* Info */}
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <img
                  src={cur.flagImg}
                  alt={cur.team}
                  className="h-8 w-auto shadow-lg"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                />
              </div>
              <h3 className="font-display text-5xl text-white tracking-wider">{cur.team}</h3>
              <p className="text-zinc-500 text-sm mt-1">{cur.subtitle}</p>
            </div>

            <button
              onClick={() => onOrder?.({ name: `Selección ${cur.team} 2026`, team: cur.team, sizes: ['S','M','L','XL','2XL','3XL','4XL'] })}
              className="btn-gold py-3 px-10"
            >
              Pedir esta camiseta
            </button>
          </div>

          {/* Next */}
          <div
            className="hidden md:flex flex-col items-center gap-3 cursor-pointer opacity-30 hover:opacity-60 transition-all"
            onClick={() => go(active + 1)}
          >
            <JerseyPhoto item={next} size="sm" />
            <p className="text-zinc-500 text-xs font-semibold">{next.team}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {WC2026_SLIDER.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-gold-500' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => go(active - 1)} className="w-10 h-10 border border-zinc-700 hover:border-gold-500 flex items-center justify-center text-zinc-400 hover:text-gold-500 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => go(active + 1)} className="w-10 h-10 border border-zinc-700 hover:border-gold-500 flex items-center justify-center text-zinc-400 hover:text-gold-500 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
