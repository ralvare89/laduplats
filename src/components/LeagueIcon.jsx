/**
 * SVG icons per league category.
 * All icons share viewBox="0 0 40 40" and accept `size` + `className` props.
 */

function Football({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5"/>
      {/* vertical seam */}
      <path d="M20 2C15 8 13 14 13 20s2 12 7 18" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 2C25 8 27 14 27 20s-2 12-7 18" stroke="currentColor" strokeWidth="2"/>
      {/* horizontal seams */}
      <path d="M3 14h34M3 26h34" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function Globe({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="17" fill="#1a6ba0" stroke="#2a8fcb" strokeWidth="1.5"/>
      {/* land mass hints */}
      <ellipse cx="14" cy="17" rx="5" ry="6" fill="#2d9e4a" opacity="0.85"/>
      <ellipse cx="26" cy="15" rx="4" ry="5" fill="#2d9e4a" opacity="0.85"/>
      <ellipse cx="22" cy="26" rx="5" ry="4" fill="#2d9e4a" opacity="0.85"/>
      {/* parallels */}
      <path d="M4 20h32" stroke="white" strokeWidth="1" opacity="0.4"/>
      <path d="M6 13h28M6 27h28" stroke="white" strokeWidth="0.8" opacity="0.3"/>
      {/* meridian */}
      <path d="M20 3C17 9 16 14 16 20s1 11 4 17" stroke="white" strokeWidth="1" opacity="0.4"/>
      <path d="M20 3C23 9 24 14 24 20s-1 11-4 17" stroke="white" strokeWidth="1" opacity="0.4"/>
      <circle cx="20" cy="20" r="17" stroke="#2a8fcb" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

/* ─── Premier League ─────────────────────────────────────────── */
function PremierLeague({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" className={className}>
      {/* Shield */}
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39 20 41C29.5 39 37 31.5 37 22V8.5L20 2Z" fill="#37003C"/>
      {/* Crown base bar */}
      <rect x="12" y="27" width="16" height="4" rx="1.5" fill="#E8F0FF"/>
      {/* Crown prongs */}
      <rect x="12" y="19" width="4"  height="9" rx="1.5" fill="#E8F0FF"/>
      <rect x="18" y="16" width="4"  height="12" rx="1.5" fill="#E8F0FF"/>
      <rect x="24" y="19" width="4"  height="9" rx="1.5" fill="#E8F0FF"/>
      {/* Orb dots on prongs */}
      <circle cx="14" cy="18"  r="2" fill="#E8F0FF"/>
      <circle cx="20" cy="15"  r="2.2" fill="#E8F0FF"/>
      <circle cx="26" cy="18"  r="2" fill="#E8F0FF"/>
    </svg>
  )
}

/* ─── La Liga ────────────────────────────────────────────────── */
function LaLiga({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Orange badge background */}
      <circle cx="20" cy="20" r="19" fill="#FF4700"/>
      {/* White football */}
      <circle cx="20" cy="20" r="13" fill="white"/>
      {/* Black pentagon patches — solid, high contrast */}
      <path d="M20 7 L25 11 L23 17.5 L17 17.5 L15 11 Z"          fill="#111"/>
      <path d="M30 15 L33 22 L28 26.5 L23 23.5 L23 17.5 L28.5 14 Z" fill="#111"/>
      <path d="M10 15 L11.5 14 L17 17.5 L17 23.5 L12 26.5 L7 22 Z"  fill="#111"/>
      <path d="M17 23.5 L23 23.5 L25 29 L20 32 L15 29 Z"          fill="#111"/>
      {/* Football border */}
      <circle cx="20" cy="20" r="13" stroke="#FF4700" strokeWidth="1.2"/>
      {/* Badge border */}
      <circle cx="20" cy="20" r="19" stroke="#c93a00" strokeWidth="1.5"/>
    </svg>
  )
}

/* ─── Ligue 1 ────────────────────────────────────────────────── */
function Ligue1({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Badge background */}
      <path d="M4 6 Q4 4 6 4 H34 Q36 4 36 6 V28 Q36 40 20 40 Q4 40 4 28 Z" fill="#E8003D"/>
      {/* Stylized lion — simplified silhouette */}
      {/* Head */}
      <circle cx="20" cy="16" r="6.5" fill="white"/>
      {/* Mane */}
      <circle cx="20" cy="16" r="9" fill="white" opacity="0.22"/>
      {/* Eyes */}
      <circle cx="17.5" cy="15" r="1.3" fill="#E8003D"/>
      <circle cx="22.5" cy="15" r="1.3" fill="#E8003D"/>
      {/* Nose */}
      <ellipse cx="20" cy="18" rx="1.2" ry="0.8" fill="#E8003D"/>
      {/* Crown on lion */}
      <path d="M14 10 L16 7 L20 9.5 L24 7 L26 10" stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none"/>
      {/* Body */}
      <path d="M14 22 Q14 32 20 34 Q26 32 26 22" fill="white" opacity="0.7"/>
      {/* Paws */}
      <ellipse cx="15" cy="32" rx="2.5" ry="1.5" fill="white"/>
      <ellipse cx="25" cy="32" rx="2.5" ry="1.5" fill="white"/>
    </svg>
  )
}

/* ─── Bundesliga ─────────────────────────────────────────────── */
function Bundesliga({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" className={className}>
      {/* Shield outline */}
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42C29.5 39.5 37 31.5 37 22V8.5L20 2Z" fill="#1C1C1C"/>
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42C29.5 39.5 37 31.5 37 22V8.5L20 2Z" stroke="#D20515" strokeWidth="2.5"/>
      {/* Red diagonal accent */}
      <path d="M3 23 L37 17" stroke="#D20515" strokeWidth="5" strokeLinecap="round"/>
      {/* Gold thin accent */}
      <path d="M3 26 L37 20" stroke="#FFCE00" strokeWidth="1.5" strokeLinecap="round"/>
      {/* White "B" mark — 3 dots */}
      <circle cx="14" cy="13" r="3" fill="white" opacity="0.9"/>
      <circle cx="14" cy="21" r="3" fill="white" opacity="0.9"/>
      <circle cx="14" cy="29" r="3" fill="white" opacity="0.9"/>
      <rect   x="14" y="10" width="7" height="4"  rx="2" fill="white" opacity="0.9"/>
      <rect   x="14" y="18" width="8" height="4"  rx="2" fill="white" opacity="0.9"/>
      <rect   x="14" y="26" width="7" height="4"  rx="2" fill="white" opacity="0.9"/>
    </svg>
  )
}

/* ─── Serie A ────────────────────────────────────────────────── */
function SerieA({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" className={className}>
      {/* Shield */}
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42C29.5 39.5 37 31.5 37 22V8.5L20 2Z" fill="#1B3F8B"/>
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42C29.5 39.5 37 31.5 37 22V8.5L20 2Z" stroke="#0B2060" strokeWidth="1.5"/>
      {/* Large 8-pointed star */}
      <path
        d="M20 8 L21.9 15.4 L28.7 12 L25.3 18.8 L32.7 20.7 L25.3 22.6 L28.7 29.4 L21.9 26 L20 33.4 L18.1 26 L11.3 29.4 L14.7 22.6 L7.3 20.7 L14.7 18.8 L11.3 12 L18.1 15.4 Z"
        fill="white" opacity="0.95"
      />
      {/* Center star */}
      <circle cx="20" cy="21" r="4" fill="#1B3F8B"/>
      <path
        d="M20 16 L20.9 18.7 L23.8 18.7 L21.5 20.4 L22.4 23.1 L20 21.4 L17.6 23.1 L18.5 20.4 L16.2 18.7 L19.1 18.7 Z"
        fill="white"
      />
    </svg>
  )
}

/* ─── MLS ────────────────────────────────────────────────────── */
function MLS({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 44" fill="none" className={className}>
      {/* Left half blue */}
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42L20 2Z" fill="#005CA9"/>
      {/* Right half red */}
      <path d="M20 2L37 8.5V22C37 31.5 29.5 39.5 20 42L20 2Z" fill="#C8102E"/>
      {/* White center stripe */}
      <rect x="18.5" y="2" width="3" height="40" fill="white"/>
      {/* Top badge outline */}
      <path d="M20 2L3 8.5V22C3 31.5 10.5 39.5 20 42C29.5 39.5 37 31.5 37 22V8.5L20 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
      {/* Stars */}
      <path d="M12 20 L12.7 22.2 L15 22.2 L13.2 23.5 L13.9 25.7 L12 24.4 L10.1 25.7 L10.8 23.5 L9 22.2 L11.3 22.2Z" fill="white" opacity="0.9"/>
      <path d="M28 20 L28.7 22.2 L31 22.2 L29.2 23.5 L29.9 25.7 L28 24.4 L26.1 25.7 L26.8 23.5 L25 22.2 L27.3 22.2Z" fill="white" opacity="0.9"/>
    </svg>
  )
}

/* ─── Jugadores ──────────────────────────────────────────────── */
function Player({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Jersey */}
      <path d="M13 16L6 20V32H34V20L27 16L26 24H14L13 16Z" fill="currentColor" opacity="0.85"/>
      {/* Sleeves */}
      <path d="M13 16L6 20L10 22L14 20" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M27 16L34 20L30 22L26 20" stroke="currentColor" strokeWidth="2" fill="none"/>
      {/* Head */}
      <circle cx="20" cy="10" r="5.5" fill="currentColor"/>
      {/* Number */}
      <text x="20" y="29" textAnchor="middle" fontSize="8" fontWeight="bold" fill="white" fontFamily="sans-serif">10</text>
    </svg>
  )
}

/* ─── Retro ──────────────────────────────────────────────────── */
function Retro({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* Old-school football — black & white pentagons */}
      <circle cx="20" cy="20" r="17" fill="white" stroke="currentColor" strokeWidth="2"/>
      {/* Central pentagon */}
      <path d="M20 11 L25 15 L23 21 L17 21 L15 15Z" fill="#1a1a1a"/>
      {/* Surrounding pentagons (5) */}
      <path d="M20 3  L24 8  L20 11 L16 8Z"   fill="#1a1a1a"/>
      <path d="M29 7  L33 12 L29 15 L25 11 L27 8Z" fill="#1a1a1a"/>
      <path d="M33 20 L36 26 L31 28 L28 24 L29 18Z" fill="#1a1a1a"/>
      <path d="M11 7  L13 11 L9  15 L5  12Z"   fill="#1a1a1a"/>
      <path d="M7  20 L12 18 L11 24 L8  28 L4  26Z" fill="#1a1a1a"/>
      <path d="M14 30 L17 26 L23 26 L26 30 L20 34Z" fill="#1a1a1a"/>
      <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
}

/* ─── Lifestyle ──────────────────────────────────────────────── */
function Lifestyle({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className}>
      {/* T-shirt body */}
      <path
        d="M14 8 L6 14 L10 18 L13 16 L13 34 H27 L27 16 L30 18 L34 14 L26 8 C25 11 21 12 20 12 C19 12 15 11 14 8Z"
        fill="currentColor" opacity="0.9"
      />
      {/* Collar */}
      <path d="M14 8 C15 12 25 12 26 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

/* ─── Public API ─────────────────────────────────────────────── */
const ICON_MAP = {
  all:        Football,
  selecciones: Globe,
  premier:    PremierLeague,
  laliga:     LaLiga,
  ligue1:     Ligue1,
  bundesliga: Bundesliga,
  seriea:     SerieA,
  mls:        MLS,
  jugadores:  Player,
  retro:      Retro,
  lifestyle:  Lifestyle,
}

export default function LeagueIcon({ id, size = 22, className = '' }) {
  const Icon = ICON_MAP[id]
  return Icon ? <Icon size={size} className={className} /> : null
}
