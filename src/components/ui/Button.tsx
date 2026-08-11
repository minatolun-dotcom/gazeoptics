import type { ReactNode } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import { scrollToId } from '../../lib/scroll'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost' | 'dark-outline'
  /** Scroll to a section id when clicked. */
  target?: string
  /** External href (maps, WhatsApp, tel, mailto). */
  href?: string
  onClick?: () => void
  className?: string
  /** Show an arrow that nudges on hover. */
  arrow?: boolean
  icon?: ReactNode
}

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-all duration-300 will-change-transform'

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-ink text-porcelain hover:bg-brass hover:shadow-[0_16px_36px_-16px_rgba(176,141,87,0.7)]',
  outline: 'border border-ink/25 text-ink hover:border-brass hover:text-bronze',
  'dark-outline': 'border border-porcelain/30 text-porcelain hover:border-brass hover:text-brass',
  ghost: 'text-ink underline decoration-brass/50 underline-offset-8 hover:decoration-brass',
}

/** Brand button — scrolls to a section, follows a link, or fires onClick. */
export function Button({ children, variant = 'primary', target, href, onClick, className, arrow = true, icon }: ButtonProps) {
  const handleClick = () => {
    if (target) scrollToId(target)
    onClick?.()
  }

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (href ? <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />)}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={cn(base, variants[variant], className)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={handleClick} className={cn(base, variants[variant], className)}>
      {content}
    </button>
  )
}
