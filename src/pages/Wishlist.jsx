import ProductCard from '../components/ProductCard'

export default function Wishlist({ products, onView, onAdd, wishlist, onWishlist, onShop }) {
  const saved = products.filter((product) => wishlist.includes(product.id))
  return <section className="section-block page-section"><span className="eyebrow">SAVED FOR LATER</span><h1>Your Wishlist</h1>{saved.length ? <div className="product-grid">{saved.map((product) => <ProductCard key={product.id} product={product} onView={onView} onAdd={onAdd} isWishlisted onWishlist={onWishlist} />)}</div> : <div className="empty-state"><span>♡</span><h3>Your wishlist is empty</h3><p>Tap the heart on a product to save it here.</p><button className="primary-button" onClick={onShop}>Explore Products</button></div>}</section>
}