import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { IMAGES } from '../data/images'

gsap.registerPlugin(Observer)

const SLIDES = [
  {
    id: 1,
    left: (
      <div className="split-img-panel">
        <img src={IMAGES.heroCup} alt="Coffee Cup" />
      </div>
    ),
    right: (
      <div className="split-content-panel">
        <h2 className="split-title">Exquisite <em>Dish</em></h2>
        <p className="split-desc">
          Et tortor consequat id porta nibh venenatis. Feugiat ni preti fusce id in neque aliquam ve. 
          Everything poured with absolute perfection and care.
        </p>
      </div>
    )
  },
  {
    id: 2,
    left: (
      <div className="split-content-panel bg-soft">
        <h2 className="split-title">Artisan <em>Bakery</em></h2>
        <ul className="split-menu-list">
          <li>
            <div>
              <h4>Butter Croissant</h4>
              <p>Flaky, buttery goodness baked fresh daily.</p>
            </div>
            <span className="price">$4.20</span>
          </li>
          <li>
            <div>
              <h4>Almond Danish</h4>
              <p>Sweet almond paste with toasted flakes.</p>
            </div>
            <span className="price">$5.50</span>
          </li>
          <li>
            <div>
              <h4>Cinnamon Cruffin</h4>
              <p>A hybrid pastry dusted with cinnamon sugar.</p>
            </div>
            <span className="price">$4.80</span>
          </li>
        </ul>
      </div>
    ),
    right: (
      <div className="split-img-panel">
        <img src={IMAGES.bakeryPastryDisplay} alt="Bakery Display" />
      </div>
    )
  },
  {
    id: 3,
    left: (
      <div className="split-img-panel">
        <img src={IMAGES.sigBarista} alt="Barista Pouring" />
      </div>
    ),
    right: (
      <div className="split-content-panel">
        <h2 className="split-title">Signature <em>Pour</em></h2>
        <p className="split-desc">
          Our baristas are masters of their craft, turning every cup into an art form. 
          We use only single-origin, ethically sourced beans roasted in-house.
        </p>
      </div>
    )
  },
  {
    id: 4,
    left: (
      <div className="split-content-panel bg-soft">
        <h2 className="split-title">Our <em>Story</em></h2>
        <p className="split-desc">
          Ember &amp; Oak is a slow-poured, single-origin coffee house — where every cup is 
          roasted in-house and every pastry is baked before dawn.
        </p>
        <div style={{ marginTop: '40px' }}>
          <a href="#menu" className="btn btn-fill">Explore Menu</a>
        </div>
      </div>
    ),
    right: (
      <div className="split-img-panel">
        <img src={IMAGES.aboutInterior} alt="Coffee House Interior" />
      </div>
    )
  }
]

export default function SplitSlider() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const currentIndex = useRef(0)
  const isAnimating = useRef(false)

  useLayoutEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      const numSlides = SLIDES.length
      
      const gotoSlide = (index) => {
        if (index < 0 || index >= numSlides) return
        isAnimating.current = true
        currentIndex.current = index

        gsap.to(leftPanelRef.current, {
          y: () => -index * (window.innerHeight - 85),
          duration: 1.0,
          ease: "power2.inOut"
        })
        
        gsap.to(rightPanelRef.current, {
          y: () => index * (window.innerHeight - 85),
          duration: 1.0,
          ease: "power2.inOut",
          onComplete: () => {
            isAnimating.current = false
          }
        })
      }

      Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onUp: () => !isAnimating.current && gotoSlide(currentIndex.current + 1),
        onDown: () => !isAnimating.current && gotoSlide(currentIndex.current - 1),
        tolerance: 10,
        preventDefault: true
      })
      
    }, containerRef)

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section className="mobile-slider-container">
        {SLIDES.map((slide) => (
          <div key={`mobile-${slide.id}`} className="mobile-slide">
            <div className="mobile-panel">{slide.left}</div>
            <div className="mobile-panel">{slide.right}</div>
          </div>
        ))}
      </section>
    )
  }

  // Reverse right slides so the last one in DOM matches Slide 1
  const rightSlides = [...SLIDES].reverse()

  return (
    <section className="split-slider-container" ref={containerRef}>
      <div className="split-left" ref={leftPanelRef}>
        {SLIDES.map((slide) => (
          <div key={`left-${slide.id}`} className="split-slide">
            {slide.left}
          </div>
        ))}
      </div>
      
      <div 
        className="split-right" 
        ref={rightPanelRef} 
        style={{ top: `calc(-${SLIDES.length - 1} * (100vh - 85px))` }}
      >
        {rightSlides.map((slide) => (
          <div key={`right-${slide.id}`} className="split-slide">
            {slide.right}
          </div>
        ))}
      </div>
    </section>
  )
}
