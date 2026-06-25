import { useState } from 'react'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar',        flag: '🇺🇸', rateToINR: 83.4975 },
  { code: 'EUR', name: 'Euro',             flag: '🇪🇺', rateToINR: 90.2471 },
  { code: 'GBP', name: 'British Pound',    flag: '🇬🇧', rateToINR: 105.8903 },
  { code: 'AED', name: 'UAE Dirham',       flag: '🇦🇪', rateToINR: 22.7245 },
  { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬', rateToINR: 61.8930 },
]

const countries = [
  { flag: '🇺🇸', name: 'United States',  time: '1–2 days'   },
  { flag: '🇬🇧', name: 'United Kingdom', time: 'Same day'    },
  { flag: '🇦🇺', name: 'Australia',      time: '1–2 days'   },
  { flag: '🇨🇦', name: 'Canada',         time: '2–3 days'   },
  { flag: '🇦🇪', name: 'UAE',            time: 'Same day'    },
  { flag: '🇸🇬', name: 'Singapore',      time: 'Same day'    },
]

export default function SendMoneyPage() {
  const [amount, setAmount] = useState(500)
  const [currency, setCurrency] = useState('USD')
  const [recipient, setRecipient] = useState({ name: '', account: '', ifsc: '' })
  const [sent, setSent] = useState(false)

  const cur = CURRENCIES.find(c => c.code === currency)
  const inr = (amount * cur.rateToINR).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fee = (amount * 0.005).toFixed(2)

  if (sent) return (
    <div className="page-wrapper">
      <div className="success-screen container">
        <div className="success-icon">✅</div>
        <h2>Transfer Initiated!</h2>
        <p>Your transfer of <strong>{amount} {currency}</strong> (₹{inr}) has been submitted successfully.</p>
        <p className="success-sub">You will receive a confirmation email shortly.</p>
        <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
          Send Another Transfer
        </button>
      </div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">🌍 180+ Countries</span>
            <h1 className="page-title">Send <span className="accent">Money</span></h1>
            <p className="page-sub">Fast, secure international transfers at the best rates.</p>
          </div>
        </div>
      </div>

      <section className="container send-page-body">
        <div className="send-page-grid">
          <div className="send-form-panel">
            <h2 className="section-title">Transfer Details</h2>
            <p className="section-sub">Fill in the details below to send money</p>

            <div className="form-group">
              <label>Amount to Send</label>
              <div className="send-amount-row">
                <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value) || 0)} className="send-input" />
                <select className="send-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                  {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Recipient Name</label>
              <input type="text" placeholder="Full name" className="send-input full"
                value={recipient.name} onChange={e => setRecipient(r => ({ ...r, name: e.target.value }))} />
            </div>

            <div className="form-group">
              <label>Bank Account Number</label>
              <input type="text" placeholder="Account number" className="send-input full"
                value={recipient.account} onChange={e => setRecipient(r => ({ ...r, account: e.target.value }))} />
            </div>

            <div className="form-group">
              <label>IFSC / SWIFT Code</label>
              <input type="text" placeholder="e.g. SBIN0001234" className="send-input full"
                value={recipient.ifsc} onChange={e => setRecipient(r => ({ ...r, ifsc: e.target.value }))} />
            </div>

            <div className="transfer-summary">
              <div className="summary-row"><span>You Send</span><strong>{amount} {currency}</strong></div>
              <div className="summary-row"><span>Recipient Gets</span><strong>₹{inr}</strong></div>
              <div className="summary-row"><span>Transfer Fee</span><strong>${fee}</strong></div>
              <div className="summary-row summary-total"><span>Total Charged</span><strong>{(Number(amount) + Number(fee)).toFixed(2)} {currency}</strong></div>
            </div>

            <button className="btn btn-primary btn-block" onClick={() => setSent(true)}>
              Send Money Now →
            </button>
          </div>

          <div>
            <h2 className="section-title">Popular Corridors</h2>
            <p className="section-sub">We support transfers to 180+ countries</p>
            <div className="country-list">
              {countries.map(c => (
                <div key={c.name} className="country-item">
                  <span style={{ fontSize: 28 }}>{c.flag}</span>
                  <div>
                    <strong>{c.name}</strong>
                    <span>Delivery: {c.time}</span>
                  </div>
                  <span className="country-badge">{c.time === 'Same day' ? '⚡ Fast' : '✓ Reliable'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
