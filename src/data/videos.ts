import type { VideoItem } from '../types';
import { asset } from '../utils/asset';

export const videos: VideoItem[] = [
  {
    id: 'video-1',
    src: asset('/videos/memory-1.mp4'),
    poster: asset('/images/gallery/001.jpg'),
    title: '[ADD VIDEO TITLE]',
    caption: '[ADD CAPTION]',
  },
  {
    id: 'video-2',
    src: asset('/videos/memory-2.mp4'),
    poster: asset('/images/gallery/002.jpg'),
    title: '[ADD VIDEO TITLE]',
    caption: '[ADD CAPTION]',
  },
];

