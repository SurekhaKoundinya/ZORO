const rates = [
  { flag: '🇺🇸', pair: 'USD / INR', sub: 'US Dollar / Indian Rupee', rate: '83.4975', chg: '+0.35%', up: true },
  { flag: '🇪🇺', pair: 'EUR / INR', sub: 'Euro / Indian Rupee', rate: '90.2471', chg: '+0.21%', up: true },
  { flag: '🇬🇧', pair: 'GBP / INR', sub: 'British Pound / Indian Rupee', rate: '105.8903', chg: '-0.15%', up: false },
]

function Spark({ up }) {
  const color = up ? '#16a34a' : '#ef4444'
  const d = up
    ? 'M2 20 L14 14 L26 17 L38 8 L50 12 L62 4 L68 6'
    : 'M2 6 L14 10 L26 7 L38 16 L50 12 L62 20 L68 18'
  return (
    <svg className="spark" viewBox="0 0 70 26" fill="none">
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function RatesAndSend({ onNavigate }) {
  return (
    <section className="rates-send container">
      <div className="panel panel-light">
        <div className="panel-head">
          <h3>Popular Exchange Rates</h3>
          <a href="#" className="view-all" onClick={e => { e.preventDefault(); onNavigate && onNavigate('Rates') }}>View All Rates</a>
        </div>
        <table className="rates-table">
          <thead>
            <tr>
              <th>Currency Pair</th>
              <th>Rate</th>
              <th>Change (24h)</th>
              <th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((r) => (
              <tr key={r.pair}>
                <td>
                  <div className="pair">
                    <span className="flag">{r.flag}</span>
                    <div><strong>{r.pair}</strong><span>{r.sub}</span></div>
                  </div>
                </td>
                <td>{r.rate}</td>
                <td className={r.up ? 'chg-up' : 'chg-down'}>{r.chg}</td>
                <td><Spark up={r.up} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel panel-dark">
        <h3>Send Money<br />Across the Globe</h3>
        <p>Fast, secure and reliable money transfers to your loved ones.</p>
        <button className="btn btn-outline-dark" onClick={() => onNavigate && onNavigate('Send Money')}>
          Send Money Now <span className="arrow">→</span>
        </button>
        <div className="send-stats">
          <div className="send-stat">
            <span className="ico">🌍</span>
            <div><strong>180+</strong><span>Countries</span></div>
          </div>
          <div className="send-stat">
            <span className="ico">💱</span>
            <div><strong>50+</strong><span>Currencies</span></div>
          </div>
          <div className="send-stat">
            <span className="ico">👥</span>
            <div><strong>Millions</strong><span>Happy Users</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
