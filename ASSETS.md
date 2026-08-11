# Gaze Optics — Image & Asset Guide

The site currently ships with **designed placeholder art** (tone-based gradients +
brand marks) so it looks intentional before photography arrives. Replace them with
real photos whenever you're ready.

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

| Section | Current placeholder | Replace with |
| --- | --- | --- |
| Hero | 3D glasses (keep!) | — (optionally add a real macro behind the 3D) |
| About | gradient panel + glasses mark | store interior / team photo |
| Gallery (6 tiles) | gradient tiles in `Gallery.tsx` | storefront, frame wall, exam suite, lab, lounge, collections |

**Swap a gallery tile** — in `src/components/home/Gallery.tsx`, replace the
placeholder `<div>` inside `Tile` with:

```tsx
<img
  src="/img/gallery/storefront.jpg"
  alt="The Gaze Optics storefront"
  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
  loading="lazy"
/>
```

Drop files in `public/img/…` (or import them from `src/assets`). Keep files ≤ 200 KB
and use JPEG/WebP; rename `tone` values to taste once real photos are in.

## 🖼 Open Graph image

`public/og-image.svg` is a placeholder. For social sharing, replace it with a
**1200×630 PNG/JPG** (the site's branding: ivory background, glasses mark, wordmark)
and update the `og:image` URL in `index.html`.
