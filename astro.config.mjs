import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Custom domain (DNS on Cloudflare).
export default defineConfig({
  site: 'https://brendorobo.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
