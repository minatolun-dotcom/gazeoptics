import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { lensGuide } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { scrollToId } from '../../lib/scroll'
import { LensVisual } from './LensVisual'
import { cn } from '../../lib/utils'

type LensType = (typeof lensGuide.types)[number]

function LensPanel({ lens }: { lens: LensType }) {
  return (
    <motion.div
      key={lens.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14"
    >
      {/* Visual */}
      <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-linear-to-br from-porcelain via-ivory to-sand p-8">
        <div className="grain absolute inset-0 opacity-[0.04]" />
        <LensVisual variant={lens.visual} className="relative h-44 w-full sm:h-56" />
        <span className="absolute top-5 left-5 rounded-full border border-brass/40 bg-porcelain/80 px-3.5 py-1.5 text-[9px] font-bold tracking-[0.2em] text-bronze uppercase backdrop-blur-sm">
          {lens.name}
        </span>
      </div>

      {/* Copy */}
      <div>
        <h3 className="font-serif text-3xl font-medium text-ink sm:text-4xl">{lens.name}</h3>
        <p className="mt-2 font-serif text-lg text-brass italic">{lens.tagline}</p>
        <p className="mt-4 text-base leading-relaxed text-taupe">{lens.description}</p>

        <div className="mt-6">
          <p className="text-[10px] font-bold tracking-[0.26em] text-taupe uppercase">Best suited for</p>
          <ul className="mt-3 space-y-2.5">
            {lens.bestFor.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass/15 text-bronze">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => scrollToId('contact')}
          className="group mt-8 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-bronze uppercase transition-colors hover:text-brass"
        >
          Ask us about {lens.name}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  )
}

/** Strong / helpful / none marks for the comparison matrix. */
function Mark({ value }: { value: string }) {
  if (value === 'strong')
    return <span className="mx-auto block h-2.5 w-2.5 rounded-full bg-brass" aria-label="Strong fit" />
  if (value === 'helpful')
    return <span className="mx-auto block h-2.5 w-2.5 rounded-full border border-brass/70" aria-label="Helpful" />
  return <span className="mx-auto block h-px w-3 bg-ink/25" aria-label="Not a focus" />
}

export function LensGuide() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (active + dir + lensGuide.types.length) % lensGuide.types.length
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  const lens = lensGuide.types[active]
  const matrix = lensGuide.matrix as Record<string, string[]>

  return (
    <section id="lenses" className="relative scroll-mt-24 bg-porcelain py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={lensGuide.eyebrow}
          title={lensGuide.heading}
          description={lensGuide.intro}
        />

        {/* Lens type selector */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Lens types"
            onKeyDown={onKeyDown}
            className="mt-12 flex flex-wrap gap-2.5"
          >
            {lensGuide.types.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`lens-tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`lens-panel-${t.id}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300',
                  i === active
                    ? 'border-ink bg-ink text-porcelain shadow-[0_10px_24px_-12px_rgba(26,23,18,0.5)]'
                    : 'border-ink/15 bg-ivory text-ink/70 hover:border-brass/50 hover:text-ink',
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active lens panel */}
        <Reveal delay={0.16}>
          <div
            role="tabpanel"
            id={`lens-panel-${lens.id}`}
            aria-labelledby={`lens-tab-${lens.id}`}
            className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-ivory p-8 shadow-[0_36px_80px_-50px_rgba(26,23,18,0.4)] sm:p-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <LensPanel lens={lens} />
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Comparison matrix */}
        <Reveal delay={0.1} className="mt-16">
          <div className="overflow-hidden rounded-3xl border border-ink/10">
            <div className="flex items-center justify-between gap-4 bg-ink px-7 py-5 sm:px-9">
              <h3 className="font-serif text-2xl font-medium text-porcelain">Lens comparison</h3>
              <div className="hidden items-center gap-4 text-[10px] tracking-[0.16em] text-ivory/60 uppercase sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-brass" /> Strong fit
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full border border-brass/70" /> Helpful
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-px w-3 bg-ivory/40" /> Not a focus
                </span>
              </div>
            </div>

            <div className="overflow-x-auto bg-ivory">
              <table className="w-full min-w-[720px] text-left">
                <caption className="sr-only">
                  Comparison of lens types against everyday needs
                </caption>
                <thead>
                  <tr className="border-b border-ink/10">
                    <th scope="col" className="px-7 py-4 text-[10px] font-bold tracking-[0.2em] text-taupe uppercase sm:px-9">
                      Lens type
                    </th>
                    {lensGuide.scenarios.map((s) => (
                      <th key={s} scope="col" className="px-3 py-4 text-center text-[10px] font-bold tracking-[0.14em] text-taupe uppercase">
                        {s}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {lensGuide.types.map((t, row) => (
                    <tr
                      key={t.id}
                      className={cn(
                        'border-b border-ink/5 transition-colors hover:bg-sand/40',
                        row === active && 'bg-brass/8',
                      )}
                    >
                      <th scope="row" className="px-7 py-4 sm:px-9">
                        <button
                          type="button"
                          onClick={() => setActive(row)}
                          className={cn(
                            'font-serif text-lg font-medium transition-colors',
                            row === active ? 'text-bronze' : 'text-ink hover:text-bronze',
                          )}
                        >
                          {t.name}
                        </button>
                      </th>
                      {matrix[t.name].map((value, col) => (
                        <td key={col} className="px-3 py-4 text-center">
                          <Mark value={value} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-5 text-center text-xs tracking-[0.1em] text-taupe">{lensGuide.note}</p>
        </Reveal>
      </div>
    </section>
  )
}
