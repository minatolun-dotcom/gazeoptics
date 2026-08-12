import { ArrowUp, MapPin, Phone, Star } from 'lucide-react'
import { brand, footer, locationInfo, navLinks, services } from '../../content/site'
import { GlassesMark } from '../brand/GlassesMark'
import { scrollToId } from '../../lib/scroll'
import { InstagramIcon, WhatsAppIcon } from '../ui/icons'

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-porcelain">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brass/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <span className="inline-flex items-center gap-3 text-porcelain">
              <GlassesMark className="h-9 w-9 text-brass" />
              <span className="text-[14px] font-bold tracking-[0.32em] uppercase">{brand.name}</span>
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/60">{footer.tagline}</p>
            <p className="mt-8 font-serif text-2xl text-brass italic">"{brand.tagline}"</p>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-ivory/60 uppercase">Explore</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToId(link.id)}
                    className="text-sm text-ivory/70 transition-colors hover:text-brass"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services">
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-ivory/60 uppercase">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => scrollToId('services')}
                    className="text-sm text-ivory/70 transition-colors hover:text-brass"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-ivory/60 uppercase">Visit</h3>
            <ul className="mt-5 space-y-4 text-sm text-ivory/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brass" />
                <span>
                  {locationInfo.address.line1}
                  <br />
                  {locationInfo.address.line2}
                </span>
              </li>
              <li>
                <a href={locationInfo.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brass">
                  <Phone className="h-4 w-4 shrink-0 text-brass" />
                  {locationInfo.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={locationInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-brass"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-brass" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={locationInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-brass"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-brass" />
                  {locationInfo.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={locationInfo.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-brass"
                >
                  <Star className="h-4 w-4 shrink-0 text-brass" />
                  Leave a review
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-porcelain/10 pt-8 sm:flex-row">
          <p className="text-xs text-ivory/50">{footer.copyright}</p>
          <p className="text-xs tracking-[0.18em] text-ivory/50 uppercase">{footer.madeWith}</p>
          <button
            type="button"
            onClick={() => scrollToId('home')}
            className="inline-flex items-center gap-2 rounded-full border border-porcelain/15 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-porcelain/70 uppercase transition-colors hover:border-brass hover:text-brass"
            aria-label="Back to top"
          >
            Top <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  )
}
