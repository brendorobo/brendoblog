import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  // newest first; on the same day, meta posts (like the welcome post) go last
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || Number(a.data.category === 'Meta') - Number(b.data.category === 'Meta'));
}

export async function getLinkedIn() {
  const items = await getCollection('linkedin');
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingTime(body = '') {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}
