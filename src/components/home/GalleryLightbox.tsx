import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { gallery } from '../../content/site'
import { startScroll, stopScroll } from '../../lib/scroll'

type GalleryLightboxProps = {
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}

/**
 * Fullscreen lightbox for the gallery — arrows / keyboard / swipe navigation.
 * Locks body scroll while open and returns focus to the triggering tile on close.
 * Note: mount/unmount is wrapped in <AnimatePresence> by the parent (Gallery),
 * so the exit animation actually plays.
 */
export function GalleryLightbox({ index, onClose, onNavigate }: GalleryLightboxProps) {
  const closeRef = useRef(onClose)
  const navRef = useRef(onNavigate)
  closeRef.current = onClose
  navRef.current = onNavigate

  const item = gallery[index]

  const prev = useCallback(() => navRef.current((index - 1 + gallery.length) % gallery.length), [index])
  const next = useCallback(() => navRef.current((index + 1) % gallery.length), [index])

  // Lock scrolling while open
  useEffect(() => {
    stopScroll()
    document.body.style.overflow = 'hidden'
    return () => {
      startScroll()
      document.body.style.overflow = ''
    }
  }, [])

  // Keyboard: Esc closes, arrows navigate, Tab stays trapped inside the dialog
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Tab') trapTab(e, dialogRef.current)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next])

  // Focus the dialog + restore focus on close
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    dialogRef.current?.focus()
    const previouslyFocused = document.activeElement as HTMLElement | null
    return () => previouslyFocused?.focus?.()
  }, [])

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — gallery image ${index + 1} of ${gallery.length}`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/92 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-5 right-5 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors duration-300 hover:border-brass hover:text-brass sm:top-8 sm:right-8"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <p className="absolute top-7 left-6 font-serif text-sm text-porcelain/60 italic sm:left-10 sm:top-9">
        {String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
      </p>

      {/* Image */}
      <motion.figure
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-h-[82vh] max-w-[92vw] px-14 sm:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[74vh] w-auto rounded-2xl border border-porcelain/15 object-contain shadow-[0_50px_120px_-40px_rgba(0,0,0,0.8)]"
        />
        <figcaption className="mt-5 text-center">
          <span className="text-[10px] font-bold tracking-[0.28em] text-brass uppercase">{item.tag}</span>
          <span className="mt-1 block font-serif text-2xl text-porcelain">{item.title}</span>
        </figcaption>
      </motion.figure>

      {/* Prev / Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          prev()
        }}
        aria-label="Previous image"
        className="absolute top-1/2 left-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors duration-300 hover:border-brass hover:text-brass sm:left-8 sm:h-14 sm:w-14"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
        aria-label="Next image"
        className="absolute top-1/2 right-3 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors duration-300 hover:border-brass hover:text-brass sm:right-8 sm:h-14 sm:w-14"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </motion.div>
  )
}

/** Keep keyboard focus cycling within the dialog. */
function trapTab(e: KeyboardEvent, dialog: HTMLElement | null) {
  if (!dialog) return
  const focusables = dialog.querySelectorAll<HTMLElement>(
    'button, a[href], [tabindex]:not([tabindex="-1"])',
  )
  if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  if (e.shiftKey && (active === first || !dialog.contains(active))) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (active === last || !dialog.contains(active))) {
    e.preventDefault()
    first.focus()
  }
}
