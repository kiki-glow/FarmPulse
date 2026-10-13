import { useState } from 'react'
import { LayoutDashboard, Cloud, Trees, Menu, X, Leaf, Icon, Globe2 } from 'lucide-react'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Cloud, label: 'Weather' },
    { icon: Trees, label: 'Farm Analysis' },
];

const Sidebar = () => {
    const [open, setOpen] = useState(false);


  return (
    <>
        {/* mobile toggle */}
        <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* overlay on mobile when open */}
        {open && <div className="sidebar-overlay" onClick={() => setOpen(false)} />}

        <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
            {/* logo */}
            <div className="sidebar-logo">
                <div className="sidebar-logo-icon">
                    <Leaf size={18} />
                </div>
                <span className="sidebar-logo-text">FarmPulse</span>
            </div>

            <p className="sidebar-section-label">MAIN MENU</p>
            
            <nav className="sidebar-nav">
                {navItems.map(({ icon: Icon, label }, i) => (
                    <button
                        key={label}
                        className={`sidebar-nav-item ${i === 0 ? "active" : ""}`}
                        onClick={() => setOpen(false)}
                    >
                        <Icon size={18} />
                        <span>{label}</span>
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-footer-badge">
                    <span><Globe2 color='green' size={18} /></span>
                    <div>
                        <p className="sidebar-footer-title">East Africa</p>
                        <p className="sidebar-footer-sub">Kenya • UTC+3</p>
                    </div>
                </div>
            </div>
        </aside>    
    </>
  )
}

export default Sidebar