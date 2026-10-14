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
    category: z.string().default('Write-up'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// LinkedIn posts mirrored on /posts. Body = the post text.
const linkedin = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/linkedin' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    kind: z.enum(['milestone', 'cert', 'ctf', 'post']).default('post'),
    url: z.string().url().optional(), // link to the LinkedIn post
    image: z.string().optional(), // e.g. /images/linkedin/holmes-ctf.png
    imageAlt: z.string().optional(),
    stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, linkedin };
