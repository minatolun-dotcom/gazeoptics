import { useRef } from 'react'

type MarqueeProps = {
  items: string[]
  /** Font size class for each item. */
  itemClassName?: string
  className?: string
  duration?: number
}

/**
 * Infinite horizontal marquee of brand names — pure CSS animation,
 * duplicated content for a seamless loop.
 */
export function Marquee({ items, itemClassName, className, duration = 36 }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)

  const Row = () => (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span
            className={
              itemClassName ??
              'px-10 font-serif text-3xl text-porcelain/60 italic sm:text-4xl'
            }
          >
            {item}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-brass/70" />
        </span>
      ))}
    </div>
  )

  return (
    <div
      ref={ref}
      className={'overflow-hidden ' + (className ?? '')}
      style={{ maskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${duration}s linear infinite` }}
      >
        <Row />
        <Row />
      </div>
    </div>
  )
}
