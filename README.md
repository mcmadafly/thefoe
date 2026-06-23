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

The publication is live at `thefoe.beehiiv.com`. All newsletter config lives in `src/config.ts`
under `BEEHIIV`:

- **Default — custom form.** The paper-styled form posts the email to `subscribeUrl`
  (`https://thefoe.beehiiv.com/subscribe?email=…`). Matches the site design.
- **Alternative — official embed.** Set `embedUrl` to
  `https://embeds.beehiiv.com/2c397df1-41cc-4ba7-af2f-f1dc4094e30b` to render Beehiiv's inline
  iframe instead (1-step signup, Beehiiv's own styling).

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

[GNU General Public License v3.0](LICENSE) — strong copyleft. You're free to use, study, share,
and modify everything here (code and essays alike); derivative works must stay open under the same
GPL-3.0 terms, with attribution and the license preserved.

---

Want to contribute an essay? See [Write for us](https://thefoe.dev/write-for-us).
