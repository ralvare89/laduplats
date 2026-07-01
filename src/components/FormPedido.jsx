import { useState } from 'react'
import { useForm } from 'react-hook-form'

// ── Configura aquí tus datos ──────────────────────────────────────────────────
const WHATSAPP_NUMBER = '50685297242'        // Número con código de país (sin +)
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'  // Reemplaza con tu ID de Formspree
// ─────────────────────────────────────────────────────────────────────────────

const TALLAS_ADULTO = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
const TALLAS_NINO = ['16', '18', '20', '22', '24', '26', '28']

function buildWhatsAppMessage(data) {
  return encodeURIComponent(
    `🏆 *NUEVO PEDIDO – La Dupla T&S*\n\n` +
    `👤 *Nombre:* ${data.nombre}\n` +
    `📱 *Teléfono:* ${data.telefono}\n` +
    `📧 *Correo:* ${data.correo}\n\n` +
    `⚽ *DETALLES DEL PEDIDO*\n` +
    `Camiseta: ${data.camiseta}\n` +
    `Categoría: ${data.categoria}\n` +
    `Talla: ${data.talla}\n` +
    `Cantidad: ${data.cantidad}\n` +
    (data.personalizado ? `Personalización: ${data.personalizado}\n` : '') +
    `\n📦 *Entrega:* ${data.entrega}\n` +
    (data.notas ? `\n📝 *Notas:* ${data.notas}\n` : '') +
    `\n_Pedido enviado desde laduplats.com_`
  )
}

export default function FormPedido() {
  const [step, setStep] = useState('form') // 'form' | 'success' | 'error'
  const [loading, setLoading] = useState(false)
  const [categoria, setCategoria] = useState('adultos')

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    const fullData = { ...data, categoria: categoria === 'adultos' ? 'Adultos' : 'Niños' }

    // 1. Abrir WhatsApp con el pedido pre-llenado
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(fullData)}`
    window.open(waUrl, '_blank')

    // 2. Enviar email via Formspree (si está configurado)
    try {
      if (!FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(fullData),
        })
      }
    } catch (_) {
      // Email falla silenciosamente, WhatsApp ya fue abierto
    }

    setLoading(false)
    setStep('success')
    reset()
  }

  const tallas = categoria === 'adultos' ? TALLAS_ADULTO : TALLAS_NINO

  if (step === 'success') {
    return (
      <section id="pedido" className="py-24 bg-black border-t border-zinc-900">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-500/10 border border-gold-500 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-5xl text-white tracking-wider mb-4">¡Pedido Enviado!</h3>
          <p className="text-zinc-400 mb-2">Se abrió WhatsApp con tu pedido listo para enviar.</p>
          <p className="text-zinc-400 text-sm mb-8">Si WhatsApp no se abrió automáticamente, escríbenos al <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-gold-500 underline">+506 8529-7242</a>.</p>
          <button onClick={() => setStep('form')} className="btn-outline">Hacer otro pedido</button>
        </div>
      </section>
    )
  }

  return (
    <section id="pedido" className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-500 mb-3">Encárgala ya</p>
            <h2 className="section-title">Hacer Pedido</h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
            Completa el formulario y te contactamos por WhatsApp para confirmar tu pedido.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-6">
            {/* Datos personales */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-4 pb-2 border-b border-zinc-800">
                01 — Tus datos
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nombre completo *</label>
                  <input
                    {...register('nombre', { required: 'Nombre requerido' })}
                    className="input-field"
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
                </div>
                <div>
                  <label className="label">Teléfono / WhatsApp *</label>
                  <input
                    {...register('telefono', { required: 'Teléfono requerido' })}
                    className="input-field"
                    placeholder="8888-8888"
                    type="tel"
                  />
                  {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono.message}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="label">Correo electrónico</label>
                <input
                  {...register('correo')}
                  className="input-field"
                  placeholder="tucorreo@email.com"
                  type="email"
                />
              </div>
            </div>

            {/* Detalles del pedido */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-4 pb-2 border-b border-zinc-800">
                02 — Detalles de la camiseta
              </h3>

              {/* Categoría */}
              <div className="mb-4">
                <label className="label">Categoría *</label>
                <div className="grid grid-cols-2 gap-3">
                  {['adultos', 'ninos'].map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategoria(cat)}
                      className={`py-3 text-sm font-semibold uppercase tracking-widest border transition-all ${categoria === cat ? 'border-gold-500 text-gold-500 bg-gold-500/10' : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}
                    >
                      {cat === 'adultos' ? '⚽ Adultos (S–4XL)' : '👦 Niños (16–28)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Camiseta / Equipo / Modelo *</label>
                <input
                  {...register('camiseta', { required: 'Indica qué camiseta quieres' })}
                  className="input-field"
                  placeholder="Ej: Real Madrid Local 25-26, Messi Special Edition..."
                />
                {errors.camiseta && <p className="text-red-500 text-xs mt-1">{errors.camiseta.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Talla *</label>
                  <select {...register('talla', { required: 'Selecciona una talla' })} className="input-field">
                    <option value="">Seleccionar...</option>
                    {tallas.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.talla && <p className="text-red-500 text-xs mt-1">{errors.talla.message}</p>}
                </div>
                <div>
                  <label className="label">Cantidad *</label>
                  <select {...register('cantidad', { required: true })} className="input-field" defaultValue="1">
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="label">Personalización (nombre / número)</label>
                <input
                  {...register('personalizado')}
                  className="input-field"
                  placeholder="Ej: MESSI 10  (dejar vacío si no aplica)"
                />
              </div>
            </div>

            {/* Entrega */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-4 pb-2 border-b border-zinc-800">
                03 — Entrega
              </h3>
              <div>
                <label className="label">Método de entrega *</label>
                <select {...register('entrega', { required: 'Selecciona una opción' })} className="input-field" defaultValue="">
                  <option value="">Seleccionar...</option>
                  <option value="Envío por Correos de Costa Rica">Envío por Correos de Costa Rica</option>
                  <option value="Envío por mensajero">Envío por mensajero</option>
                  <option value="Retiro en punto de encuentro">Retiro en punto de encuentro</option>
                </select>
                {errors.entrega && <p className="text-red-500 text-xs mt-1">{errors.entrega.message}</p>}
              </div>
              <div className="mt-4">
                <label className="label">Notas adicionales</label>
                <textarea
                  {...register('notas')}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Cualquier detalle adicional, color preferido, urgencia..."
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full flex items-center justify-center gap-3 py-4 text-base disabled:opacity-50">
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Enviar por WhatsApp
                </>
              )}
            </button>
          </form>

          {/* Info lateral */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-zinc-950 border border-zinc-800 p-6">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">¿Tienes dudas?</h4>
              <p className="text-zinc-400 text-sm mb-4">Escríbenos directamente por WhatsApp y con gusto te ayudamos a escoger tu camiseta.</p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold text-sm transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                +506 8529-7242
              </a>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-6 space-y-4">
              <h4 className="font-bold text-white text-xs uppercase tracking-widest">Info importante</h4>
              {[
                { icon: '💳', text: 'Pago confirmado antes de hacer el pedido al proveedor.' },
                { icon: '📦', text: 'Tiempo de entrega estimado: 15–25 días hábiles.' },
                { icon: '🔄', text: 'Sin cambios ni devoluciones una vez confirmado el pedido.' },
                { icon: '✅', text: 'Pedidos por encargo, stock limitado según disponibilidad.' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <span className="text-lg">{icon}</span>
                  <p className="text-zinc-400 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
