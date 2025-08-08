import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const ProductSection = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/sports')
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 6))
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [])

  // Helper function to safely render stars
  const renderStars = (rating) => {
    const safeRating = Math.max(0, Math.min(5, Math.floor(rating || 0)))
    const filledStars = '★'.repeat(safeRating)
    const emptyStars = '☆'.repeat(5 - safeRating)
    return filledStars + emptyStars
  }

  // Helper function to format rating display
  const formatRating = (rating) => {
    if (!rating || rating < 0) return '0.0'
    return Math.max(0, Math.min(5, rating)).toFixed(1)
  }

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <div style={styles.loadingGrid}>
            {[...Array(6)].map((_, index) => (
              <div key={index} style={styles.loadingCard}>
                <div style={styles.loadingSkeleton}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <p style={styles.sectionDescription}>
          Discover our most popular sports equipment and gear
        </p>
        
        <div style={styles.productGrid}>
          {products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <div style={styles.imageContainer}>
                <img 
                  src={product.photo || '/placeholder-product.jpg'} 
                  alt={product.item || 'Product'}
                  style={styles.productImage}
                />
                <div style={styles.badge}>
                  {product.category || 'General'}
                </div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.productTitle}>{product.item || 'Product Name'}</h3>
                <p style={styles.productDescription}>
                  {product.description && product.description.length > 80 
                    ? `${product.description.substring(0, 80)}...` 
                    : product.description || 'No description available'
                  }
                </p>
                
                <div style={styles.productMeta}>
                  <div style={styles.rating}>
                    <span style={styles.stars}>
                      {renderStars(product.rating)}
                    </span>
                    <span style={styles.ratingText}>({formatRating(product.rating)})</span>
                  </div>
                  <div style={styles.stock}>
                    Stock: {product.stock || 0}
                  </div>
                </div>
                
                <div style={styles.cardFooter}>
                  <span style={styles.price}>
                    ${product.price ? Number(product.price).toFixed(2) : '0.00'}
                  </span>
                  <Link 
                    to={`/equipment/${product._id}`} 
                    style={styles.viewButton}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={styles.sectionFooter}>
          <Link to="/sportsequipment" style={styles.viewAllButton}>
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
    backgroundColor: '#f9fafb'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '1rem'
  },
  sectionDescription: {
    fontSize: '1.125rem',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  },
  badge: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  cardContent: {
    padding: '1.5rem'
  },
  productTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  productDescription: {
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  stars: {
    color: '#fbbf24',
    fontSize: '0.875rem'
  },
  ratingText: {
    color: '#6b7280',
    fontSize: '0.75rem'
  },
  stock: {
    color: '#6b7280',
    fontSize: '0.75rem'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#1f2937'
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '0.5rem 1.25rem',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease'
  },
  sectionFooter: {
    textAlign: 'center'
  },
  viewAllButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    padding: '0.75rem 2rem',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: '2px solid #3b82f6',
    transition: 'all 0.2s ease',
    display: 'inline-block'
  },
  loadingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem'
  },
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    overflow: 'hidden',
    height: '400px'
  },
  loadingSkeleton: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e5e7eb'
  }
}

export default ProductSection