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

export default function Home() {
  // State for pagination in different sections
  const [personaPage, setPersonaPage] = useState(0);
  const [chatroomPage, setChatroomPage] = useState(0);
  const [gamePage, setGamePage] = useState(0);
  
  // Items per page for different sections
  const personasPerPage = 8;
  const chatroomsPerPage = 4; // Used for desktop grid
  const gamesPerPage = 5;
  
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
          <div className="md:hidden w-full overflow-x-auto scrollbar-hide pb-4">
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

        {/* Recent Messages */}
        <div className="mt-7 sm:mt-10 md:mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium">Recent Messages</h2>
            <div className="flex space-x-2">
              <span className="text-base text-cyan-400">
                {personaPage + 1}/{totalPersonaPages}
              </span>
              <Link href="/direct-messages" className="bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent ">
                View all
              </Link>
              <div className="flex space-x-1">
                <button 
                  onClick={prevPersonaPage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button 
                  onClick={nextPersonaPage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="glassmorphism backdrop-blur-xl bg-black/20 rounded-xl p-6 shadow-[0_8px_32px_rgba(0,135,255,0.2)] border border-black/10 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 relative z-10">
              {currentPersonas.map((persona) => (
                <Link 
                  key={persona.id} 
                  href={`/direct-messages/${persona.id}`}
                  className="group flex flex-col items-center text-center transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-300 shadow-lg shadow-cyan-900/20">
                      <img 
                        src={persona.avatar} 
                        alt={persona.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    {/* Glow effect behind avatar on hover */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 filter blur-md transition-all duration-300 -z-10"></div>
                    
                    {persona.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black shadow-lg shadow-green-500/20 animate-pulse"></div>
                    )}
                    {!persona.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  
                  <div className="w-full p-2 rounded-lg backdrop-blur-sm bg-white/5 group-hover:bg-white/10 transition-all duration-300 border border-white/5">
                    <h3 className="font-medium text-white text-sm truncate">{persona.name}</h3>
                    <p className="text-gray-400 text-xs truncate">{persona.lastMessage?.substring(0, 20)}{(persona.lastMessage && persona.lastMessage.length > 20) ? '...' : ''}</p>
                    <p className="text-cyan-400/70 text-xs mt-1 group-hover:text-cyan-400 transition-colors">{persona.timestamp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Game Zone */}
        <div className="mt-7 sm:mt-10 md:mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium">Game Zone</h2>
            <div className="flex space-x-2">
              <Link href="/game-zone" className="bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent">
                View all
              </Link>
              <div className="flex space-x-1">
                <button 
                  onClick={prevGamePage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                <button 
                  onClick={nextGamePage}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {currentGames.map(game => (
              <Link 
                key={game.id}
                href={`/game-zone/${game.id}`}
                className="block glassmorphism rounded-xl overflow-hidden hover:shadow-cyan-900/30 hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square w-full">
                  <img 
                    src={game.thumbnail} 
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-lg">{game.title}</h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
                      <span className="bg-cyan-500/30 px-2 py-0.5 rounded-full">{game.category}</span>
                      <span>{game.players} active</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-900">
                            <img 
                              src={`/avatars/player-${i}.jpeg`} 
                              alt="Player"
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-xs ml-2 text-gray-400">+{game.players - 3} more</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 bg-cyan-600/80 text-white text-xs px-3 py-1 rounded-full flex items-center">
                    <span>Play Now</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Featured Personas */}
        <div className="mt-7 sm:mt-10 md:mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent font-medium">Featured Personas</h2>
            <Link href="/personas" className="bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPersonas.map(persona => (
              <Link 
                key={persona.id}
                href={`/personas/${persona.id}`}
                className="block glassmorphism rounded-xl overflow-hidden hover:shadow-cyan-900/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center p-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-cyan-500/30">
                    <img 
                      src={persona.avatar} 
                      alt={persona.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">{persona.name}</h3>
                    <p className="text-blue-400 text-sm">{persona.role}</p>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{persona.description}</p>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-2 mt-2">
                    {persona.specialties?.map((specialty, idx) => (
                      <span key={idx} className="bg-cyan-900/30 text-blue-300 text-xs px-2 py-1 rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      
    </MainLayout>
  );
}