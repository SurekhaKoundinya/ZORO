const features = [
  { ico: '🛡️', title: 'Best Exchange Rates', desc: 'Get the most competitive rates in the market.' },
  { ico: '⚡', title: 'Fast & Easy', desc: 'Quick transactions in just a few clicks.' },
  { ico: '🔒', title: 'Secure & Trusted', desc: 'Bank-level security for your peace of mind.' },
  { ico: '🌍', title: 'Global Coverage', desc: 'Send and receive money to 180+ countries.' },
  { ico: '🎧', title: '24/7 Support', desc: 'Our support team is always here to help.' },
]

export default function Features() {
  return (
    <section className="features container">
      {features.map((f) => (
        <div className="feature" key={f.title}>
          <div className="feature-ico">{f.ico}</div>
          <div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
