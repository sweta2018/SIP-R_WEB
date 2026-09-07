import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Pastries.css'

gsap.registerPlugin(ScrollTrigger)

// Minimal SVG Icons
const IconBeans = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 14c-1.5 2-4.5 3-6.5 1s-1-5 1-6.5c1.5-1.5 4.5-.5 6.5 1S12 12 10 14z" />
    <path d="M14 10c1.5-2 4.5-3 6.5-1s1 5-1 6.5c-1.5 1.5-4.5.5-6.5-1S12 12 14 10z" />
    <path d="M6.5 11.5L9 9M15 15l2.5-2.5" />
  </svg>
)

const IconMachine = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 8h8M12 12v4M10 16h4M6 20h12" />
  </svg>
)

const IconHeart = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const IconLeaf = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M11 20A7 7 0 0 1 9 9h2a7 7 0 0 1 2 11ZM15 20a7 7 0 0 0 2-11h-2a7 7 0 0 0-2 11Z" />
  </svg>
)

const IconCupTime = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 8h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8z" />
    <path d="M16 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2" />
    <path d="M8 2v3M12 2v3" />
  </svg>
)

const IconPin = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconVibes = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="7" r="4" />
    <circle cx="6" cy="17" r="4" />
    <circle cx="18" cy="17" r="4" />
    <path d="M10 10l-2 4M14 10l2 4M8 17h8" />
  </svg>
)

