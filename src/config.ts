/**
 * Central site configuration for The Foundations of Software Engineering.
 * Edit values here; components and pages read from this module.
 */

export const SITE = {
  name: 'The Foundations of Software Engineering',
  /** Lowercase wordmark used in the header/footer. */
  wordmark: 'the foundations of software engineering',
  /** Compact label / acronym. */
  short: 'thefoe',
  domain: 'thefoe.dev',
  url: 'https://thefoe.dev',
  tagline: 'Field notes on the craft beneath the code.',
  description:
    'Long-form essays on the durable ideas under modern software engineering — the foundations that outlast frameworks.',
  author: 'The FOE',
  /** Where writer pitches land. Set up forwarding for this address, or change it. */
  editorEmail: 'write@thefoe.dev',
} as const;

/**
 * Beehiiv newsletter. Two on-site signup paths (neither redirects):
 *
 * 1. Embed iframe (FREE plan) — set `embedUrl` to the form URL from
 *    Beehiiv → Grow → Subscribe Forms → Embed. When set, SubscribeForm
 *    renders Beehiiv's hosted form inline. This is the path used today.
 *
 * 2. Custom form → /api/subscribe (needs PAID plan API access) — the
 *    paper-styled form posts to a Cloudflare Worker route that calls the
 *    Beehiiv API server-side using BEEHIIV_API_KEY (a Worker secret). This
 *    is wired and dormant; it activates once `embedUrl` is empty AND the
 *    BEEHIIV_API_KEY secret is set. Beehiiv gates the API behind a paid tier.
 *
 * NOTE: the embed UUID is NOT the publicationId — get the real one from the
 * Subscribe Forms embed snippet in the dashboard.
 */
export const BEEHIIV = {
  publication: 'https://thefoe.beehiiv.com',
  subscribeUrl: 'https://thefoe.beehiiv.com/subscribe',
  /** Beehiiv publication id (from the dashboard) — used by /api/subscribe. */
  publicationId: 'pub_2c397df1-41cc-4ba7-af2f-f1dc4094e30b',
  /** Paste the embed form URL from Subscribe Forms → Embed to go live. */
  embedUrl: '',
} as const;

/** Primary navigation links (rendered right-aligned in the header). */
export const NAV = [
  { label: 'Essays', href: '/essays' },
] as const;

/** Recurring newsletter copy, reused by the nav button, popup, and CTA band. */
export const NEWSLETTER = {
  eyebrow: 'The FOE Dispatch',
  heading: 'Foundations of Software Engineering, in your inbox.',
  blurb:
    'One essay every other week, delivered straight to your inbox. Slow on purpose, free, and easy to leave — no spam, no fluff.',
  buttonLabel: 'Subscribe',
  placeholder: 'you@example.com',
  consent: 'Free. Unsubscribe anytime.',
} as const;
