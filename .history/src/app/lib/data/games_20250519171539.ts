import { Game, Match, PersonaInfo } from '../types';

const availablePersonas: PersonaInfo[] = [
    { name: 'Hinata', avatarUrl: '/avatars/player-1.jpeg' },
    { name: 'Eren', avatarUrl: '/avatars/player-2.jpeg' },
    { name: 'Elon', avatarUrl: '/avatars/player-3.jpeg' },
    { name: 'Sukuna', avatarUrl: '/avatars/player-1.jpeg' },
    { name: 'Venom', avatarUrl: '/avatars/player-2.jpeg' },
    { name: 'Batman', avatarUrl: '/avatars/player-3.jpeg' },
    { name: 'Steve', avatarUrl: '/avatars/player-1.jpeg' },
    { name: 'Alex', avatarUrl: '/avatars/player-2.jpeg' },
    { name: 'Jonesy', avatarUrl: '/avatars/player-3.jpeg' },
    { name: 'Peely', avatarUrl: '/avatars/player-1.jpeg' },
];

const generateMatches = (gameId: number | string): Match[] => {
    const matches: Match[] = [];
    const numMatches = Math.random() > 0.2 ? 3 : Math.floor(Math.random() * 2) + 1; 

    const usedPairs: Set<string> = new Set();

    for (let i = 0; i < numMatches; i++) {
        let p1Index = Math.floor(Math.random() * availablePersonas.length);
        let p2Index = Math.floor(Math.random() * availablePersonas.length);
        
        let attempts = 0;
        while (p1Index === p2Index || usedPairs.has(`${p1Index}-${p2Index}`) || usedPairs.has(`${p2Index}-${p1Index}`)) {
            p1Index = Math.floor(Math.random() * availablePersonas.length);
            p2Index = Math.floor(Math.random() * availablePersonas.length);
            attempts++;
            if (attempts > 20) break; 
        }
        if (p1Index === p2Index) continue; 

        usedPairs.add(`${p1Index}-${p2Index}`);
        
        matches.push({
            id: `match_${gameId}_${i + 1}`,
            persona1: availablePersonas[p1Index],
            persona2: availablePersonas[p2Index],
        });
    }
    return matches;
};

export const games: Game[] = [
  {
    id: 1,
    title: 'Minecraft',
    category: 'Sandbox',
    description: 'Build, explore, and survive in a blocky, procedurally generated 3D world.',
    thumbnail: '/games/minecraft.jpeg',
    logo: '/games/minecraft-logo.jpeg',
    rating: 4.8,
    players: 1000,
    difficulty: 'Medium',
    duration: 'Varies',
    aiPersonas: ['Nova', 'Steve', 'Alex'],
    featured: true,
    label: 'Most Played',
    matches: generateMatches(1),
  },
  {
    id: 2,
    title: 'Fortnite',
    category: 'Battle Royale', 
    description: 'A free-to-play battle royale game with many game modes.',
    thumbnail: '/games/fortnite.jpeg',
    logo: '/games/fortnite-logo.jpeg',
    rating: 4.5,
    players: 850,
    difficulty: 'Medium',
    duration: '20 min',
    aiPersonas: ['Atlas', 'Jonesy', 'Peely'],
    featured: true,
    label: 'Most Recent',
    matches: generateMatches(2),
  },
  {
    id: 3,
    title: 'GTA VI',
    category: 'Action-Adventure',
    description: 'The highly anticipated next installment in the Grand Theft Auto series.',
    thumbnail: '/games/gta6.jpeg',
    logo: '/games/gta6-logo.jpeg',
    rating: 4.7, 
    players: 1200, 
    difficulty: 'Hard',
    duration: 'Varies',
    aiPersonas: ['Nova', 'Lucia', 'Jason'],
    featured: true,
    label: 'Promoted',
    matches: generateMatches(3),
  },
  {
    id: 4,
    title: 'RDR2',
    category: 'Action-Adventure',
    description: 'An epic tale of life in America’s unforgiving heartland.',
    thumbnail: '/games/rdr2.jpeg',
    logo: '/games/rdr2-logo.jpeg',
    rating: 4.9,
    players: 750,
    difficulty: 'Hard',
    duration: 'Varies',
    aiPersonas: ['Atlas', 'Arthur', 'Sadie'],
    featured: true,
    label: 'Promoted',
    matches: generateMatches(4),
  },
  {
    id: 5,
    title: 'Chess',
    category: 'Strategy',
    description: 'The classic game of strategy, tactics, and skill.',
    thumbnail: '/games/chesst.jpeg', 
    logo: '/games/chess-logo.jpeg', 
    rating: 4.6,
    players: 900,
    difficulty: 'Hard',
    duration: 'Varies',
    aiPersonas: ['Nova', 'Atlas', 'Magnus'],
    featured: true,
    label: 'Trending',
    matches: generateMatches(5),
  },
  {
    id: 6,
    title: 'Spiderman',
    category: 'Action-Adventure',
    description: 'Swing through New York as your friendly neighborhood Spiderman.',
    thumbnail: '/games/spiderman.jpeg',
    logo: '/games/spiderman-logo.jpeg',
    rating: 4.4,
    players: 650,
    difficulty: 'Medium',
    duration: '15-25 hours',
    aiPersonas: ['Atlas', 'Peter', 'Miles'],
    featured: true,
    label: 'Trending',
    matches: generateMatches(6),
  }
];