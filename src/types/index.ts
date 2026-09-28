// ─── Shared Types ─────────────────────────────────────

export interface SiteConfig {
  recipientName: string;
  recipientNickname: string;
  recipientAge: number;
  birthdayDate: string; // ISO date string, e.g. "2026-09-28"
  authorName: string;
  authorRelationship: string;
  musicFile: string;
  ogImage: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
  icon: string; // unicode emoji
}

export interface PersonCard {
  id: string;
  name: string;
  role: string;
  image: string;
  quote?: string;
}

export interface FriendPhoto {
  id: string;
  src: string;
  orientation: 'horizontal' | 'vertical' | 'square';
}

export interface Memory {
  id: string;
  src: string;
  caption: string;
  chapter: string;
  type: 'image' | 'video';
  aspectRatio?: '1:1' | '4:3' | '3:4' | '16:9' | '9:16';
}

export interface BibleVerse {
  id: string;
  reference: string;
  text: string;
  theme?: string;
}

export interface Wish {
  id: string;
  from: string;
  message: string;
  avatar?: string;
}

export interface OpenWhenCard {
  id: string;
  theme: string; // e.g. "you're tired", "you doubt yourself"
  emoji: string;
  message: string;
  color: string; // accent color for the card
}

export interface VideoItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  caption?: string;
}

export interface TwentyOneItem {
  id: number;
  text: string;
}

export interface ChapterMood {
  name: string;
  orbColors: [string, string, string]; // primary, secondary, accent
  particleIntensity: number; // 0-1
  backgroundTint: string;
}

export interface ChapterInfo {
  id: string;
  number: string;
  label: string;
  mood: ChapterMood;
}
