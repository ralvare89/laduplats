import { useState, useEffect } from 'react'
import { JERSEYS } from '../data/catalog'

const KEY = 'ladupla_cart_v1'

// ── Persist/restore ──────────────────────────────────────────────────────────
function _load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return raw
      .map(s => ({ ...s, number: s.number || '', jersey: JERSEYS.find(j => j.id === s.jerseyId) || null }))
      .filter(i => i.jersey)
  } catch { return [] }
}

function _save(items) {
  localStorage.setItem(KEY, JSON.stringify(
    items.map(({ key, jerseyId, size, qty, number, personalization }) =>
      ({ key, jerseyId, size, qty, number, personalization })
    )
  ))
}

// ── Module-level singleton store ─────────────────────────────────────────────
let _items = _load()
const _listeners = new Set()

function _notify() {
  const snap = [..._items]
  _listeners.forEach(fn => fn(snap))
}

// ── Actions ──────────────────────────────────────────────────────────────────
export function cartAdd(jersey, size, qty = 1, number = '', personalization = '') {
  const existing = _items.find(
    i => i.jerseyId === jersey.id && i.size === size && i.number === number && i.personalization === personalization
  )
  if (existing) {
    _items = _items.map(i => i === existing ? { ...i, qty: i.qty + qty } : i)
  } else {
    _items = [..._items, {
      key: `${jersey.id}-${size}-${Date.now()}`,
      jerseyId: jersey.id,
      jersey,
      size,
      qty,
      number,
      personalization,
    }]
  }
  _save(_items)
  _notify()
}

export function cartRemove(key) {
  _items = _items.filter(i => i.key !== key)
  _save(_items)
  _notify()
}

export function cartSetQty(key, qty) {
  if (qty <= 0) { cartRemove(key); return }
  _items = _items.map(i => i.key === key ? { ...i, qty } : i)
  _save(_items)
  _notify()
}

export function cartClear() {
  _items = []
  _save(_items)
  _notify()
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useCart() {
  const [items, setItems] = useState([..._items])
  useEffect(() => {
    _listeners.add(setItems)
    return () => _listeners.delete(setItems)
  }, [])
  return items
}
