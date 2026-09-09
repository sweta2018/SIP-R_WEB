import { useState, useEffect } from 'react'
import './Popup.css'

export default function Popup() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const checkAndShowPopup = () => {
      const hash = window.location.hash;
      const isHome = hash === '' || hash === '#hero';
      
      if (isHome) {
        // Show after a slight delay when arriving at the home page
        setTimeout(() => setShow(true), 1500);
      }
    };

    // Initial check on app load
    checkAndShowPopup();

    // Re-check whenever the URL changes (e.g. clicking the Logo)
    window.addEventListener('hashchange', checkAndShowPopup);
    
    return () => window.removeEventListener('hashchange', checkAndShowPopup);
  }, [])

  if (!show) return null

  return (
    <div className="popup-overlay" onClick={() => setShow(false)}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={() => setShow(false)} aria-label="Close popup">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <picture>
          <source media="(max-width: 768px)" srcSet={`${import.meta.env.BASE_URL}popup-mb.jpg`} />
          <img src={`${import.meta.env.BASE_URL}popup.jpg`} alt="Popup Background" className="popup-bg-img" />
        </picture>
        
        <div className="popup-text-overlay">
          <h2 className="popup-heading">
            <span className="popup-script">Good Coffee</span><br/>
            Better Days
          </h2>
          
          <div className="popup-underline"></div>
          
          <p className="popup-subtext">
            Pair it with something<br/>
            freshly baked ♡
          </p>
        </div>
      </div>
    </div>
  )
}
