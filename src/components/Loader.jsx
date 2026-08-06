import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const kettleRef = useRef(null)
  const fillRef = useRef(null)
  const liquidRef = useRef(null)
  const streamClipRef = useRef(null)
  const textRef = useRef(null)
  const dotsRef = useRef(null)

  const [loadingText, setLoadingText] = useState('Brewing')
  const [dots, setDots] = useState('')
  const [showDots, setShowDots] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // fade out loader
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (onComplete) onComplete()
          }
        })
      }
    })

    gsap.set(streamClipRef.current, { attr: { height: 0 } })
    gsap.set(fillRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(kettleRef.current, { svgOrigin: '70 110' })
    gsap.set(liquidRef.current, { svgOrigin: '70 110' })

    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    // 1. Loader appears (Removed tl.from to prevent React 18 strict mode bug, it will just mount visible)

    // 2. Kettle tilts forward
    tl.to(kettleRef.current, {
      rotation: 40,
      duration: 1.2,
      ease: 'power2.inOut'
    }, "pour")

    // Counter-rotate the liquid so it stays physically level inside the glass
    tl.to(liquidRef.current, {
      rotation: -40,
      duration: 1.2,
      ease: 'power2.inOut'
    }, "pour")

    // 3. Coffee stream flows down perfectly smooth
    tl.to(streamClipRef.current, {
      attr: { height: 120 },
      duration: 0.5,
      ease: 'power1.in'
    })

    // 4. Loading bar fills
    tl.to(fillRef.current, {
      scaleX: 1,
      duration: 3.5,
      ease: 'power1.inOut'
    })

    // 5. Coffee stream stops (falls into the cup)
    tl.to(streamClipRef.current, {
      attr: { y: 180, height: 0 },
      duration: 0.4,
      ease: 'power1.out'
    }, "-=0.2")

    // 6. Kettle rotates back and liquid stays level
    tl.to(kettleRef.current, {
      rotation: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, "<")

    tl.to(liquidRef.current, {
      rotation: 0,
      duration: 1,
      ease: 'power2.inOut'
    }, "<")

    // 7. Text changes
    tl.call(() => {
      clearInterval(dotsInterval)
      setShowDots(false)
      
      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        onComplete: () => {
          setLoadingText('Sip Deep.\nDiscover Silence.')
          gsap.fromTo(textRef.current, 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          )
        }
      })
    })

    tl.to({}, { duration: 1.5 }) // Wait before fade out

    return () => {
      clearInterval(dotsInterval)
      tl.kill()
    }
  }, [onComplete])

  return (
    <div className="loader-overlay" ref={loaderRef}>
      <div className="loader-content">
        
        <div className="loader-graphics">
          {/* Unified Kettle & Stream SVG */}
          <div className="kettle-svg-container">
            <svg width="200" height="180" viewBox="0 0 200 180">
              <defs>
                <clipPath id="streamClip">
                  <rect x="100" y="60" width="70" height="0" ref={streamClipRef} />
                </clipPath>
              </defs>
              <g ref={kettleRef}>
                {/* Liquid inside that stays level, large-arc-flag=1 to touch the circular base */}
                <g ref={liquidRef}>
                  <path d="M 36.5 100 Q 70 115 103.5 100 A 35 35 0 1 1 36.5 100 Z" fill="#4B2E24" />
                </g>
                
                {/* Kettle Outline */}
                <path d="M 45.2 85.2 A 35 35 0 1 0 94.8 85.2 L 85 45 L 55 45 Z" fill="none" stroke="#4B2E24" strokeWidth="5" strokeLinejoin="round" />
                
                {/* Lid */}
                <rect x="50" y="35" width="40" height="10" fill="none" stroke="#4B2E24" strokeWidth="5" strokeLinejoin="round" />
                <line x1="70" y1="35" x2="70" y2="25" stroke="#4B2E24" strokeWidth="5" strokeLinecap="round" />
                
                {/* Handle */}
                <path d="M 35 110 C 10 110, 10 55, 55 60" fill="none" stroke="#4B2E24" strokeWidth="5" strokeLinecap="round" />
              </g>

              {/* Smooth parabolic coffee stream aligning with the lower lip of the mouth */}
              <g clipPath="url(#streamClip)">
                <path d="M 110 75 C 130 80, 142 120, 142 180 L 148 180 C 148 110, 140 65, 123 70 Z" fill="#4B2E24" />
              </g>
            </svg>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-container">
            <div className="progress-bar-bg"></div>
            <div className="progress-bar-fill" ref={fillRef}></div>
          </div>
        </div>

        {/* Text */}
        <div className="loader-text-container" ref={textRef}>
          <span className="loader-text-main">{loadingText}</span>
          {showDots && <span className="loader-text-dots">{dots}</span>}
        </div>

      </div>
    </div>
  )
}
