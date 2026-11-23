import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function Cart({ cart, onQuantity, onRemove, onShop, onCheckout }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return (
    <section className="section-block page-section">
      <span className="eyebrow">YOUR BAG</span><h1>Shopping Cart</h1>
      {!cart.length ? <div className="empty-state"><ShoppingBag size={42} /><h3>Your cart is empty</h3><p>Find something you love and add it here.</p><button className="primary-button" onClick={onShop}>Start Shopping</button></div> : (
        <div className="cart-layout">
          <div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}><div className="cart-emoji">{item.emoji}</div><div className="cart-item-info"><h3>{item.name}</h3><p>{item.category}</p><strong>₹{item.price.toLocaleString('en-IN')}</strong><div className="quantity"><button onClick={() => onQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={14} /></button><span>{item.quantity}</span><button onClick={() => onQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={14} /></button></div></div><button className="remove-button" onClick={() => onRemove(item.id)} aria-label="Remove item"><Trash2 size={18} /></button></article>)}</div>
          <aside className="summary-card"><h2>Order Summary</h2><div><span>Subtotal</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><div><span>Delivery</span><b className="free">FREE</b></div><hr /><div className="total"><span>Total</span><b>₹{subtotal.toLocaleString('en-IN')}</b></div><button className="primary-button full-button" onClick={onCheckout}>Proceed to Checkout</button><small>Demo only — no real payment will be taken.</small></aside>
        </div>
      )}
    </section>
  )
}