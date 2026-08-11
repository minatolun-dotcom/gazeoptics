/* ============================================================================
   GAZE OPTICS — SITE CONTENT
   ----------------------------------------------------------------------------
   This is the SINGLE place to edit all text, contact details, services,
   gallery items, and placeholders.

   👉 Anything marked [TODO] needs to be replaced with your real information.
   Real business details (phone, address, hours, Instagram) are already filled
   in from the store's details file.
============================================================================ */

export const brand = {
  name: 'Gaze Optics',
  tagline: 'Precision eye care, beautifully framed.',
  // TODO: replace with your founding year + actual experience
  establishedYear: 2015,
  experienceYears: 10,
  stats: [
    { value: 10, suffix: '+', decimals: 0, label: 'Years of experience' },
    { value: 1200, suffix: '+', decimals: 0, label: 'Frames in store' },
    { value: 15000, suffix: '+', decimals: 0, label: 'Happy customers' },
    { value: 4.9, suffix: '★', decimals: 1, label: 'Average rating' },
  ],
}

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Experience', id: 'experience' },
  { label: 'Why Us', id: 'why-us' },
  { label: 'Visit Us', id: 'location' },
  { label: 'Contact', id: 'contact' },
]

export const hero = {
  eyebrow: 'Eye Care & Eyewear Studio',
  // "title" supports two lines: [regular, italic-serif accent]
  title: ['See clearly,', 'look extraordinary.'],
  subtitle:
    'Gaze Optics is your local optical boutique — comprehensive eye exams, precision lenses, and hand-picked premium frames, all under one roof.',
  // TODO: replace trust points with your real credentials
  trustPoints: ['Certified optometrists', '1000+ frames in store', 'Direct insurance billing'],
  ctaPrimary: { label: 'Visit Our Store', target: 'location' },
  ctaDirections: { label: 'Get Directions', target: 'directions' },
  ctaTertiary: { label: 'Contact Us', target: 'contact' },
}

export const about = {
  eyebrow: 'Our Story',
  heading: 'An eye for detail, a heart for care',
  // TODO: rewrite the story in your own words if you prefer
  paragraphs: [
    'Gaze Optics began with a simple belief: that every pair of eyes deserves precision care — and every face deserves a frame that feels like it was made for them.',
    'Today, our studio in New Lamka brings together comprehensive eye care and a hand-picked collection of premium frames under one roof — with every examination carried out with the personal attention of our optician, Sharon.',
  ],
  quote: {
    text: 'We do not just sell glasses. We help you see — and be seen — at your very best.',
    author: 'Sharon · Optician, Gaze Optics',
  },
  vision: {
    title: 'Our Vision',
    text: 'To be the most trusted name in eye care and eyewear in our region — where every customer leaves seeing clearly and feeling confident.',
  },
  mission: {
    title: 'Our Mission',
    text: 'To combine clinical precision with genuine personal attention, making world-class eye care feel warm, approachable, and effortless.',
  },
  // TODO: adjust to your real strengths
  reasons: [
    'Experienced, attentive optician care',
    'Modern diagnostic equipment',
    'Honest, transparent pricing',
    'Frames chosen with you, not for you',
  ],
}

export const services = [
  {
    icon: 'scan-eye',
    title: 'Eye Testing',
    description:
      'Comprehensive eye examinations with modern diagnostic equipment, delivered by an optician who explains every step.',
  },
  {
    icon: 'glasses',
    title: 'Prescription Glasses',
    description:
      'Precision-ground lenses fitted into frames you will love — from everyday clarity to blue-light and progressive options.',
  },
  {
    icon: 'sun',
    title: 'Sunglasses',
    description:
      'UV-protected, polarised styles from premium brands — because your eyes deserve protection that looks this good.',
  },
  {
    icon: 'focus',
    title: 'Contact Lenses',
    description:
      'Professional contact lens fitting, trial lenses, and care guidance to keep your eyes comfortable all day.',
  },
  {
    icon: 'frame',
    title: 'Frame Selection',
    description:
      'A guided, unhurried selection experience. We study your face, your style, and your prescription to find the perfect match.',
  },
  {
    icon: 'aperture',
    title: 'Lens Consultation',
    description:
      'Thin lenses, coatings, tints, and progressive designs — honest advice on what your eyes actually need.',
  },
  {
    icon: 'wrench',
    title: 'Repairs & Adjustments',
    description:
      'Temple tightening, nose-pad replacement, screw repairs, and re-fitting — quick, careful service for frames from any store.',
  },
]

