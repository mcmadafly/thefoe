import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Italic subtitle shown under the title. */
    dek: z.string(),
    /** Mono eyebrow above the title, e.g. "Essay · Foundations". */
    kicker: z.string().default('Essay'),
    author: z.string().default('The FOE'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
