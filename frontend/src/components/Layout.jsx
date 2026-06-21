import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="app">
        <Header />
        <main className="app-main">
            {children}
        </main>
    </div>
  )
}

export default Layout