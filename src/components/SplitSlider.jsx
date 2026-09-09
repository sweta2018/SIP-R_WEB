import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import AnimatedTitle from './AnimatedTitle'
import AnimatedParagraph from './AnimatedParagraph'
import { IMAGES } from '../data/images'

gsap.registerPlugin(Observer)

const SLIDES = [
  {
    id: 1,
    left: (
      <div className="split-img-panel">
        <img src={`${import.meta.env.BASE_URL}slide1.png`} alt="Coffee Cup" />
      </div>
    ),
    right: (
      <div className="split-content-panel">
        <AnimatedTitle className="split-title" text="A Place to" emText="Sip Deep" />
        <AnimatedParagraph
          className="split-desc"
          text="Beautifully crafted coffee, refreshing pours, fresh bakes, and moments worth slowing down for."
        />
        <div style={{ marginTop: '40px' }}>
          <a href="#menu" className="btn btn-fill">Discover Silence</a>
        </div>
      </div>
    )
  },
  {
    id: 2,
    left: (
      <div className="split-content-panel bg-soft">
        <AnimatedTitle className="split-title" text="Signature" emText="Sips" style={{ textAlign: 'right' }} />
        <AnimatedParagraph
          className="split-desc"
          style={{ textAlign: 'right', alignSelf: 'flex-end' }}
          text="A little citrus. A little fizz. A lot of flavour. Crafted to refresh, surprise, and make every sip a little more memorable."
        />
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#indulge-coffee" className="btn btn-fill">Discover Thirst</a>
        </div>
      </div>
    ),
    right: (
      <div className="split-img-panel">
        <img src={`${import.meta.env.BASE_URL}slide2.png`} alt="Bakery Display" />
      </div>
    )
  },
  {
    id: 3,
    left: (
      <div className="split-img-panel" style={{ backgroundColor: 'var(--bg)' }}>
        <img src={`${import.meta.env.BASE_URL}slide3.png`} alt="Barista Pouring" />
      </div>
    ),
    right: (
      <div className="split-content-panel">
        <AnimatedTitle className="split-title" text="Freshly" emText="Baked" />
        <AnimatedParagraph
          className="split-desc"
          text="From buttery pastries to rich brownies, crisp crackers and freshly baked cookies — the perfect bite to pair with your SIPR favourite."
        />
        <div style={{ marginTop: '40px' }}>
          <a href="#indulge-bakery" className="btn btn-fill">Discover Craves</a>
        </div>
      </div>
    )
  },
  {
    id: 4,
    left: (
      <div className="split-content-panel bg-soft">
        <AnimatedTitle className="split-title" text="Crafted to" emText="Perfection" style={{ textAlign: 'right' }} />
        <AnimatedParagraph
          className="split-desc"
          style={{ textAlign: 'right', alignSelf: 'flex-end' }}
          text="From freshly ground beans to a beautifully poured latte — every cup is made with care."
        />
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <a href="#menu" className="btn btn-fill">Discover Us</a>
        </div>
      </div>
    ),
    right: (
      <div className="split-img-panel">
        <video
          src={`${import.meta.env.BASE_URL}slide4.mp4`}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1)' }}
        />
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
        {SLIDES.map((slide, index) => {
          // Desktop left is content on slide index 1 and 3. Reverse them so Image is always on top.
          const isLeftContent = index % 2 !== 0;
          return (
            <div
              key={`mobile-${slide.id}`}
              className="mobile-slide"
              style={{ display: 'flex', flexDirection: isLeftContent ? 'column-reverse' : 'column' }}
            >
              <div className="mobile-panel">{slide.left}</div>
              <div className="mobile-panel">{slide.right}</div>
            </div>
          )
        })}
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
