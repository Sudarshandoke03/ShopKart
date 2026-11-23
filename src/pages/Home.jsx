import { ArrowRight, ShieldCheck, Truck, Headphones } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function Home({ products, onView, onAdd, wishlist, onWishlist, setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR EVERYDAY MARKETPLACE</span>
          <h1>Find your next<br /><em>favourite thing.</em></h1>
          <p>Discover useful tech, everyday essentials and fresh finds at prices you'll love.</p>
          <button className="primary-button" onClick={() => setPage('products')}>Shop Now <ArrowRight size={18} /></button>
        </div>
        <div className="hero-art"><div className="hero-circle">🛍️</div><span className="floating-tag tag-one">Great deals</span><span className="floating-tag tag-two">New finds ✨</span></div>
      </section>

      <section className="benefits">
        <div><Truck /><span><b>Easy shopping</b><small>Browse from anywhere</small></span></div>
        <div><ShieldCheck /><span><b>Secure demo checkout</b><small>Frontend demonstration</small></span></div>
        <div><Headphones /><span><b>Here to help</b><small>Customer-first experience</small></span></div>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">HAND-PICKED FOR YOU</span><h2>Popular products</h2></div><button className="text-link" onClick={() => setPage('products')}>View all <ArrowRight size={16} /></button></div>
        <div className="product-grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onView={onView} onAdd={onAdd} isWishlisted={wishlist.includes(product.id)} onWishlist={onWishlist} />)}
        </div>
      </section>
    </>
  )
}