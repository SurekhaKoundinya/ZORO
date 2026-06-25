import { useState } from 'react'
import Navbar from './components/Navbar'
import TrustBar from './components/TrustBar'
import AuthModal from './components/AuthModal'

import HomePage from './pages/HomePage'
import ExchangePage from './pages/ExchangePage'
import SendMoneyPage from './pages/SendMoneyPage'
import BusinessPage from './pages/BusinessPage'
import RatesPage from './pages/RatesPage'
import AboutPage from './pages/AboutPage'
import HelpPage from './pages/HelpPage'

export default function App() {
  const [activePage, setActivePage] = useState('Home')
  const [authModal, setAuthModal] = useState(null) // null | 'login' | 'signup'
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setAuthModal(null)
  }

  const handleLogout = () => setUser(null)

  const renderPage = () => {
    switch (activePage) {
      case 'Home':       return <HomePage onNavigate={setActivePage} />
      case 'Exchange':   return <ExchangePage user={user} onAuthOpen={setAuthModal} />
      case 'Send Money': return <SendMoneyPage />
      case 'Business':   return <BusinessPage />
      case 'Rates':      return <RatesPage onNavigate={setActivePage} />
      case 'About Us':   return <AboutPage />
      case 'Help':       return <HelpPage />
      default:           return <HomePage onNavigate={setActivePage} />
    }
  }

  return (
    <>
      <div className="dark-section">
        <Navbar
          activePage={activePage}
          onNavigate={setActivePage}
          user={user}
          onAuthOpen={setAuthModal}
          onLogout={handleLogout}
        />
      </div>
      <main>
        {renderPage()}
      </main>
      <TrustBar />

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={setAuthModal}
          onLogin={handleLogin}
        />
      )}
    </>
  )
}
