import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const Card = ({ equipment, equipments, setEquipments }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    _id,
    item,
    category,
    description,
    price,
    rating,
    stock,
    photo
  } = equipment;

  // Helper function to render stars
  const renderStars = (rating) => {
    const safeRating = Math.max(0, Math.min(5, Math.floor(rating || 0)));
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            ...styles.star,
            color: i < safeRating ? '#fbbf24' : '#e5e7eb'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: '#ffffff',
      customClass: {
        popup: 'rounded-xl shadow-2xl',
        title: 'text-gray-800 font-bold',
        content: 'text-gray-600',
        confirmButton: 'rounded-lg px-6 py-2 font-semibold',
        cancelButton: 'rounded-lg px-6 py-2 font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://equi-sports-server-zeta.vercel.app/sports/${_id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted successfully.",
                icon: "success",
                confirmButtonColor: "#10b981",
                customClass: {
                  popup: 'rounded-xl shadow-2xl',
                  title: 'text-gray-800 font-bold',
                  content: 'text-gray-600',
                  confirmButton: 'rounded-lg px-6 py-2 font-semibold'
                }
              });
              const remaining = equipments.filter(equipment => equipment._id !== _id);
              setEquipments(remaining);
            }
          })
          .catch(error => {
            console.error('Error deleting product:', error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the product. Please try again.",
              icon: "error",
              confirmButtonColor: "#ef4444"
            });
          });
      }
    });
  };

  return (
    <div
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section with Overlay Effects */}
      <div style={styles.imageContainer}>
        <img
          src={photo || '/placeholder-product.jpg'}
          alt={item || 'Product'}
          style={{
            ...styles.image,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0
          }}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Gradient Overlay */}
        <div style={{
          ...styles.imageOverlay,
          opacity: isHovered ? 0.3 : 0
        }}></div>
        
        {/* Category Badge */}
        <div style={styles.categoryBadge}>
          {category || 'General'}
        </div>
        
        {/* Stock Status */}
        <div style={{
          ...styles.stockBadge,
          backgroundColor: stock > 10 ? '#10b981' : stock > 0 ? '#f59e0b' : '#ef4444'
        }}>
          {stock > 10 ? 'In Stock' : stock > 0 ? 'Low Stock' : 'Out of Stock'}
        </div>

        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div style={styles.imageSkeleton}>
            <div style={styles.skeletonShimmer}></div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h3 style={styles.title}>
            {item || 'Product Name'}
          </h3>
          <div style={styles.priceContainer}>
            <span style={styles.price}>
              ${price ? Number(price).toFixed(2) : '0.00'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <div style={styles.ratingContainer}>
          <div style={styles.stars}>
            {renderStars(rating)}
          </div>
          <span style={styles.ratingText}>
            ({rating ? Number(rating).toFixed(1) : '0.0'})
          </span>
        </div>

        {/* Description */}
        <p style={styles.description}>
          {description && description.length > 120
            ? `${description.substring(0, 120)}...`
            : description || 'No description available'
          }
        </p>

        {/* Stock Info */}
        <div style={styles.stockInfo}>
          <span style={styles.stockLabel}>Available:</span>
          <span style={{
            ...styles.stockValue,
            color: stock > 10 ? '#10b981' : stock > 0 ? '#f59e0b' : '#ef4444'
          }}>
            {stock || 0} units
          </span>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            style={{
              ...styles.button,
              ...styles.viewButton,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onClick={() => {
              // Add view functionality here
              console.log('View product:', _id);
            }}
          >
            <span style={styles.buttonIcon}>👁️</span>
            View Details
          </button>

          <Link
            to={`/updatesportsequipment/${_id}`}
            style={{
              ...styles.button,
              ...styles.updateButton,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            <span style={styles.buttonIcon}>✏️</span>
            Update
          </Link>

          <button
            onClick={() => handleDelete(_id)}
            style={{
              ...styles.button,
              ...styles.deleteButton,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            <span style={styles.buttonIcon}>🗑️</span>
            Delete
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div style={{
        ...styles.glowEffect,
        opacity: isHovered ? 1 : 0
      }}></div>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: '1px solid rgba(229, 231, 235, 0.8)',
    backdropFilter: 'blur(10px)',
    maxWidth: '400px',
    margin: '0 auto'
  },
  
  imageContainer: {
    position: 'relative',
    height: '250px',
    overflow: 'hidden',
    backgroundColor: '#f3f4f6'
  },
  
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8))',
    transition: 'opacity 0.3s ease'
  },
  
  categoryBadge: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    backgroundColor: 'rgba(59, 130, 246, 0.9)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  
  stockBadge: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  
  imageSkeleton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  skeletonShimmer: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 2s infinite'
  },
  
  content: {
    padding: '24px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
    lineHeight: '1.3',
    flex: 1,
    marginRight: '12px'
  },
  
  priceContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  
  price: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#059669',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
  },
  
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '8px'
  },
  
  stars: {
    display: 'flex',
    gap: '2px'
  },
  
  star: {
    fontSize: '16px',
    transition: 'color 0.2s ease'
  },
  
  ratingText: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  
  description: {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '16px',
    margin: '0 0 16px 0'
  },
  
  stockInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px'
  },
  
  stockLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  
  stockValue: {
    fontSize: '14px',
    fontWeight: '700'
  },
  
  actionButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    minWidth: '0'
  },
  
  buttonIcon: {
    fontSize: '14px'
  },
  
  viewButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
    ':hover': {
      backgroundColor: '#2563eb',
      boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)'
    }
  },
  
  updateButton: {
    backgroundColor: '#10b981',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.4)',
    ':hover': {
      backgroundColor: '#059669',
      boxShadow: '0 6px 20px 0 rgba(16, 185, 129, 0.6)'
    }
  },
  
  deleteButton: {
    backgroundColor: '#ef4444',
    color: 'white',
    boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.4)',
    ':hover': {
      backgroundColor: '#dc2626',
      boxShadow: '0 6px 20px 0 rgba(239, 68, 68, 0.6)'
    }
  },
  
  glowEffect: {
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
    borderRadius: '22px',
    zIndex: -1,
    transition: 'opacity 0.3s ease',
    filter: 'blur(8px)'
  }
};

// Add CSS animation for shimmer effect
const shimmerKeyframes = `
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

// Inject the keyframes into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = shimmerKeyframes;
  document.head.appendChild(styleSheet);
}

export default Card;