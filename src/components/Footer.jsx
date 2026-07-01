import logo from '../assets/logo.jpg'

const WHATSAPP_NUMBER = '50685297242'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-zinc-950 border-t border-zinc-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="La Dupla T&S" className="h-10 w-10 object-contain" />
              <span className="font-display text-2xl tracking-widest text-white">LA DUPLA <span className="text-gold-500">T&S</span></span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Camisetas deportivas de calidad por encargo. Tu equipo favorito, directo a tus manos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { label: 'Catálogo Adultos', href: '#catalogo' },
                { label: 'Catálogo Niños', href: '#catalogo' },
                { label: '¿Cómo pedir?', href: '#como-pedir' },
                { label: 'Hacer pedido', href: '#pedido' },
              ].map(l => (
                <li key={l.href + l.label}>
                  <a href={l.href} className="text-zinc-500 hover:text-gold-500 text-sm transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Contacto</h4>
            <div className="space-y-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 text-sm transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                +506 8529-7242
              </a>
              <a href="mailto:ralvare89@gmail.com" className="flex items-center gap-2 text-zinc-500 hover:text-gold-500 text-sm transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ralvare89@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs">© 2025 La Dupla T&S. Todos los derechos reservados.</p>
          <p className="text-zinc-700 text-xs">Pedidos por encargo · Costa Rica</p>
        </div>
      </div>
    </footer>
  )
}
