# The Foundations of Software Engineering

The source for [**thefoe.dev**](https://thefoe.dev) — long-form essays on the durable ideas under
modern software engineering: abstraction, correctness, the cost of change, taste, and the long
half-life of good engineering.

Built with [Astro](https://astro.build), a vintage academic-paper design, and a
[Beehiiv](https://www.beehiiv.com) newsletter. Deployed as a Cloudflare Worker.

## Stack

- **Astro 5** — static site generation, content collections for essays
- **Vanilla CSS** — design tokens in [`src/styles/global.css`](src/styles/global.css); no UI framework
- **Fonts** — EB Garamond (serif body), JetBrains Mono (labels), Inter (UI)
- **Beehiiv** — newsletter signup (popup, nav button, and CTA band)
- **Cloudflare Workers** — static-asset hosting

## Project layout

```
src/
  config.ts               Site + newsletter config (edit me first)
  styles/global.css       Design tokens & all component styling
  layouts/BaseLayout.astro  <head>, header, footer, newsletter popup
  components/             Header, Footer, SubscribeForm, NewsletterModal, NewsletterCTA, PostCard
  content/blog/*.md       The essays (one Markdown file each)
  content.config.ts       Essay frontmatter schema
  pages/
    index.astro           Homepage / essay index
    about.astro           About
    write-for-us.astro    Call for writers
    blog/[...slug].astro  Essay template
    404.astro
```

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output to ./dist
npm run preview    # preview the production build
```

## Writing an essay

Drop a Markdown file in `src/content/blog/`. Frontmatter schema (see `src/content.config.ts`):

```markdown
---
title: The Cost of Abstraction
dek: A one-line italic subtitle shown under the title.
kicker: Essay · Design
author: The FOE
pubDate: 2026-05-29
---

Body in Markdown. `##` headings render with the § marker; `---` becomes a · · · divider.
```

## Newsletter (Beehiiv)

All newsletter config lives in `src/config.ts` under `BEEHIIV`:

- `subscribeUrl` — the custom-styled form posts the email here (`?email=…`). Defaults to your
  publication's hosted subscribe page, `https://thefoe.beehiiv.com/subscribe`.
- `embedUrl` — set this to Beehiiv's official iframe embed (`https://embeds.beehiiv.com/<uuid>`,
  from **Grow → Subscribe Forms → Embed**) to render the iframe instead of the custom form.

## Deploy (Cloudflare Workers)

The site is fully static and ships via [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/).
Config is in [`wrangler.jsonc`](wrangler.jsonc).

```bash
npx wrangler login        # once
npm run deploy            # builds, then wrangler deploy
```

Point `thefoe.dev` at the Worker via a custom domain in the Cloudflare dashboard
(Workers & Pages → your Worker → Settings → Domains & Routes).

## License

This project is dual-licensed so reuse stays open with attribution (copyleft):

- **Source code** — [Mozilla Public License 2.0](LICENSE). Reuse the code; share modifications to
  MPL-covered files under the same license and keep the notices.
- **Written content** (the essays in `src/content/`) — [Creative Commons Attribution-ShareAlike 4.0](LICENSE-CONTENT).
  Share and adapt with attribution, under the same license.

If you'd prefer a single or stronger copyleft license (e.g. GPL-3.0), swap `LICENSE` — both texts
are the unmodified official versions.

---

Want to contribute an essay? See [Write for us](https://thefoe.dev/write-for-us).
