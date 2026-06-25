const brands = ['VISA', 'mastercard', 'PayPal', '★ Trustpilot', '✔ McAfee']

export default function TrustBar() {
  return (
    <div className="trust-bar">
      <div className="trust-inner container">
        <span className="trust-label">Trusted by leading organizations worldwide</span>
        <div className="trust-logos">
          {brands.map((b) => (
            <span className="brand" key={b}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
