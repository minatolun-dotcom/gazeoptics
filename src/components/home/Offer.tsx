import { Sparkles } from 'lucide-react'
import { offer } from '../../content/site'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { GlassesMark } from '../brand/GlassesMark'

/** Promotional band — free eye test with complete glasses made in-store. */
export function Offer() {
  return (
    <section className="scroll-mt-24 px-6 py-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-12 text-porcelain sm:px-12 lg:px-16 lg:py-14">
            {/* ambient glows */}
            <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-brass/20 blur-[100px]" />
            <div aria-hidden className="pointer-events-none absolute bottom-0 left-10 h-48 w-48 rounded-full bg-brass/10 blur-[80px]" />
            {/* subtle ring detail */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full border border-brass/15"
            />

            <div className="relative flex flex-col items-start gap-9 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.3em] text-brass uppercase">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {offer.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-4xl leading-tight font-medium text-balance sm:text-5xl">
                  {offer.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ivory/70 sm:text-lg">{offer.text}</p>
                <p className="mt-4 text-xs text-ivory/45 italic">{offer.finePrint}</p>
              </div>

              <div className="flex items-center gap-7">
                <GlassesMark className="hidden h-20 w-20 text-brass/60 sm:block" />
                <Button target="contact" className="shrink-0">
                  {offer.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
