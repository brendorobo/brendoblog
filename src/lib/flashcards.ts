// Turns the cheat sheet data into flashcards. Anything added to src/data/cheatsheet.ts
// becomes quiz material automatically.
import type { Section } from '../data/cheatsheet';

export interface Flashcard {
  id: string;
  section: string; // section id
  label: string; // small context line, e.g. "Event IDs"
  front: string; // HTML
  back: string; // HTML
}

const strip = (html: string) => html.replace(/<[^>]+>/g, '').trim();

export function buildFlashcards(sections: Section[]): Flashcard[] {
  const cards: Flashcard[] = [];
  const add = (sec: Section, label: string, front: string, back: string) => {
    if (!strip(front) || !strip(back)) return;
    cards.push({ id: `${sec.id}-${cards.length}`, section: sec.id, label, front, back });
  };

  for (const sec of sections) {
    for (const b of sec.blocks) {
      const label = 'title' in b && b.title ? b.title : sec.title;

      if (b.type === 'steps') {
        b.items.forEach((it, i) => {
          add(sec, label, `IR step ${i + 1}: what is it, and what happens?`, `<strong>${it.title}</strong><br>${it.body}`);
        });
      }

      if (b.type === 'table') {
        if (b.head[0] === '') {
          // Comparison grid (rows = attributes, columns = things): one card per cell.
          for (const row of b.rows) {
            for (let c = 1; c < b.head.length; c++) {
              add(sec, label, `<strong>${b.head[c]}</strong>: ${strip(row[0]).toLowerCase()}?`, row[c]);
            }
          }
        } else {
          // Normal table: the first meaningful column is the prompt, the rest is the answer.
          const key = b.head[0] === '#' ? 1 : 0;
          for (const row of b.rows) {
            const back = row
              .map((cell, c) => (c === key || b.head[c] === '#' ? '' : `<span class="k">${b.head[c]}</span> ${cell}`))
              .filter(Boolean)
              .join('<br>');
            add(sec, label, row[key], back);
          }
        }
      }

      if (b.type === 'kv') {
        for (const [k, v] of b.items) add(sec, label, label === 'Logon types' ? `Logon type ${k}` : k, v);
      }

      if (b.type === 'cards') {
        for (const c of b.items) add(sec, label, c.title, c.body);
      }
    }
  }
  return cards;
}
