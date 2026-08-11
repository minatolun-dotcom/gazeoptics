# Gaze Optics — Brand Style Guide

Design concept: **Luxury Minimal** — calm, premium, trustworthy. An optical store is
a *healthcare* business that happens to be a *fashion* destination, so the brand
leads with calm confidence and lets craftsmanship speak quietly.

---

## 🎨 Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| `ivory` | `#F5F2EC` | Primary background — warm, soft, premium |
| `porcelain` | `#FCFAF5` | Card / panel surfaces, dark-section text |
| `sand` | `#E9E1D3` | Secondary background tints, ambient shapes |
| `ink` | `#1A1712` | Primary text, buttons, dark sections |
| `ink-soft` | `#262218` | Dark card hover state |
| `taupe` | `#6F675A` | Secondary / muted body text |
| `brass` | `#B08D57` | Accent — decorative lines, italic serif accents, hovers |
| `bronze` | `#8A6A3C` | Accent text on light backgrounds (keeps 4.5:1 contrast) |
| `olive` | `#6B6A52` | Rare tertiary accent |

**Rules**
- Brass is an *accent*, never a fill flood. Use it for hairlines, italic serif
  words, icon tints, and hover states.
- Body text is ink or taupe on ivory — never brass (contrast would fail).
- Dark sections (Experience, Footer) use ink with porcelain text and brass accents.

## ✒️ Typography

- **Display / headlines:** *Cormorant Garamond* (serif, medium weight, tight
  leading ~1.02). Italic brass accents on key words.
- **Body / UI:** *Manrope Variable* (sans). Small, letterspaced uppercase labels
  (`11px`, `0.2–0.3em` tracking) create the editorial rhythm.
- **Voice:** calm, confident, second person ("your eyes", "you"). Short sentences.
  No hype, no exclamation marks.

## 🥂 Logo Usage

- **Mark:** the round-frame glasses glyph (see `src/components/brand/GlassesMark.tsx`).
- **Lockup:** mark + `GAZE OPTICS` in letterspaced caps.
- **Do:** keep clear space ≥ the height of one lens ring on all sides.
- **Don't:** recolor the mark outside ink (light) / brass (dark) / porcelain (dark);
  don't rotate or add effects; don't pair with other logos.

## 🧩 UI Style Guide

| Element | Rule |
| --- | --- |
| Buttons | Pill (`rounded-full`), `11px` bold letterspaced caps. Primary: ink → brass on hover. Outline: 1px ink/25 → brass border on hover. |
| Cards | `rounded-2xl`, 1px `ink/10` hairline borders, porcelain surface, hover lift `-translate-y-1` + soft long shadow. |
| Sections | Alternate ivory / porcelain backgrounds; dark ink bands for Experience + Footer. |
| Dividers | 1px hairlines (`ink/10`) and brass accent rules (`border-l-2 border-brass`). |
| Ghost words | Huge faint serif watermarks ("Optics", "Care", "Trust") behind section content. |
| Imagery | Warm, natural light; ivory and stone tones; minimal props. See `ASSETS.md`. |

## 🎬 Motion Language

- One signature mascot moment (the hero panda). Everything else is subtle.
- Scroll reveals: fade + 28px rise, 0.75s, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover: 300ms transitions; lifts ≤ 6px; arrows nudge 4px.
- **Always respect `prefers-reduced-motion`** — the panda float/blink stop, reveals become
  fades, marquee halts.

## ✅ Accessibility Baseline

- Contrast ≥ 4.5:1 for body text (WCAG AA).
- All interactive elements keyboard-focusable with visible brass focus ring.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, skip link.
- Descriptive `aria-label`s on icon-only controls; decorative art is `aria-hidden`.
