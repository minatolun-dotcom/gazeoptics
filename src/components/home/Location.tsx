import { CalendarCheck, Clock, MapPin, Navigation, Phone, Star } from 'lucide-react'
import { booking, locationInfo } from '../../content/site'
import { useStoreStatus } from '../../hooks/useStoreStatus'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { WhatsAppIcon } from '../ui/icons'

export function Location() {
  const { map, address, hours } = locationInfo
  const store = useStoreStatus()

  return (
    <section id="location" className="relative scroll-mt-24 bg-porcelain py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          {/* Info column */}
          <div>
            <SectionHeading
              eyebrow={locationInfo.eyebrow}
              title={locationInfo.heading}
              description={locationInfo.text}
            />

            <Reveal delay={0.1}>
              <div className="mt-9 space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-bronze">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.24em] text-taupe uppercase">Address</p>
                    {/* Real address — edit in src/content/site.ts if it changes */}
                    <p className="mt-1.5 text-base text-ink">
                      {address.line1}
                      <br />
                      {address.line2}
                    </p>
                  </div>
                </div>

                {/* Hours + live status */}
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-bronze">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="w-full max-w-xs">
                    <p className="text-[10px] font-bold tracking-[0.24em] text-taupe uppercase">Opening Hours</p>
                    {/* Live badge — computed from real hours (see src/content/site.ts) */}
                    <p
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ivory px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] uppercase"
                      aria-live="polite"
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full ${store.isOpen ? 'animate-pulse bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.8)]' : 'bg-taupe'}`}
                      />
                      {store.isOpen
                        ? `Open now · closes at ${store.closesAt}`
                        : `Closed now · opens ${store.opensAt}`}
                    </p>
                    {/* Real hours — edit in src/content/site.ts if they change */}
                    <dl className="mt-3 space-y-1.5">
                      {hours.map((h) => (
                        <div key={h.days} className="flex items-baseline justify-between gap-6 border-b border-dashed border-ink/10 pb-1.5">
                          <dt className="text-sm text-taupe">{h.days}</dt>
                          <dd className="text-sm font-semibold text-ink">{h.time}</dd>
                        </div>
                      ))}
                    </dl>
                    <a
                      href={booking.waLink(booking.buildEyeTestMessage())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase transition-colors hover:text-brass"
                    >
                      <CalendarCheck className="h-3.5 w-3.5" />
                      Book an eye test on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Contact shortcuts */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button variant="outline" href={locationInfo.phoneHref} icon={<Phone className="h-3.5 w-3.5" />}>
                    {locationInfo.phoneDisplay}
                  </Button>
                  <Button variant="outline" href={locationInfo.whatsappHref} icon={<WhatsAppIcon className="h-3.5 w-3.5" />}>
                    WhatsApp
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button href={map.shortLink} icon={<Navigation className="h-3.5 w-3.5" />}>
                    Get Directions
                  </Button>
                  <Button variant="ghost" href={map.directionsUrl} arrow={false}>
                    Open in Google Maps
                  </Button>
                </div>

                {/* Google review request — turns happy visitors into real reviews */}
                <a
                  href={locationInfo.reviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-dashed border-brass/40 bg-brass/5 px-6 py-5 transition-colors duration-300 hover:border-brass/70 hover:bg-brass/10"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/35 bg-porcelain text-brass">
                    <Star className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-bold tracking-[0.22em] text-bronze uppercase">
                      Loved your visit?
                    </span>
                    <span className="mt-1 block text-sm font-medium text-ink">
                      Review us on Google — it helps other people find us.
                    </span>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Map column */}
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 shadow-[0_40px_90px_-50px_rgba(26,23,18,0.45)]">
              <iframe
                title="Gaze Optics on Google Maps"
                src={map.embedUrl}
                className="h-[380px] w-full sm:h-[460px] lg:h-full lg:min-h-[540px]"
                style={{ border: 0, filter: 'saturate(0.85) contrast(1.02)' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* floating verification chip */}
              <div className="glass absolute top-5 left-5 rounded-2xl px-5 py-3">
                <p className="text-[10px] font-bold tracking-[0.22em] text-taupe uppercase">On the map</p>
                <p className="mt-0.5 text-sm font-semibold text-ink">GAZE Optics — verified listing</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
