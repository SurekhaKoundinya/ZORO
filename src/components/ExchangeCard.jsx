import { useState, useRef, useEffect } from 'react'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar',        flag: '🇺🇸', rateToINR: 83.4975 },
  { code: 'EUR', name: 'Euro',             flag: '🇪🇺', rateToINR: 90.2471 },
  { code: 'GBP', name: 'British Pound',    flag: '🇬🇧', rateToINR: 105.8903 },
  { code: 'AED', name: 'UAE Dirham',       flag: '🇦🇪', rateToINR: 22.7245 },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rateToINR: 61.8930 },
]

const INR = { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rateToINR: 1 }

function CurrencyPicker({ selected, onChange, exclude }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const cur = CURRENCIES.find((c) => c.code === selected)

  return (
    <div className="currency-select-wrapper" ref={ref}>
      <div className="currency" onClick={() => setOpen((o) => !o)}>
        <span className="flag">{cur.flag}</span>
        <div>
          <div className="code">{cur.code}</div>
          <div className="name">{cur.name}</div>
        </div>
        <span className="chev">▾</span>
      </div>
      {open && (
        <div className="currency-dropdown">
          {CURRENCIES.filter((c) => c.code !== exclude).map((c) => (
            <div
              key={c.code}
              className="currency-option"
              onClick={() => { onChange(c.code); setOpen(false) }}
            >
              <span className="c-flag">{c.flag}</span>
              <div>
                <div className="c-code">{c.code}</div>
                <div className="c-name">{c.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SuccessModal({ amount, fromCode, receive, onClose }) {
  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
        <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
          <h2 className="auth-title" style={{ marginBottom: 8 }}>Exchange Initiated!</h2>
          <p className="auth-sub">Your exchange request has been submitted successfully.</p>
          <div className="exchange-confirm-box">
            <div className="exchange-confirm-row">
              <span>You Send</span>
              <strong>{amount.toLocaleString()} {fromCode}</strong>
            </div>
            <div className="exchange-confirm-row">
              <span>You Receive</span>
              <strong>₹{receive} INR</strong>
            </div>
          </div>
          <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ExchangeCard({ user, onAuthOpen }) {
  const [send, setSend] = useState(1000)
  const [fromCode, setFromCode] = useState('USD')
  const [showSuccess, setShowSuccess] = useState(false)

  const from = CURRENCIES.find((c) => c.code === fromCode)
  const rate = from.rateToINR

  const receive = (send * rate).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const handleExchange = () => {
    if (!user) {
      onAuthOpen && onAuthOpen('login')
      return
    }
    if (!send || send <= 0) return
    setShowSuccess(true)
  }

  return (
    <>
      <div className="exchange-card">
        <h3>Exchange Money</h3>

        <div className="field-label">You Send</div>
        <div className="money-input">
          <input
            type="number"
            value={send}
            onChange={(e) => setSend(Number(e.target.value) || 0)}
          />
          <CurrencyPicker
            selected={fromCode}
            onChange={setFromCode}
            exclude="INR"
          />
        </div>

        <div className="swap-row">
          <button className="swap-btn" aria-label="Swap currencies">⇅</button>
        </div>

        <div className="field-label">You Receive</div>
        <div className="money-input">
          <input type="text" value={receive} readOnly />
          <div className="currency">
            <span className="flag">{INR.flag}</span>
            <div>
              <div className="code">{INR.code}</div>
              <div className="name">{INR.name}</div>
            </div>
          </div>
        </div>

        <div className="rate-bar">
          <span>1 {fromCode} = {rate} INR</span>
          <span className="rate-up">+0.35% ↑</span>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleExchange}>
          {user ? 'Exchange Now' : 'Login to Exchange'}
        </button>

        <div className="card-badges">
          <div className="card-badge">
            <span className="ico">👥</span>
            <div><strong>Best Rates</strong><span>Guaranteed</span></div>
          </div>
          <div className="card-badge">
            <span className="ico">🛡️</span>
            <div><strong>Zero Hidden</strong><span>Charges</span></div>
          </div>
          <div className="card-badge">
            <span className="ico">✓</span>
            <div><strong>Secure</strong><span>Transactions</span></div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          amount={send}
          fromCode={fromCode}
          receive={receive}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  )
}
