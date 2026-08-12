# Gaze Optics — Moving to a Custom Domain

The site is currently live at `https://minatolun-dotcom.github.io/gazeoptics/`
(GitHub Pages). A custom domain (e.g. `gazeoptics.in`) looks far more
professional, builds trust, and helps local search ranking.

All the code is already configured to work under **any** domain — the build
uses relative paths (`base: './'` in `vite.config.ts`), so switching is a
5-minute, no-code task. Do it in this order:

## 1. Buy a domain
Pick a registrar (GoDaddy, Namecheap, Hostinger, etc.) and register the domain
you want, e.g. `gazeoptics.in`. A `.in` domain is ideal for a Manipur store.

## 2. Point the domain at GitHub Pages (DNS)
At your registrar, create these DNS records:

| Type  | Name    | Value                                 |
|-------|---------|---------------------------------------|
| A     | @       | `185.199.108.153`                     |
| A     | @       | `185.199.109.153`                     |
| A     | @       | `185.199.110.153`                     |
| A     | @       | `185.199.111.153`                     |
| CNAME | www     | `minatolun-dotcom.github.io`          |

DNS changes can take anywhere from a few minutes to 48 hours to propagate.

## 3. Tell GitHub about the domain
In the repo **Settings → Pages**, under "Custom domain", enter your domain
(e.g. `gazeoptics.in`) and save. GitHub will validate the DNS and enable HTTPS
automatically (allow a few minutes for the certificate).

## 4. Tell the site about the domain (this repo)
Update these files and push — the deploy will handle the rest:

- **`public/CNAME`** — create it with your domain as the only line:
  ```
  gazeoptics.in
  ```
- **`index.html`** — replace the canonical + Open Graph URLs:
  - `<link rel="canonical" href="https://gazeoptics.in/" />`
  - `og:url` → `https://gazeoptics.in/`
  - `og:image` → `https://gazeoptics.in/og-image.jpg`
- **`public/robots.txt`** — update the `Sitemap:` line to `https://gazeoptics.in/sitemap.xml`
- **`public/sitemap.xml`** — update `<loc>` to `https://gazeoptics.in/`

> The JSON-LD structured data in `index.html` also has a `url` field pointing at
> the GitHub Pages URL — update it to `https://gazeoptics.in/` at the same time.

## 5. Verify
Open the new domain. You should see the site with a valid HTTPS padlock. Then
submit the sitemap in [Google Search Console](https://search.google.com/search-console)
so Google indexes the new address quickly.

## Not switching yet?
Nothing to do — everything keeps working at the current GitHub Pages URL.
