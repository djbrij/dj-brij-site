# dj-brij-site

**Different cultures dance at the same time.**

The website for **DJ Bri J** (Briana Jasso) — a solo DJ in Dallas / Fort Worth playing weddings, quinceañeras, birthdays, family parties, and brand events. Built to be fast, warm, and dead simple to maintain. No CMS, no build step, no framework — just HTML, CSS, and a little JavaScript.

🌐 [djbrij.github.io/dj-brij-site](https://djbrij.github.io/dj-brij-site/)

---

## Purpose

Most people find a DJ through a friend, then check the website before they call. This site gives them one place to hear her sound, see what a night with her actually looks like and what the packages are, read her story, and get in touch. Every event is quoted individually — there's no checkout and no form, just a direct line to Bri.

---

## Architecture

- **Hosting** — GitHub Pages, deployed from the `docs/` folder on `main`. Merging to `main` is the deploy. Zero infrastructure.
- **Design** — Started from a Claude Design direction, then refined against Bri's own brand sheet: wine, cream, and red, with Anton display type over Figtree body copy.
- **Code** — Built and refined with Claude Code. Vanilla HTML, CSS, and JS, with two small scripts (`nav.js` for the mobile menu and header, `reveal.js` for scroll-in animation). No framework, no bundler, no dependencies.
- **Static by design** — The header, mobile menu, and footer are duplicated in every page rather than injected by JavaScript, so crawlers and link-preview bots see them and there's no flash of unstyled content on refresh. Open Graph tags, canonical URLs, and JSON-LD are static in each page for the same reason.
- **Identity** — JSON-LD `Person` and `ProfessionalService` data on each of the four main pages, `FAQPage` data on The Experience, and `rel="me"` social links, so search engines know exactly who and what this site is about.
- **Media** — Photos are exported at web size as a full and an `-sm` JPEG and served with `srcset`, lazy-loaded below the fold. Home embeds a SoundCloud mix.
- **Motion** — Scroll-in fades, plus a slowly spinning record on the Meet page. All of it switches off under `prefers-reduced-motion`. A transform on a `.djb-reveal` element is cancelled once it reveals, so lift and nudge effects go on margins or child elements instead.
- **AI policy** — [`docs/ai.txt`](docs/ai.txt) states how the site's content may be reused by AI tools.

---

## Development Workflow

This site is maintained through an AI-assisted loop, from editor to merged PR:

- **Editor** — VS Code, with the Live Preview extension serving `docs/` locally so changes show up instantly with no build step. Or, from the command line: `python3 -m http.server 8000 --directory docs`, then open http://localhost:8000/.
- **Pair programming** — [Claude Code](https://claude.com/claude-code) does the implementation: reading the codebase, making edits, and running local commands.
- **QA** — Playwright MCP (configured in [`.mcp.json`](.mcp.json)) drives a real headless browser to check changes before they ship: resizing to phone and tablet widths, scrolling through pages so lazy images and scroll-reveals actually fire, taking screenshots, and watching the console. It catches what's easy to miss by eye — mobile layout regressions, crops that cut off faces, animations that fight each other.
- **Version control** — GitHub CLI (`gh`) handles branch pushes and PR creation. Every change gets its own branch (`feat-`, `fix-`, or `chore-` prefixed, with the issue number when there is one, like `feat-9-packages`), a scoped commit, and a PR with a summary and testing notes. PRs close their issue with `Closes #N`.

No CI pipeline, no staging environment. The loop is: implement, verify with Playwright, commit, push, open a PR, merge.

---

## Pages

### Home
A full-viewport photo hero with the headline and two calls to action (get a quote, see The Experience). Below it: what she plays, three photo cards (Weddings, Birthdays, Socials & Nightlife), three reasons to book her, a client testimonial beside her ten-years stat, "A Taste of the Sound" with the genre list and an embedded SoundCloud mix, a teaser for her story, and a closing call to action.

### The Experience
How a night with her works. Three photo pillars (curating your sound, reading the room, thinking through every detail), then **Choose Your Package**: three package cards — The Vibe, The Classic, and The Grande — with an add-ons panel. After that comes a four-step "How It Works", an FAQ (also published as `FAQPage` structured data), and a reminder that every event is quoted individually.

### Meet the DJ
Her story: an opening portrait and quote, her bio, a pull quote about the kitchen radio, and **On Rotation** — a numbered setlist of what she has on repeat right now, beside a slowly spinning record. Then links to her Instagram, TikTok, and Facebook, and a closing call to action.

### Get Quote
A single-screen contact page. Phone, email, and social links, a short list of what to mention (event type, date, venue, guest count, the music the family loves), and what happens next. No form — just direct contact.

### 404
A custom "This one's not in the crate." page. It uses absolute `/dj-brij-site/…` asset paths so it works from any depth on GitHub Pages, which means it only fully styles when served from that base path, not from a local preview.

---

## Project Structure

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
    └── img/                ← photos (full + -sm), logo mark, favicon, share image
.mcp.json                   ← Playwright MCP config for QA
LICENSE
```

Page-specific layout lives in a `<style>` block in that page's `<head>`. Class prefixes: `djb-` for shared components, and `hm-` / `ex-` / `mt-` / `gq-` for Home, Experience, Meet, and Quote.

---

## Design Tokens

Colors, type, and spacing live in `:root` at the top of [`docs/assets/css/styles.css`](docs/assets/css/styles.css). Change them there, not in the pages.

| Token | Value | Used for |
|-------|-------|----------|
| `--djb-oxblood` | `#672B34` | Brand wine — dark fields, hover states |
| `--djb-cotton` | `#F5EFEB` | Brand cream — the main light surface |
| `--djb-red` | `#A52B28` | Brand red — buttons, links, accents; never a background field |
| `--djb-ink` | `#211815` | Body copy and dark sections |
| `--djb-stucco` | `#DDD0BC` | Neutral — dividers, borders, quiet sections |
| `--djb-rose` | `#E4A199` | Accent on dark backgrounds only |
| `--djb-pressed` | `#4C1F26` | Button pressed state |
| `--djb-green` | `#1E3A0C` | Brand deep green — defined, not currently used |

Display type is **Anton** and body type is **Figtree**, both from Google Fonts.

---

## Moving to a Custom Domain

1. Add `docs/CNAME` containing the bare domain on one line.
2. Find-replace `https://djbrij.github.io/dj-brij-site/` with the new origin across `docs/`. It appears in the `og:*`, `canonical`, and JSON-LD blocks, plus `robots.txt`, `sitemap.xml`, `ai.txt`, and the absolute paths in `404.html`.
3. Point DNS `A` records at the GitHub Pages IPs and add a `CNAME` for `www`.

All other in-page asset and navigation paths are relative, so they need no changes.

---

## License

Source code is released under the [MIT License](LICENSE) — © 2026 Briana Jasso.

Photography, the logotype, and written copy are © Briana Jasso and are **not** covered by that license: they aren't licensed for reuse, redistribution, or inclusion in AI training data without written permission. See [`docs/ai.txt`](docs/ai.txt) for the full reuse policy.
