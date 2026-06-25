const links = ['Home', 'Exchange', 'Send Money', 'Business', 'Rates', 'About Us', 'Help']

export default function Navbar({ activePage, onNavigate, user, onAuthOpen, onLogout }) {
  return (
    <nav className="navbar container">
      <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('Home') }}>
        <span className="logo-mark">Z</span>
        ZORO
      </a>

      <ul className="nav-links">
        {links.map((l) => (
          <li key={l}>
            <a
              href="#"
              className={activePage === l ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onNavigate(l) }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <span className="lang">🌐 English ▾</span>
        {user ? (
          <>
            <span className="nav-user">👤 {user.name}</span>
            <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={() => onAuthOpen('login')}>Login</button>
            <button className="btn btn-primary" onClick={() => onAuthOpen('signup')}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  )
}
