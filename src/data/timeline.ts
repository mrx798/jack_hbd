import type { TimelineEvent } from '../types';
import { asset } from '../utils/asset';

export const timeline: TimelineEvent[] = [
  {
    id: 'beginning',
    year: '2007',
    title: 'The Beginning',
    description: 'The beginning of the beautiful girl she would one day become.',
    image: asset('/images/timeline/beginning.png'),
    icon: '👶',
  },
  {
    id: 'growing-up',
    year: '2011',
    title: 'Growing Up',
    description: 'Childhood filled with laughter, mischief, and endless little adventures.',
    image: asset('/images/timeline/growing.png'),
    icon: '🌱',
  },
  {
    id: 'school-days',
    year: '2015',
    title: 'School Days',
    description: 'The years that slowly shaped the person she was becoming.',
    image: asset('/images/timeline/school.png'),
    icon: '📚',
  },
  {
    id: 'call-to-care',
    year: '2022',
    title: 'The Call to Care',
    description: 'A little nervous, a little excited, and ready for what came next.',
    image: asset('/images/timeline/care.png'),
    icon: '🩺',
  },
  {
    id: 'college-life',
    year: '2023',
    title: 'College Life',
    description: 'The years that turned the girl she was into the woman she is today.',
    image: asset('/images/timeline/college.jpg'),
    icon: '🏥',
  },
  {
    id: 'today',
    year: '2026',
    title: 'Today — 21',
    description: 'And this is only the beginning of everything yet to come.',
    image: asset('/images/timeline/now.png'),
    icon: '✨',
  },
];

