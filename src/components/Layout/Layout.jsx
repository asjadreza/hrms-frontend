import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout = ({ children }) => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo-link">
            <h1 className="logo">HRMS Lite</h1>
          </Link>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/employees"
              className={`nav-link ${isActive('/employees') ? 'active' : ''}`}
            >
              Employees
            </Link>
            <Link
              to="/attendance"
              className={`nav-link ${isActive('/attendance') ? 'active' : ''}`}
            >
              Attendance
            </Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  )
}

export default Layout
