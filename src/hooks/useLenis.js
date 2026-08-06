import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Drives full-page smooth scrolling with Lenis and keeps GSAP's
 * ScrollTrigger perfectly in sync with it (single scroller of truth).
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Let anchor links (#hero, #about, ...) scroll through Lenis too
    const onClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -80, duration: 1.4 })
    }
    document.addEventListener('click', onClick)

    const resize = () => ScrollTrigger.refresh()
    window.addEventListener('load', resize)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', resize)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])
}
