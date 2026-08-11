import { gallery } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/utils'

/** Curated gradient tones so placeholders feel designed, not empty. */
const tones: Record<string, string> = {
  sand: 'bg-linear-to-br from-[#ece4d4] to-[#d8cbb1]',
  ink: 'bg-linear-to-br from-[#2f2a20] to-[#171410]',
  brass: 'bg-linear-to-br from-[#c9a24b] to-[#8a6a3c]',
  olive: 'bg-linear-to-br from-[#8b8a6f] to-[#61604a]',
  bronze: 'bg-linear-to-br from-[#b0884e] to-[#6b4f2e]',
  porcelain: 'bg-linear-to-br from-[#f8f3e9] to-[#e5dcc6]',
}

function Tile({
  item,
  index,
  className,
}: {
  item: (typeof gallery)[number]
  index: number
  className?: string
}) {
  return (
    <figure
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-ink/10',
        className,
      )}
    >
      {/* Placeholder artwork — replace this div with <img src=... /> (see ASSETS.md) */}
      <div
        className={cn(
          'absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]',
          tones[item.tone] ?? tones.sand,
        )}
      >
        <div className="grain absolute inset-0 opacity-[0.06]" />
        <span
          aria-hidden
          className="absolute -right-3 -bottom-8 font-serif text-[9rem] leading-none text-ink/[0.07] italic select-none"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* caption overlay */}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-ink/70 via-ink/25 to-transparent p-6 pt-16">
        <div>
          <p className="text-[10px] font-bold tracking-[0.24em] text-brass uppercase">{item.tag}</p>
          <p className="mt-1 font-serif text-2xl text-porcelain">{item.title}</p>
        </div>
        <span className="hidden rounded-full bg-porcelain/15 px-3 py-1 text-[9px] font-semibold tracking-[0.16em] text-porcelain/80 uppercase backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:block sm:opacity-0">
          Photo coming soon
        </span>
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="The Gallery"
            title={<>Step inside, before you visit</>}
            description="A glimpse of the store, the craft, and the experience that awaits. These frames will be filled with real photos soon."
          />
        </div>

        {/* Editorial asymmetric grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item, i) => {
            if (i === 0)
              return (
                <Reveal key={item.title} className="sm:col-span-2 sm:row-span-2">
                  <Tile item={item} index={i} className="h-full min-h-[420px] sm:min-h-[560px]" />
                </Reveal>
              )
            if (i === 1)
              return (
                <Reveal key={item.title} delay={0.1} className="sm:col-span-2">
                  <Tile item={item} index={i} className="aspect-[16/8]" />
                </Reveal>
              )
            return (
              <Reveal key={item.title} delay={0.08 * (i % 2)}>
                <Tile item={item} index={i} className="aspect-[4/3]" />
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs tracking-[0.14em] text-taupe">
            Every tile is a placeholder — replace with your own store, interior, and eyewear photos. See{' '}
            <span className="font-semibold text-bronze">ASSETS.md</span> for sources and AI image prompts.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
