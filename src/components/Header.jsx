import { Search, ShoppingCart, Heart, UserRound, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header({ page, setPage, search, setSearch, cartCount, wishlistCount, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function go(nextPage) {
    setPage(nextPage)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submitSearch(event) {
    event.preventDefault()
    go('products')
  }

  return (
    <header className="site-header">
      <div className="header-main">
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <button className="brand" onClick={() => go('home')} aria-label="ShopKart home">
          <span>Shop</span>Kart<span className="brand-dot">.</span>
        </button>

        <form className="search-form" onSubmit={submitSearch}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." aria-label="Search products" />
          <button type="submit" aria-label="Search"><Search size={19} /></button>
        </form>

        <nav className={`header-actions ${menuOpen ? 'menu-open' : ''}`}>
          <button className={`nav-action ${page === 'wishlist' ? 'active' : ''}`} onClick={() => go('wishlist')}>
            <span className="action-icon"><Heart size={20} /><small>{wishlistCount}</small></span>
            <span>Wishlist</span>
          </button>
          <button className={`nav-action ${page === 'cart' ? 'active' : ''}`} onClick={() => go('cart')}>
            <span className="action-icon"><ShoppingCart size={20} /><small>{cartCount}</small></span>
            <span>Cart</span>
          </button>
          {user ? (
            <button className="nav-action" onClick={onLogout}>
              <UserRound size={20} /><span>{user.name.split(' ')[0]} · Logout</span>
            </button>
          ) : (
            <button className="nav-action" onClick={() => go('login')}>
              <UserRound size={20} /><span>Login</span>
            </button>
          )}
        </nav>
      </div>
      <div className="category-bar">
        <button onClick={() => go('home')}>Home</button>
        <button onClick={() => go('products')}>All Products</button>
        <button onClick={() => go('products',)}>Deals</button>
        <span>Welcome to ShopKart — great finds, great prices.</span>
      </div>
    </header>
  )
}