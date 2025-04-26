import { Link } from "react-router-dom"
import "../styles/HomePage.css"

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Student Management System</div>
      </header>
      <main className="main-content">
        <div className="welcome-card">
          <h1 className="welcome-title">Welcome to Student Management System</h1>
          <p className="welcome-description">Please login or register to continue</p>
          <div className="button-group">
            <Link to="/login" className="btn btn-block">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-block">
              Register
            </Link>
          </div>
        </div>
      </main>
      <footer className="footer">&copy; {new Date().getFullYear()} Student Management System</footer>
    </div>
  )
}

export default HomePage
