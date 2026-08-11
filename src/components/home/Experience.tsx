import { experience } from '../../content/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Marquee } from '../ui/Marquee'

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-porcelain lg:py-32">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-brass/15 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            dark
            eyebrow={experience.eyebrow}
            title={experience.heading}
            description={experience.text}
          />

          <Reveal delay={0.15} className="flex items-end">
            <blockquote className="border-b border-porcelain/15 pb-6">
              <p className="font-serif text-3xl leading-snug text-porcelain italic sm:text-4xl">
                "{experience.quote.text}"
              </p>
              <cite className="mt-4 block text-[11px] font-semibold tracking-[0.24em] text-brass uppercase not-italic">
                — {experience.quote.author}
              </cite>
            </blockquote>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-porcelain/10 bg-porcelain/10 sm:grid-cols-2">
          {experience.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <article className="group relative h-full bg-ink p-9 transition-colors duration-300 hover:bg-ink-soft lg:p-11">
                <span className="font-serif text-5xl text-brass/35 italic transition-colors duration-300 group-hover:text-brass/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 font-serif text-2xl font-medium text-porcelain">{pillar.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ivory/60">{pillar.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Brands marquee */}
      <div className="relative mt-20">
        <p className="mb-8 text-center text-[10px] font-semibold tracking-[0.34em] text-ivory/40 uppercase">
          A selection of the brands we carry
        </p>
        <Marquee items={experience.brands} duration={40} />
      </div>
    </section>
  )
}
