import { useState } from 'react'

const FAQS = [
  { q:'How long does a transfer take?',                    a:'Most transfers complete within 24 hours. Same-day transfers are available to select countries like the UK, UAE and Singapore.' },
  { q:'Are there any hidden fees?',                        a:'Never. Zoro charges a flat fee shown upfront before you confirm. The rate you see is the rate you get.' },
  { q:'What currencies do you support?',                   a:'We support 50+ currencies and transfers to 180+ countries. Check our Rates page for the full list.' },
  { q:'Is my money safe?',                                 a:'Yes. Zoro is RBI-authorized and holds your funds in segregated accounts. All transfers are covered by bank-grade encryption.' },
  { q:'How do I track my transfer?',                       a:'You will receive email updates at every stage. You can also log into your dashboard for real-time status.' },
  { q:'Can I cancel a transfer?',                          a:'You can cancel within 30 minutes of initiating a transfer if funds have not yet been dispatched. Contact support immediately.' },
]

const categories = [
  { ico:'💸', title:'Payments & Transfers', desc:'Track, cancel or resend a transfer' },
  { ico:'🔐', title:'Account & Security',   desc:'Password, 2FA, and identity verification' },
  { ico:'💱', title:'Exchange Rates',       desc:'How rates are set and updated' },
  { ico:'📋', title:'Compliance & KYC',     desc:'Documents required for large transfers' },
  { ico:'💳', title:'Payment Methods',      desc:'Cards, bank accounts, UPI' },
  { ico:'🧾', title:'Receipts & Reports',   desc:'Download statements and tax documents' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`faq-item ${open ? 'faq-open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="faq-q">
        <span>{q}</span>
        <span className="faq-chev">{open ? '▲' : '▼'}</span>
      </div>
      {open && <div className="faq-a">{a}</div>}
    </div>
  )
}

export default function HelpPage() {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">🎧 Support</span>
            <h1 className="page-title">Help <span className="accent">Center</span></h1>
            <p className="page-sub">Find answers fast or reach our team — we're here 24/7.</p>
          </div>
        </div>
      </div>

      {/* Browse Categories */}
      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Browse by Topic</h2>
          <p className="section-sub">Pick a category to find what you need</p>
        </div>
        <div className="help-categories">
          {categories.map(c => (
            <div key={c.title} className="help-category">
              <span className="help-ico">{c.ico}</span>
              <strong>{c.title}</strong>
              <span>{c.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">Quick answers to common questions</p>
        </div>
        <div className="faq-list">
          {FAQS.map(f => <FAQItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      {/* Contact */}
      <section className="container section-pad">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="section-title">Still Need Help?</h2>
            <p className="section-sub">Our support team is available 24/7</p>
            <div className="contact-methods">
              <div className="contact-method">
                <span className="contact-ico">💬</span>
                <div><strong>Live Chat</strong><span>Average response: 2 min</span></div>
              </div>
              <div className="contact-method">
                <span className="contact-ico">📧</span>
                <div><strong>Email</strong><span>support@zoro.money</span></div>
              </div>
              <div className="contact-method">
                <span className="contact-ico">📞</span>
                <div><strong>Phone</strong><span>1800-123-ZORO (Mon–Fri 9am–6pm)</span></div>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <h3>Send Us a Message</h3>
            {submitted ? (
              <div className="form-success">
                ✅ Message received! We'll get back to you within 24 hours.
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" className="send-input full" placeholder="Full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="send-input full" placeholder="you@email.com" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="send-input full"
                    rows={4}
                    placeholder="Describe your issue..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
                <button className="btn btn-primary btn-block" onClick={() => setSubmitted(true)}>
                  Submit Message →
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
