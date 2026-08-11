import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
  /** Use light text (for dark sections). */
  dark?: boolean
  className?: string
}

/**
 * Editorial section heading: small letterspaced eyebrow + large serif title.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase',
            dark ? 'text-brass' : 'text-bronze',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-serif text-4xl leading-[1.05] font-medium text-balance sm:text-5xl lg:text-6xl',
          dark ? 'text-porcelain' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed sm:text-lg',
            dark ? 'text-ivory/70' : 'text-taupe',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

/** Renders serif text with an italic brass accent span. */
export function Accent({ children }: { children: ReactNode }) {
  return <em className="font-serif italic text-brass">{children}</em>
}
