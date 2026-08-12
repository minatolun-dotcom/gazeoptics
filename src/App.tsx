import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { Preloader } from './components/layout/Preloader'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/home/Hero'
import { About } from './components/home/About'
import { Services } from './components/home/Services'
import { LensGuide } from './components/home/LensGuide'
import { Experience } from './components/home/Experience'
import { WhyUs } from './components/home/WhyUs'
import { Testimonials } from './components/home/Testimonials'
import { Offer } from './components/home/Offer'
import { Location } from './components/home/Location'
import { Gallery } from './components/home/Gallery'
import { Contact } from './components/home/Contact'
import { scrollToId } from './lib/scroll'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleDone = useCallback(() => setLoading(false), [])

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={handleDone} />}</AnimatePresence>

      <SmoothScroll>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Navbar />

        <motion.main
          id="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Hero ready={!loading} />
          <About />
          <Services />
          <LensGuide />
          <Experience />
          <WhyUs />
          <Testimonials />
          <Offer />
          <Location />
          <Gallery />
          <Contact />
        </motion.main>

        <Footer />
      </SmoothScroll>

      {/* Film grain over everything for a tactile, editorial finish */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[80] opacity-[0.035] mix-blend-multiply" />

      {/* Floating back-to-top — appears after scrolling past the hero */}
      <BackToTop />
    </>
  )
}

/** Floating back-to-top button — fades in once you scroll past the hero. */
function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          onClick={() => scrollToId('home')}
          aria-label="Back to top"
          className="glass fixed right-5 bottom-5 z-[70] inline-flex h-12 w-12 items-center justify-center rounded-full text-ink shadow-[0_18px_40px_-18px_rgba(26,23,18,0.5)] transition-colors duration-300 hover:text-brass sm:right-8 sm:bottom-8"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
