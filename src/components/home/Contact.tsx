import { useState, type FormEvent } from 'react'
import { Clock, MapPin, Phone, Send } from 'lucide-react'
import { contactSection, locationInfo } from '../../content/site'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { InstagramIcon, WhatsAppIcon } from '../ui/icons'

export function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  // Opens WhatsApp with a pre-filled message — no backend required.
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(
      `Hello Gaze Optics! My name is ${name}.\n\n${message || 'I would like to know more about your services.'}\n\n(Contact: ${phone})`,
    )
    window.open(`${locationInfo.whatsappHref}?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  const infoCards = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: 'Call us',
      value: locationInfo.phoneDisplay,
      href: locationInfo.phoneHref,
    },
    {
      icon: <WhatsAppIcon className="h-5 w-5" />,
      label: 'WhatsApp',
      value: locationInfo.whatsappDisplay,
      href: locationInfo.whatsappHref,
      external: true,
    },
    {
      icon: <InstagramIcon className="h-5 w-5" />,
      label: 'Instagram',
      value: locationInfo.instagramHandle,
      href: locationInfo.instagram,
      external: true,
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      label: 'Visit',
      value: `${locationInfo.address.line1}, ${locationInfo.address.line2}`,
      href: locationInfo.map.shortLink,
      external: true,
    },
  ]

  return (
    <section id="contact" className="relative scroll-mt-24 bg-porcelain py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: heading + info */}
          <div>
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              title={contactSection.heading}
              description={contactSection.text}
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {infoCards.map((card, i) => (
                <Reveal key={card.label} delay={i * 0.06}>
                  <a
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noopener noreferrer' : undefined}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-ink/10 bg-ivory p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_24px_50px_-30px_rgba(26,23,18,0.35)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-bronze transition-colors duration-300 group-hover:bg-brass group-hover:text-porcelain">
                      {card.icon}
                    </span>
                    <span>
                      <span className="block text-[10px] font-bold tracking-[0.22em] text-taupe uppercase">
                        {card.label}
                      </span>
                      <span className="mt-1 block text-sm font-semibold text-ink">{card.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center gap-3 rounded-2xl border border-dashed border-brass/40 bg-brass/5 px-6 py-4">
                <Clock className="h-4 w-4 shrink-0 text-bronze" />
                <p className="text-xs leading-relaxed text-taupe">
                  {locationInfo.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')} —{' '}
                  <em className="text-ink">walk-ins welcome</em>
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-ink/10 bg-ivory p-8 shadow-[0_40px_90px_-55px_rgba(26,23,18,0.45)] sm:p-10"
            >
              <span aria-hidden className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-brass/15 blur-[70px]" />

              <div className="relative">
                <p className="text-[11px] font-bold tracking-[0.26em] text-bronze uppercase">Send a message</p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-taupe uppercase">Your name</span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-porcelain px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-brass focus:outline-none"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-taupe uppercase">Phone / WhatsApp</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 ..."
                      className="mt-2 w-full rounded-xl border border-ink/15 bg-porcelain px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-brass focus:outline-none"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-taupe uppercase">Message</span>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need — an eye exam, new frames, contact lenses, a repair…"
                    className="mt-2 w-full resize-none rounded-xl border border-ink/15 bg-porcelain px-4 py-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-brass focus:outline-none"
                  />
                </label>

                <button
                  type="submit"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[11px] font-bold tracking-[0.2em] text-porcelain uppercase transition-all duration-300 hover:bg-brass sm:w-auto"
                >
                  Send via WhatsApp
                  <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </button>

                <p className="mt-4 text-[11px] leading-relaxed text-taupe">{contactSection.note}</p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
