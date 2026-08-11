import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Seconds to delay the reveal (for staggered groups). */
  delay?: number
  /** Initial vertical offset in px. */
  y?: number
  className?: string
}

/**
 * Scroll-triggered reveal wrapper. Fades + slides content in
 * the first time it enters the viewport (respects reduced motion).
 */
export function Reveal({ children, delay = 0, y = 32, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Individual child stagger — pair with <RevealGroup> semantics. */
export const revealVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}
