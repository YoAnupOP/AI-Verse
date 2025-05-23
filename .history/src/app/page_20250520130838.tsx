// src/app/page.tsx
"use client";

import { useState, useEffect } from 'react'; // Make sure useEffect is imported
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image'; 
import { ChevronLeft, ChevronRight, Search, Bell, MessageCircle } from 'lucide-react'; 
import { personas } from '@/lib/data/personas';
import { games } from '@/lib/data/games';
import { chatrooms as initialChatroomsData } from '@/lib/data/chatrooms'; // Renamed import
import { ChatroomCard } from './components/ui'; 
import { Hero } from './components/ui/hero'; 
import FuturisticCarousel from './components/ui/PersonaPreview'; 
import GameCard, { GameCardProps } from './components/ui/GameCard'; 
import type { Chatroom } from '@/lib/data/chatrooms'; // Assuming Chatroom type is exported

// Define an extended Chatroom type for client-side state if needed
interface ClientChatroom extends Chatroom {
  clientActiveUsers?: number;
}

export default function Home() {
  const [personaPage, setPersonaPage] = useState(0);
  const [chatroomPage, setChatroomPage] = useState(0);
  const [gamePage, setGamePage] = useState(0);
  
  const personasPerPage = 8;
  const chatroomsPerPage = 4; 
  const gamesPerPage = 2;
  
  const featuredPersonas = personas.slice(0, 3); 
  const recentDMs = personas.filter(persona => persona.lastMessage); 
  const featuredGames = games.filter(game => game.featured); 

  // State for chatrooms to handle client-side specific data like random activeUsers
  const [chatrooms, setChatrooms] = useState<ClientChatroom[]>(initialChatroomsData);

  useEffect(() => {
    // This effect runs once on the client after initial hydration
    // It updates chatroom data with client-side generated values if needed
    setChatrooms(prevChatrooms => 
      prevChatrooms.map(cr => {
        // If activeUsers is missing or needs to be randomized client-side
        if (cr.activeUsers === undefined || cr.activeUsers === null) {
          return { ...cr, clientActiveUsers: Math.floor(Math.random() * 20) + 5 };
        }
        return cr;
      })
    );
  }, []); // Empty dependency array ensures this runs only once on mount

  const activeChatrooms = chatrooms; // Use the state variable
  
  const totalPersonaPages = Math.ceil(recentDMs.length / personasPerPage);
  const totalChatroomPages = Math.ceil(activeChatrooms.length / chatroomsPerPage);
  const totalGamePages = Math.ceil(featuredGames.length / gamesPerPage);
  
  const currentPersonas = recentDMs.slice(
    personaPage * personasPerPage, 
    (personaPage + 1) * personasPerPage
  );
  
  const currentChatrooms = activeChatrooms.slice(
    chatroomPage * chatroomsPerPage, 
    (chatroomPage + 1) * chatroomsPerPage
  );
  
  const currentGamesToDisplay = featuredGames.slice(
    gamePage * gamesPerPage, 
    (gamePage + 1) * gamesPerPage
  );
  
  const nextPersonaPage = () => {
    setPersonaPage((prev) => (prev + 1) % totalPersonaPages);
  };
  
  const prevPersonaPage = () => {
    setPersonaPage((prev) => (prev === 0 ? totalPersonaPages - 1 : prev - 1));
  };
  
  const nextChatroomPage = () => {
    setChatroomPage((prev) => (prev + 1) % totalChatroomPages);
  };
  
  const prevChatroomPage = () => {
    setChatroomPage((prev) => (prev === 0 ? totalChatroomPages - 1 : prev - 1));
  };
  
  const nextGamePage = () => {
    setGamePage((prev) => (prev + 1) % totalGamePages);
  };
  
  const prevGamePage = () => {
    setGamePage((prev) => (prev === 0 ? totalGamePages - 1 : prev - 1));
  };

  return (
    <MainLayout>
      <div className="">
        <div className="mb-4">
          <Hero />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <h2 className="text-3xl sm:text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium">Chatrooms</h2>
            <div className="flex items-center space-x-2">
              <Link href="/chatrooms" className="text-sm sm:text-base bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                View all
              </Link>
              <div className="hidden md:flex space-x-1">
                <button 
                  onClick={prevChatroomPage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-800/60 hover:bg-neutral-700/80 transition-colors"
                  aria-label="Previous chatroom page"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button 
                  onClick={nextChatroomPage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-neutral-800/60 hover:bg-neutral-700/80 transition-colors"
                  aria-label="Next chatroom page"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide p-4">
            <div className="flex space-x-4 sm:space-x-5 px-3 py-3"> 
              {activeChatrooms.map((chatroom, idx) => (
                <ChatroomCard 
                  key={chatroom.id}
                  id={chatroom.id}
                  name={chatroom.name}
                  participants={chatroom.participants}
                  activeUsers={chatroom.clientActiveUsers !== undefined ? chatroom.clientActiveUsers : chatroom.activeUsers || 0}
                  thumbnail={chatroom.thumbnail || `/chatrooms/default-${idx % 4 + 1}.jpg`}
                  description={chatroom.description || "Explore the AI universe"}
                  tags={chatroom.tags || ["AI", "Chat", "Technology"]}
                  status={chatroom.status || "active"}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentChatrooms.map((chatroom, idx) => (
              <ChatroomCard 
                key={chatroom.id}
                id={chatroom.id}
                name={chatroom.name}
                participants={chatroom.participants}
                activeUsers={chatroom.clientActiveUsers !== undefined ? chatroom.clientActiveUsers : chatroom.activeUsers || 0}
                thumbnail={chatroom.thumbnail || `/chatrooms/default-${idx % 4 + 1}.jpg`}
                description={chatroom.description || "Explore the AI universe"}
                tags={chatroom.tags || ["AI", "Chat", "Technology"]}
                status={chatroom.status || "active"}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-10 mb-8">
          <h2 className="text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium -mb-8">
            Persona Preview
          </h2>
          <div className="p-4 relative overflow-hidden"> 
            <FuturisticCarousel />
          </div>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> 
          {currentGamesToDisplay.map(game => ( 
            <GameCard
              key={game.id}
              id={String(game.id)} 
              title={game.title}
              logoUrl={game.logo || game.thumbnail || '/games/default-logo.png'} 
              matches={game.matches || []} 
              gamePath={`/game-zone/${game.id}`}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}