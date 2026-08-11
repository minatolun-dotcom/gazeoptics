import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { setLenis } from '../../lib/scroll'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Wraps the app in Lenis smooth scrolling.
 * Skipped entirely when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
    })
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <>{children}</>
}
