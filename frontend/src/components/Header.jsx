import { LeafyGreen } from "lucide-react"

const Header = () => {
  return (
    <header className="app-header">
        <div className="logo">
            <span className="logo-icon">
                <LeafyGreen size={16} />
            </span>
            <span className="logo-text">FarmPulse</span>
        </div>
        <p className="tagline">Weather intelligence for East African farms</p>
    </header>
  )
}

export default Header