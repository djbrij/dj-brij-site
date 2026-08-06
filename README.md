# dj-brij-site

The website for **DJ Bri J** (Briana Jasso) — a solo DJ in Dallas / Fort Worth playing
weddings, quinceañeras, birthdays, family parties, and brand events.

**Live:** https://djbrij.github.io/dj-brij-site/

## Stack

Vanilla HTML, CSS, and JavaScript. No build step, no bundler, no framework, no
dependencies. GitHub Pages serves the site directly from the `/docs` folder on
`main`, so **merging to `main` is the deploy**.

## Structure

```
docs/                       ← GitHub Pages serves from here
├── index.html              ← Home
├── experience/index.html   ← The Experience  → /experience/
├── meet/index.html         ← Meet the DJ     → /meet/
├── quote/index.html        ← Get Quote       → /quote/
├── 404.html
├── robots.txt
├── ai.txt                  ← AI/LLM reuse policy
├── sitemap.xml
└── assets/
    ├── css/styles.css      ← design tokens + every shared component
    ├── js/nav.js           ← mobile menu, header condense-on-scroll
    ├── js/reveal.js        ← scroll-in animations
    └── img/
```

The header, mobile overlay, and footer are **duplicated statically** in each page
rather than injected by JavaScript. That is deliberate: JS-injected markup is
invisible to crawlers and link-preview bots, and JS-injected stylesheets cause a
flash of unstyled content on refresh.

Every `og:*` tag, canonical URL, and JSON-LD block is static in the page source
for the same reason.

## Local preview

```sh
python3 -m http.server 8000 --directory docs
```

Then open http://localhost:8000/.

## Editing

- **Design tokens** (colors, type, spacing) live in `:root` at the top of
  `docs/assets/css/styles.css`. Change them there, not in the pages.
- **Page-specific layout** lives in a `<style>` block in that page's `<head>`.
- Class prefixes: `djb-` for shared components, `hm-` / `ex-` / `mt-` / `gq-`
  for Home, Experience, Meet, and Quote respectively.

## Moving to a custom domain

1. Add `docs/CNAME` containing the bare domain on one line.
2. Find-replace `https://djbrij.github.io/dj-brij-site/` with the new origin
   across `docs/` — it appears in the `og:*`, `canonical`, and JSON-LD blocks,
   plus `robots.txt`, `sitemap.xml`, `ai.txt`, and the absolute paths in
   `404.html`.
3. Point DNS `A` records at the GitHub Pages IPs and add a `CNAME` for `www`.

All in-page asset and navigation paths are relative, so they need no changes.

## Outstanding content

See `uncommitted/TODO-CONTENT.md` for the photographs, testimonials, and copy
Bri still needs to supply. Those spots render as labelled placeholder frames.

## License

Source code: MIT (see `LICENSE`).
Photography, logotype, and written copy are © Briana Jasso and are not covered
by that license. See `docs/ai.txt`.
