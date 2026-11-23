import { SlidersHorizontal } from 'lucide-react'
import { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products({ products, search, setSearch, category, setCategory, sort, setSort, onView, onAdd, wishlist, onWishlist }) {
  return (
    <section className="section-block page-section">
      <div className="section-heading"><div><span className="eyebrow">THE SHOP</span><h1>All Products</h1><p className="muted">{products.length} products found</p></div></div>
      <div className="filters">
        <label className="filter-search">Search <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name..." /></label>
        <label>Category <select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><SlidersHorizontal size={16} /> Sort by <select value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Top Rated</option></select></label>
      </div>
      {products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onView={onView} onAdd={onAdd} isWishlisted={wishlist.includes(product.id)} onWishlist={onWishlist} />)}</div> : <div className="empty-state"><span>🔎</span><h3>No products found</h3><p>Try another search or category.</p></div>}
    </section>
  )
}