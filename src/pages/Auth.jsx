import { useState } from 'react'
import { UserRound } from 'lucide-react'

export default function Auth({ mode, setPage, onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim() || (mode === 'signup' && !name.trim())) {
      setError('Please fill in all fields.')
      return
    }
    onLogin({ name: mode === 'signup' ? name.trim() : (email.split('@')[0] || 'Shopper'), email: email.trim() })
  }

  return <section className="auth-wrap"><form className="auth-card" onSubmit={submit}><div className="auth-icon"><UserRound size={25} /></div><span className="eyebrow">WELCOME TO SHOPKART</span><h1>{mode === 'signup' ? 'Create account' : 'Welcome back'}</h1><p className="muted">{mode === 'signup' ? 'Create a demo account to continue.' : 'Sign in to your demo account.'}</p>{mode === 'signup' && <label>Full name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label>}<label>Email address<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button full-button" type="submit">{mode === 'signup' ? 'Create Account' : 'Login'}</button><p className="auth-switch">{mode === 'signup' ? 'Already have an account?' : "Don't have an account?"} <button type="button" onClick={() => setPage(mode === 'signup' ? 'login' : 'signup')}>{mode === 'signup' ? 'Login' : 'Sign up'}</button></p><small>Demo authentication only. Do not use a real password.</small></form></section>
}