import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const NavItem = ({ firstLetter, restWord, href, onClick }) => {
  const underlineRef = useRef(null)
  const beanRef = useRef(null)
  const letterRef = useRef(null)

  useEffect(() => {
    const updateWidth = () => {
      if (underlineRef.current && letterRef.current) {
        gsap.set(underlineRef.current, { width: letterRef.current.offsetWidth })
      }
    }

    updateWidth()
    document.fonts.ready.then(updateWidth)
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handleMouseEnter = () => {
    gsap.killTweensOf([underlineRef.current, beanRef.current])

    const tl = gsap.timeline()

    // Step 1: Underline grows
    tl.to(underlineRef.current, {
      width: "100%",
      duration: 0.25,
      ease: "power2.out"
    })

    // Step 2: Coffee bean appears concurrently
    tl.to(beanRef.current, {
      opacity: 1,
      scale: 1,
      rotation: 6,
      duration: 0.12,
      ease: "power2.out"
    }, "<")
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf([underlineRef.current, beanRef.current])

    const tl = gsap.timeline()

    // Step 1: Coffee bean disappears
    tl.to(beanRef.current, {
      opacity: 0,
      scale: 0.8,
      rotation: 0,
      duration: 0.12,
      ease: "power2.inOut"
    })

    // Step 2: Underline shrinks to the letter width concurrently
    tl.to(underlineRef.current, {
      width: letterRef.current ? letterRef.current.offsetWidth : 0,
      duration: 0.25,
      ease: "power2.inOut"
    }, "<")
  }

  return (
    <a href={href} className="nav-item-lux" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
      <div className="nav-item-content">
        <span className="coffee-bean" ref={beanRef}>
          <svg width="28" height="28" viewBox="0 0 64 64" fill="none">
            <g transform="rotate(-28 32 32)">
              <path
                d="M32 8 C21 8 14 17 14 31 C14 45 22 56 32 56 C42 56 50 45 50 31 C50 17 43 8 32 8Z"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M35 11 C29 17 27 24 30 31 C33 38 33 45 28 53"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </svg>
        </span>
        <span className="text-wrapper" style={{ display: 'flex', alignItems: 'baseline', position: 'relative' }}>
          <span className="brand-letter" ref={letterRef}>{firstLetter}</span>
          <span className="word">{restWord}</span>
          <span className="underline" ref={underlineRef}></span>
        </span>
      </div>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(window.location.hash || '')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onHashChange = () => setCurrentHash(window.location.hash || '')
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="brand" onClick={(e) => {
            e.preventDefault();
            window.history.pushState("", document.title, window.location.pathname + window.location.search);
            window.dispatchEvent(new Event('hashchange'));
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <img src={`${import.meta.env.BASE_URL}sipr-logo.png`} alt="" width={150} />
          </a>

          {/* Global Hamburger Toggle */}
          <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="menu-icon" xmlns="http://www.w3.org/2000/svg">
              <path className="line-top" d="M2 7H22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="square" />
              <path className="line-middle" d="M10 12H22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="square" />
              <path className="line-bottom" d="M2 17H22" stroke="currentColor" strokeWidth="0.5" strokeLinecap="square" />
            </svg>
          </div>
        </div>

        {/* Mobile Menu Panel moved inside nav for z-index context */}
        <div className={`mobile-nav-panel ${menuOpen ? 'active' : ''}`}>
          <div className="mobile-nav-links">
            <NavItem firstLetter="S" restWord="tory" href="#story" onClick={() => setMenuOpen(false)} />
            <NavItem firstLetter="I" restWord="ndulge" href="#indulge" onClick={() => setMenuOpen(false)} />
            <NavItem firstLetter="P" restWord="icks" href="#menu" onClick={() => setMenuOpen(false)} />
            <NavItem firstLetter="R" restWord="each" href="#reach" onClick={() => setMenuOpen(false)} />
          </div>

          <div className="menu-bottom-image">
            <img src={`${import.meta.env.BASE_URL}menu-img.png`} alt="SIPR" />
          </div>
          
          <div className="menu-social-icons">
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.872.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.388 0 0 5.388 0 12.031c0 2.12.553 4.184 1.603 5.998L.15 23.513l5.632-1.478c1.761.95 3.725 1.45 5.748 1.45 6.641 0 12.03-5.39 12.03-12.031S18.672 0 12.031 0zm6.541 17.332c-.279.79-1.542 1.503-2.128 1.558-.553.052-1.282.16-3.771-.861-3.003-1.233-4.945-4.321-5.093-4.52-.148-.2-1.218-1.621-1.218-3.095 0-1.474.764-2.203 1.037-2.497.273-.294.595-.368.792-.368.197 0 .394 0 .565.011.186.011.436-.074.683.525.257.62.88 2.148.959 2.306.079.158.129.347.03.545-.099.198-.149.317-.297.495-.148.178-.312.386-.445.525-.148.158-.306.326-.129.633.178.307.792 1.312 1.703 2.124 1.178 1.049 2.168 1.374 2.475 1.522.307.148.485.129.673-.089.188-.218.812-.95 1.029-1.277.217-.327.435-.272.712-.168.277.104 1.751.822 2.048.97.297.148.495.222.564.346.069.124.069.721-.21 1.512z" /></svg>
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

