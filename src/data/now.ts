// The "currently" box on the home page and the study log on /journey.
// Update `updated` whenever you change something here.

export const NOW = {
  updated: '2026-10-14',
  items: [
    { k: 'studying', v: 'Working toward the GCFA (SANS FOR508)' },
    // { k: 'reading', v: '...' },
    // { k: 'writing', v: '...' },
  ],
  // How studying is going. Leave text empty to hide it.
  // mood: 1 = rough, 2 = grinding, 3 = steady, 4 = clicking, 5 = locked in
  mood: { level: 0, text: '' },
};

// Study log, newest first. Shows on /journey once it has entries. Example:
// { date: '2026-10-20', topic: 'Memory forensics: code injection', mood: 4,
//   note: 'malfind finally made sense after running it on a real sample.' },
export const STUDY_LOG: { date: string; topic: string; mood: 1 | 2 | 3 | 4 | 5; note: string }[] = [];

export const MOODS = {
  1: { emoji: '🥵', label: 'rough' },
  2: { emoji: '😤', label: 'grinding' },
  3: { emoji: '🙂', label: 'steady' },
  4: { emoji: '💡', label: 'clicking' },
  5: { emoji: '🔥', label: 'locked in' },
} as const;
