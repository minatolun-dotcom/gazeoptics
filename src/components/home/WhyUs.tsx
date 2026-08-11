import { ShieldCheck } from 'lucide-react'
import { whyUs } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

export function WhyUs() {
  return (
    <section id="why-us" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <span aria-hidden className="ghost-word absolute right-2 bottom-0 hidden lg:block">
        Trust
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={whyUs.eyebrow}
          title={whyUs.heading}
          description={whyUs.text}
        />

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {whyUs.items.map((item, i) => (
            <Reveal key={item.n} delay={(i % 2) * 0.1}>
              <article className="group flex gap-6 border-t border-ink/10 pt-8 transition-colors duration-300 hover:border-brass/50">
                <span className="font-serif text-3xl text-brass/40 italic transition-colors duration-300 group-hover:text-brass">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-ink">{item.title}</h3>
                  <p className="mt-2.5 max-w-md text-sm leading-relaxed text-taupe sm:text-base">
                    {item.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Trust badges */}
        <Reveal delay={0.15}>
          <div className="mt-16 flex flex-wrap items-center gap-3 rounded-3xl border border-ink/10 bg-porcelain px-8 py-7">
            <ShieldCheck className="h-6 w-6 shrink-0 text-brass" />
            <span className="mr-2 text-[11px] font-bold tracking-[0.24em] text-ink uppercase">
              You can count on
            </span>
            {whyUs.badges.map((badge, i) => (
              <span
                key={badge}
                className={
                  'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] ' +
                  (i % 2 === 0
                    ? 'border-brass/40 text-bronze'
                    : 'border-ink/15 text-ink/70')
                }
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
