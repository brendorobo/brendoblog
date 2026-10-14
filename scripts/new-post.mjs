// Scaffold a new post or lab.
//   npm run new -- "My post title"
//   npm run new -- lab "My lab title"
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const args = process.argv.slice(2);
const isLab = args[0] === 'lab';
const title = (isLab ? args.slice(1) : args).join(' ').trim();
if (!title) {
  console.error('usage: npm run new -- "Title"   |   npm run new -- lab "Title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const date = new Date().toISOString().slice(0, 10);
const dir = isLab ? 'src/content/labs' : 'src/content/posts';
const file = `${dir}/${slug}.mdx`;
const imgDir = `public/images/${isLab ? 'labs' : 'posts'}/${slug}`;

if (existsSync(file)) {
  console.error(`already exists: ${file}`);
  process.exit(1);
}

const front = isLab
  ? `title: '${title.replace(/'/g, "''")}'\ndescription: ''\ndate: ${date}\nstatus: active\nstack: []\ndraft: true`
  : `title: '${title.replace(/'/g, "''")}'\ndescription: ''\ndate: ${date}\ncategory: Notes\ntags: []\ndraft: true`;

const body = `---
${front}
---
import Callout from '../../components/mdx/Callout.astro';
import Cmd from '../../components/mdx/Cmd.astro';
import Figure from '../../components/mdx/Figure.astro';

Start writing here.

{/* Images: put them in ${imgDir}/ then
<Figure src="/${imgDir.replace('public/', '')}/screenshot.png" alt="..." caption="..." /> */}
`;

mkdirSync(imgDir, { recursive: true });
writeFileSync(file, body);
console.log(`created ${file}\nimages go in ${imgDir}/\n(draft: true, so it only shows in dev until you remove that line)`);
