import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Premium Sports Equipment",
      subtitle: "Elevate Your Performance",
      description: "Discover top-quality gear from leading brands. Whether you're a professional athlete or weekend warrior, we have everything you need.",
      image: "https://i.ibb.co/jvs5df4H/anastase-maragos-7k-Ep-UPB8v-Nk-unsplash-1.jpg",
      buttonText: "Shop Now",
      buttonLink: "/sportsequipment"
    },
    {
      id: 2,
      title: "Fitness & Training Gear",
      subtitle: "Build Your Strength",
      description: "From weights to cardio equipment, get everything you need for your home gym or professional training facility.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Explore Fitness",
      buttonLink: "/sportsequipment"
    },
    {
      id: 3,
      title: "Outdoor Adventure",
      subtitle: "Embrace the Wild",
      description: "Gear up for your next outdoor adventure with our premium collection of hiking, camping, and outdoor sports equipment.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Adventure Gear",
      buttonLink: "/sportsequipment"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section style={styles.hero}>
      <div style={styles.sliderContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            style={{
              ...styles.slide,
              opacity: index === currentSlide ? 1 : 0,
              transform: `translateX(${(index - currentSlide) * 100}%)`
            }}
          >
            <div style={styles.slideBackground}>
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} style={styles.slideImage} />
              <div style={styles.overlay}></div>
            </div>
            <div style={styles.slideContent}>
              <div style={styles.container}>
                <h1 style={styles.slideTitle}>{slide.title}</h1>
                <h2 style={styles.slideSubtitle}>{slide.subtitle}</h2>
                <p style={styles.slideDescription}>{slide.description}</p>
                <Link to={slide.buttonLink} style={styles.slideButton}>
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button style={{...styles.navButton, ...styles.prevButton}} onClick={prevSlide}>
          &#8249;
        </button>
        <button style={{...styles.navButton, ...styles.nextButton}} onClick={nextSlide}>
          &#8250;
        </button>

        {/* Dots Indicator */}
        <div style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.dot,
                backgroundColor: index === currentSlide ? '#3b82f6' : 'rgba(255, 255, 255, 0.5)'
              }}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const styles = {
  hero: {
    position: 'relative',
    height: '70vh',
    minHeight: '500px',
    overflow: 'hidden'
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: 'all 0.5s ease-in-out'
  },
  slideBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  slideImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  slideContent: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    zIndex: 2
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
    color: 'white'
  },
  slideTitle: {
    fontSize: '3.5rem',
    fontWeight: '800',
    marginBottom: '0.5rem',
    lineHeight: '1.1'
  },
  slideSubtitle: {
    fontSize: '1.5rem',
    fontWeight: '300',
    marginBottom: '1rem',
    color: '#e5e7eb'
  },
  slideDescription: {
    fontSize: '1.125rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.6',
    color: '#d1d5db'
  },
  slideButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '1rem 2.5rem',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    display: 'inline-block'
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    fontSize: '2rem',
    padding: '1rem',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    transition: 'background-color 0.3s ease',
    zIndex: 3
  },
  prevButton: {
    left: '1rem'
  },
  nextButton: {
    right: '1rem'
  },
  dotsContainer: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 3
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
}

export default Hero