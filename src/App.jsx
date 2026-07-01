import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorldCupSlider from './components/WorldCupSlider'
import SearchBar from './components/SearchBar'
import CatalogGrid from './components/CatalogGrid'
import ComoPedir from './components/ComoPedir'
import FormPedido from './components/FormPedido'
import Footer from './components/Footer'
import WhatsAppFAB from './components/WhatsAppFAB'
import OrderModal from './components/OrderModal'
import GalleryModal from './components/GalleryModal'

export default function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [orderJersey, setOrderJersey] = useState(null)
  const [galleryJersey, setGalleryJersey] = useState(null)

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <WorldCupSlider onOrder={setOrderJersey} />

      {/* Search section */}
      <section className="py-10 bg-zinc-950 border-y border-zinc-900 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      <CatalogGrid
        searchQuery={searchQuery}
        onOrder={setOrderJersey}
        onGallery={setGalleryJersey}
      />
      <ComoPedir />
      <FormPedido />
      <Footer />
      <WhatsAppFAB />

      {galleryJersey && (
        <GalleryModal
          jersey={galleryJersey}
          onClose={() => setGalleryJersey(null)}
          onOrder={(j) => { setGalleryJersey(null); setOrderJersey(j) }}
        />
      )}

      {orderJersey && (
        <OrderModal jersey={orderJersey} onClose={() => setOrderJersey(null)} />
      )}
    </div>
  )
}
