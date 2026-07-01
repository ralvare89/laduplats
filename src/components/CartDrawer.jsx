import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCart, cartRemove, cartSetQty, cartClear } from '../store/useCart'

const WHATSAPP_NUMBER = '50685297242'

export default function CartDrawer({ onClose, onSizeGuide }) {
  const items      = useCart()
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0)

  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  const onCheckout = (data) => {
    const lines = items.map((item, idx) => {
      let line = `${idx + 1}. *${item.jersey.name}*\n`
      line += `   ⚽ ${item.jersey.team}  |  📏 ${item.size}  |  🔢 ${item.qty}`
      if (item.personalization) line += `\n   ✏️ ${item.personalization}`
      return line
    }).join('\n\n')

    const msg = encodeURIComponent(
      `🛒 *PEDIDO – La Dupla T&S*\n\n` +
      `👤 *Nombre:* ${data.nombre}\n` +
      `📱 *Teléfono:* ${data.telefono}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n\n` +
      lines +
      `\n\n━━━━━━━━━━━━━━━━━━━━\n` +
      `📦 *Total:* ${totalItems} pieza${totalItems !== 1 ? 's' : ''}\n\n` +
      `_Enviado desde laduplats.com_`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    cartClear()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[180] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sliding panel */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-zinc-950 border-l border-zinc-800 z-[190] flex flex-col shadow-2xl">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-display text-2xl text-white tracking-wider">Carrito</span>
            {totalItems > 0 && (
              <span className="bg-gold-500 text-black text-xs font-black px-2 py-0.5 leading-none">
                {totalItems}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Empty state ─────────────────────────────────────── */}
        {items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <svg className="w-16 h-16 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-zinc-500 text-sm">Tu carrito está vacío</p>
            <button onClick={onClose} className="btn-ghost text-xs py-2 px-6">Ver catálogo</button>
          </div>
        )}

        {/* ── Items list ──────────────────────────────────────── */}
        {items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <div key={item.key} className="flex gap-3 pb-4 border-b border-zinc-900 last:border-0">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 flex-shrink-0 border border-zinc-800 bg-zinc-900 overflow-hidden">
                    {(item.jersey.img || item.jersey.imgProd) ? (
                      <img
                        src={item.jersey.img || item.jersey.imgProd}
                        alt={item.jersey.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest truncate">{item.jersey.team}</p>
                    <p className="text-white text-xs font-semibold leading-snug mt-0.5 line-clamp-2">{item.jersey.name}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-gold-500 text-[10px] font-bold border border-gold-500/40 px-1.5 py-0.5 leading-none">
                        {item.size}
                      </span>
                      {item.personalization && (
                        <span className="text-zinc-500 text-[10px] truncate max-w-[120px]">
                          ✏️ {item.personalization}
                        </span>
                      )}
                    </div>

                    {/* Qty + remove */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => cartSetQty(item.key, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-base"
                      >
                        −
                      </button>
                      <span className="text-white font-bold text-sm w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => cartSetQty(item.key, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white transition-all text-base"
                      >
                        +
                      </button>
                      <button
                        onClick={() => cartRemove(item.key)}
                        className="ml-auto text-zinc-600 hover:text-red-500 transition-colors p-1"
                        title="Eliminar"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear all */}
              <button
                onClick={() => { if (confirm('¿Vaciar todo el carrito?')) cartClear() }}
                className="text-xs text-zinc-700 hover:text-red-500 transition-colors flex items-center gap-1.5 pt-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7M4 7h16" />
                </svg>
                Vaciar carrito
              </button>
            </div>

            {/* ── Checkout ──────────────────────────────────────── */}
            <div className="border-t border-zinc-800 px-5 pt-4 pb-6 flex-shrink-0 bg-zinc-950 space-y-4">
              {/* Summary */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-500">{items.length} artículo{items.length !== 1 ? 's' : ''}</span>
                <span className="text-white font-bold">{totalItems} pieza{totalItems !== 1 ? 's' : ''} en total</span>
              </div>

              {/* Contact form */}
              <form onSubmit={handleSubmit(onCheckout)} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label text-[10px] mb-1">Nombre *</label>
                    <input
                      {...register('nombre', { required: true })}
                      className="input-field py-2.5 text-sm"
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-[10px] mt-0.5">Requerido</p>}
                  </div>
                  <div>
                    <label className="label text-[10px] mb-1">Teléfono *</label>
                    <input
                      {...register('telefono', { required: true })}
                      className="input-field py-2.5 text-sm"
                      placeholder="8888-8888"
                      type="tel"
                    />
                    {errors.telefono && <p className="text-red-500 text-[10px] mt-0.5">Requerido</p>}
                  </div>
                </div>

                <button type="submit" className="btn-gold w-full py-3.5 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.551 4.105 1.515 5.83L0 24l6.335-1.652A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.518-5.184-1.421l-.372-.22-3.862 1.007 1.03-3.758-.242-.387A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Enviar pedido por WhatsApp
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}
