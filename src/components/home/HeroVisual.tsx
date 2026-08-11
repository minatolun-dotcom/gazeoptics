import { Suspense, lazy, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { GlassesMark } from '../brand/GlassesMark'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const Scene3D = lazy(() => import('./Scene3D'))

/** Detects WebGL availability without throwing. */
function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/** Static fallback — an elegant animated brand mark (no WebGL needed). */
function GlassesFallback({ label }: { label?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        aria-hidden
        className="absolute h-72 w-72 rounded-full bg-brass/15 blur-[80px]"
      />
      <motion.div
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative text-brass"
      >
        <GlassesMark className="h-44 w-44" />
      </motion.div>
      {label && (
        <span className="absolute bottom-6 text-[10px] tracking-[0.3em] text-taupe uppercase">
          {label}
        </span>
      )}
    </div>
  )
}

/**
 * Renders the 3D glasses when WebGL is available (lazy-loaded),
 * otherwise shows a graceful branded fallback.
 */
export function HeroVisual() {
  const reduced = usePrefersReducedMotion()
  const [webgl] = useState<boolean>(() => supportsWebGL())

  if (!webgl) return <GlassesFallback label="3D preview unavailable" />

  return (
    <Suspense fallback={<GlassesFallback />}>
      <Scene3D reduced={reduced} />
    </Suspense>
  )
}
