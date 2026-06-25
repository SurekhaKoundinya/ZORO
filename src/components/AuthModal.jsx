import { useState } from 'react'

export default function AuthModal({ mode, onClose, onSwitch, onLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isLogin = mode === 'login'

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) return setError('Please fill in all required fields.')
    if (!isLogin) {
      if (!form.name) return setError('Please enter your full name.')
      if (form.password !== form.confirm) return setError('Passwords do not match.')
      if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: form.name || form.email.split('@')[0], email: form.email })
    }, 1000)
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>✕</button>

        <div className="auth-logo">
          <span className="logo-mark">Z</span>
        </div>

        <h2 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-sub">{isLogin ? 'Sign in to your ZORO account' : 'Start exchanging money at live rates'}</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={submit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handle} />
            </div>
          )}
          <div className="auth-field">
            <label>Email Address</label>
            <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input name="password" type="password" placeholder="••••••••" value={form.password} onChange={handle} />
          </div>
          {!isLogin && (
            <div className="auth-field">
              <label>Confirm Password</label>
              <input name="confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={handle} />
            </div>
          )}

          {isLogin && (
            <div className="auth-forgot">
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block auth-submit" disabled={loading}>
            {loading ? (isLogin ? 'Signing in…' : 'Creating account…') : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="auth-divider"><span>or continue with</span></div>

        <div className="auth-socials">
          <button className="auth-social-btn">🌐 Google</button>
          <button className="auth-social-btn">🍎 Apple</button>
        </div>

        <p className="auth-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => onSwitch(isLogin ? 'signup' : 'login')}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  )
}
