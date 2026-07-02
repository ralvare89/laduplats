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
import GalleryModal from './components/GalleryModal'
import SizeGuideModal from './components/SizeGuideModal'
import AddToCartModal from './components/AddToCartModal'
import CartDrawer from './components/CartDrawer'
import MobileBottomBar from './components/MobileBottomBar'

export default function App() {
  const [searchQuery,    setSearchQuery]    = useState('')
  const [galleryJersey,  setGalleryJersey]  = useState(null)
  const [cartJersey,     setCartJersey]     = useState(null)  // jersey for AddToCartModal
  const [cartOpen,       setCartOpen]       = useState(false)
  const [sizeGuideOpen,  setSizeGuideOpen]  = useState(false)

  const openSizeGuide  = () => setSizeGuideOpen(true)
  const openCart       = () => setCartOpen(true)
  const openAddToCart  = (jersey) => setCartJersey(jersey)

  return (
    <div className="min-h-screen bg-black pb-16 md:pb-0">
      <Navbar onSizeGuide={openSizeGuide} onCartOpen={openCart} />
      <Hero />
      <WorldCupSlider onAddToCart={openAddToCart} />

      {/* Search */}
      <section className="py-10 bg-zinc-950 border-y border-zinc-900 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </section>

      <CatalogGrid
        searchQuery={searchQuery}
        onAddToCart={openAddToCart}
        onGallery={setGalleryJersey}
      />
      <ComoPedir />
      <FormPedido />
      <Footer />
      <WhatsAppFAB />
      <MobileBottomBar />

      {/* Gallery */}
      {galleryJersey && (
        <GalleryModal
          jersey={galleryJersey}
          onClose={() => setGalleryJersey(null)}
          onAddToCart={(j) => { setGalleryJersey(null); openAddToCart(j) }}
        />
      )}

      {/* Add to cart modal (size/qty picker) */}
      {cartJersey && (
        <AddToCartModal
          jersey={cartJersey}
          onClose={() => setCartJersey(null)}
          onSizeGuide={openSizeGuide}
        />
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <CartDrawer
          onClose={() => setCartOpen(false)}
          onSizeGuide={openSizeGuide}
        />
      )}

      {/* Size guide */}
      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
    </div>
  )
}
