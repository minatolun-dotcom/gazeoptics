import { Star } from 'lucide-react'
import { testimonials } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'

/** A row of brass stars for the rating. */
function Stars({ count }: { count: number }) {
  return (
    <span className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={i < count ? 'h-3.5 w-3.5 fill-brass text-brass' : 'h-3.5 w-3.5 text-ink/20'}
        />
      ))}
    </span>
  )
}

/**
 * Customer testimonials — social proof for a local, trust-driven business.
 * The reviews are placeholders in src/content/site.ts (marked TODO there);
 * swap in your real Google reviews whenever you are ready.
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-24 bg-porcelain py-24 lg:py-32">
      {/* faint ghost word */}
      <span aria-hidden className="ghost-word absolute top-2 right-4 hidden lg:block">
        Reviews
      </span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.heading}
          description={testimonials.text}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.09}>
              <figure className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-ivory p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-brass/45 hover:shadow-[0_28px_60px_-30px_rgba(26,23,18,0.35)]">
                {/* decorative quote glyph */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-3 right-5 font-serif text-[7rem] leading-none text-ink/[0.05] italic transition-colors duration-300 select-none group-hover:text-brass/15"
                >
                  &ldquo;
                </span>

                <Stars count={item.stars} />

                <blockquote className="mt-5 flex-1 font-serif text-xl leading-relaxed text-ink italic">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <figcaption className="mt-7 flex items-center gap-3 border-t border-dashed border-ink/10 pt-5">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brass/35 bg-brass/10 font-serif text-sm font-semibold text-bronze"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-[11px] tracking-[0.08em] text-taupe uppercase">{item.detail}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center font-serif text-sm text-taupe italic">
            {testimonials.footerNote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
