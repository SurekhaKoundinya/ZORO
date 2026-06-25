import ExchangeCard from './ExchangeCard'

const avatars = [
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=32',
  'https://i.pravatar.cc/80?img=15',
  'https://i.pravatar.cc/80?img=45',
]

export default function Hero({ onNavigate }) {
  return (
    <section className="hero container">
      <div className="hero-left">
        <span className="pill">🛡️ Secure. Fast. Reliable</span>
        <h1>
          Money Exchange<br />
          Made <span className="accent">Simple</span>
        </h1>
        <p>
          Get the best exchange rates with zero hidden fees.
          Fast, secure and trusted by millions worldwide.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => onNavigate && onNavigate('Exchange')}>
            Exchange Now <span className="arrow">→</span>
          </button>
          <button className="btn btn-outline-dark" onClick={() => onNavigate && onNavigate('Send Money')}>
            Send Money
          </button>
        </div>
        <div className="social-proof">
          <div className="avatars">
            {avatars.map((src, i) => (
              <img key={i} src={src} alt="customer" />
            ))}
          </div>
          <div className="rating-text">
            <div className="stars">★★★★★</div>
            <strong>4.8/5 from 20,000+ customers</strong>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <ExchangeCard />
      </div>
    </section>
  )
}
