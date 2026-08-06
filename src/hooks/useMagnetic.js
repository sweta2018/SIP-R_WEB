import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * Magnetic hover effect: the element eases toward the cursor while
 * inside its bounds, and springs back on leave. Uses gsap.quickTo for
 * a cheap, 60fps-friendly tween per pointer move.
 */
export default function useMagnetic(strength = 0.4) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const move = (e) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }

    const leave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
    }
  }, [strength])

  return ref
}
