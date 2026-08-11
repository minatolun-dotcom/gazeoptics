# Gaze Optics — Image & Asset Guide

The gallery ships with **real stock photography** (Pexels, free license) so the site
looks finished from day one. Each photo lives in `public/img/gallery/` and can be
swapped for your own store photography anytime — see below.

## 🖼 The gallery photos (stock, free to use)

| Tile | File | Photo |
| --- | --- | --- |
| The Storefront | `public/img/gallery/storefront.jpg` | Eyewear showcase under bright light (Pexels #5202053) |
| The Frame Wall | `public/img/gallery/frame-wall.jpg` | Eyeglasses on a display shelf (Pexels #5201896) |
| Examination Suite | `public/img/gallery/exam-suite.jpg` | Eyesight check at the optical store (Pexels #5621876) |
| Lens & Craft | `public/img/gallery/lens-craft.jpg` | Eyeglasses close-up (Pexels #7357970) |
| The Fitting Lounge | `public/img/gallery/fitting-lounge.jpg` | Shopping for eyeglasses (Pexels #5201890) |
| Collections in Detail | `public/img/gallery/collections.jpg` | Sunglasses product shot (Pexels #5202048) |

> Pexels licence: free to use, no attribution required. Want to swap any of them?
> Just replace the file in `public/img/gallery/` **keeping the same filename** — no
> code changes needed. To add a new tile, add `src` and `alt` in
> `src/content/site.ts` → `gallery` and drop the file in the same folder.

---

## 📸 Free / Licensed Image Sources

---

## 📸 Free / Licensed Image Sources

| Source | Best for | License |
| --- | --- | --- |
| [Unsplash](https://unsplash.com) | Store interiors, eyewear close-ups, lifestyle | Free, no attribution required |
| [Pexels](https://pexels.com) | Same, with more casual/lifestyle shots | Free |
| [Pixabay](https://pixabay.com) | Optics equipment, clinic shots | Free |
| [EnhanceAI / Upscayl](https://upscayl.org) | Upscale the chosen images | — |

> Prefer **your own store photos** — local customers trust what looks real. A
> phone camera in good daylight beats a generic stock shot for the "About" and
> "Gallery" sections.

---

## 🎨 AI Image Prompts (Midjourney / DALL·E / Firefly)

Append `--ar 4:3` (or `--ar 3:2`) and `--style raw` on Midjourney. Keep the ivory /
brass palette consistent with the site.

**1. Hero / collection macro**
> "Macro photograph of luxury round acetate eyeglasses with champagne gold
> temples on warm ivory linen, soft window light, shallow depth of field,
> minimal editorial product photography, warm stone tones, no text"

**2. Store interior (About panel)**
> "Bright minimalist optical store interior, warm ivory walls, walnut wood
> display wall with neatly arranged premium eyeglasses, brass accents, soft
> natural daylight through large windows, editorial architectural photography"

**3. Frame wall**
> "Wall display of elegant eyeglasses in warm wooden shelving, warm ambient
> lighting, ivory and brass color palette, premium boutique showroom, no people"

**4. Eye examination suite**
> "Modern optometry examination room, professional slit lamp and phoropter,
> clean warm lighting, ivory and wood tones, calm clinical atmosphere, no people"

**5. Optometrist portrait (About trust)**
> "Professional portrait of a friendly optometrist in a white coat holding
> eyeglasses, warm neutral studio lighting, ivory background, trustworthy
> editorial healthcare photography"

**6. Fitting lounge**
> "Customer trying eyeglasses at a boutique mirror with warm lighting, seen from
> behind, premium optical showroom, editorial lifestyle photography"

---

## 🗂 Where they go

| Section | Current state | Replace with |
| --- | --- | --- |
| Hero | panda mascot with mouse-tracking eyes (keep!) | — (optionally restyle the panda SVG in `PandaVisual.tsx`) |
| About | stock photo at `public/img/about.jpg` | your store interior / team photo |
| Gallery (6 tiles) | stock photos in `public/img/gallery/` | your storefront, frame wall, exam suite, lab, lounge, collections |

**Swap a gallery tile** — easiest path: overwrite the matching file in
`public/img/gallery/` with your own photo (same filename, keep it ≤ 300 KB, JPEG or
WebP, landscape 4:3 preferred). The site picks it up automatically — commit & push
and it goes live.

To point a tile at a different file instead, edit `src/content/site.ts` → `gallery`
(`src` and `alt` fields). The gradient you see behind each photo is just a loading
fallback — it disappears as soon as the image loads.

## 🔬 Lens Guide visuals

The Lens Guide section uses **designed SVG artwork** (see `src/components/home/LensVisual.tsx`) — clean line-art illustrations per lens type that match the brand (intentional: real macro stock photos can't reliably depict coatings like hard-coat or AR). If you'd rather use real macro photos of lenses, swap the `LensVisual` component inside each tab for an `<img>`:

> "Macro photograph of a photochromic lens half-clear half-dark, warm ivory studio background, soft light, premium product photography"

Repeat with a prompt per lens type (blue-tinted lens for blue cut, gradient zones for progressive, etc.).

## 🖼 Open Graph image

`public/og-image.jpg` is a **branded 1200×630 image** (photo + wordmark, composed
in code). To change the social-share card:

1. Replace `public/og-image.jpg` with your own **1200×630** image (same filename
   keeps `index.html` untouched), or
2. Re-run the compositing script (ask the assistant — it builds the current card
   from a background photo + brand text).

The `og:image` URL in `index.html` points to `/og-image.jpg` — just swap the file.
