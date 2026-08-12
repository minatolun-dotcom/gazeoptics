import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { booking, faq } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { WhatsAppIcon } from '../ui/icons'
import { cn } from '../../lib/utils'

/**
 * FAQ accordion — common visitor questions. Content lives in src/content/site.ts
 * (and is mirrored in index.html as FAQPage structured data — keep both in sync).
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Left: heading + prompt */}
          <div>
            <SectionHeading
              eyebrow={faq.eyebrow}
              title={faq.heading}
              description={faq.text}
            />
            <Reveal delay={0.15}>
              <a
                href={booking.waLink('Hello Gaze Optics! I have a question.')}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-brass/40 bg-brass/10 px-6 py-3 text-[10px] font-bold tracking-[0.22em] text-bronze uppercase transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-porcelain"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                Ask us anything
              </a>
            </Reveal>
          </div>

          {/* Right: accordion */}
          <Reveal delay={0.1}>
            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {faq.items.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={item.q}>
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${i}`}
                        id={`faq-question-${i}`}
                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-serif text-xl font-medium text-ink transition-colors duration-300 hover:text-bronze sm:text-2xl">
                          {item.q}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                            isOpen
                              ? 'rotate-45 border-brass bg-brass text-porcelain'
                              : 'border-ink/15 text-ink/60',
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${i}`}
                          role="region"
                          aria-labelledby={`faq-question-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-xl pb-6 text-sm leading-relaxed text-taupe sm:text-base">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
