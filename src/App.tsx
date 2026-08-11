import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
import { Offer } from './components/home/Offer'
import { Location } from './components/home/Location'
import { Gallery } from './components/home/Gallery'
import { Contact } from './components/home/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  const handleDone = useCallback(() => setLoading(false), [])

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={handleDone} />}</AnimatePresence>

      <SmoothScroll>
        <a href="#home" className="skip-link">
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
          <Offer />
          <Location />
          <Gallery />
          <Contact />
        </motion.main>

        <Footer />
      </SmoothScroll>

      {/* Film grain over everything for a tactile, editorial finish */}
      <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[80] opacity-[0.035] mix-blend-multiply" />
    </>
  )
}
