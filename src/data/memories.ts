import type { Memory } from '../types';

export const memories: Memory[] = [
  // Hero chapter
  { id: 'hero-1', src: '/images/hero/main.jpg', caption: '[ADD CAPTION — Her best hero shot]', chapter: 'hero', type: 'image' },

  // College chapter
  { id: 'college-1', src: '/images/college/001.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },
  { id: 'college-2', src: '/images/college/002.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },
  { id: 'college-3', src: '/images/college/003.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },
  { id: 'college-4', src: '/images/college/004.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },
  { id: 'college-5', src: '/images/college/005.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },
  { id: 'college-6', src: '/images/college/006.jpg', caption: '[ADD CAPTION]', chapter: 'college', type: 'image' },

  // Us chapter
  { id: 'us-1', src: '/images/us/shaja.jpg', caption: '', chapter: 'us', type: 'image' },
  { id: 'us-2', src: '/images/us/ai.png', caption: '', chapter: 'us', type: 'image' },

  // Portraits — "The Girl Behind All of It"
  { id: 'portrait-1', src: '/images/portraits/child1.jpg', caption: '', chapter: 'portraits', type: 'image' },
  { id: 'portrait-2', src: '/images/portraits/jagu.png', caption: '', chapter: 'portraits', type: 'image' },
  { id: 'portrait-3', src: '/images/portraits/mic.jpg', caption: '', chapter: 'portraits', type: 'image' },
  { id: 'portrait-4', src: '/images/portraits/hand.jpg', caption: '', chapter: 'portraits', type: 'image' },
  { id: 'portrait-5', src: '/images/portraits/wed.jpg', caption: '', chapter: 'portraits', type: 'image' },
  { id: 'portrait-6', src: '/videos/vid.mp4', caption: '', chapter: 'portraits', type: 'video' },

  // General gallery
  { id: 'gallery-1', src: '/images/gallery/001.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },
  { id: 'gallery-2', src: '/images/gallery/002.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },
  { id: 'gallery-3', src: '/images/gallery/003.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },
  { id: 'gallery-4', src: '/images/gallery/004.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },
  { id: 'gallery-5', src: '/images/gallery/005.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },
  { id: 'gallery-6', src: '/images/gallery/006.jpg', caption: '[ADD CAPTION]', chapter: 'gallery', type: 'image' },

  // Faith
  { id: 'faith-1', src: '/images/faith/god.png', caption: '', chapter: 'faith', type: 'image' },
  { id: 'faith-2', src: '/images/faith/god1.png', caption: '', chapter: 'faith', type: 'image' },
];

export const getMemoriesByChapter = (chapter: string): Memory[] =>
  memories.filter((m) => m.chapter === chapter);
