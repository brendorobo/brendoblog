// One place to edit your personal details.
export const SITE = {
  name: 'brendorobo',
  author: 'Brendon Roberts',
  title: 'brendorobo // DFIR write-ups',
  description:
    'DFIR write-ups and blog by Brendon Roberts: forensics, GCFA prep, CTFs and the things I learn along the way.',
  github: 'https://github.com/brendorobo',
  linkedin: 'https://www.linkedin.com/in/brendon-roberts2023',
  email: '', // optional public contact address
  photo: '/images/brendon.webp',
  avatar: '/images/brendon-160.webp',
  // Cloudflare Web Analytics token (Cloudflare dashboard → Analytics & Logs → Web Analytics). Empty = off.
  cfAnalyticsToken: '',
  // Comments via giscus.app (GitHub Discussions). Fill categoryId from giscus.app to turn on.
  giscus: {
    repo: 'brendorobo/brendoblog',
    repoId: 'R_kgDOVJT2tw',
    category: 'Comments',
    categoryId: '',
  },
};

// Color themes. THEME is the default; visitors can switch from the header or terminal.
export const THEMES = {
  nebula: { label: 'nebula', swatch: '#8c7dff', bg: '#07081a' }, // blue / purple
  breach: { label: 'breach', swatch: '#ff3b4e', bg: '#0b0506' }, // red
  abyss: { label: 'abyss', swatch: '#3d9bff', bg: '#030a16' }, // dark blue
  phosphor: { label: 'phosphor', swatch: '#39ff88', bg: '#070b0a' }, // terminal green
} as const;
export type ThemeName = keyof typeof THEMES;
export const THEME: ThemeName = 'nebula';

export const NAV = [
  { href: '/blog/', label: 'write-ups' },
  { href: '/posts/', label: 'posts' },
  { href: '/cheatsheet/', label: 'cheatsheet' },
  { href: '/journey/', label: 'journey' },
  { href: '/about/', label: 'whoami' },
];
