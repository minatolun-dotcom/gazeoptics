import { useEffect, useRef, useState, type PointerEvent } from 'react'
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
 * glasses, with a bamboo sprig in one paw. Its eyes follow the cursor
 * (spring-smoothed), it blinks lazily, and on hover its free paw pops up to
 * wave while its ears perk. Pure SVG: crisp at every size, no WebGL.
 */

const INK = '#221e18'
const PATCH = '#26221b'
const FUR_TOP = '#ffffff'
const FUR_BOTTOM = '#f3ede0'
const BRASS_A = '#e6c992'
const BRASS_B = '#b08d57'
const BRASS_C = '#8a6a3c'
const BAMBOO_DARK = '#5c5b45'
const BAMBOO = '#6b6a52'
const BAMBOO_LIGHT = '#87856a'
const PAD = '#c9b398'
const TONGUE = '#e89a85'

/** Eye layout — center, sclera radii, pupil radius, max travel. */
const L = { x: 126, y: 199, rx: 23, ry: 27 }
const R = { x: 274, y: 199, rx: 23, ry: 27 }
const PUPIL_R = 9.5
const TRAVEL_X = 4
const TRAVEL_Y = 3

/** A rounded paw with soft toe-pads, drawn around a pivot so it can wave. */
function Paw() {
  return (
    <g>
      <ellipse cx="0" cy="0" rx="30" ry="22" fill={INK} />
      <circle cx="-12" cy="-8" r="5.5" fill={PAD} />
      <circle cx="0" cy="-11" r="5.5" fill={PAD} />
      <circle cx="12" cy="-8" r="5.5" fill={PAD} />
      <ellipse cx="0" cy="7" rx="12" ry="8" fill={PAD} opacity="0.85" />
    </g>
  )
}

