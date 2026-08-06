import { useEffect, useState, useRef } from 'react'
import { gsap } from 'gsap'

const NavItem = ({ firstLetter, restWord, href, onClick }) => {
  const underlineRef = useRef(null)
  const beanRef = useRef(null)

  const handleMouseEnter = () => {
    gsap.killTweensOf([underlineRef.current, beanRef.current])
    gsap.set(underlineRef.current, { transformOrigin: "left" })
    
    const tl = gsap.timeline()
    
    // Step 1: Underline grows
    tl.to(underlineRef.current, { 
      scaleX: 1, 
      duration: 0.25, 
      ease: "power2.out" 
    })
    
    // Step 2: Coffee bean appears
    tl.to(beanRef.current, { 
      opacity: 1, 
      scale: 1, 
      rotation: 6, 
      duration: 0.12, 
      ease: "power2.out" 
    })
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf([underlineRef.current, beanRef.current])
    
    // Step 2 reverse: shrink left by setting origin right
    gsap.set(underlineRef.current, { transformOrigin: "right" })
    
    const tl = gsap.timeline()
    
    // Step 1: Coffee bean disappears
    tl.to(beanRef.current, { 
      opacity: 0, 
      scale: 0.8, 
      rotation: 0, 
      duration: 0.12, 
      ease: "power2.inOut" 
    })
    
    // Step 2: Underline shrinks to the right
    tl.to(underlineRef.current, { 
      scaleX: 0, 
      duration: 0.25, 
      ease: "power2.inOut" 
    })
  }

  return (
    <a href={href} className="nav-item-lux" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onClick}>
      <div className="nav-item-content">
        <span className="brand-letter">{firstLetter}</span>
        <span className="word">{restWord}</span>
        <span className="coffee-bean" ref={beanRef}>
          <img src="/beans.svg" alt="bean" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
        </span>
      </div>
      <span className="underline" ref={underlineRef}></span>
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <a href="#hero" className="brand">
            <img src="/sipr-logo.png" alt="" width={150} />
          </a>

          {/* Desktop Navigation */}
          <div className="nav-links desktop-only">
            <NavItem firstLetter="S" restWord="tory" href="#story" />
            <NavItem firstLetter="I" restWord="nfuse" href="#infuse" />
            <NavItem firstLetter="P" restWord="astries" href="#pastries" />
            <NavItem firstLetter="R" restWord="each" href="#reach" />
          </div>

          {/* Mobile Toggle */}
          <div className={`menu-toggle mobile-only ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="menu-icon" xmlns="http://www.w3.org/2000/svg">
              <path className="line-top" d="M4 7H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path className="line-middle" d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path className="line-bottom" d="M4 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div className={`mobile-nav-panel ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          <NavItem firstLetter="S" restWord="tory" href="#story" onClick={() => setMenuOpen(false)} />
          <NavItem firstLetter="I" restWord="nfuse" href="#infuse" onClick={() => setMenuOpen(false)} />
          <NavItem firstLetter="P" restWord="astries" href="#pastries" onClick={() => setMenuOpen(false)} />
          <NavItem firstLetter="R" restWord="each" href="#reach" onClick={() => setMenuOpen(false)} />
        </div>
      </div>
    </>
  )
}

