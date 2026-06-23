// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://thefoe.dev',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});
