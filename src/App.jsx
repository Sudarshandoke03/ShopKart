import { useMemo, useState } from 'react'
import { products as allProducts } from './data/products'
import { readStorage, writeStorage } from './utils/storage'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import ProductDetails from './pages/ProductDetails'
import Auth from './pages/Auth'

export default function App() {
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState(() => readStorage('shopkart-cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('shopkart-wishlist', []))
  const [user, setUser] = useState(() => readStorage('shopkart-user', null))
  const [notice, setNotice] = useState('')

  function showNotice(message) {
    setNotice(message)
    window.clearTimeout(showNotice.timer)
    showNotice.timer = window.setTimeout(() => setNotice(''), 2400)
  }

  function addToCart(product) {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      const next = found ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }]
      writeStorage('shopkart-cart', next)
      return next
    })
    showNotice(`${product.name} added to cart`)
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const next = current.map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0)
      writeStorage('shopkart-cart', next)
      return next
    })
  }

  function removeFromCart(id) {
    setCart((current) => {
      const next = current.filter((item) => item.id !== id)
      writeStorage('shopkart-cart', next)
      return next
    })
    showNotice('Item removed from cart')
  }

  function toggleWishlist(id) {
    setWishlist((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
      writeStorage('shopkart-wishlist', next)
      return next
    })
  }

  function viewProduct(product) {
    setSelectedProduct(product)
    setPage('details')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function login(details) {
    setUser(details)
    writeStorage('shopkart-user', details)
    setPage('home')
    showNotice('You are logged in (demo)')
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('shopkart-user')
    showNotice('Logged out')
  }

  function checkout() {
    if (!user) {
      setPage('login')
      showNotice('Please login to continue')
      return
    }
    showNotice('Demo checkout complete — no payment taken')
    setCart([])
    writeStorage('shopkart-cart', [])
  }

  const visibleProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.category.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || product.category === category
      return matchesSearch && matchesCategory
    })
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)
    return result
  }, [search, category, sort])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="app-shell">
      <Header page={page} setPage={setPage} search={search} setSearch={setSearch} cartCount={cartCount} wishlistCount={wishlist.length} user={user} onLogout={logout} />
      {notice && <div className="toast" role="status">{notice}</div>}
      <main>
        {page === 'home' && <Home products={allProducts} onView={viewProduct} onAdd={addToCart} wishlist={wishlist} onWishlist={toggleWishlist} setPage={setPage} />}
        {page === 'products' && <Products products={visibleProducts} search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} onView={viewProduct} onAdd={addToCart} wishlist={wishlist} onWishlist={toggleWishlist} />}
        {page === 'cart' && <Cart cart={cart} onQuantity={changeQuantity} onRemove={removeFromCart} onShop={() => setPage('products')} onCheckout={checkout} />}
        {page === 'wishlist' && <Wishlist products={allProducts} onView={viewProduct} onAdd={addToCart} wishlist={wishlist} onWishlist={toggleWishlist} onShop={() => setPage('products')} />}
        {page === 'details' && <ProductDetails product={selectedProduct} onBack={() => setPage('products')} onAdd={addToCart} isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false} onWishlist={toggleWishlist} />}
        {page === 'login' && <Auth mode="login" setPage={setPage} onLogin={login} />}
        {page === 'signup' && <Auth mode="signup" setPage={setPage} onLogin={login} />}
      </main>
      <Footer setPage={setPage} />
    </div>
  )
}