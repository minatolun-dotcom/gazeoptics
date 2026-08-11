# Gaze Optics — Premium Optical Store Website

A premium, production-quality website for **Gaze Optics**, an offline optical store
(eye care + eyewear showroom). Built as a **digital showroom** — branding, trust,
location discovery, and services. **No e-commerce.**

Design concept: **Luxury Minimal** (ivory / ink / brass) with editorial fashion
accents and one signature mascot moment. See [`BRAND.md`](BRAND.md) for the full
style guide.

---

## ✨ Highlights

- **Panda mascot** — a hand-crafted SVG panda in the brand palette whose eyes
  follow your cursor (spring-smoothed), with a gentle blink and float. Pure SVG —
  crisp at any size, no WebGL required.
- **Premium interactions** — Lenis smooth scroll, film-grain texture, branded
  preloader, scroll reveals, parallax hero, animated counters, marquee, glassmorphism
  chips, magnetic-feel buttons, hover micro-interactions everywhere.
- **Real map** — the embedded Google Map already points to your verified listing
  ("GAZE Optics (new location)", resolved from your short link).
- **SEO + structured data** — meta/OG tags and `Optician` JSON-LD schema.
- **Accessible** — skip link, semantic landmarks, focus states, `prefers-reduced-motion`
  respected throughout, keyboard-friendly nav.
- **One-file content editing** — all text lives in `src/content/site.ts`.

---

## 🚀 Quickstart

```bash
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # typecheck + production build → dist/
npm run preview   # serve the production build locally
```

Requires Node 20+ (developed on Node 24).

## 🗂 Architecture

```
public/                      # static assets (favicon, og-image)
src/
  content/site.ts            # ⭐ ALL editable content & placeholders
  components/
    layout/                  # Preloader, Navbar, Footer, SmoothScroll
    home/                    # Hero, PandaVisual, About, Services,
                             # Experience, WhyUs, Location, Gallery, Contact
    ui/                      # Button, Reveal, SectionHeading, Marquee, Counter, icons
    brand/                   # GlassesMark (logo)
  hooks/                     # usePrefersReducedMotion
  lib/                       # utils (cn), scroll bridge (Lenis)
```

| File | Purpose |
| --- | --- |
| `src/content/site.ts` | All copy, contact info, services, gallery, brands |
| `src/components/home/PandaVisual.tsx` | The mouse-tracking panda mascot (SVG) |
| `index.html` | SEO meta tags + JSON-LD schema |
| `BRAND.md` | Color palette, typography, logo usage, UI style guide |
| `ASSETS.md` | Free image sources + AI image prompts |

## ✏️ How to edit

1. **Text, phone, address, hours, services, brands, gallery** → `src/content/site.ts`
   (every placeholder is marked `// TODO`).
2. **Real photos** → the Gallery, About panel, and OG image use licensed stock
   photos today — overwrite the files in `public/img/` with your own shots (same
   filenames, no code changes). See [`ASSETS.md`](ASSETS.md).
3. **SEO / domain** → `index.html` (canonical URL, OG image, JSON-LD).
4. **Colors / fonts** → `src/index.css` (Tailwind v4 `@theme` tokens).

## 🛠 Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Framer Motion · Lenis smooth
scroll · Lucide icons · self-hosted fonts (Manrope Variable + Cormorant Garamond
via Fontsource).

## 🚢 Deployment

Build with `npm run build` and host the `dist/` folder on any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own server). The site is a
pure SPA with no server-side requirements.
