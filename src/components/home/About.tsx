import { Eye, Target } from 'lucide-react'
import { about, brand } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Counter } from '../ui/Counter'
import { GlassesMark } from '../brand/GlassesMark'
import { cn } from '../../lib/utils'

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* Story column */}
          <div>
            <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

            <div className="mt-8 space-y-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.08 * i}>
                  <p className="text-base leading-relaxed text-taupe sm:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-10 border-l-2 border-brass pl-6">
              <blockquote className="font-serif text-2xl leading-snug text-ink italic sm:text-[1.7rem]">
                "{about.quote.text}"
              </blockquote>
              <cite className="mt-3 block text-[11px] font-semibold tracking-[0.22em] text-bronze uppercase not-italic">
                — {about.quote.author}
              </cite>
            </Reveal>

            {/* Vision & Mission */}
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <article className="h-full rounded-2xl border border-ink/10 bg-porcelain p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_24px_50px_-28px_rgba(26,23,18,0.3)]">
                  <Target className="h-5 w-5 text-brass" />
                  <h3 className="mt-4 text-[11px] font-bold tracking-[0.24em] text-ink uppercase">
                    {about.vision.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">{about.vision.text}</p>
                </article>
              </Reveal>
              <Reveal delay={0.18}>
                <article className="h-full rounded-2xl border border-ink/10 bg-porcelain p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_24px_50px_-28px_rgba(26,23,18,0.3)]">
                  <Eye className="h-5 w-5 text-brass" />
                  <h3 className="mt-4 text-[11px] font-bold tracking-[0.24em] text-ink uppercase">
                    {about.mission.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-taupe">{about.mission.text}</p>
                </article>
              </Reveal>
            </div>
          </div>

          {/* Stats + visual column */}
          <div>
            <Reveal className="relative overflow-hidden rounded-3xl bg-ink p-10 text-porcelain lg:sticky lg:top-28">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brass/20 blur-[80px]"
              />
              <div className="relative">
                <p className="text-[11px] font-semibold tracking-[0.3em] text-brass uppercase">
                  Gaze Optics in numbers
                </p>

                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                  {brand.stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={cn(i === 0 && 'col-span-2')}
                    >
                      <p className="font-serif text-5xl text-porcelain">
                        <Counter to={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                      </p>
                      <p className="mt-1.5 text-[11px] tracking-[0.18em] text-ivory/60 uppercase">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="mt-9 space-y-3 border-t border-porcelain/10 pt-7">
                  {about.reasons.map((reason, i) => (
                    <li key={reason} className="flex items-center gap-3 text-sm text-ivory/85">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brass/50 text-[10px] font-bold text-brass">
                        {i + 1}
                      </span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Photo placeholder panel */}
            <Reveal delay={0.15} className="mt-6">
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border border-ink/10 bg-gradient-to-br from-sand via-ivory to-porcelain">
                <div className="grain absolute inset-0 opacity-[0.05]" />
                <GlassesMark className="h-24 w-24 text-brass/60" />
                <span className="absolute right-4 bottom-4 rounded-full bg-ink/80 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.18em] text-porcelain uppercase">
                  About photo — coming soon
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
