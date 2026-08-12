import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, locationInfo } from '../../content/site'
import { useStoreStatus } from '../../hooks/useStoreStatus'
import { Wordmark } from '../brand/GlassesMark'
import { scrollToId, startScroll, stopScroll } from '../../lib/scroll'
import { cn } from '../../lib/utils'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const store = useStoreStatus()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) stopScroll()
    else startScroll()
    return () => {
      document.body.style.overflow = ''
      startScroll()
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // let the menu close before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled ? 'glass py-3' : 'bg-transparent py-5',
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10"
        >
          <button
            type="button"
            onClick={() => go('home')}
            className="text-ink transition-opacity hover:opacity-70"
            aria-label="Gaze Optics — back to top"
          >
            <Wordmark />
          </button>

          <ul className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className="group relative text-[11px] font-semibold tracking-[0.2em] text-ink/80 uppercase transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Live open/closed indicator — computed from the real store hours */}
            <a
              href={locationInfo.map.shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full border border-ink/15 bg-porcelain/70 px-3.5 py-2 text-[10px] font-bold tracking-[0.14em] uppercase backdrop-blur transition-colors duration-300 hover:border-brass/60 sm:inline-flex"
              aria-label={store.isOpen ? `Open now, closes at ${store.closesAt}` : `Closed now, opens ${store.opensAt}`}
            >
              <span
                aria-hidden
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  store.isOpen
                    ? 'bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.8)]'
                    : 'bg-taupe',
                )}
              />
              {store.isOpen ? 'Open now' : 'Closed now'}
            </a>
            <a
              href={locationInfo.map.shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-ink px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] text-porcelain uppercase transition-colors duration-300 hover:bg-brass lg:inline-flex"
            >
              Visit Us
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[90] flex flex-col bg-ink xl:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-porcelain">
                <Wordmark markClassName="text-brass" className="text-porcelain" />
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-porcelain/20 text-porcelain"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 px-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.id)}
                  className="flex items-baseline gap-4 py-3 text-left"
                >
                  <span className="font-serif text-sm text-brass italic">0{i + 1}</span>
                  <span className="font-serif text-4xl text-porcelain transition-colors hover:text-brass">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="px-8 pb-10">
              <a
                href={locationInfo.map.shortLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-brass px-6 py-4 text-[11px] font-bold tracking-[0.2em] text-ink uppercase"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
