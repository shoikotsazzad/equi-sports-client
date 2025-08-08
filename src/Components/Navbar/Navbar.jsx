import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This state should ideally come from a global context/auth system
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsMobileMenuOpen(false) // Close menu on logout
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerStyle = {
    ...styles.header,
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: isScrolled ? 'blur(15px)' : 'blur(10px)',
    boxShadow: isScrolled ? '0 8px 30px rgba(0, 0, 0, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.05)',
    borderBottom: isScrolled ? '1px solid rgba(229, 231, 235, 0.5)' : '1px solid rgba(229, 231, 235, 0.8)'
  }

  return (
    <header style={headerStyle}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>Sports</span>
          <span style={styles.logoAccent}>Equip</span>
        </Link>

        {/* Desktop Navigation */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/sportsequipment" style={styles.link}>Sports Equipment</Link>
          {isLoggedIn && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
        </nav>

        {/* Auth Buttons */}
        <div style={styles.authButtons}>
          {isLoggedIn ? (
            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout <span style={styles.buttonIcon}>👋</span>
            </button>
          ) : (
            <Link to="/login" style={styles.loginButton}>
              Login <span style={styles.buttonIcon}>🔑</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button style={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/sportsequipment" style={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
            Sports Equipment
          </Link>
          {isLoggedIn && (
            <Link to="/dashboard" style={styles.mobileLink} onClick={() => setIsMobileMenuOpen(false)}>
              Dashboard
            </Link>
          )}
          <div style={styles.mobileDivider}></div>
          {isLoggedIn ? (
            <button style={styles.mobileLogoutButton} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" style={styles.mobileLoginButton} onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease-in-out",
    padding: "10px 0"
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem"
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "800",
    textDecoration: "none",
    letterSpacing: "-0.05em",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    transition: "transform 0.2s ease",
    ':hover': {
      transform: 'scale(1.05)'
    }
  },
  logoText: {
    color: "#1f2937"
  },
  logoAccent: {
    color: "#3b82f6"
  },
  nav: {
    display: "flex",
    gap: "2.5rem",
    '@media (max-width: 768px)': {
      display: "none"
    }
  },
  link: {
    position: 'relative',
    color: "#4b5563",
    textDecoration: "none",
    fontSize: "1.05rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    padding: "5px 0",
    ':hover': {
      color: "#1f2937",
      transform: 'translateY(-2px)'
    },
    '::after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%) scaleX(0)',
      width: '100%',
      height: '3px',
      backgroundColor: '#3b82f6',
      borderRadius: '2px',
      transition: 'transform 0.3s ease'
    },
    ':hover::after': {
      transform: 'translateX(-50%) scaleX(1)'
    }
  },
  authButtons: {
    display: "flex",
    gap: "1rem",
    '@media (max-width: 768px)': {
      display: "none"
    }
  },
  loginButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.75rem 1.5rem",
    textDecoration: "none",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    ':hover': {
      backgroundColor: "#2563eb",
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)'
    }
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    ':hover': {
      backgroundColor: "#dc2626",
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)'
    }
  },
  buttonIcon: {
    fontSize: '1.1em'
  },
  mobileMenuButton: {
    display: "none",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "1.8rem",
    color: "#4b5563",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    ':hover': {
      transform: 'scale(1.1)'
    },
    '@media (max-width: 768px)': {
      display: "block"
    }
  },
  mobileMenu: {
    display: "block",
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: "1px solid rgba(229, 231, 235, 0.5)",
    padding: "1.5rem 2rem",
    position: 'absolute',
    width: '100%',
    left: 0,
    top: '100%',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
    animation: 'slideDown 0.3s ease-out forwards',
    '@media (min-width: 769px)': {
      display: "none"
    }
  },
  mobileLink: {
    display: "block",
    color: "#4b5563",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    padding: "1rem 0",
    borderBottom: "1px solid #f3f4f6",
    transition: "all 0.2s ease",
    ':hover': {
      color: "#3b82f6",
      paddingLeft: '10px'
    },
    ':last-of-type': {
      borderBottom: 'none'
    }
  },
  mobileDivider: {
    height: "1px",
    backgroundColor: "#e5e7eb",
    margin: "1rem 0"
  },
  mobileLoginButton: {
    display: "block",
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.75rem",
    textDecoration: "none",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "1rem",
    boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
    transition: "all 0.3s ease",
    ':hover': {
      backgroundColor: "#2563eb",
      transform: 'translateY(-2px)'
    }
  },
  mobileLogoutButton: {
    display: "block",
    backgroundColor: "#ef4444",
    color: "white",
    padding: "0.75rem",
    border: "none",
    borderRadius: "30px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    marginTop: "1rem",
    boxShadow: "0 4px 15px rgba(239, 68, 68, 0.3)",
    transition: "all 0.3s ease",
    ':hover': {
      backgroundColor: "#dc2626",
      transform: 'translateY(-2px)'
    }
  }
}

// Add CSS animations
const navbarAnimations = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = navbarAnimations;
  document.head.appendChild(styleSheet);
}