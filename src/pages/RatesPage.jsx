import { useState } from 'react'

const ALL_RATES = [
  { flag:'🇺🇸', pair:'USD / INR', name:'US Dollar',        rate: 83.4975,  chg:'+0.35%', up:true  },
  { flag:'🇪🇺', pair:'EUR / INR', name:'Euro',             rate: 90.2471,  chg:'+0.21%', up:true  },
  { flag:'🇬🇧', pair:'GBP / INR', name:'British Pound',    rate: 105.8903, chg:'-0.15%', up:false },
  { flag:'🇦🇪', pair:'AED / INR', name:'UAE Dirham',       rate: 22.7245,  chg:'+0.08%', up:true  },
  { flag:'🇸🇬', pair:'SGD / INR', name:'Singapore Dollar', rate: 61.8930,  chg:'+0.42%', up:true  },
  { flag:'🇨🇭', pair:'CHF / INR', name:'Swiss Franc',      rate: 94.1200,  chg:'-0.09%', up:false },
  { flag:'🇯🇵', pair:'JPY / INR', name:'Japanese Yen',     rate: 0.5423,   chg:'-0.22%', up:false },
  { flag:'🇦🇺', pair:'AUD / INR', name:'Australian Dollar',rate: 53.7810,  chg:'+0.11%', up:true  },
  { flag:'🇨🇦', pair:'CAD / INR', name:'Canadian Dollar',  rate: 61.2340,  chg:'+0.17%', up:true  },
  { flag:'🇨🇳', pair:'CNY / INR', name:'Chinese Yuan',     rate: 11.4862,  chg:'-0.05%', up:false },
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

export default function RatesPage({ onNavigate }) {
  const [search, setSearch] = useState('')
  const filtered = ALL_RATES.filter(r =>
    r.pair.toLowerCase().includes(search.toLowerCase()) ||
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">📈 Live Rates</span>
            <h1 className="page-title">Exchange <span className="accent">Rates</span></h1>
            <p className="page-sub">Real-time rates updated every minute. No hidden spreads.</p>
          </div>
        </div>
      </div>

      <section className="container section-pad">
        <div className="rates-toolbar">
          <input
            className="rates-search"
            placeholder="🔍  Search currency pair..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="rates-updated">🟢 Updated just now</span>
        </div>

        <div className="panel panel-light" style={{ marginTop: 20 }}>
          <table className="rates-table rates-table-full">
            <thead>
              <tr>
                <th>Currency Pair</th>
                <th>Rate (INR)</th>
                <th>Change (24h)</th>
                <th>Trend</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.pair}>
                  <td>
                    <div className="pair">
                      <span className="flag">{r.flag}</span>
                      <div>
                        <strong>{r.pair}</strong>
                        <span>{r.name}</span>
                      </div>
                    </div>
                  </td>
                  <td><strong>₹{r.rate}</strong></td>
                  <td className={r.up ? 'chg-up' : 'chg-down'}>{r.chg}</td>
                  <td><Spark up={r.up} /></td>
                  <td>
                    <button
                      className="btn-exchange-now"
                      onClick={() => onNavigate('Exchange')}
                    >
                      Exchange →
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign:'center', padding: 32, color:'var(--text-dark-muted)' }}>No currencies found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
