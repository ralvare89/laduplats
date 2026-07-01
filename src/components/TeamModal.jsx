import { useEffect } from 'react'
import JerseyCard from './JerseyCard'

export default function TeamModal({ jerseys, onClose, onGallery, onOrder }) {
  const team = jerseys[0]?.team
  const count = jerseys.length

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-4xl max-h-[88vh] overflow-hidden flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 flex-shrink-0">
          <div>
            <h2 className="font-display text-3xl text-white tracking-wider">{team}</h2>
            <p className="text-zinc-500 text-xs mt-0.5">
              {count} uniforme{count !== 1 ? 's' : ''} disponibles
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Jersey grid */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {jerseys.map(jersey => (
              <JerseyCard
                key={jersey.id}
                jersey={jersey}
                onGallery={onGallery}
                onOrder={onOrder}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
