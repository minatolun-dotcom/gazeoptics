import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck, Check } from 'lucide-react'
import { booking, hero, locationInfo } from '../../content/site'
import { Button } from '../ui/Button'
import { PandaVisual } from './PandaVisual'
import { scrollToId } from '../../lib/scroll'

export function Hero({ ready = true }: { ready?: boolean }) {
  /** Hidden state for entrance elements, shown once the preloader is done. */
  const hidden = { opacity: 0, y: 24 }
  const shown = { opacity: 1, y: 0 }
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Subtle parallax + fade as you scroll away from the hero.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden pt-24 pb-16 lg:pt-28"
    >
      {/* Ambient background */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[34rem] w-[34rem] rounded-full bg-brass/10 blur-[110px]" />
        <div className="absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sand/70 blur-[100px]" />
        <span aria-hidden className="ghost-word absolute -top-4 right-4 hidden lg:block">
          Optics
        </span>
      </div>

      {/* Parallax content */}
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:px-10"
      >
        {/* Copy */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ delay: 0.02, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-brass/40 bg-brass/10 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" aria-hidden />
              {hero.offerBadge}
            </span>
          </motion.div>

          <motion.p
            initial={hidden}
            animate={ready ? shown : hidden}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.32em] text-bronze uppercase"
          >
            <span className="h-px w-10 bg-brass" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            initial={hidden}
            animate={ready ? shown : hidden}
            transition={{ delay: 0.22, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif text-[2.9rem] leading-[1.02] font-medium text-balance sm:text-6xl lg:text-[4.6rem]"
          >
            {hero.title[0]}
            <br />
            <em className="italic text-brass">{hero.title[1]}</em>
          </motion.h1>

          <motion.p
            initial={hidden}
            animate={ready ? shown : hidden}
            transition={{ delay: 0.36, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-taupe sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={hidden}
            animate={ready ? shown : hidden}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button target={hero.ctaPrimary.target}>{hero.ctaPrimary.label}</Button>
            <Button variant="outline" href={locationInfo.map.shortLink}>
              {hero.ctaDirections.label}
            </Button>
            <Button
              href={booking.waLink(booking.buildEyeTestMessage())}
              icon={<CalendarCheck className="h-4 w-4" />}
            >
              {hero.ctaBook.label}
            </Button>
            <Button variant="ghost" target={hero.ctaTertiary.target} arrow={false}>
              {hero.ctaTertiary.label}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.72, duration: 0.9 }}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-ink/10 pt-6"
          >
            {hero.trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-ink/70 uppercase">
                <Check className="h-3.5 w-3.5 text-brass" strokeWidth={3} />
                {point}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Panda mascot — eyes follow the cursor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[340px] sm:h-[440px] lg:h-[620px]"
        >
          <PandaVisual />

          {/* Floating glass chips */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass absolute top-8 left-0 hidden rounded-2xl px-5 py-3.5 sm:block"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] text-taupe uppercase">Eye Exams</p>
            <p className="mt-1 text-sm font-semibold text-ink">Comprehensive & certified</p>
          </motion.div>

          <motion.div
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            className="glass absolute right-0 bottom-16 hidden rounded-2xl px-5 py-3.5 sm:block"
          >
            <p className="text-[10px] font-bold tracking-[0.22em] text-taupe uppercase">The Showroom</p>
            <p className="mt-1 text-sm font-semibold text-ink">Premium frames, in person</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-taupe uppercase"
        aria-label="Scroll to about section"
      >
        Scroll
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-9 w-px bg-gradient-to-b from-brass to-transparent"
        />
      </motion.button>

    </section>
  )
}
