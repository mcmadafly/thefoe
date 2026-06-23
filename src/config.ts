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
 * Beehiiv newsletter.
 *
 * The signup form on this site is custom-styled to match the design, then it
 * hands the email off to Beehiiv's hosted subscribe page via `?email=`.
 *
 * To go live: confirm `subscribeUrl` below points at your publication's
 * /subscribe path. If you'd rather use Beehiiv's official iframe embed,
 * paste the embed URL into `embedUrl` and switch the form in
 * src/components/SubscribeForm.astro to render the iframe.
 */
export const BEEHIIV = {
  publication: 'https://thefoe.beehiiv.com',
  subscribeUrl: 'https://thefoe.beehiiv.com/subscribe',
  /** Optional: official Beehiiv embed iframe src, e.g. https://embeds.beehiiv.com/<uuid> */
  embedUrl: '',
} as const;

/** Primary navigation links (rendered right-aligned in the header). */
export const NAV = [
  { label: 'Essays', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Write for us', href: '/write-for-us' },
] as const;

/** Recurring newsletter copy, reused by the nav button, popup, and CTA band. */
export const NEWSLETTER = {
  eyebrow: 'The FOE Dispatch',
  heading: 'Foundations of engineering, in your inbox.',
  blurb:
    'One essay every other week on the ideas under the code — abstraction, correctness, taste, and the long half-life of good engineering. No spam, no fluff.',
  buttonLabel: 'Subscribe',
  placeholder: 'you@example.com',
  consent: 'Free. Unsubscribe anytime.',
} as const;
