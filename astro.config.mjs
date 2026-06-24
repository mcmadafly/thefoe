// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://thefoe.dev',
  // Pages are prerendered to static HTML by default; only routes that opt out
  // (export const prerender = false) run on-demand in the Cloudflare Worker.
  // The /api/subscribe endpoint uses this to post signups to Beehiiv server-side.
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
