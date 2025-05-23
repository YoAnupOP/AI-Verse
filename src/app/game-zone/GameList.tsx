'use client';

import React from "react";
import GameCard from "./GameCard";
import { ChevronRight } from "lucide-react";
import { useGameContext } from "./GameContext";
import { games } from "@/lib/data/games";

const GamesList = () => {
  const { selectedGame, setSelectedGame } = useGameContext();

  const handleSelectGame = (game: typeof games[0]) => {
    setSelectedGame(game);
  };

  return (
    <div className="fixed right-24 top-24 w-64 glass-panel overflow-hidden">
      <div className="space-y-1 max-h-[70vh] overflow-y-auto p-1">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isActive={selectedGame.id === game.id}
            onSelect={() => handleSelectGame(game)}
          />
        ))}
      </div>
      <button className="w-full py-3 px-4 flex items-center justify-center gap-2 text-sm font-medium border-t border-white/10 hover:bg-white/5">
        DISCOVER MORE
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default GamesList;