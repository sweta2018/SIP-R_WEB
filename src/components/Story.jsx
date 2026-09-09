import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IconCup = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
)

const IconBeans = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 6C6 6 4 10 4 14C4 18 8 20 12 20C16 20 20 16 20 12C20 8 18 6 14 6C12 6 10 8 10 8" />
    <path d="M12 20C12 20 11 16 11 13C11 10 13 8 13 8" />
    <path d="M14 6C14 6 15 9 15 12C15 15 13 18 13 18" />
  </svg>
)

const IconLeaf = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9 9h2a7 7 0 0 1 2 11ZM15 20a7 7 0 0 0 2-11h-2a7 7 0 0 0-2 11Z" />
  </svg>
)

export default function Story() {
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in hero elements
      gsap.from('.story-hero-right > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      })

      // Fade in philosophy columns
      gsap.from('.phil-col', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.story-philosophy',
          start: 'top 75%'
        }
      })

      // Fade in cards
      gsap.from('.story-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.story-cards-section',
          start: 'top 80%'
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="story-page" ref={containerRef}>

      {/* Hero Section */}
      <section className="story-hero">
        <div className="story-hero-left">
          <img src={`${import.meta.env.BASE_URL}slide1.png`} alt="SIP'R Iced Coffee" className="story-hero-img" />
        </div>
        <div className="story-hero-right">
          <h1 className="story-title">
            About <em>SIP&apos;R</em>
          </h1>
          <div className="story-divider"></div>
          <p className="story-desc">
            We&apos;re more than a café.
            We&apos;re a place to slow down,
            sip deep, and enjoy the little
            moments that matter.
          </p>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="story-philosophy">
        <div className="story-section-header">
          <span className="story-eyebrow">OUR PHILOSOPHY</span>
          <h2 className="story-phil-title">
            SIP<em className="red-italic">DEEP</em> DISCOVER<em className="red-italic"> SILENCE</em>.
          </h2>
        </div>

        <div className="phil-grid">
          <div className="phil-col">
            <div className="phil-icon"><IconCup /></div>
            <h3>SIP</h3>
            <p>Take your time.<br />Enjoy the moment.</p>
          </div>
          <div className="phil-col">
            <div className="phil-icon"><IconBeans /></div>
            <h3>DEEP</h3>
            <p>Go beyond the rush.<br />Feel every flavour.</p>
          </div>
          <div className="phil-col">
            <div className="phil-icon"><IconLeaf /></div>
            <h3>DISCOVER</h3>
            <p>Find your space.<br />Find your silence.</p>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="story-cards-section">
        <div className="story-section-header left-align">
          <span className="story-eyebrow">MORE THAN JUST COFFEE</span>
        </div>

        <div className="story-cards">
          <div className="story-card">
            <img src={`${import.meta.env.BASE_URL}img6.png`} alt="Great Coffee" />
            <div className="card-content">
              <h3>Great Coffee</h3>
              <p>Crafted with care.<br />Made for you.</p>
            </div>
          </div>
          <div className="story-card">
            <img src={`${import.meta.env.BASE_URL}slide2.png`} alt="Refreshing Mocktails" />
            <div className="card-content">
              <h3>Refreshing Mocktails</h3>
              <p>Unique blends.<br />Made to refresh.</p>
            </div>
          </div>
          <div className="story-card">
            <img src={`${import.meta.env.BASE_URL}slide3.png`} alt="Fresh Bakes" />
            <div className="card-content">
              <h3>Fresh Bakes</h3>
              <p>Baked daily.<br />Perfectly paired.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="story-footer">
        <div className="footer-logo">
          <img src={`${import.meta.env.BASE_URL}sipr-logo.png`} alt="SIP'R" width={120} />
        </div>
        <div className="footer-contact">
          <a href="mailto:siprkolkata@gmail.com" className="footer-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            siprkolkata@gmail.com
          </a>
          <span className="footer-separator">|</span>
          <a href="tel:+918100606004" className="footer-link">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +91 8100606004
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
