// Scaffold a new write-up or LinkedIn post entry.
//   npm run new -- "My write-up title"
//   npm run new -- linkedin "Passed the GCFA"
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const isLinkedIn = args[0] === 'linkedin';
const title = (isLinkedIn ? args.slice(1) : args).join(' ').trim();
if (!title) {
  console.error('usage: npm run new -- "Title"   |   npm run new -- linkedin "Title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const date = new Date().toISOString().slice(0, 10);
const quoted = `'${title.replace(/'/g, "''")}'`;

if (isLinkedIn) {
  const file = `src/content/linkedin/${slug}.md`;
  if (existsSync(file)) { console.error(`already exists: ${file}`); process.exit(1); }
  writeFileSync(file, `---
title: ${quoted}
date: ${date}
kind: post # milestone | cert | ctf | post
url: # paste the LinkedIn post link here
# image: /images/linkedin/${slug}.png
# imageSize: [1280, 720] # width, height of the image
stats: []
#  - { label: rank, value: '1st' }
tags: []
---
Paste the post text here.
`);
  console.log(`created ${file}\nimages go in public/images/linkedin/`);
} else {
  const file = `src/content/posts/${slug}.mdx`;
  const imgDir = `public/images/posts/${slug}`;
  if (existsSync(file)) { console.error(`already exists: ${file}`); process.exit(1); }
  mkdirSync(imgDir, { recursive: true });
  writeFileSync(file, `---
title: ${quoted}
description: ''
date: ${date}
category: Write-up
tags: []
draft: true
---
import Callout from '../../components/mdx/Callout.astro';
import Cmd from '../../components/mdx/Cmd.astro';
import Figure from '../../components/mdx/Figure.astro';

Start writing here.

{/* Images: put them in ${imgDir}/ then
<Figure src="/${imgDir.replace('public/', '')}/screenshot.png" alt="..." caption="..." /> */}
`);
  console.log(`created ${file}\nimages go in ${imgDir}/\n(draft: true, so it only shows in dev until you remove that line)`);
}
