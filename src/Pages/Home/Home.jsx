import React from 'react'
import Hero from "../../Components/Home/Hero"
import ProductSection from "../../Components/Home/ProductSection"
import SportsCategories from "../../Components/Home/SportsCategories"

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ProductSection />
      <SportsCategories />
      
      {/* Newsletter Section */}
      <section style={styles.newsletter}>
        <div style={styles.container}>
          <div style={styles.newsletterContent}>
            <h2 style={styles.newsletterTitle}>Stay Updated</h2>
            <p style={styles.newsletterDescription}>
              Get the latest updates on new products, exclusive deals, and sports tips
            </p>
            <div style={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Enter your email"
                style={styles.emailInput}
              />
              <button style={styles.subscribeButton}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const styles = {
  newsletter: {
    padding: '4rem 0',
    backgroundColor: '#f3f4f6'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  newsletterContent: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  },
  newsletterTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  newsletterDescription: {
    color: '#6b7280',
    fontSize: '1.125rem',
    marginBottom: '2rem'
  },
  newsletterForm: {
    display: 'flex',
    gap: '0.75rem',
    maxWidth: '400px',
    margin: '0 auto'
  },
  emailInput: {
    flex: 1,
    padding: '0.75rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    outline: 'none'
  },
  subscribeButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  }
}

export default Home