import { JERSEYS_FROM_YUPOO } from './yupoo_catalog.js'

export const CATEGORIES = [
  { id: 'all',         label: 'Todo',          icon: '⚽' },
  { id: 'selecciones', label: 'Selecciones',   icon: '🌎' },
  { id: 'laliga',      label: 'La Liga',        icon: '🇪🇸' },
  { id: 'premier',     label: 'Premier',        icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'ligue1',      label: 'Ligue 1',        icon: '🇫🇷' },
  { id: 'bundesliga',  label: 'Bundesliga',     icon: '🇩🇪' },
  { id: 'seriea',      label: 'Serie A',        icon: '🇮🇹' },
  { id: 'mls',         label: 'MLS',            icon: '🇺🇸' },
  { id: 'jugadores',   label: 'Jugadores',      icon: '⭐' },
  { id: 'retro',       label: 'Retro',          icon: '⏳' },
  { id: 'lifestyle',   label: 'Lifestyle',      icon: '🎵' },
]

export const JERSEYS = JERSEYS_FROM_YUPOO

// Slider images → public/images/slider/[pais].jpg  (reemplaza para cambiar foto)
// Banderas  → public/images/slider/flag_[pais].svg/.png
export const WC2026_SLIDER = [
  { team: 'Argentina',  subtitle: '3 Estrellas · Campeones del Mundo', flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_argentina.svg', bg: '#75AADB', accent: '#FFFFFF', badge: '#003087', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/argentina.png' },
  { team: 'Brasil',     subtitle: 'Joga Bonito · 5 Títulos Mundiales', flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_brasil.svg',    bg: '#FCD116', accent: '#009C3B', badge: '#002776', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/brasil.png' },
  { team: 'Francia',    subtitle: 'Les Bleus · Dobles Campeones',      flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_francia.svg',   bg: '#003189', accent: '#FFFFFF', badge: '#ED2939', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/francia.png' },
  { team: 'España',     subtitle: 'La Roja · Euro 2024',               flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_espana.png',    bg: '#AA151B', accent: '#F1BF00', badge: '#AA151B', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/espana.png' },
  { team: 'Portugal',   subtitle: 'Seleção · CR7',                     flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_portugal.svg',  bg: '#006600', accent: '#FF0000', badge: '#006600', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/portugal.png' },
  { team: 'Alemania',   subtitle: 'Die Mannschaft · 4 Títulos',        flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_alemania.svg',  bg: '#CC0000', accent: '#FFFFFF', badge: '#DD0000', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/alemania.png' },
  { team: 'Colombia',   subtitle: 'Los Cafeteros · Copa América 2024', flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_colombia.svg',  bg: '#FCD116', accent: '#003087', badge: '#CE1126', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/colombia.png' },
  { team: 'Marruecos',  subtitle: 'Los Leones del Atlas',              flagImg: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/flag_marruecos.svg', bg: '#C1272D', accent: '#FFFFFF', badge: '#006233', img: 'https://pub-ab547c597d644d1ab3a407267f6df5cb.r2.dev/images/slider/marruecos.png' },
]
