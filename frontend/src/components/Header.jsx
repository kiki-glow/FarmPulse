import { Leaf } from "lucide-react"

const Header = () => {
  return (
    <header className="app-header">
        <div className="logo">
            <span className="logo-icon">
                <Leaf size={32} strokeWidth={1.5} />
            </span>
            <span className="logo-text">FarmPulse</span>
        </div>
        <p className="tagline">🌍 Weather Intelligence for East African Farms</p>
    </header>
  )
}

export default Header
