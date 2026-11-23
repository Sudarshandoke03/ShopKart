import { Heart, ShoppingCart, Star } from 'lucide-react'

export default function ProductCard({ product, onView, onAdd, isWishlisted, onWishlist }) {
  return (
    <article className="product-card">
      <div className="product-image" role="button" tabIndex={0} onClick={() => onView(product)} onKeyDown={(e) => e.key === 'Enter' && onView(product)}>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`wishlist-button ${isWishlisted ? 'selected' : ''}`} onClick={(e) => { e.stopPropagation(); onWishlist(product.id) }} aria-label="Toggle wishlist">
          <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <span className="product-emoji">{product.emoji}</span>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <button className="product-name" onClick={() => onView(product)}>{product.name}</button>
        <div className="rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({product.reviews.toLocaleString('en-IN')})</span></div>
        <div className="price-row">
          <strong>₹{product.price.toLocaleString('en-IN')}</strong>
          <del>₹{product.oldPrice.toLocaleString('en-IN')}</del>
        </div>
        <button className="add-button" onClick={() => onAdd(product)}><ShoppingCart size={16} /> Add to Cart</button>
      </div>
    </article>
  )
}