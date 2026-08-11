import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { brand } from '../../content/site'
import { GlassesMark } from '../brand/GlassesMark'

/**
 * Full-screen brand preloader: mark draws in, word letters stagger,
 * a progress line fills, then the curtain lifts to reveal the site.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const total = 1800
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / total, 1)
      setProgress(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  const letters = brand.name.replace(' ', '').toUpperCase().split('')

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Loading Gaze Optics"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-ink"
      >
        <GlassesMark className="h-12 w-12" />
      </motion.div>

      <div className="mt-6 flex overflow-hidden">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl text-ink"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <div className="mt-8 h-px w-44 overflow-hidden bg-ink/10">
        <div
          className="h-full bg-brass transition-[width] duration-150 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-[10px] tracking-[0.4em] text-taupe uppercase">
        {progress}%
      </p>
    </motion.div>
  )
}
