const STEPS = [
  {
    num: '01',
    title: 'Explora el catálogo',
    desc: 'Navega por los catálogos de adultos o niños y encuentra la camiseta que quieres. Anota el nombre del equipo y modelo.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Llena el formulario',
    desc: 'Completa tus datos: nombre, camiseta deseada, talla, cantidad y método de entrega. Solo toma 2 minutos.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Recibe confirmación',
    desc: 'Te contactamos por WhatsApp para confirmar disponibilidad, precio final y coordinar el pago y entrega.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Disfruta tu camiseta',
    desc: 'Una vez confirmado el pago, gestionamos tu pedido y te lo entregamos. ¡Listo para lucirla en la cancha!',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

export default function ComoPedir() {
  return (
    <section id="como-pedir" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-3">Simple y rápido</p>
          <h2 className="section-title">¿Cómo Pedir?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative p-8 border border-zinc-800 group hover:border-gold-500 transition-all duration-300 bg-black hover:bg-zinc-950">
              {/* Connector line (hidden on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-px h-16 -translate-y-1/2 bg-zinc-800" />
              )}

              <div className="text-gold-500 mb-4">{step.icon}</div>
              <p className="font-display text-6xl text-zinc-800 group-hover:text-zinc-700 transition-colors mb-4">{step.num}</p>
              <h3 className="font-bold text-white text-sm uppercase tracking-widest mb-3">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#pedido" className="btn-gold">Hacer mi Pedido Ahora</a>
        </div>
      </div>
    </section>
  )
}
