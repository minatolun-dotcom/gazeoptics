import type { LucideIcon } from 'lucide-react'
import { Aperture, Focus, Frame, Glasses, ScanEye, Sun, Wrench, ArrowRight } from 'lucide-react'
import { services } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { scrollToId } from '../../lib/scroll'

/** Map content icon keys to lucide icons. */
const iconMap: Record<string, LucideIcon> = {
  'scan-eye': ScanEye,
  glasses: Glasses,
  sun: Sun,
  focus: Focus,
  frame: Frame,
  aperture: Aperture,
  wrench: Wrench,
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-porcelain py-24 lg:py-32">
      {/* faint ghost word */}
      <span aria-hidden className="ghost-word absolute top-2 left-4 hidden lg:block">
        Care
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Services"
            title={<>Complete care, under one roof</>}
            description="From precise eye examinations to hand-fitted frames — everything your eyes need, delivered with unhurried personal attention."
          />
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-taupe md:text-right">
              Not sure what you need? Walk in — we will guide you. <em className="font-serif text-ink italic">No appointment required.</em>
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Glasses
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.09}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-ink/10 bg-ivory p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/50 hover:shadow-[0_28px_60px_-30px_rgba(26,23,18,0.35)]">
                  {/* faint index number */}
                  <span aria-hidden className="absolute top-5 right-6 font-serif text-4xl text-ink/[0.06] italic transition-colors duration-300 group-hover:text-brass/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-bronze transition-all duration-300 group-hover:bg-brass group-hover:text-porcelain">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-medium text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">{service.description}</p>

                  <button
                    type="button"
                    onClick={() => scrollToId('contact')}
                    className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-bronze uppercase transition-colors group-hover:text-brass"
                  >
                    Enquire
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  {service.title === 'Lens Consultation' && (
                    <button
                      type="button"
                      onClick={() => scrollToId('lenses')}
                      className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-taupe uppercase transition-colors hover:text-bronze"
                    >
                      Explore the lens guide
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}
                </article>
              </Reveal>
            )
          })}

          {/* CTA tile completing the grid */}
          <Reveal delay={0.18}>
            <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-ink p-8 text-porcelain">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-brass/25 blur-[60px]"
              />
              <div className="relative">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-brass uppercase">Not listed?</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight font-medium">
                  Ask us about anything else — we probably do it.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="relative mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-porcelain/25 px-6 py-3 text-[10px] font-bold tracking-[0.22em] uppercase transition-colors duration-300 hover:border-brass hover:text-brass"
              >
                Talk to us <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
