
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Company Info */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>SportsEquip</h3>
            <p style={styles.description}>
              Your trusted partner for premium sports equipment and gear. 
              Empowering athletes of all levels to achieve their best performance.
            </p>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>Facebook</a>
              <a href="#" style={styles.socialLink}>Twitter</a>
              <a href="#" style={styles.socialLink}>Instagram</a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.section}>
            <h4 style={styles.linkTitle}>Quick Links</h4>
            <div style={styles.linkGroup}>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/sportsequipment" style={styles.link}>Sports Equipment</Link>
              <Link to="/about" style={styles.link}>About Us</Link>
              <Link to="/contact" style={styles.link}>Contact</Link>
            </div>
          </div>

          {/* Categories */}
          <div style={styles.section}>
            <h4 style={styles.linkTitle}>Categories</h4>
            <div style={styles.linkGroup}>
              <Link to="/category/fitness" style={styles.link}>Fitness</Link>
              <Link to="/category/outdoor" style={styles.link}>Outdoor Sports</Link>
              <Link to="/category/team-sports" style={styles.link}>Team Sports</Link>
              <Link to="/category/accessories" style={styles.link}>Accessories</Link>
            </div>
          </div>

          {/* Support */}
          <div style={styles.section}>
            <h4 style={styles.linkTitle}>Support</h4>
            <div style={styles.linkGroup}>
              <Link to="/help" style={styles.link}>Help Center</Link>
              <Link to="/shipping" style={styles.link}>Shipping Info</Link>
              <Link to="/returns" style={styles.link}>Returns</Link>
              <Link to="/warranty" style={styles.link}>Warranty</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <div style={styles.bottomContent}>
            <p style={styles.copyright}>
              © 2024 SportsEquip. All rights reserved.
            </p>
            <div style={styles.legalLinks}>
              <Link to="/privacy" style={styles.legalLink}>Privacy Policy</Link>
              <Link to="/terms" style={styles.legalLink}>Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: "#1f2937",
    color: "#d1d5db",
    marginTop: "auto"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1.5rem 1rem"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr",
    gap: "2rem",
    marginBottom: "2rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "2rem"
    }
  },
  section: {
    display: "flex",
    flexDirection: "column"
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "1rem"
  },
  description: {
    fontSize: "0.875rem",
    lineHeight: "1.6",
    marginBottom: "1.5rem",
    color: "#9ca3af"
  },
  socialLinks: {
    display: "flex",
    gap: "1rem"
  },
  socialLink: {
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s ease",
    ":hover": {
      color: "#3b82f6"
    }
  },
  linkTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "1rem"
  },
  linkGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem"
  },
  link: {
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s ease",
    ":hover": {
      color: "#3b82f6"
    }
  },
  bottomBar: {
    borderTop: "1px solid #374151",
    paddingTop: "1.5rem"
  },
  bottomContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "1rem",
      textAlign: "center"
    }
  },
  copyright: {
    fontSize: "0.875rem",
    color: "#9ca3af",
    margin: 0
  },
  legalLinks: {
    display: "flex",
    gap: "1.5rem"
  },
  legalLink: {
    color: "#9ca3af",
    textDecoration: "none",
    fontSize: "0.875rem",
    transition: "color 0.2s ease",
    ":hover": {
      color: "#3b82f6"
    }
  }
}

export default Footer