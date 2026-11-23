export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div><button className="footer-brand" onClick={() => setPage('home')}>ShopKart.</button><p>Everyday shopping made simple.</p></div>
        <div><strong>Explore</strong><button onClick={() => setPage('products')}>All Products</button><button onClick={() => setPage('wishlist')}>Wishlist</button></div>
        <div><strong>Help</strong><span>Contact: support@shopkart.example</span><span>Demo storefront</span></div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} ShopKart. Demo project for learning React.</p>
    </footer>
  )
}