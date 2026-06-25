import Hero from '../components/Hero'
import Features from '../components/Features'
import RatesAndSend from '../components/RatesAndSend'

export default function HomePage({ onNavigate }) {
  return (
    <>
      <div className="dark-section">
        <Hero onNavigate={onNavigate} />
      </div>
      <Features />
      <RatesAndSend onNavigate={onNavigate} />
    </>
  )
}
