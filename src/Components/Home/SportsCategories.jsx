import React from 'react'
import { Link } from 'react-router-dom'

const SportsCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Fitness & Gym',
      description: 'Weights, machines, and fitness accessories',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/sportsequipment',
      itemCount: '150+ items'
    },
    {
      id: 2,
      name: 'Outdoor Sports',
      description: 'Hiking, camping, and adventure gear',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/sportsequipment',
      itemCount: '200+ items'
    },
    {
      id: 3,
      name: 'Team Sports',
      description: 'Football, basketball, soccer equipment',
      image: 'https://i.ibb.co/k6rCkXQJ/photo-1612872087720-bb876e2e67d1.jpg',
      link: '/sportsequipment',
      itemCount: '180+ items'
    },
    {
      id: 4,
      name: 'Water Sports',
      description: 'Swimming, surfing, and water activities',
      image: 'https://i.ibb.co/21rBRFRm/photo-1617939533073-6c94c709370c.jpg',
      link: '/sportsequipment',
      itemCount: '120+ items'
    },
    {
      id: 5,
      name: 'Winter Sports',
      description: 'Skiing, snowboarding, and winter gear',
      image: 'https://images.unsplash.com/photo-1551524164-6cf2ac8d0bf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      link: '/sportsequipment',
      itemCount: '90+ items'
    },
    {
      id: 6,
      name: 'Accessories',
      description: 'Bags, bottles, and sports accessories',
      image: 'https://i.ibb.co/Txx51Pc0/photo-1703694741127-64f46e544971.jpg',
      link: '/sportsequipment',
      itemCount: '250+ items'
    }
  ]

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <p style={styles.sectionDescription}>
            Find the perfect equipment for your favorite sport
          </p>
        </div>

        <div style={styles.categoryGrid}>
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link} 
              style={styles.categoryCard}
            >
              <div style={styles.imageContainer}>
                <img 
                  src={category.image || "/placeholder.svg"} 
                  alt={category.name}
                  style={styles.categoryImage}
                />
                <div style={styles.overlay}></div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.categoryName}>{category.name}</h3>
                <p style={styles.categoryDescription}>{category.description}</p>
                <div style={styles.itemCount}>{category.itemCount}</div>
                <div style={styles.arrow}>→</div>
              </div>
            </Link>
          ))}
        </div>

        <div style={styles.sectionFooter}>
          <Link to="/sportsequipment" style={styles.viewAllButton}>
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: '4rem 0',
    backgroundColor: 'white'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  sectionTitle: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '1rem'
  },
  sectionDescription: {
    fontSize: '1.125rem',
    color: '#6b7280',
    maxWidth: '600px',
    margin: '0 auto'
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '3rem'
  },
  categoryCard: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  },
  imageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))'
  },
  cardContent: {
    padding: '1.5rem',
    position: 'relative'
  },
  categoryName: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem'
  },
  categoryDescription: {
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    marginBottom: '1rem'
  },
  itemCount: {
    color: '#3b82f6',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  arrow: {
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    fontSize: '1.25rem',
    color: '#3b82f6'
  },
  sectionFooter: {
    textAlign: 'center'
  },
  viewAllButton: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '0.75rem 2rem',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    display: 'inline-block'
  }
}

export default SportsCategories