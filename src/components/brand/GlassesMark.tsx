import { cn } from '../../lib/utils'

/**
 * Gaze Optics brand mark — a minimal round-frame glasses glyph.
 * Used in the navbar, footer, preloader, and the panda's frames.
 */
export function GlassesMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn('h-8 w-8', className)}
    >
      <g stroke="currentColor" strokeWidth="3.2" strokeLinecap="round">
        <circle cx="22.5" cy="34" r="10.5" />
        <circle cx="41.5" cy="34" r="10.5" />
        <path d="M33 34.5v4" />
        <path d="M12 31.5l-3.2-7.8" />
        <path d="M52 31.5l3.2-7.8" />
      </g>
    </svg>
  )
}

/** Full wordmark lockup: mark + letterspaced wordmark. */
export function Wordmark({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <GlassesMark className={markClassName} />
      <span className="font-sans text-[13px] font-bold tracking-[0.32em] uppercase">
        Gaze&nbsp;Optics
      </span>
    </span>
  )
}
