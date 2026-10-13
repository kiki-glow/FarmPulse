import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="layout">
        <Sidebar />
        <div className="layout-main">
          <header className="topbar">
            <div>
              <h1 className="topbar-title">Dashboard</h1>
              <p className="topbar-sub">Farm intelligence overview</p>
            </div>
            <div className="topbar-date">
              {new Date().toLocaleDateString('en-KE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
          </header>
            <main className="layout-content">
              {children}
            </main>
        </div>
    </div>
  )
}

export default Layout