export function PandaVisual() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  // Normalized pointer position in the visual area (-1..1)
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  // Springs smooth the pupils toward the cursor
  const sx = useSpring(px, { stiffness: 130, damping: 20, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 130, damping: 20, mass: 0.6 })

  // Pupil offsets (clamped travel inside the sclera) — both eyes move together.
  const pupilX = useTransform(sx, (v) => v * TRAVEL_X)
  const pupilY = useTransform(sy, (v) => v * TRAVEL_Y)

  // Subtle head tilt toward the cursor
  const tilt = useTransform(sx, (v) => v * 2.4)

  // Blink: eye group scaleY dips for a lazy closed-lid blink
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

  // Schedule lazy blinks every ~4.5–9s (skipped for reduced motion)
  useEffect(() => {
    if (reduce) return
    let timeout: number
    let cancelled = false
    const schedule = () => {
      timeout = window.setTimeout(() => {
        if (cancelled) return
        animate(blink, [1, 0.12, 1], {
          duration: 0.42,
          times: [0, 0.5, 1],
          ease: 'easeInOut',
        }).then(() => {
          if (!cancelled) schedule()
        })
      }, 4500 + Math.random() * 4500)
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
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
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
          {/* userSpaceOnUse so the cheek puffs share one continuous fur gradient */}
          <linearGradient id="panda-fur" gradientUnits="userSpaceOnUse" x1="0" y1="88" x2="0" y2="350">
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
        <circle cx="200" cy="215" r="205" fill="url(#panda-glow)" />

        {/* Contact shadow */}
        <ellipse cx="200" cy="449" rx="122" ry="15" fill="#2b2419" opacity="0.12" />

        {/* Body */}
        <ellipse cx="200" cy="408" rx="124" ry="62" fill="url(#panda-fur)" />

        {/* Bamboo sprig, tucked behind the head edge, held by the resting paw */}
        <g transform="rotate(-16 294 395)">
          <rect x="289" y="338" width="10" height="66" rx="5" fill={BAMBOO} />
          <rect x="289" y="338" width="4" height="66" rx="2" fill={BAMBOO_LIGHT} opacity="0.55" />
          <line x1="289" y1="352" x2="299" y2="352" stroke={BAMBOO_DARK} strokeWidth="2" />
          <line x1="289" y1="370" x2="299" y2="370" stroke={BAMBOO_DARK} strokeWidth="2" />
          <line x1="289" y1="388" x2="299" y2="388" stroke={BAMBOO_DARK} strokeWidth="2" />
          <rect x="300" y="362" width="8" height="40" rx="4" fill={BAMBOO_LIGHT} transform="rotate(24 304 380)" />
          {/* leaves */}
          <path d="M294 338 q-22 -4 -30 -18 q20 -8 30 4 z" fill={BAMBOO_DARK} />
          <path d="M294 338 q18 -12 34 -6 q4 18 -14 22 z" fill={BAMBOO_LIGHT} />
          <path d="M300 362 q16 -2 26 6 q-6 14 -22 10 z" fill={BAMBOO} />
        </g>

        {/* Resting paw holding the bamboo (kept inside the body silhouette) */}
        <g transform="translate(294 404) rotate(18)">
          <Paw />
        </g>

        {/* Head assembly (tilts with the cursor) */}
        <motion.g style={{ rotate: tilt }}>
          {/* Ears (perk on hover) */}
          <motion.g
            animate={hovered && !reduce ? { scale: 1.08 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <circle cx="92" cy="98" r="45" fill={INK} />
            <circle cx="92" cy="98" r="21" fill="#3b352a" opacity="0.55" />
            <circle cx="308" cy="98" r="45" fill={INK} />
            <circle cx="308" cy="98" r="21" fill="#3b352a" opacity="0.55" />
          </motion.g>

          {/* Head — wide base + cheek puffs for the classic chubby panda face */}
          <g filter="url(#panda-soft)">
            <ellipse cx="200" cy="218" rx="148" ry="126" fill="url(#panda-fur)" />
            <ellipse cx="76" cy="254" rx="50" ry="48" fill="url(#panda-fur)" />
            <ellipse cx="324" cy="254" rx="50" ry="48" fill="url(#panda-fur)" />
          </g>

          {/* Eye patches */}
          <ellipse cx={L.x} cy={L.y} rx="54" ry="47" fill={PATCH} transform={`rotate(-14 ${L.x} ${L.y})`} />
          <ellipse cx={R.x} cy={R.y} rx="54" ry="47" fill={PATCH} transform={`rotate(14 ${R.x} ${R.y})`} />

          {/* Eyes — sclera + tracking pupils (blink scales this group) */}
          <motion.g
            style={{ scaleY: blink, transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <ellipse cx={L.x} cy={L.y} rx={L.rx} ry={L.ry} fill="#ffffff" />
            <ellipse cx={R.x} cy={R.y} rx={R.rx} ry={R.ry} fill="#ffffff" />

            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx={L.x} cy={L.y} r={PUPIL_R} fill={INK} />
              <circle cx={L.x - 3} cy={L.y - 3.6} r="3.5" fill="#ffffff" />
              <circle cx={L.x + 3.4} cy={L.y + 4.2} r="1.6" fill="#ffffff" opacity="0.75" />
            </motion.g>
            <motion.g style={{ x: pupilX, y: pupilY }}>
              <circle cx={R.x} cy={R.y} r={PUPIL_R} fill={INK} />
              <circle cx={R.x - 3} cy={R.y - 3.6} r="3.5" fill="#ffffff" />
              <circle cx={R.x + 3.4} cy={R.y + 4.2} r="1.6" fill="#ffffff" opacity="0.75" />
            </motion.g>
          </motion.g>

          {/* Nose */}
          <ellipse cx="200" cy="264" rx="12.5" ry="8" fill={INK} />
          <ellipse cx="197" cy="261.5" rx="4.4" ry="2.4" fill="#ffffff" opacity="0.5" />

          {/* Warm smile with a tiny tongue */}
          <path
            d="M184 278 Q200 292 216 278"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="200" cy="285.5" rx="6.5" ry="5" fill={TONGUE} />

          {/* Blush — sits on the chubby cheeks */}
          <ellipse cx="82" cy="248" rx="16" ry="9.5" fill="#d98f7a" opacity="0.38" />
          <ellipse cx="318" cy="248" rx="16" ry="9.5" fill="#d98f7a" opacity="0.38" />

          {/* Brass glasses — the Gaze Optics signature */}
          <g>
            <circle
              cx={L.x}
              cy={L.y}
              r="55"
              fill="rgba(255,255,255,0.05)"
              stroke="url(#panda-brass)"
              strokeWidth="6.5"
            />
            <circle
              cx={R.x}
              cy={R.y}
              r="55"
              fill="rgba(255,255,255,0.05)"
              stroke="url(#panda-brass)"
              strokeWidth="6.5"
            />
            <path
              d="M172 188 Q200 175 228 188"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M72 189 L45 167"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M328 189 L355 167"
              fill="none"
              stroke="url(#panda-brass)"
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            {/* Tiny sparkle on the frame */}
            <path
              d="M158 148 l2.1 4.6 4.6 2.1 -4.6 2.1 -2.1 4.6 -2.1 -4.6 -4.6 -2.1 4.6 -2.1 z"
              fill={BRASS_A}
              opacity="0.9"
            />
          </g>
        </motion.g>

        {/* Waving paw — pops up beside the face on hover */}
        <motion.g
          animate={
            hovered && !reduce
              ? { opacity: 1, y: 0, rotate: [0, 30, -10, 22, -4, 0] }
              : { opacity: 0, y: 34, rotate: 0 }
          }
          transition={
            hovered
              ? { opacity: { duration: 0.2 }, y: { duration: 0.45, ease: 'easeOut' }, rotate: { delay: 0.15, duration: 1.1, ease: 'easeInOut' } }
              : { duration: 0.35, ease: 'easeIn' }
          }
          style={{ transformBox: 'fill-box', transformOrigin: '50% 85%' }}
        >
          <g transform="translate(96 296) rotate(-28)">
            <Paw />
          </g>
        </motion.g>
      </svg>
    </motion.div>
  )
}
