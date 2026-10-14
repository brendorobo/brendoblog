import { getCollection } from 'astro:content';

export async function getPosts() {
  const posts = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getLabs() {
  const labs = await getCollection('labs', ({ data }) => import.meta.env.DEV || !data.draft);
  return labs.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function readingTime(body = '') {
  return Math.max(1, Math.round(body.split(/\s+/).length / 220));
}
