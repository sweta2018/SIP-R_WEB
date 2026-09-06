import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function AnimatedParagraph({ text, className = '', style = {} }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!document.querySelector('.loader-overlay')) {
      setHasLoaded(true);
    } else {
      const handleLoad = () => setHasLoaded(true);
      window.addEventListener('app-loaded', handleLoad);
      return () => window.removeEventListener('app-loaded', handleLoad);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
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

  useEffect(() => {
    if (!containerRef.current) return;
    
    const words = containerRef.current.querySelectorAll('.split-word');
    
    if (isVisible && hasLoaded) {
      gsap.fromTo(
        words,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.015,
          duration: 0.6,
          ease: 'power2.out',
          overwrite: "auto",
          delay: 0.2 // delay slightly to let title start first
        }
      );
    } else if (!isVisible && hasLoaded) {
      gsap.set(words, { opacity: 0, y: 15 });
    }
  }, [isVisible, hasLoaded]);

  const renderWords = (str) => {
    if (!str) return null;
    const wordsArray = str.split(' ');
    return wordsArray.map((word, index) => (
      <span key={index} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        <span className="split-word" style={{ display: 'inline-block', opacity: 0 }}>
          {word}
        </span>
        {index < wordsArray.length - 1 ? ' ' : ''}
      </span>
    ));
  };

  return (
    <p className={className} ref={containerRef} style={style}>
      {renderWords(text)}
    </p>
  );
}

