const plans = [
  {
    name: 'Starter',
    price: '₹0',
    period: '/month',
    desc: 'Perfect for small businesses just getting started.',
    features: ['Up to ₹5L monthly volume', '10 free transfers', 'Live rate access', 'Email support'],
    cta: 'Get Started Free',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '₹2,999',
    period: '/month',
    desc: 'For growing businesses with higher transfer needs.',
    features: ['Up to ₹50L monthly volume', 'Unlimited transfers', 'Priority rates', 'Dedicated account manager', 'API access'],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'Tailored solutions for large-scale operations.',
    features: ['Unlimited volume', 'Custom FX rates', 'White-label option', '24/7 phone support', 'Compliance tools', 'Multi-user access'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

const benefits = [
  { ico: '📊', title: 'Real-Time Dashboard', desc: 'Track all transactions and FX exposure from one place.' },
  { ico: '🔌', title: 'API Integration',     desc: 'Plug Zoro directly into your ERP or payment stack.' },
  { ico: '🧾', title: 'Bulk Payments',       desc: 'Pay multiple vendors and employees in one click.' },
  { ico: '🛡️', title: 'Compliance Ready',    desc: 'RBI-compliant with full audit trail and reporting.' },
]

export default function BusinessPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">🏢 Business Solutions</span>
            <h1 className="page-title">FX for <span className="accent">Business</span></h1>
            <p className="page-sub">Better rates, smarter tools, and full compliance for growing companies.</p>
          </div>
        </div>
      </div>

      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Why Businesses Choose Zoro</h2>
          <p className="section-sub">Built for finance teams and operations at scale</p>
        </div>
        <div className="benefits-grid">
          {benefits.map(b => (
            <div key={b.title} className="benefit-card">
              <div className="benefit-ico">{b.ico}</div>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-sub">No setup fees. Cancel anytime.</p>
        </div>
        <div className="plans-grid">
          {plans.map(p => (
            <div key={p.name} className={`plan-card ${p.highlight ? 'plan-highlight' : ''}`}>
              {p.highlight && <div className="plan-badge">Most Popular</div>}
              <h3>{p.name}</h3>
              <div className="plan-price">{p.price}<span>{p.period}</span></div>
              <p className="plan-desc">{p.desc}</p>
              <ul className="plan-features">
                {p.features.map(f => <li key={f}>✓ {f}</li>)}
              </ul>
              <button className={`btn ${p.highlight ? 'btn-primary' : 'btn-ghost-dark'} btn-block`}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