export default function Infuse({ currentHash }) {
  const containerRef = useRef(null)
  const secondSectionRef = useRef(null)
  const cardsRef = useRef([])
  const sliderRef = useRef(null)
  const pastriesSliderRef = useRef(null)

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth / 2;
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  const scrollPastries = (direction) => {
    if (pastriesSliderRef.current) {
      const scrollAmount = pastriesSliderRef.current.offsetWidth / 3;
      pastriesSliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  const addCardRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  useEffect(() => {
    if (currentHash === '#infuse-coffee') {
      document.getElementById('coffee')?.scrollIntoView()
    } else if (currentHash === '#infuse-bakery') {
      document.getElementById('bakery')?.scrollIntoView()
    } else if (currentHash === '#mocktails') {
      document.getElementById('mocktails')?.scrollIntoView()
    }
  }, [currentHash])

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.utils.toArray('.fade-up').forEach(elem => {
        gsap.from(elem, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
          }
        })
      })

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
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="infuse-page" ref={containerRef}>

      {/* Hero Section */}
      <section className="infuse-hero" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}hero.png)` }}>
        <div className="infuse-hero-content fade-up">
          <h1 className="infuse-hero-title">
            Signature<br />
            <span className="red-italic">Sips</span>
          </h1>
          <div className="infuse-hero-line"></div>
          <p className="infuse-hero-desc">
            From bold espresso to refreshing signature<br />
            pours — made for every kind of sip.
          </p>
          <div className="infuse-hero-actions">
            <a href="#coffee" className="btn btn-fill">COFFEE</a>
            <a href="#mocktails" className="btn btn-outline-white">MOCKTAILS</a>
          </div>
        </div>
      </section>

      {/* Coffee Section */}
      <section id="coffee" className="infuse-section">
        <div className="infuse-section-left fade-up">
          <span className="infuse-eyebrow">COFFEE</span>
          <h2 className="infuse-title">
            Coffee,<br />
            <span className="red-italic">Your Way</span>
          </h2>
          <p className="infuse-desc">
            Carefully brewed. Perfectly<br />
            balanced. Made to match your<br />
            mood, any time of day.
          </p>
        </div>
        <div className="infuse-section-right">
          <div className="infuse-slider-container">
            <div className="infuse-slider" ref={sliderRef}>
              <div className="infuse-card fade-up">
                <img src={`${import.meta.env.BASE_URL}img1.png`} alt="Iced Latte" />
                <div className="infuse-card-content">
                  <h3>Iced Latte</h3>
                  <p>Smooth espresso with chilled milk and ice for a creamy, refreshing finish.</p>
                </div>
              </div>
              <div className="infuse-card fade-up" style={{ transitionDelay: '0.1s' }}>
                <img src={`${import.meta.env.BASE_URL}img2.png`} alt="Iced Americano" />
                <div className="infuse-card-content">
                  <h3>Iced Americano</h3>
                  <p>Bold espresso over ice, clean, crisp and unapologetically strong.</p>
                </div>
              </div>
              <div className="infuse-card fade-up" style={{ transitionDelay: '0.2s' }}>
                <img src={`${import.meta.env.BASE_URL}img3.png`} alt="Cappuccino" />
                <div className="infuse-card-content">
                  <h3>Cappuccino</h3>
                  <p>Rich espresso, silky steamed milk and a layer of delicate foam.</p>
                </div>
              </div>
              <div className="infuse-card fade-up" style={{ transitionDelay: '0.3s' }}>
                <img src={`${import.meta.env.BASE_URL}img4.png`} alt="Flat White" />
                <div className="infuse-card-content">
                  <h3>Flat White</h3>
                  <p>Micro-foamed milk poured over a double shot of espresso for a velvety texture.</p>
                </div>
              </div>
              <div className="infuse-card fade-up" style={{ transitionDelay: '0.4s' }}>
                <img src={`${import.meta.env.BASE_URL}img5.png`} alt="Mocha" />
                <div className="infuse-card-content">
                  <h3>Mocha</h3>
                  <p>Espresso combined with bittersweet mocha sauce and steamed milk.</p>
                </div>
              </div>
              <div className="infuse-card fade-up" style={{ transitionDelay: '0.5s' }}>
                <img src={`${import.meta.env.BASE_URL}img6.png`} alt="Cold Brew" />
                <div className="infuse-card-content">
                  <h3>Cold Brew</h3>
                  <p>Slow-steeped in cool water for 20 hours, incredibly smooth.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="infuse-slider-nav">
            <button className="slider-btn" onClick={() => scrollSlider('left')} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="slider-btn" onClick={() => scrollSlider('right')} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features Banner 1 */}
      <section className="infuse-features-banner">
        <div className="infuse-feature fade-up">
          <IconBeans />
          <div className="feature-text">
            <h4>Premium Beans</h4>
            <p>Handpicked, high quality beans from trusted coffee farms.</p>
          </div>
        </div>
        <div className="feature-divider"></div>
        <div className="infuse-feature fade-up" style={{ transitionDelay: '0.1s' }}>
          <IconMachine />
          <div className="feature-text">
            <h4>Expertly Brewed</h4>
            <p>Brewed with precision and passion in every single cup.</p>
          </div>
        </div>
        <div className="feature-divider"></div>
        <div className="infuse-feature fade-up" style={{ transitionDelay: '0.2s' }}>
          <IconHeart />
          <div className="feature-text">
            <h4>Made with Care</h4>
            <p>Thoughtful ingredients and attention to detail you can taste.</p>
          </div>
        </div>
        <div className="feature-divider"></div>
        <div className="infuse-feature fade-up" style={{ transitionDelay: '0.3s' }}>
          <IconLeaf />
          <div className="feature-text">
            <h4>Pure & Honest</h4>
            <p>No shortcuts. Just real coffee and real flavours.</p>
          </div>
        </div>
      </section>

      {/* Bakery Section */}
      <section id="bakery" className="pastries-second" ref={secondSectionRef}>
        <div className="pastries-second-left">

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
            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_croissant.png`} alt="Flaky Croissant" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>

              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Flaky & Buttery</h4>
                <p className="pastries-card-desc">Perfectly layered for that delicate, melt-in-mouth bite.</p>
              </div>
            </div>

            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_muffin.png`} alt="Chocolate Muffin" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>

              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Rich & Indulgent</h4>
                <p className="pastries-card-desc">Deep flavors that satisfy your sweet cravings.</p>
              </div>
            </div>

            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_baking.png`} alt="Artisan Baking" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>

              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Crafted With Care</h4>
                <p className="pastries-card-desc">Every detail perfected by our artisan bakers.</p>
              </div>
            </div>

            <div className="pastries-card" ref={addCardRef}>
              <div className="pastries-card-img-wrap">
                <img src={`${import.meta.env.BASE_URL}images/feature_ingredients.png`} alt="Clean Ingredients" className="pastries-card-img" />
                <div className="pastries-card-overlay"></div>
              </div>

              <div className="pastries-card-content">
                <h4 className="pastries-card-title">Clean & Wholesome</h4>
                <p className="pastries-card-desc">No shortcuts. Just real ingredients, simply baked.</p>
              </div>
            </div>
          </div>
          <div className="infuse-slider-nav" style={{ left: '-20px', right: '-20px', top: '35%' }}>
            <button className="slider-btn" onClick={() => scrollPastries('left')} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="slider-btn" onClick={() => scrollPastries('right')} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </section>

      {/* Info Banner Footer */}
      <section className="infuse-info-banner">
        <div className="info-img-left fade-up">
          <img src={`${import.meta.env.BASE_URL}img7.png`} alt="Pouring coffee" />
        </div>
        <div className="info-content fade-up">
          <div className="info-text">
            <h3> Made to <span className="red-italic">Pair</span></h3>
            <p>It's about the experience.<br />Good vibes, great music,<br />delicious sips and moments<br />worth remembering.</p>
          </div>

          <div className="info-feature-item">
            <IconCupTime />
            <h4>Everyday<br />10AM &ndash; 11PM</h4>
            <p>We're here for your<br />coffee cravings.</p>
          </div>

          <div className="info-feature-item">
            <IconPin />
            <h4>Made Fresh</h4>
            <p>Always made to<br />order. Always<br />served fresh.</p>
          </div>

          <div className="info-feature-item">
            <IconVibes />
            <h4>Good Vibes</h4>
            <p>A cozy space<br />to sip, relax and<br />connect.</p>
          </div>
        </div>
        <div className="info-img-right fade-up">
          <img src={`${import.meta.env.BASE_URL}HazelnutI-cold-coffee.jpg`} alt="Latte Art" />
        </div>
      </section>

      {/* Footer */}
      <footer className="story-footer">
        <div className="footer-contact">
          <img src={`${import.meta.env.BASE_URL}sipr-logo.png`} alt="SIP'R" height="30" />
          <span className="footer-separator">|</span>
          <a href="mailto:hello@siprcafe.com" className="footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            hello@siprcafe.com
          </a>
          <span className="footer-separator">|</span>
          <a href="tel:+919876543210" className="footer-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 xxxxxx xxxxx
          </a>
        </div>
        <div className="footer-socials">
          <span>Follow us</span>
          <a href="#" className="social-icon" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
          </a>
          <a href="#" className="social-icon" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="#" className="social-icon" aria-label="YouTube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
          </a>
          <a href="#" className="social-icon" aria-label="WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.388 0 0 5.388 0 12.031c0 2.12.553 4.184 1.603 5.998L.15 23.513l5.632-1.478c1.761.95 3.725 1.45 5.748 1.45 6.641 0 12.03-5.39 12.03-12.031S18.672 0 12.031 0zm6.541 17.332c-.279.79-1.542 1.503-2.128 1.558-.553.052-1.282.16-3.771-.861-3.003-1.233-4.945-4.321-5.093-4.52-.148-.2-1.218-1.621-1.218-3.095 0-1.474.764-2.203 1.037-2.497.273-.294.595-.368.792-.368.197 0 .394 0 .565.011.186.011.436-.074.683.525.257.62.88 2.148.959 2.306.079.158.129.347.03.545-.099.198-.149.317-.297.495-.148.178-.312.386-.445.525-.148.158-.306.326-.129.633.178.307.792 1.312 1.703 2.124 1.178 1.049 2.168 1.374 2.475 1.522.307.148.485.129.673-.089.188-.218.812-.95 1.029-1.277.217-.327.435-.272.712-.168.277.104 1.751.822 2.048.97.297.148.495.222.564.346.069.124.069.721-.21 1.512z" /></svg>
          </a>
        </div>
      </footer>
    </div>
  )
}
