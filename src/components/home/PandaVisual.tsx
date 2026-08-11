import { useEffect, useRef, type PointerEvent } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * Gaze Optics mascot — a round panda bust wearing the brand's brass round
 * glasses. Its eyes follow the cursor (spring-smoothed), it blinks every few
 * seconds, and it floats gently. Pure SVG: crisp at every size, no WebGL.
 */

const INK = '#221e18'
const PATCH = '#26221b'
const FUR_TOP = '#ffffff'
const FUR_BOTTOM = '#f3ede0'
const BRASS_A = '#e6c992'
const BRASS_B = '#b08d57'
const BRASS_C = '#8a6a3c'

/** Eye layout — center, sclera radii, pupil radius, max travel. */
const L = { x: 131, y: 199, rx: 20, ry: 25 }
const R = { x: 269, y: 199, rx: 20, ry: 25 }
const PUPIL_R = 8.6
const TRAVEL_X = 3.4
const TRAVEL_Y = 2.6

export function PandaVisual() {
  const reduce = useReducedMotion()

  // Normalized pointer position in the visual area (-1..1)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  // Springs smooth the pupils toward the cursor
  const sx = useSpring(px, { stiffness: 130, damping: 20, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 130, damping: 20, mass: 0.6 })

  // Pupil offsets (clamped travel inside the sclera) — both eyes share the same
  // horizontal + vertical spring, so they move together.
  const pupilX = useTransform(sx, (v) => v * TRAVEL_X)
  const pupilY = useTransform(sy, (v) => v * TRAVEL_Y)

  // Subtle head tilt toward the cursor
  const tilt = useTransform(sx, (v) => v * 2.4)

  // Blink: eye group scaleY dips to ~0.1 for a quick closed-lid blink
  const blink = useMotionValue(1)

  const containerRef = useRef<HTMLDivElement>(null)

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  // Schedule random blinks (skipped for reduced motion)
  useEffect(() => {
    if (reduce) return
    let timeout: number
    let cancelled = false
    const schedule = () => {
      timeout = window.setTimeout(() => {
        if (cancelled) return
        animate(blink, [1, 0.12, 1], {
          duration: 0.32,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        }).then(() => {
          if (!cancelled) schedule()
        })
      }, 2600 + Math.random() * 3400)
    }
    schedule()
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [blink, reduce])

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      animate={reduce ? undefined : { y: [0, -9, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex h-full w-full items-center justify-center"
      aria-hidden
    >
      {/* Soft brass glow behind the panda */}
      <div aria-hidden className="absolute h-72 w-72 rounded-full bg-brass/15 blur-[80px]" />

      {/* Decorative mascot — the wrapper div is aria-hidden, so the art is
          skipped by assistive tech while the hero text carries the meaning. */}
      <svg
        viewBox="0 0 400 470"
        className="relative mx-auto block h-full w-auto max-w-full"
      >
        <defs>
          <linearGradient id="panda-fur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={FUR_TOP} />
            <stop offset="1" stopColor={FUR_BOTTOM} />
          </linearGradient>
          <linearGradient id="panda-brass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={BRASS_A} />
            <stop offset="0.5" stopColor={BRASS_B} />
            <stop offset="1" stopColor={BRASS_C} />
          </linearGradient>
          <radialGradient id="panda-glow" cx="0.5" cy="0.42" r="0.62">
            <stop offset="0" stopColor="#b08d57" stopOpacity="0.22" />
            <stop offset="1" stopColor="#b08d57" stopOpacity="0" />
          </radialGradient>
          <filter id="panda-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="12" stdDeviation="18" floodColor="#2b2419" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* Ambient glow */}
        <circle cx="200" cy="215" r="195" fill="url(#panda-glow)" />

        {/* Contact shadow */}
        <ellipse cx="200" cy="449" rx="116" ry="15" fill="#2b2419" opacity="0.12" />

        {/* Body */}
        <ellipse cx="200" cy="408" rx="118" ry="62" fill="url(#panda-fur)" />

        {/* Head assembly (tilts with the cursor) */}
        <motion.g style={{ rotate: tilt }}>
          {/* Ears */}
          <g>
            <circle cx="97" cy="102" r="44" fill={INK} />
            <circle cx="97" cy="102" r="20" fill="#3b352a" opacity="0.55" />
            <circle cx="303" cy="102" r="44" fill={INK} />
            <circle cx="303" cy="102" r="20" fill="#3b352a" opacity="0.55" />
          </g>

          {/* Head */}
          <circle cx="200" cy="212" r="143" fill="url(#panda-fur)" filter="url(#panda-soft)" />

          {/* Eye patches */}
          <ellipse cx={L.x} cy={L.y} rx="47" ry="42" fill={PATCH} transform={`rotate(-14 ${L.x} ${L.y})`} />
          <ellipse cx={R.x} cy={R.y} rx="47" ry="42" fill={PATCH} transform={`rotate(14 ${R.x} ${R.y})`} />

          {/* Eyes — sclera + tracking pupils (blink scales this group) */}
          <motion.g
            style={{ scaleY: blink, transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <ellipse cx={L.x} cy={L.y} rx={L.rx} ry={L.ry} fill="#ffffff" />
            <ellipse cx={R.x} cy={R.y} rx={R.rx} ry={R.ry} fill="#ffffff" />

            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx={L.x} cy={L.y} r={PUPIL_R} fill={INK} />
              <circle cx={L.x - 2.8} cy={L.y - 3.2} r="3.1" fill="#ffffff" />
              <circle cx={L.x + 3} cy={L.y + 3.8} r="1.4" fill="#ffffff" opacity="0.75" />
            </motion.g>
            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx={R.x} cy={R.y} r={PUPIL_R} fill={INK} />
              <circle cx={R.x - 2.8} cy={R.y - 3.2} r="3.1" fill="#ffffff" />
              <circle cx={R.x + 3} cy={R.y + 3.8} r="1.4" fill="#ffffff" opacity="0.75" />
            </motion.g>
          </motion.g>

          {/* Nose */}
          <ellipse cx="200" cy="262" rx="11.5" ry="7.5" fill={INK} />
          <ellipse cx="197.5" cy="260" rx="4" ry="2.2" fill="#ffffff" opacity="0.5" />

          {/* Smile */}
          <path
            d="M186 277 Q200 289 214 277"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Blush */}
          <ellipse cx="82" cy="240" rx="15" ry="8.5" fill="#d98f7a" opacity="0.32" />
          <ellipse cx="318" cy="240" rx="15" ry="8.5" fill="#d98f7a" opacity="0.32" />

          {/* Brass glasses — the Gaze Optics signature */}
          <g>
            <circle
              cx={L.x}
              cy={L.y}
              r="50"
              fill="rgba(255,255,255,0.05)"
              stroke="url(#panda-brass)"
              strokeWidth="6.5"
            />
            <circle
              cx={R.x}
              cy={R.y}
              r="50"
              fill="rgba(255,255,255,0.05)"
              stroke="url(#panda-brass)"
              strokeWidth="6.5"
            />
            <path
              d="M180 190 Q200 178 220 190"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M81 191 L55 170"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M319 191 L345 170"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Tiny sparkle on the frame */}
            <path
              d="M166 152 l2.1 4.6 4.6 2.1 -4.6 2.1 -2.1 4.6 -2.1 -4.6 -4.6 -2.1 4.6 -2.1 z"
              fill={BRASS_A}
              opacity="0.9"
            />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  )
}
