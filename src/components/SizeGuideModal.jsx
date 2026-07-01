import { useState, useEffect } from 'react'

const ADULT_HEADERS = ['Talla', 'Largo (cm)', 'Pecho (cm)', 'Altura (cm)', 'Peso (kg)']

const FAN = [
  ['S',   '72', '100', '160–170', '<70'],
  ['M',   '74', '104', '170–175', '<65'],
  ['L',   '76', '108', '175–190', '<90'],
  ['XL',  '78', '112', '180–185', '<90'],
  ['2XL', '80', '116', '185–190', '<100'],
  ['3XL', '82', '124', '195–200', '<110'],
]

const PLAYER = [
  ['S',   '70', '92',  '160–170', '<60'],
  ['M',   '72', '96',  '170–175', '<68'],
  ['L',   '74', '100', '175–185', '<73'],
  ['XL',  '76', '102', '180–185', '<63'],
  ['2XL', '76', '108', '185–190', '<78'],
  ['3XL', '89', '124', '185–190', '<89'],
]

const KIDS_HEADERS = ['EU', 'N° Talla', 'Largo (cm)', 'Cintura (cm)', 'L. Pantalón', 'Cadera (cm)', 'Altura (cm)', 'Edad']

const KIDS = [
  ['XXXS', '16', '45', '33', '30', '38', '90–100',  '2–3 años'],
  ['XXS',  '18', '48', '35', '32', '40', '100–110', '4–5 años'],
  ['XS',   '20', '51', '37', '34', '42', '110–120', '6–7 años'],
  ['S',    '22', '54', '39', '36', '44', '120–130', '8–9 años'],
  ['M',    '24', '57', '41', '38', '46', '130–140', '10–11 años'],
  ['L',    '26', '60', '44', '40', '49', '140–150', '12–13 años'],
  ['XL',   '28', '63', '47', '42', '52', '150–160', '14–15 años'],
]

function SizeTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-900">
            {headers.map((h, i) => (
              <th
                key={i}
                className="py-2 px-2 md:px-3 text-left font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800 whitespace-nowrap text-[10px] md:text-xs"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-zinc-900/60 ${i % 2 === 0 ? 'bg-zinc-900/25' : ''}`}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={`py-2 px-2 md:px-3 whitespace-nowrap text-xs md:text-sm ${j === 0 ? 'font-bold text-gold-500' : 'text-zinc-300'}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SizeGuideModal({ onClose }) {
  const [tab, setTab] = useState('adultos')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-2xl max-h-[88vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 flex-shrink-0">
          <div>
            <h2 className="font-display text-3xl text-white tracking-wider">Guía de Tallas</h2>
            <p className="text-zinc-500 text-xs mt-0.5">Medidas de referencia · puede variar según proveedor</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors p-1">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800 flex-shrink-0">
          {['adultos', 'ninos'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                tab === t ? 'text-gold-500 border-b-2 border-gold-500 -mb-px' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {t === 'adultos' ? 'Adultos' : 'Niños'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6 space-y-7">
          {tab === 'adultos' ? (
            <>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/70 mb-3">Versión Fan — corte regular</p>
                <SizeTable headers={ADULT_HEADERS} rows={FAN} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/70 mb-3">Versión Player — corte ajustado</p>
                <SizeTable headers={ADULT_HEADERS} rows={PLAYER} />
              </div>
              <p className="text-zinc-600 text-xs">La versión Fan es más holgada y recomendada para uso casual. La versión Player sigue el corte atlético de los jugadores.</p>
            </>
          ) : (
            <>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gold-500/70 mb-3">Disponibles en tallas 18 · 20 · 22 · 24 · 26 · 28</p>
                <SizeTable headers={KIDS_HEADERS} rows={KIDS} />
              </div>
              <p className="text-zinc-600 text-xs">El número de talla equivale a la numeración estándar de uniformes deportivos infantiles. Se recomienda guiarse por la altura del niño para mayor precisión.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
