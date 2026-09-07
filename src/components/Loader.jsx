import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const imageContainerRef = useRef(null)
  const imagesRef = useRef([])
  const textNodesRef = useRef([])

  // SIP'R Logo Refs
  const sRef = useRef(null)
  const glassRef = useRef(null)
  const pRef = useRef(null)
  const dropRef = useRef(null)
  const rRef = useRef(null)

  const steps = [
    { img: `${import.meta.env.BASE_URL}step0.png`, text: "Where every good cup begins." },
    { img: `${import.meta.env.BASE_URL}step1.png`, text: "Freshly ground. Full of character." },
    { img: `${import.meta.env.BASE_URL}step2.png`, text: "Rich. Deep. Intense." },
    { img: `${import.meta.env.BASE_URL}step3.png`, text: "Smoothness meets intensity." },
    { img: `${import.meta.env.BASE_URL}step4.png`, text: "Your moment is ready." },
  ]

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

    // Set all images and texts to block but transparent initially
    gsap.set(imagesRef.current, { opacity: 0, display: 'block', scale: 0.95 })
    gsap.set(textNodesRef.current, { opacity: 0, display: 'block' })

    // Create sequence animation
    const timePerFrame = 0.8; // slightly longer to allow reading the text
    const fadeDuration = 0.4; // seconds for crossfade

    steps.forEach((_, index) => {
      const img = imagesRef.current[index];
      const textNode = textNodesRef.current[index];

      if (index === 0) {
        // Fade in first image and text
        tl.to(img, { opacity: 1, scale: 1, duration: fadeDuration, ease: 'power2.inOut' }, 'frame0')
        tl.to(textNode, { opacity: 1, duration: fadeDuration, ease: 'power2.inOut' }, 'frame0')
      } else {
        // Crossfade out previous image and text
        tl.to(imagesRef.current[index - 1], { opacity: 0, duration: fadeDuration, ease: 'power2.inOut' }, `crossfade${index}`)
        tl.to(textNodesRef.current[index - 1], { opacity: 0, duration: fadeDuration, ease: 'power2.inOut' }, `crossfade${index}`)

        // Crossfade in current image and text
        tl.to(img, { opacity: 1, scale: 1, duration: fadeDuration, ease: 'power2.inOut' }, `crossfade${index}`)
        tl.to(textNode, { opacity: 1, duration: fadeDuration, ease: 'power2.inOut' }, `crossfade${index}`)
      }

      // Add SIP'R logo animation on the last step (index 4)
      if (index === 4) {
        // Wait 1.0 seconds, then fade out the step4 image completely
        tl.to(img, { opacity: 0, duration: 0.4 }, `crossfade${index}+=1.0`)
        tl.to(textNode, { opacity: 0, duration: 0.4 }, `crossfade${index}+=1.0`)

        const logoLetters = [sRef.current, glassRef.current, pRef.current, dropRef.current, rRef.current];
        tl.fromTo(logoLetters,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'bounce.out' },
          `crossfade${index}+=1.2`
        )
      }

      // Wait for the frame duration
      if (index === 4) {
        // The logo drop finishes around crossfade4 + 2.0s. 
        // We transition to the main page almost instantly after it completes.
        tl.to({}, { duration: 0.2 }, `crossfade${index}+=2.0`)
      } else {
        tl.to({}, { duration: timePerFrame })
      }
    })

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div className="loader-overlay" ref={loaderRef}>
      <div className="loader-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        <div
          className="loader-graphics"
          ref={imageContainerRef}
          style={{
            position: 'relative',
            width: 'clamp(100px, 28vw, 140px)',
            height: 'clamp(100px, 28vw, 140px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}
        >
          {steps.map((step, index) => (
            <img
              key={index}
              ref={el => imagesRef.current[index] = el}
              src={step.img}
              alt={`Loading step ${index}`}
              style={{
                position: 'absolute',
                maxWidth: index === 2 ? '90%' : index === 3 ? '80%' : '100%',
                maxHeight: index === 2 ? '90%' : index === 3 ? '80%' : '100%',
                objectFit: 'contain'
              }}
            />
          ))}

          {/* SIP'R Logo Container */}
          <div style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            width: '220%',
            left: '-60%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            <img ref={sRef} src={`${import.meta.env.BASE_URL}s.png`} alt="S" style={{ width: '22%', opacity: 0 }} />
            <img ref={glassRef} src={`${import.meta.env.BASE_URL}glass.png`} alt="I" style={{ width: '15%', opacity: 0, margin: '0 1%' }} />
            <img ref={pRef} src={`${import.meta.env.BASE_URL}p.png`} alt="P" style={{ width: '22%', opacity: 0 }} />
            <img ref={dropRef} src={`${import.meta.env.BASE_URL}sip-drop.png`} alt="'" style={{ width: '12%', opacity: 0, marginTop: '-16%', marginLeft: '-5%', marginRight: '-5%', zIndex: 21 }} />
            <img ref={rRef} src={`${import.meta.env.BASE_URL}r.png`} alt="R" style={{ width: '22%', opacity: 0 }} />
          </div>
        </div>

        {/* Text Sequence */}
        <div
          className="loader-text-container"
          style={{
            position: 'relative',
            minHeight: '60px',
            width: '80vw',
            maxWidth: '350px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {steps.map((step, index) => (
            <span
              key={index}
              ref={el => textNodesRef.current[index] = el}
              className="loader-text-main"
              style={{
                position: 'absolute',
                whiteSpace: 'pre-line',
                textAlign: 'center',
                width: '100%',
                fontSize: '1.2rem',
                lineHeight: '1.4',
                padding: '0 10px'
              }}
            >
              {step.text}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
