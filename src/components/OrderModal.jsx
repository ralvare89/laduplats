import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const WHATSAPP_NUMBER = '50685297242'

export default function OrderModal({ jersey, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      camiseta: jersey?.name || '',
      talla: jersey?.sizes?.[2] || 'M',
      cantidad: '1',
    }
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  const onSubmit = (data) => {
    const msg = encodeURIComponent(
      `🏆 *PEDIDO – La Dupla T&S*\n\n` +
      `👤 *Nombre:* ${data.nombre}\n` +
      `📱 *Teléfono:* ${data.telefono}\n\n` +
      `⚽ *Camiseta:* ${data.camiseta}\n` +
      `📏 *Talla:* ${data.talla}\n` +
      `🔢 *Cantidad:* ${data.cantidad}\n` +
      (data.personalizado ? `✏️ *Personalización:* ${data.personalizado}\n` : '') +
      (data.notas ? `📝 *Notas:* ${data.notas}\n` : '') +
      `\n_Enviado desde laduplats.com_`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-zinc-950 border border-zinc-700 w-full sm:max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="font-display text-3xl text-white tracking-wider">Pedir</h3>
            {jersey && <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-xs">{jersey.name}</p>}
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Nombre *</label>
              <input {...register('nombre', { required: true })} className="input-field" placeholder="Tu nombre" />
              {errors.nombre && <p className="text-red-500 text-xs mt-1">Requerido</p>}
            </div>
            <div>
              <label className="label">Teléfono *</label>
              <input {...register('telefono', { required: true })} className="input-field" placeholder="8888-8888" type="tel" />
              {errors.telefono && <p className="text-red-500 text-xs mt-1">Requerido</p>}
            </div>
          </div>

          <div>
            <label className="label">Camiseta *</label>
            <input {...register('camiseta', { required: true })} className="input-field" placeholder="Nombre de la camiseta" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Talla *</label>
              <select {...register('talla')} className="input-field">
                {(jersey?.sizes || ['S','M','L','XL','2XL']).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Cantidad</label>
              <select {...register('cantidad')} className="input-field">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="label">Nombre / Número (personalización)</label>
            <input {...register('personalizado')} className="input-field" placeholder="Ej: MESSI 10 — opcional" />
          </div>

          <div>
            <label className="label">Notas</label>
            <textarea {...register('notas')} rows={2} className="input-field resize-none" placeholder="Color, urgencia, etc." />
          </div>

          <button type="submit" className="btn-gold w-full py-4 flex items-center justify-center gap-2 text-base">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Enviar pedido por WhatsApp
          </button>
        </form>
      </div>
    </div>
  )
}
