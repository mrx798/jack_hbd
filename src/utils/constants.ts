export const CHAPTER_IDS = [
  'intro', 'reveal', 'who-she-is', 'her-story', 'family',
  'faith', 'friends', 'college', 'us', 'herself', 'gallery',
  'interactive', 'twenty-one', 'future',
  'cake', 'finale', 'credits',
] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];
