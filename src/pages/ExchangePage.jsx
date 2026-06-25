import ExchangeCard from '../components/ExchangeCard'

const steps = [
  { n: '01', title: 'Choose Currencies', desc: 'Select the currency you want to convert from and to.' },
  { n: '02', title: 'Enter Amount',      desc: 'Type in how much you want to exchange.' },
  { n: '03', title: 'Review Rate',       desc: 'See the live rate and estimated amount you will receive.' },
  { n: '04', title: 'Confirm & Pay',     desc: 'Verify details and complete your exchange securely.' },
]

export default function ExchangePage({ user, onAuthOpen }) {
  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">💱 Live Rates</span>
            <h1 className="page-title">Currency <span className="accent">Exchange</span></h1>
            <p className="page-sub">Convert money at real exchange rates. No hidden markups, no surprises.</p>
          </div>
        </div>
      </div>

      <section className="container exchange-page-body">
        <div className="exchange-page-grid">
          <div>
            <h2 className="section-title">Exchange Now</h2>
            <p className="section-sub">Live rates updated every minute</p>
            <ExchangeCard user={user} onAuthOpen={onAuthOpen} />
          </div>
          <div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">Four simple steps to exchange money</p>
            <div className="steps-list">
              {steps.map(s => (
                <div key={s.n} className="step-item">
                  <div className="step-num">{s.n}</div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
