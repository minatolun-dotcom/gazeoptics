import type Lenis from 'lenis'

/**
 * Holds the active Lenis instance so any component can request
 * smooth-scroll animations to a section by id.
 */
let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/** Pause smooth scrolling (e.g. while a modal menu is open). */
export function stopScroll() {
  lenis?.stop()
}

/** Resume smooth scrolling. */
export function startScroll() {
  lenis?.start()
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
