'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Game } from '@/lib/types';
import { games } from '@/lib/data/games';

interface GameContextType {
  selectedGame: Game;
  setSelectedGame: (game: Game) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // Default to the first game in our list
  const [selectedGame, setSelectedGame] = useState<Game>(games[0]);

  return (
    <GameContext.Provider value={{ selectedGame, setSelectedGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}; 