import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Pastries.css'

gsap.registerPlugin(ScrollTrigger)

const Pastries = () => {
  const heroRef = useRef(null)
  const imageRef = useRef(null)
  const textElementsRef = useRef([])
  const lineRef = useRef(null)
  const qualityStripRef = useRef(null)
  const secondSectionRef = useRef(null)
  const cardsRef = useRef([])
  const pastriesSliderRef = useRef(null)

  const scrollPastries = (direction) => {
    if (pastriesSliderRef.current) {
      const scrollAmount = pastriesSliderRef.current.offsetWidth / 3;
      pastriesSliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  useEffect(() => {
    // 1. Page Load Animations
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Hero Text
    tl.fromTo(
      textElementsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
    )

    // Hero Image Clip Path Reveal
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.5, ease: 'power4.inOut' },
        '-=0.8'
      )
    }

    // Hero Decorative Line
    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8 },
        '-=1'
      )
    }

    // 2. Scroll Animations
    // Quality Strip Reveal
    if (qualityStripRef.current) {
      const qElements = qualityStripRef.current.querySelectorAll('.q-anim')
      gsap.fromTo(
        qElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: qualityStripRef.current,
            start: 'top 85%',
          }
        }
      )
    }

    // Second Section (Dark) Content
    if (secondSectionRef.current) {
      const sElements = secondSectionRef.current.querySelectorAll('.s-anim')
      gsap.fromTo(
        sElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: secondSectionRef.current,
            start: 'top 75%',
          }
        }
      )

      // Cards stagger reveal
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: secondSectionRef.current,
              start: 'top 60%',
            },
            delay: i * 0.15
          }
        )
      })
    }
  }, [])

  const addToRefs = (el) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current.push(el)
    }
  }

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  return (
    <div className="pastries-page">
      {/* HERO SECTION */}
      <section className="pastries-hero" ref={heroRef}>
        <div className="pastries-hero-left">
          <div className="pastries-label" ref={addToRefs}>Freshly Crafted</div>
          <h1 className="pastries-title" ref={addToRefs}>Pastries</h1>
          <div className="pastries-decorative-line" ref={lineRef}></div>
          <p className="pastries-desc" ref={addToRefs}>
            Delicate layers. Perfectly baked.<br />
            Made to complement every sip<br />
            and sweeten your moments.
          </p>
          <button className="pastries-btn" ref={addToRefs}>
            Explore Our Bakery <span className="pastries-btn-arrow">→</span>
          </button>

          <svg className="pastries-illustration" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 90 Q 30 50, 70 10" stroke="#8B6F5B" strokeWidth="1" />
            <path d="M70 10 Q 80 40, 50 60" stroke="#8B6F5B" strokeWidth="1" />
            <path d="M30 60 C 20 70, 40 80, 50 60" stroke="#8B6F5B" strokeWidth="1" />
            {/* Coffee beans */}
            <ellipse cx="60" cy="80" rx="3" ry="5" transform="rotate(45 60 80)" fill="#5A3825" />
            <ellipse cx="70" cy="75" rx="3" ry="5" transform="rotate(15 70 75)" fill="#5A3825" />
          </svg>
        </div>
        <div className="pastries-hero-right">
          <img
            ref={imageRef}
            src={`${import.meta.env.BASE_URL}images/pastry_hero.png`}
            alt="SIPR Premium Pastries"
            className="pastries-hero-image"
          />
        </div>
      </section>

      {/* QUALITY STRIP */}
      <section className="pastries-quality-strip" ref={qualityStripRef}>
        <div className="quality-main q-anim">
          <div className="quality-stamp">
            <div className="quality-stamp-inner">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
              <span>BAKED<br />PASSION</span>
            </div>
          </div>
          <div className="quality-main-content">
            <h3>Baked Fresh Daily</h3>
            <p>Every pastry is crafted in small batches using the finest ingredients for exceptional taste and texture.</p>
          </div>
        </div>

        <div className="quality-features">
          <div className="quality-feature q-anim">
            <svg className="quality-icon" viewBox="0 0 24 24">
              <path d="M12 22V8M12 8c-2-2-4-2-4-2s2-2 4-2 4 2 4 2-2 2-4 2zm0 0c-1.5 2-3.5 3-5.5 3 0 0 1-3 2-4m3 1c1.5 2 3.5 3 5.5 3 0 0-1-3-2-4M9.5 13c-1.5 2-3.5 3-5.5 3 0 0 1-3 2-4m9.5 1c1.5 2 3.5 3 5.5 3 0 0-1-3-2-4" />
            </svg>
            <div className="quality-feature-text">
              <h4>Quality Ingredients</h4>
              <p>We source premium flour, real butter, cocoa and nuts.</p>
            </div>
          </div>

          <div className="quality-feature q-anim">
            <svg className="quality-icon" viewBox="0 0 24 24">
              <path d="M4 19V9a8 8 0 0 1 16 0v10M4 19h16M7 19v-4h10v4M10 15v-3a2 2 0 0 1 4 0v3" />
            </svg>
            <div className="quality-feature-text">
              <h4>Artisan Baking</h4>
              <p>Handcrafted with care by our skilled bakers.</p>
            </div>
          </div>

          <div className="quality-feature q-anim">
            <svg className="quality-icon" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="quality-feature-text">
              <h4>Made With Love</h4>
              <p>From our kitchen to your table, always with love.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="pastries-second" ref={secondSectionRef}>
        <div className="pastries-second-left">
          <svg className="pastries-second-icon s-anim" viewBox="0 0 24 24">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h2 className="pastries-second-title s-anim">
            Made to Pair
          </h2>
          <p className="pastries-second-desc s-anim">
            From buttery croissants to rich muffins, each creation is designed to pair perfectly with your favorite sip.
          </p>
          <div className="pastries-second-line s-anim"></div>
        </div>

        <div className="pastries-slider-container" style={{ flex: '0 0 73%', position: 'relative', minWidth: 0 }}>
          <div className="pastries-grid" ref={pastriesSliderRef}>
            {/* Card 1 */}
            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_croissant.png`} alt="Flaky Croissant" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>
              <div className="pastries-card-icon-wrap">
                <svg className="pastries-card-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" /></svg>
              </div>
              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Flaky & Buttery</h4>
                <p className="pastries-card-desc">Perfectly layered for that delicate, melt-in-mouth bite.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_muffin.png`} alt="Chocolate Muffin" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>
              <div className="pastries-card-icon-wrap">
                <svg className="pastries-card-icon" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
              </div>
              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Rich & Indulgent</h4>
                <p className="pastries-card-desc">Deep flavors that satisfy your sweet cravings.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_baking.png`} alt="Artisan Baking" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>
              <div className="pastries-card-icon-wrap">
                <svg className="pastries-card-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
              </div>
              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Crafted With Care</h4>
                <p className="pastries-card-desc">Every detail perfected by our artisan bakers.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_ingredients.png`} alt="Clean Ingredients" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>
              <div className="pastries-card-icon-wrap">
                <svg className="pastries-card-icon" viewBox="0 0 24 24"><path d="M2 12h20M12 2l10 10-10 10L2 12z" /></svg>
              </div>
              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Clean & Wholesome</h4>
                <p className="pastries-card-desc">No shortcuts. Just real ingredients, simply baked.</p>
              </div>
            </div>
          </div>
          <div className="infuse-slider-nav" style={{ left: '-20px', right: '-20px', top: '35%' }}>
            <button className="slider-btn" onClick={() => scrollPastries('left')} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="slider-btn" onClick={() => scrollPastries('right')} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Pastries
