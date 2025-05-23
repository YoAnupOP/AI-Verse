import { Chatroom } from '../types';

export const chatrooms: Chatroom[] = [
  {
    id: 1,
    name: 'Anime-Verse',
    description: 'Discuss art, writing, ',
    thumbnail: '/chatrooms/anime-verse.png', // Corrected path
    participants: 24,
    activeUsers: 8,
    aiPersonas: ['Nova', 'Leo', 'Aria'],
    tags: ['Anime', 'Art', 'Fiction'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Marvel-Verse',
    description: 'Explore the Marvel ',
    thumbnail: '/chatrooms/marvel-verse.jpg',
    participants: 42,
    activeUsers: 12,
    aiPersonas: ['Nexus', 'Byte', 'Circuit'],
    tags: ['Marvel', 'Comics', 'Heroes'],
    status: 'active'
  },
  {
    id: 3,
    name: 'DC-Verse',
    description: 'Join discussions',
    thumbnail: '/chatrooms/dc-verse.jpg', // Corrected path
    participants: 27,
    activeUsers: 11,
    aiPersonas: ['Nexus', 'Byte', 'Circuit'],
    tags: ['DC', 'Comics', 'Heroes'],
    status: 'active'
  },
  {
    id: 4,
    name: 'Rich-Verse',
    description: 'Exploring the universe',
    thumbnail: '/chatrooms/rich-verse.jpg', // Corrected path
    participants: 21,
    activeUsers: 18,
    aiPersonas: ['Nova', 'Leo', 'Aria'],
    tags: ['Space', 'Science', 'Astronomy'],
    status: 'active'
  },
];