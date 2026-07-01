const CATALOGS = [
  {
    id: 1,
    title: 'Adultos',
    subtitle: 'Tallas S – 4XL',
    description: 'Camisetas de clubes y selecciones nacionales. Temporada 2025-26. Más de 70 álbumes disponibles.',
    url: 'https://mancubr713.x.yupoo.com/categories/4751149',
    tags: ['Real Madrid', 'Barcelona', 'PSG', 'Man United', 'Liverpool', 'Selecciones', 'Y más...'],
    badge: 'MÁS POPULAR',
    badgeColor: 'bg-gold-500 text-black',
  },
  {
    id: 2,
    title: 'Niños',
    subtitle: 'Tallas 16 – 28',
    description: 'Versiones infantiles de los mejores equipos del mundo. Perfectas para los pequeños fanáticos.',
    url: 'https://c1335586.x.yupoo.com/categories/4806193',
    tags: ['Real Madrid', 'Bayern Munich', 'Arsenal', 'Man City', 'Barcelona', 'Liverpool', 'Y más...'],
    badge: 'KIDS',
    badgeColor: 'bg-white text-black',
  },
]

function TeamTag({ name }) {
  return (
    <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-sm">
      {name}
    </span>
  )
}

export default function Catalogo() {
  return (
    <section id="catalogo" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-3">Explora</p>
            <h2 className="section-title">Catálogo</h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
            Selecciona la categoría para ver todos los modelos disponibles. ¿Ves algo que te gusta? Anota el nombre y vuelve a hacer tu pedido.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {CATALOGS.map(cat => (
            <div key={cat.id} className="group relative bg-zinc-950 border border-zinc-800 hover:border-gold-500 transition-all duration-300 overflow-hidden">
              {/* Top accent */}
              <div className="h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`text-xs font-bold px-2 py-1 ${cat.badgeColor} mb-3 inline-block tracking-widest`}>
                      {cat.badge}
                    </span>
                    <h3 className="font-display text-5xl text-white tracking-wider">{cat.title}</h3>
                    <p className="text-gold-500 text-sm font-semibold mt-1">{cat.subtitle}</p>
                  </div>
                  <svg className="w-10 h-10 text-zinc-700 group-hover:text-gold-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-.293.707L13 15.414V21a1 1 0 01-.553.894l-4-2A1 1 0 018 19v-3.586L4.293 7.707A1 1 0 014 7V5z" />
                  </svg>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{cat.description}</p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.tags.map(t => <TeamTag key={t} name={t} />)}
                </div>

                <a
                  href={cat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full text-center block group-hover:bg-gold-400 transition-colors"
                >
                  Ver Catálogo {cat.title} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 p-4 border border-zinc-800 bg-zinc-950 flex items-start gap-3">
          <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-zinc-400 text-sm">
            Los catálogos son manejados por el proveedor. Cuando encuentres la camiseta que quieres, <strong className="text-white">anota el nombre del álbum</strong> y úsalo en el formulario de pedido.
          </p>
        </div>
      </div>
    </section>
  )
}