export const experience = {
  eyebrow: 'The Showroom',
  heading: 'Eyewear as an experience, not a transaction',
  text: 'There is no online catalogue and no endless scrolling — because great eyewear cannot be judged on a screen. Step into our showroom, try the frames, feel the materials, and let our team guide you.',
  pillars: [
    {
      title: 'Curated Collections',
      text: 'Every frame on our wall is chosen for quality, character, and wearability — a tight edit, not a warehouse.',
    },
    {
      title: 'Premium Brands',
      text: 'We carry hand-picked brands known for craftsmanship, materials, and timeless design.',
    },
    {
      title: 'Personalized Fitting',
      text: 'Face shape, skin tone, lifestyle, prescription — the frame is fitted to you, not the other way around.',
    },
    {
      title: 'In-Store Consultation',
      text: 'Sit down with our team. Ask questions, compare options, take your time. No pressure, ever.',
    },
  ],
  // TODO: replace with the brands you actually carry
  brands: ['Lindberg', 'Barton Perreira', 'Moscot', 'Persol', 'Ray-Ban', 'Oakley', 'Tom Ford', 'Matsuda'],
  quote: {
    text: 'A frame is not an accessory. It becomes part of your face.',
    author: 'Gaze Optics',
  },
}

export const whyUs = {
  eyebrow: 'Why Gaze Optics',
  heading: 'Trusted by the people around you',
  text: 'Choosing an optical store is choosing who will look after your eyes. Here is why families, students, and professionals in our community choose Gaze Optics.',
  items: [
    {
      n: '01',
      title: 'Professional Service',
      text: 'A dedicated optician and trained eyewear consultants who treat every prescription with clinical care.',
    },
    {
      n: '02',
      title: 'Quality Lenses',
      text: 'Genuine, precision-ground lenses from trusted manufacturers — with honest advice on what is worth paying for.',
    },
    {
      n: '03',
      title: 'Personalized Attention',
      text: 'Unhurried appointments, clear explanations, and a fitting experience designed around you.',
    },
    {
      n: '04',
      title: 'Local & Trusted',
      text: 'A neighbourhood store in the heart of New Lamka that stands behind its work — adjustments, repairs, and aftercare long after your visit.',
    },
  ],
  // TODO: replace with real trust markers
  badges: [
    'Optician-led eye exams',
    'Modern testing equipment',
    'Personalized fittings',
    'Free adjustments on in-store frames',
  ],
}

export const locationInfo = {
  eyebrow: 'Visit Us',
  heading: 'Come see us in person',
  text: 'Walk-ins are welcome. For eye exams and contact lens fittings, we recommend booking ahead so we can give you our full attention.',
  // Real address — edit here if it ever changes.
  address: {
    line1: 'Opposite KFC, Elim Veng',
    line2: 'New Lamka, Churachandpur, Manipur — 795006',
  },
  map: {
    shortLink: 'https://maps.app.goo.gl/rYPn38XVWmwEEHqj9',
    // Verified via your short link — "GAZE Optics (new location)"
    placeName: 'GAZE Optics (new location)',
    lat: 24.3326984,
    lng: 93.6943591,
    embedUrl:
      'https://www.google.com/maps?q=GAZE+Optics+(new+location)&ll=24.3326984,93.6943591&z=16&output=embed',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&destination=24.3326984,93.6943591',
  },
  // Real hours — Monday to Saturday 10:00–17:00, Sunday closed
  hours: [
    { days: 'Monday — Saturday', time: '10:00 AM — 5:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  phoneDisplay: '+91 93780 72478',
  phoneHref: 'tel:+919378072478',
  whatsappDisplay: '+91 93780 72478',
  whatsappHref: 'https://wa.me/919378072478',
  email: '', // TODO: add an email address if you have one (not currently shown on the site)
  instagram: 'https://www.instagram.com/gaze.optics',
  instagramHandle: '@gaze.optics',
}

export const gallery = [
  { title: 'The Storefront', tag: 'Exterior', tone: 'sand' },
  { title: 'The Frame Wall', tag: 'Showroom', tone: 'ink' },
  { title: 'Examination Suite', tag: 'Eye Care', tone: 'brass' },
  { title: 'Lens & Craft', tag: 'Precision', tone: 'olive' },
  { title: 'The Fitting Lounge', tag: 'Experience', tone: 'bronze' },
  { title: 'Collections in Detail', tag: 'Eyewear', tone: 'porcelain' },
]

export const contactSection = {
  eyebrow: 'Get In Touch',
  heading: 'We would love to see you',
  text: 'Questions about eye exams, lenses, or frames? Send us a message and we will get back to you — or simply walk in. The quickest way to reach us is WhatsApp.',
  // The form below opens WhatsApp with a pre-filled message (no backend).
  note: 'This form opens WhatsApp with your message pre-filled — no account needed.',
}

export const footer = {
  tagline: 'Your neighbourhood optical boutique for clear vision and beautiful frames.',
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/gaze.optics' },
  ],
  copyright: `© ${new Date().getFullYear()} Gaze Optics. All rights reserved.`,
  madeWith: 'Crafted with care in Churachandpur, Manipur.',
}
