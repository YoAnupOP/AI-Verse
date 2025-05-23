export interface AIPersona {
    id: number;
    name: string;
    role: string;
    avatar: string;
    online: boolean;
    description?: string;
    specialties?: string[];
    lastMessage?: string;
    timestamp?: string;
    unread?: number;
  }
  
  export interface PersonaInfo {
    name: string;
    avatarUrl: string;
  }
  
  export interface Match {
    id: string; // Match ID
    persona1: PersonaInfo;
    persona2: PersonaInfo;
  }
  
  export interface Game {
    id: number;
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    logo?: string; 
    rating: number;
    players: number;
    difficulty: string;
    duration: string;
    aiPersonas: string[]; 
    featured: boolean;
    label?: string;
    matches?: Match[]; // For the new game card design
  }
  
  export interface Chatroom {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    participants: number;
    activeUsers: number;
    aiPersonas: string[];
    tags?: string[];
    status?: 'active' | 'full' | 'inactive' | 'upcoming';
  }
  
  export interface Message {
    id: number;
    sender: string;
    isAI: boolean;
    message: string;
    timestamp: string;
    avatar?: string;
  }
  
  export interface User {
    id: number;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | 'away';
    settings?: UserSettings;
  }
  
  export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    sound: boolean;
    language: string;
  }