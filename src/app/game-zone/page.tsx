'use client';

import React from "react";
import LeftSidebar from "@/game-zone/LeftSidebar";
import TopNavBar from "@/game-zone/Topbar";
import RightSidebar from "@/game-zone/RightSidebar";
import GameContent from "@/game-zone/GameContent";
import GamesList from "@/game-zone/GameList";
import { GameProvider, useGameContext } from "@/game-zone/GameContext";

// Game page wrapper with context provider
const GamePage = () => {
  return (
    <GameProvider>
      <GamePageContent />
    </GameProvider>
  );
};

// Inner component that can access context
const GamePageContent = () => {
  const { selectedGame } = useGameContext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gaming-dark to-black overflow-hidden relative">
      {/* Game Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${selectedGame.thumbnail})`,
          opacity: 0.7 
        }}
      />
      
      {/* UI Components */}
      <LeftSidebar />
      <TopNavBar />
      <RightSidebar />
      <GameContent />
      <GamesList />
    </div>
  );
};

export default GamePage;