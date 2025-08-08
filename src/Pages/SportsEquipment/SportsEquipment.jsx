import React, { useState, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import Card from '../../Components/Card/Card';

const SportsEquipment = () => {
  const loadedEquipments = useLoaderData();
  const [equipments, setEquipments] = useState(loadedEquipments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [animationDelay, setAnimationDelay] = useState(0);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(equipments.map(eq => eq.category?.toLowerCase()).filter(Boolean))];
    return cats;
  }, [equipments]);

  // Filter and sort equipments
  const filteredEquipments = useMemo(() => {
    let filtered = equipments.filter(equipment => {
      const matchesSearch = equipment.item?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           equipment.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             equipment.category?.toLowerCase() === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort equipments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.item || '').localeCompare(b.item || '');
        case 'price':
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case 'rating':
          return (Number(b.rating) || 0) - (Number(a.rating) || 0);
        case 'stock':
          return (Number(b.stock) || 0) - (Number(a.stock) || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [equipments, searchTerm, selectedCategory, sortBy]);

  // Animation effect when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      setAnimationDelay(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, sortBy]);

  // Stats calculations
  const stats = useMemo(() => {
    const totalValue = equipments.reduce((sum, eq) => sum + (Number(eq.price) || 0), 0);
    const avgRating = equipments.reduce((sum, eq) => sum + (Number(eq.rating) || 0), 0) / equipments.length;
    const inStock = equipments.filter(eq => (eq.stock || 0) > 0).length;
    
    return {
      total: equipments.length,
      totalValue: totalValue.toFixed(2),
      avgRating: avgRating.toFixed(1),
      inStock
    };
  }, [equipments]);

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundAnimation}>
        <div style={styles.floatingShape1}></div>
        <div style={styles.floatingShape2}></div>
        <div style={styles.floatingShape3}></div>
      </div>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainTitle}>
            <span style={styles.titleGradient}>Sports Equipment</span>
            <span style={styles.titleAccent}>Collection</span>
          </h1>
          <div style={styles.statsContainer}>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.total}</div>
              <div style={styles.statLabel}>Total Items</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>${stats.totalValue}</div>
              <div style={styles.statLabel}>Total Value</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.avgRating}★</div>
              <div style={styles.statLabel}>Avg Rating</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNumber}>{stats.inStock}</div>
              <div style={styles.statLabel}>In Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div style={styles.controlsSection}>
        <div style={styles.controlsContainer}>
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <div style={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={styles.clearButton}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div style={styles.filtersContainer}>
            {/* Category Filter */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={styles.filterSelect}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.filterSelect}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="stock">Stock</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div style={styles.viewModeContainer}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  ...styles.viewModeButton,
                  backgroundColor: viewMode === 'grid' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'grid' ? 'white' : '#6b7280'
                }}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  ...styles.viewModeButton,
                  backgroundColor: viewMode === 'list' ? '#3b82f6' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#6b7280'
                }}
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div style={styles.resultsInfo}>
        <span style={styles.resultsText}>
          Showing {filteredEquipments.length} of {equipments.length} items
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </span>
      </div>

      {/* Equipment Grid */}
      <div style={styles.equipmentSection}>
        {isLoading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Loading amazing equipment...</p>
          </div>
        ) : filteredEquipments.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🏃‍♂️</div>
            <h3 style={styles.emptyTitle}>No Equipment Found</h3>
            <p style={styles.emptyDescription}>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              style={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            ...styles.equipmentGrid,
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fit, minmax(380px, 1fr))'
              : '1fr'
          }}>
            {filteredEquipments.map((equipment, index) => (
              <div
                key={equipment._id}
                style={{
                  ...styles.cardWrapper,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card
                  equipment={equipment}
                  equipments={equipments}
                  setEquipments={setEquipments}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div style={styles.fabContainer}>
        <button style={styles.fab} title="Add New Equipment">
          <span style={styles.fabIcon}>+</span>
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    position: 'relative',
    overflow: 'hidden'
  },

  backgroundAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none'
  },

  floatingShape1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
    borderRadius: '50%',
    animation: 'float1 20s ease-in-out infinite',
    filter: 'blur(40px)'
  },

  floatingShape2: {
    position: 'absolute',
    top: '60%',
    right: '10%',
    width: '200px',
    height: '200px',
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.1))',
    borderRadius: '50%',
    animation: 'float2 25s ease-in-out infinite',
    filter: 'blur(30px)'
  },

  floatingShape3: {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    width: '250px',
    height: '250px',
    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(239, 68, 68, 0.1))',
    borderRadius: '50%',
    animation: 'float3 30s ease-in-out infinite',
    filter: 'blur(35px)'
  },

  heroSection: {
    padding: '80px 20px 60px',
    textAlign: 'center',
    position: 'relative'
  },

  heroContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  mainTitle: {
    fontSize: 'clamp(3rem, 8vw, 6rem)',
    fontWeight: '900',
    marginBottom: '40px',
    lineHeight: '1.1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },

  titleGradient: {
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },

  titleAccent: {
    color: '#1f2937',
    fontSize: '0.7em',
    fontWeight: '300',
    letterSpacing: '0.1em'
  },

  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px',
    maxWidth: '800px',
    margin: '0 auto'
  },

  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    padding: '24px',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
    }
  },

  statNumber: {
    fontSize: '2rem',
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: '8px'
  },

  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },

  controlsSection: {
    padding: '0 20px 40px',
    position: 'sticky',
    top: '0',
    zIndex: 10,
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.5)'
  },

  controlsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  searchContainer: {
    position: 'relative',
    maxWidth: '500px',
    margin: '0 auto'
  },

  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '18px',
    color: '#6b7280'
  },

  searchInput: {
    width: '100%',
    padding: '16px 16px 16px 50px',
    fontSize: '16px',
    border: '2px solid transparent',
    borderRadius: '25px',
    backgroundColor: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)'
    }
  },

  clearButton: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#6b7280',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f3f4f6',
      color: '#ef4444'
    }
  },

  filtersContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'end',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  filterLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },

  filterSelect: {
    padding: '12px 16px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    backgroundColor: 'white',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    outline: 'none',
    ':focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    }
  },

  viewModeContainer: {
    display: 'flex',
    gap: '4px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '12px',
    border: '2px solid #e5e7eb'
  },

  viewModeButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '600'
  },

  resultsInfo: {
    padding: '0 20px 20px',
    textAlign: 'center'
  },

  resultsText: {
    fontSize: '16px',
    color: '#6b7280',
    fontWeight: '500'
  },

  equipmentSection: {
    padding: '0 20px 80px'
  },

  equipmentGrid: {
    display: 'grid',
    gap: '30px',
    maxWidth: '1400px',
    margin: '0 auto'
  },

  cardWrapper: {
    animation: 'slideInUp 0.6s ease-out forwards',
    opacity: 0,
    transform: 'translateY(30px)'
  },

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    gap: '20px'
  },

  loadingSpinner: {
    width: '60px',
    height: '60px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },

  loadingText: {
    fontSize: '18px',
    color: '#6b7280',
    fontWeight: '500'
  },

  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    maxWidth: '500px',
    margin: '0 auto'
  },

  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '20px'
  },

  emptyTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '12px'
  },

  emptyDescription: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '30px',
    lineHeight: '1.6'
  },

  resetButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
    }
  },

  fabContainer: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 1000
  },

  fab: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ':hover': {
      backgroundColor: '#2563eb',
      transform: 'scale(1.1)',
      boxShadow: '0 12px 35px rgba(59, 130, 246, 0.6)'
    }
  },

  fabIcon: {
    fontSize: '24px',
    fontWeight: '300'
  }
};

// Add CSS animations
const animations = `
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(30px, -30px) rotate(120deg); }
    66% { transform: translate(-20px, 20px) rotate(240deg); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-40px, -20px) rotate(180deg); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, -40px) rotate(90deg); }
    50% { transform: translate(-30px, -10px) rotate(180deg); }
    75% { transform: translate(10px, 30px) rotate(270deg); }
  }
  
  @keyframes slideInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Inject animations
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = animations;
  document.head.appendChild(styleSheet);
}

export default SportsEquipment;