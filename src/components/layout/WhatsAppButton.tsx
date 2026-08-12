import { motion, useReducedMotion } from 'framer-motion'
import { locationInfo } from '../../content/site'
import { WhatsAppIcon } from '../ui/icons'

/**
 * Persistent WhatsApp button — always visible so visitors can reach the store
 * from anywhere on the page. Sits bottom-right; the back-to-top stacks above it.
 */
export function WhatsAppButton() {
  const reduce = useReducedMotion()

  return (
    <motion.a
      href={locationInfo.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gaze Optics on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group fixed right-5 bottom-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-brass text-ink shadow-[0_18px_40px_-12px_rgba(176,141,87,0.75)] transition-transform duration-300 hover:scale-105 sm:right-8 sm:bottom-8"
    >
      {/* soft pulse ring */}
      {!reduce && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-brass/40 [animation-duration:2.6s]"
        />
      )}
      <WhatsAppIcon className="h-6 w-6" />

      {/* hover label (desktop only) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-full mr-4 hidden translate-x-1 rounded-full bg-ink px-4 py-2 text-[10px] font-bold tracking-[0.18em] whitespace-nowrap text-porcelain uppercase opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        Chat with us
      </span>
    </motion.a>
  )
}
