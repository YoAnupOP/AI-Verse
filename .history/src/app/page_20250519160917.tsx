"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image'; // Image component is imported but not used in the provided Home component code.
import { ChevronLeft, ChevronRight, Search, Bell, MessageCircle } from 'lucide-react'; // Search, Bell, MessageCircle also not used in Home.
import { personas } from '@/lib/data/personas';
import { games } from '@/lib/data/games';
import { chatrooms } from '@/lib/data/chatrooms';
import { ChatroomCard } from './components/ui'; // Assuming ChatroomCard is correctly imported
import { Hero } from './components/ui/hero'; // Assuming Hero is correctly imported
import FuturisticCarousel from './components/ui/PersonaPreview'; // Assuming FuturisticCarousel is correctly imported
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import GameCard, { GameCardProps } from './components/ui/GameCard'; // Updated import to GameCard

export default function Home() {
  // State for pagination in different sections
  const [personaPage, setPersonaPage] = useState(0);
  const [chatroomPage, setChatroomPage] = useState(0);
  const [gamePage, setGamePage] = useState(0);
  
  // Items per page for different sections
  const personasPerPage = 8;
  const chatroomsPerPage = 4; // Used for desktop grid
  const gamesPerPage = 2;
  
  
  // Filter featured content
  const featuredPersonas = personas.slice(0, 3); // Not used in the Chatrooms section rendering
  const recentDMs = personas.filter(persona => persona.lastMessage); // Used for currentPersonas
  const featuredGames = games.filter(game => game.featured); // Used for currentGames
  const activeChatrooms = chatrooms; // Used for mobile scroll and desktop grid data source
  
  // Calculate pages for pagination
  const totalPersonaPages = Math.ceil(recentDMs.length / personasPerPage);
  const totalChatroomPages = Math.ceil(activeChatrooms.length / chatroomsPerPage);
  const totalGamePages = Math.ceil(featuredGames.length / gamesPerPage);
  
  // Get current page items
  const currentPersonas = recentDMs.slice(
    personaPage * personasPerPage, 
    (personaPage + 1) * personasPerPage
  );
  
  const currentChatrooms = activeChatrooms.slice(
    chatroomPage * chatroomsPerPage, 
    (chatroomPage + 1) * chatroomsPerPage
  );
  
  const currentGames = featuredGames.slice(
    gamePage * gamesPerPage, 
    (gamePage + 1) * gamesPerPage
  );
  
  // Navigation functions
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
      {/* MODIFIED: Removed vertical spacing between sections */}
      <div className="">
        
        {/* Placeholder for Welcome/Header section if it's part of this scrollable content */}
        {/* <div> ... </div> */}
        <div className="mb-4">
        < Hero />
        </div>
        
        {/* Search and Notification Icons */}
        {/*Chatrooms Section*/}
        <div>
          {/* MODIFIED: Responsive margin for the section header */}
          <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <h2 className="text-3xl sm:text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium">Chatrooms</h2>
            <div className="flex items-center space-x-2">
              <Link href="/chatrooms" className="text-sm sm:text-base bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                View all
              </Link>
              {/* Desktop only pagination arrows */}
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
          
          {/* Mobile horizontal scrollable view */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide p-4">
            {/* MODIFIED: Responsive horizontal spacing between cards */}
            {/* px-3 provides padding at the start and end of the scrollable list */}
            <div className="flex space-x-4 sm:space-x-5 px-3 py-3"> 
              {activeChatrooms.map((chatroom, idx) => (
                <ChatroomCard 
                  key={chatroom.id}
                  id={chatroom.id}
                  name={chatroom.name}
                  participants={chatroom.participants}
                  activeUsers={chatroom.activeUsers || Math.floor(Math.random() * 20) + 5}
                  thumbnail={chatroom.thumbnail || `/chatrooms/default-${idx % 4 + 1}.jpg`}
                  description={chatroom.description || "Explore the AI universe"}
                  tags={chatroom.tags || ["AI", "Chat", "Technology"]}
                  status={chatroom.status || "active"}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop grid view with pagination */}
          {/* gap-5 provides spacing for the grid items */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {currentChatrooms.map((chatroom, idx) => (
              <ChatroomCard 
                key={chatroom.id}
                id={chatroom.id}
                name={chatroom.name}
                participants={chatroom.participants}
                activeUsers={chatroom.activeUsers || Math.floor(Math.random() * 20) + 5}
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
  <div className="p-4 relative overflow-hidden"> {/* ADD overflow-hidden BACK HERE */}
  <FuturisticCarousel />
</div>
</div>
        
        {/* Game Zone */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6"> {/* Adjusted grid for potentially wider cards */}
            {currentGamesToDisplay.map(game => ( // game is inferred as Game type from ./lib/data/games
              <GameCard
                 key={game.id}
                // The NewGameCardProps interface expects id to be a string.
                // Game ID from data is a number, so convert it.
                 id={String(game.id)} 
                 title={game.title}
                // Use game.logo if available, otherwise fallback to game.thumbnail
                // Ensure a default image path if both are potentially missing
                 logoUrl={game.logo || game.thumbnail || '/games/default-logo.png'} 
                // Ensure game.matches is an array, default to empty if undefined
                 matches={game.matches || []} 
                // Construct the game path. Ensure this matches your routing.
                gamePath={`/game-zone/${game.id}`}
               />
             ))}
           </div>

      </div>
      
      
    </MainLayout>
  );
}