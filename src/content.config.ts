import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts: notes, write-ups, study logs.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // e.g. "GCFA", "Homelab", "Tooling" — shown as a colored case-file label
    category: z.string().default('Notes'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Labs: hands-on projects / experiments, each can embed its own interactive pieces.
const labs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'complete', 'planned']).default('active'),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, labs };
