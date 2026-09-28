import type { FriendPhoto } from '../types';

// Curated order: balanced orientation mix across 5 rows of 3
// Row 1: H (group-color) → V (duo-formal) → H (duo-indoor)
// Row 2: H (outdoor-bright) → V (group-fun) → H (close-up)
// Row 3: H (group-outdoor) → S (duo-saree) → H (B&W-group)
// Row 4: V (event-laughing) → H (trio-outdoor) → V (duo-dark)
// Row 5: H (filter-fun) → S (trio-formal) → H (B&W-group)
export const friends: FriendPhoto[] = [
  { id: 'friend-01', src: '/images/friends/g1.jpg',   orientation: 'horizontal' },
  { id: 'friend-02', src: '/images/friends/un.png',   orientation: 'vertical'   },
  { id: 'friend-03', src: '/images/friends/ami.png',  orientation: 'horizontal' },

  { id: 'friend-04', src: '/images/friends/siss.png', orientation: 'horizontal' },
  { id: 'friend-05', src: '/images/friends/g3.jpg',   orientation: 'vertical'   },
  { id: 'friend-06', src: '/images/friends/jev.png',  orientation: 'horizontal' },

  { id: 'friend-07', src: '/images/friends/g4.png',   orientation: 'horizontal' },
  { id: 'friend-08', src: '/images/friends/akka.png', orientation: 'square'     },
  { id: 'friend-09', src: '/images/friends/g5.jpg',   orientation: 'horizontal' },

  { id: 'friend-10', src: '/images/friends/un1.png',  orientation: 'vertical'   },
  { id: 'friend-11', src: '/images/friends/g6.png',   orientation: 'horizontal' },
  { id: 'friend-12', src: '/images/friends/un3.jpg',  orientation: 'vertical'   },

  { id: 'friend-13', src: '/images/friends/ju.png',   orientation: 'horizontal' },
  { id: 'friend-14', src: '/images/friends/g7.png',   orientation: 'square'     },
  { id: 'friend-15', src: '/images/friends/g2.jpg',   orientation: 'horizontal' },
];
