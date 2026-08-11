# Gaze Optics — Premium Optical Store Website

A premium, production-quality website for **Gaze Optics**, an offline optical store
(eye care + eyewear showroom). Built as a **digital showroom** — branding, trust,
location discovery, and services. **No e-commerce.**

Design concept: **Luxury Minimal** (ivory / ink / brass) with editorial fashion
accents and one restrained 3D centerpiece. See [`BRAND.md`](BRAND.md) for the full
style guide.

---

## ✨ Highlights

- **3D centerpiece** — a champagne-gold glasses sculpture built with React Three
  Fiber (no external models, works offline, mouse-reactive, graceful fallback
  when WebGL is unavailable).
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
    home/                    # Hero, HeroVisual, Scene3D, About, Services,
                             # Experience, WhyUs, Location, Gallery, Contact
    ui/                      # Button, Reveal, SectionHeading, Marquee, Counter, icons
    brand/                   # GlassesMark (logo)
  hooks/                     # usePrefersReducedMotion
  lib/                       # utils (cn), scroll bridge (Lenis)
```

| File | Purpose |
| --- | --- |
| `src/content/site.ts` | All copy, contact info, services, gallery, brands |
| `src/components/home/Scene3D.tsx` | The 3D glasses scene (lazy-loaded) |
| `src/components/home/HeroVisual.tsx` | WebGL detection + 3D fallback |
| `index.html` | SEO meta tags + JSON-LD schema |
| `BRAND.md` | Color palette, typography, logo usage, UI style guide |
| `ASSETS.md` | Free image sources + AI image prompts |

## ✏️ How to edit

1. **Text, phone, address, hours, services, brands, gallery** → `src/content/site.ts`
   (every placeholder is marked `// TODO`).
2. **Real photos** → replace the placeholder tiles in `Gallery.tsx` and the About
   panel with `<img>` tags. See [`ASSETS.md`](ASSETS.md).
3. **SEO / domain** → `index.html` (canonical URL, OG image, JSON-LD).
4. **Colors / fonts** → `src/index.css` (Tailwind v4 `@theme` tokens).

## 🛠 Tech stack

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · Framer Motion · React Three
Fiber 9 / drei 10 / three · Lenis smooth scroll · Lucide icons · self-hosted fonts
(Manrope Variable + Cormorant Garamond via Fontsource).

## 🚢 Deployment

Build with `npm run build` and host the `dist/` folder on any static host
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, or your own server). The site is a
pure SPA with no server-side requirements.
