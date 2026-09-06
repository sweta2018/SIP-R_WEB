import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedTitle({ text, emText, className = '', style = {} }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // If the loader overlay isn't in the DOM, it means it already finished
    if (!document.querySelector('.loader-overlay')) {
      setHasLoaded(true);
      return;
    }
    
    // Otherwise, wait for the custom event
    const handleLoad = () => setHasLoaded(true);
    window.addEventListener('app-loaded', handleLoad);
    return () => window.removeEventListener('app-loaded', handleLoad);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    if (isVisible && hasLoaded) {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 40, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.04,
          duration: 0.8,
          ease: 'back.out(1.7)',
          transformOrigin: 'bottom center',
          overwrite: "auto"
        }
      );
    } else if (!isVisible && hasLoaded) {
      // Reset when out of view so it can animate again when scrolled back
      gsap.set(chars, { opacity: 0, y: 40, rotationX: -90 });
    }
  }, [isVisible, hasLoaded]);

  const renderChars = (str) => {
    if (!str) return null;
    return str.split('').map((char, index) => (
      <span 
        key={index} 
        className="char" 
        style={{ 
          display: 'inline-block', 
          opacity: 0,
          whiteSpace: 'pre'
        }}
      >
        {char}
      </span>
    ));
  };

  return (
    <h2 className={className} ref={containerRef} style={{ perspective: '1000px', margin: 0, ...style }}>
      {renderChars(text)}{' '}
      {emText && <em>{renderChars(emText)}</em>}
    </h2>
  );
}
