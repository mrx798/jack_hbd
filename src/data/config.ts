import type { SiteConfig, ChapterInfo } from '../types';

export const siteConfig: SiteConfig = {
  recipientName: 'Jacqueline Veronica',
  recipientNickname: 'Jack',
  recipientAge: 21,
  birthdayDate: '2026-09-28',
  authorName: 'Chaos Partner',
  authorRelationship: 'Best Friend',
  musicFile: '/audio/The-Metro-Proposal.mp3',
  ogImage: '/images/og-preview.jpg',
};

export const chapters: ChapterInfo[] = [
  {
    id: 'intro',
    number: '00',
    label: 'The Door',
    mood: {
      name: 'void',
      orbColors: ['#6b21a8', '#3b0764', '#1e1b4b'],
      particleIntensity: 0.3,
      backgroundTint: 'hsl(270, 30%, 4%)',
    },
  },
  {
    id: 'reveal',
    number: '01',
    label: 'Happy Birthday',
    mood: {
      name: 'celebration',
      orbColors: ['#e879a8', '#f5c471', '#fbbf24'],
      particleIntensity: 0.9,
      backgroundTint: 'hsl(340, 30%, 8%)',
    },
  },
  {
    id: 'who-she-is',
    number: '02',
    label: 'Who She Is',
    mood: {
      name: 'reflective',
      orbColors: ['#8b5cf6', '#6366f1', '#a78bfa'],
      particleIntensity: 0.5,
      backgroundTint: 'hsl(268, 35%, 7%)',
    },
  },
  {
    id: 'her-story',
    number: '03',
    label: 'Her Story',
    mood: {
      name: 'narrative',
      orbColors: ['#7c3aed', '#4f46e5', '#818cf8'],
      particleIntensity: 0.5,
      backgroundTint: 'hsl(268, 35%, 7%)',
    },
  },
  {
    id: 'family',
    number: '04',
    label: 'Family',
    mood: {
      name: 'warm',
      orbColors: ['#f59e0b', '#e879a8', '#fbbf24'],
      particleIntensity: 0.5,
      backgroundTint: 'hsl(25, 25%, 7%)',
    },
  },
  {
    id: 'faith',
    number: '05',
    label: 'Faith',
    mood: {
      name: 'reverent',
      orbColors: ['#fef3c7', '#fbbf24', '#ffffff'],
      particleIntensity: 0.4,
      backgroundTint: 'hsl(40, 15%, 5%)',
    },
  },
  {
    id: 'friends',
    number: '06',
    label: 'Friends',
    mood: {
      name: 'warm',
      orbColors: ['#ec4899', '#f59e0b', '#a78bfa'],
      particleIntensity: 0.6,
      backgroundTint: 'hsl(330, 25%, 8%)',
    },
  },
  {
    id: 'college',
    number: '07',
    label: 'College Life',
    mood: {
      name: 'clinical-warm',
      orbColors: ['#06b6d4', '#8b5cf6', '#a78bfa'],
      particleIntensity: 0.6,
      backgroundTint: 'hsl(260, 30%, 8%)',
    },
  },
  {
    id: 'us',
    number: '08',
    label: 'Us',
    mood: {
      name: 'intimate',
      orbColors: ['#6b21a8', '#4c1d95', '#7c3aed'],
      particleIntensity: 0.3,
      backgroundTint: 'hsl(270, 40%, 5%)',
    },
  },
  {
    id: 'herself',
    number: '09',
    label: 'Her',
    mood: {
      name: 'portrait',
      orbColors: ['#e879a8', '#a78bfa', '#fbbf24'],
      particleIntensity: 0.5,
      backgroundTint: 'hsl(340, 30%, 7%)',
    },
  },
  {
    id: 'gallery',
    number: '10',
    label: 'Memories',
    mood: {
      name: 'nostalgic',
      orbColors: ['#8b5cf6', '#ec4899', '#f59e0b'],
      particleIntensity: 0.6,
      backgroundTint: 'hsl(280, 30%, 7%)',
    },
  },
  {
    id: 'interactive',
    number: '11',
    label: 'Moments',
    mood: {
      name: 'playful',
      orbColors: ['#a78bfa', '#ec4899', '#fbbf24'],
      particleIntensity: 0.7,
      backgroundTint: 'hsl(280, 25%, 8%)',
    },
  },
  {
    id: 'twenty-one',
    number: '12',
    label: '21',
    mood: {
      name: 'milestone',
      orbColors: ['#fbbf24', '#e879a8', '#f5c471'],
      particleIntensity: 0.7,
      backgroundTint: 'hsl(38, 25%, 7%)',
    },
  },
  {
    id: 'future',
    number: '13',
    label: 'Future',
    mood: {
      name: 'hopeful',
      orbColors: ['#818cf8', '#a78bfa', '#c4b5fd'],
      particleIntensity: 0.4,
      backgroundTint: 'hsl(260, 30%, 6%)',
    },
  },
  {
    id: 'cake',
    number: '14',
    label: 'The Cake',
    mood: {
      name: 'peak-celebration',
      orbColors: ['#fbbf24', '#e879a8', '#f5c471'],
      particleIntensity: 1.0,
      backgroundTint: 'hsl(38, 30%, 6%)',
    },
  },
  {
    id: 'finale',
    number: '15',
    label: 'Finale',
    mood: {
      name: 'closing',
      orbColors: ['#7c3aed', '#4c1d95', '#1e1b4b'],
      particleIntensity: 0.3,
      backgroundTint: 'hsl(270, 35%, 4%)',
    },
  },
  {
    id: 'credits',
    number: '16',
    label: 'Credits',
    mood: {
      name: 'fade',
      orbColors: ['#6b21a8', '#3b0764', '#0d0618'],
      particleIntensity: 0.2,
      backgroundTint: 'hsl(270, 30%, 3%)',
    },
  },
];
