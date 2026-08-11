import { cn } from '../../lib/utils'

/**
 * Designed line-art "lens card" for each lens type in the Lens Guide.
 * Each variant paints the lens pair differently to suggest the coating or
 * technology. Decorative only (aria-hidden) — the text carries the meaning.
 * Replace with real macro photos later if desired (see ASSETS.md).
 */

type VisualKey =
  | 'hardcoat'
  | 'bluecut'
  | 'photochromic'
  | 'polarized'
  | 'ar'
  | 'progressive'
  | 'highindex'

const INK = '#1a1712'
const BRASS = '#b08d57'
const BRONZE = '#8a6a3c'

function Frame({ thin = false }: { thin?: boolean }) {
  return (
    <g
      fill="none"
      stroke={INK}
      strokeWidth={thin ? 1.8 : 2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="16" y="48" width="88" height="56" rx="27" />
      <rect x="116" y="48" width="88" height="56" rx="27" />
      <path d="M104 76h12" />
      <path d="M16 62l-9-28" />
      <path d="M204 62l9-28" />
    </g>
  )
}

/** Small 4-point sparkle glyph. */
function Sparkle({ x, y, s = 5, color = BRASS }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <path
      d={`M${x} ${y - s} L${x + s * 0.3} ${y - s * 0.3} L${x + s} ${y} L${x + s * 0.3} ${y + s * 0.3} L${x} ${y + s} L${x - s * 0.3} ${y + s * 0.3} L${x - s} ${y} L${x - s * 0.3} ${y - s * 0.3} Z`}
      fill={color}
      stroke="none"
    />
  )
}

function SunGlyph({ x, y, r = 9, color = BRONZE }: { x: number; y: number; r?: number; color?: string }) {
  return (
    <g stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx={x} cy={y} r={r} fill="none" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1={x + Math.cos((deg * Math.PI) / 180) * (r + 4)}
          y1={y + Math.sin((deg * Math.PI) / 180) * (r + 4)}
          x2={x + Math.cos((deg * Math.PI) / 180) * (r + 8)}
          y2={y + Math.sin((deg * Math.PI) / 180) * (r + 8)}
        />
      ))}
    </g>
  )
}

function Variant({ variant }: { variant: VisualKey }) {
  switch (variant) {
    case 'hardcoat':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#fbf7ee" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#fbf7ee" />
          {/* sheen across the lens */}
          <path d="M34 74 L86 54" stroke={BRASS} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <path d="M134 84 L186 64" stroke={BRASS} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
          <Sparkle x={60} y={86} />
          <Sparkle x={160} y={66} s={4} />
          {/* shield glyph */}
          <g stroke={BRONZE} strokeWidth="2" fill="none" strokeLinejoin="round">
            <path d="M60 96 l14 -6 l0 10 q-7 4 -14 0 z" />
            <path d="M60 96 l-14 -6 l0 10 q7 4 14 0 z" />
          </g>
          <Frame />
        </g>
      )
    case 'bluecut':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#dde8ff" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#c9dcff" />
          {/* smartphone glyph */}
          <g stroke={BRONZE} strokeWidth="2" fill="none" strokeLinecap="round">
            <rect x="52" y="66" width="16" height="26" rx="3" />
            <path d="M57 87h6" />
            <path d="M60 69.5v0" />
          </g>
          <Sparkle x={150} y={70} color="#4f6fbf" />
          <Sparkle x={176} y={86} s={4} color="#4f6fbf" />
          <Frame />
        </g>
      )
    case 'photochromic':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#3a352b" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#fbf7ee" />
          <SunGlyph x={110} y={30} r={8} />
          <path d="M110 44 v10" stroke={BRONZE} strokeWidth="2" strokeLinecap="round" />
          <path d="M104 60 l6 8 6-8" fill="none" stroke={BRONZE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <Frame />
        </g>
      )
    case 'polarized':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#dfe9ef" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#dfe9ef" />
          {/* sun with glare rays, slashed */}
          <SunGlyph x={56} y={72} r={8} />
          <g stroke={BRONZE} strokeWidth="2.5" strokeLinecap="round">
            <path d="M34 62 h14" />
            <path d="M64 62 h14" />
            <path d="M34 82 h14" />
            <path d="M64 82 h14" />
            <path d="M40 52 l30 42" opacity="0.7" />
          </g>
          <Frame />
        </g>
      )
    case 'ar':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#f4f0e6" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#f4f0e6" />
          {/* reflection arcs */}
          <path d="M30 66 q14 -14 30 -6" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M130 76 q14 -12 26 -5" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <path d="M30 66 q14 -14 30 -6" fill="none" stroke={BRASS} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M130 76 q14 -12 26 -5" fill="none" stroke={BRASS} strokeWidth="1.2" strokeLinecap="round" />
          <Sparkle x={182} y={62} s={6} />
          <Frame />
        </g>
      )
    case 'progressive':
      return (
        <g>
          <defs>
            <linearGradient id="prog-l" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbf7ee" />
              <stop offset="1" stopColor="#e3d9c3" />
            </linearGradient>
            <linearGradient id="prog-r" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbf7ee" />
              <stop offset="1" stopColor="#d9cbb0" />
            </linearGradient>
          </defs>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="url(#prog-l)" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="url(#prog-r)" />
          {/* distance / intermediate / near zone dividers */}
          <g stroke={BRONZE} strokeWidth="1.4" strokeDasharray="4 4" strokeLinecap="round">
            <path d="M26 74 h68" opacity="0.6" />
            <path d="M126 74 h68" opacity="0.6" />
            <path d="M26 90 h40" opacity="0.5" />
            <path d="M126 90 h40" opacity="0.5" />
          </g>
          <Frame />
        </g>
      )
    case 'highindex':
      return (
        <g>
          <rect x="16" y="48" width="88" height="56" rx="27" fill="#fbf7ee" />
          <rect x="116" y="48" width="88" height="56" rx="27" fill="#fbf7ee" />
          {/* feather-light marks */}
          <g stroke={BRONZE} strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
            <path d="M36 60 h10 M40 66 h6" />
            <path d="M136 70 h10 M140 76 h6" />
          </g>
          <Sparkle x={86} y={44} s={5} />
          <Sparkle x={140} y={52} s={4} />
          <Frame thin />
        </g>
      )
  }
}

export function LensVisual({ variant, className }: { variant: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      aria-hidden="true"
      className={cn('h-full w-full', className)}
    >
      <Variant variant={variant as VisualKey} />
    </svg>
  )
}
