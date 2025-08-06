// Navbar.jsx
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header style={styles.header}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>MyApp</Link>

      {/* Navigation Links */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/sportsequipment" style={styles.link}>Sports Equipment</Link>
        {isLoggedIn && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
      </nav>

      {/* Auth Buttons */}
      <div>
        {isLoggedIn ? (
          <button style={styles.button} onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.button}>Login</Link>
        
          </>
        )}
      </div>
    </header>
  )
}

// Simple inline styles
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#333",
    padding: "10px 20px",
    color: "white",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
  },
  nav: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  },
  button: {
    background: "#555",
    color: "white",
    padding: "5px 10px",
    marginLeft: "5px",
    textDecoration: "none",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  }
}
