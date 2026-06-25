const team = [
  { name:'Arjun Mehta',   role:'CEO & Co-Founder',     img:'https://i.pravatar.cc/120?img=11' },
  { name:'Priya Nair',    role:'CTO & Co-Founder',      img:'https://i.pravatar.cc/120?img=47' },
  { name:'Rohit Sharma',  role:'Head of Finance',       img:'https://i.pravatar.cc/120?img=15' },
  { name:'Sneha Kapoor',  role:'Head of Compliance',    img:'https://i.pravatar.cc/120?img=44' },
]

const milestones = [
  { year:'2019', event:'Zoro founded in Bangalore with a mission to simplify cross-border money movement.' },
  { year:'2020', event:'Launched retail exchange product. First 10,000 customers onboarded in 60 days.' },
  { year:'2021', event:'Expanded to Business accounts. RBI authorization received.' },
  { year:'2022', event:'Crossed ₹500 Cr in processed volume. Launched API for developers.' },
  { year:'2023', event:'Expanded to 180 countries. Partnered with major Indian banks.' },
  { year:'2024', event:'Launched Zoro Business Suite. 1 million happy users.' },
]

const stats = [
  { n:'1M+',   label:'Happy Users'       },
  { n:'180+',  label:'Countries Covered' },
  { n:'₹2500Cr',label:'Volume Processed' },
  { n:'4.8★',  label:'App Store Rating'  },
]

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="page-hero dark-section">
        <div className="container page-hero-inner">
          <div>
            <span className="pill">🏢 Our Story</span>
            <h1 className="page-title">About <span className="accent">Zoro</span></h1>
            <p className="page-sub">We're on a mission to make global money movement as easy as sending a text.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="container section-pad">
        <div className="stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-number">{s.n}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container section-pad about-mission">
        <div className="mission-text">
          <h2 className="section-title">Our Mission</h2>
          <p>Zoro was born out of frustration. Our founders were tired of watching hard-earned money disappear in hidden fees and unfair exchange rates every time they sent money abroad.</p>
          <p style={{ marginTop: 16 }}>We built Zoro to be radically transparent — real rates, real fees, real fast. Today, millions of individuals and thousands of businesses trust us to move money across borders without the pain.</p>
        </div>
        <div className="mission-values">
          {[
            { ico:'🔍', title:'Transparency', desc:'No hidden fees. What you see is what you pay.' },
            { ico:'⚡', title:'Speed',        desc:'Most transfers complete within 24 hours.'       },
            { ico:'🛡️', title:'Security',     desc:'Bank-grade encryption on every transaction.'    },
          ].map(v => (
            <div key={v.title} className="value-item">
              <span className="value-ico">{v.ico}</span>
              <div>
                <strong>{v.title}</strong>
                <p>{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Our Journey</h2>
          <p className="section-sub">From a Bangalore garage to a global platform</p>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-dot" />
              <div className="timeline-content">{m.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container section-pad">
        <div className="section-header">
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-sub">The people building the future of money movement</p>
        </div>
        <div className="team-grid">
          {team.map(t => (
            <div key={t.name} className="team-card">
              <img src={t.img} alt={t.name} className="team-img" />
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
