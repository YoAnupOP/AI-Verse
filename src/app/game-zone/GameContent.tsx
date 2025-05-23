'use client';

import React from "react";
import { Play, Star } from "lucide-react";
import { useGameContext } from "./GameContext";
import Image from "next/image";

const GameContent = () => {
  const { selectedGame } = useGameContext();

  return (
    <div className="fixed left-24 top-24 max-w-xl h-full flex flex-col justify-start relative z-0">
      {/* Current Game Label */}
      <div className="mb-6 transition-all duration-300">
        <div className="pill bg-black/50 backdrop-blur-sm inline-block w-auto max-w-[120px] text-center">{selectedGame.label || 'Featured'}</div>
      </div>
      
      {/* Game Logo and Description */}
      <div className="transition-all duration-500">
        {/* Game Logo */}
        <div className="mb-4">
          {selectedGame.logo ? (
            <div className="transition-opacity duration-300">
              <Image 
                src={selectedGame.logo} 
                alt={`${selectedGame.title} logo`} 
                width={200} 
                height={80} 
                className="mb-4"
              />
            </div>
          ) : (
            <div className="transition-opacity duration-300">
              <h1 className="text-5xl font-bold text-purple-300 tracking-wider">{selectedGame.title}</h1>
            </div>
          )}
        </div>

        {/* Game Description */}
        <p className="text-white/80 mb-6 max-w-md transition-all duration-300">
          {selectedGame.description}
        </p>

        {/* Game Details */}
        <div className="flex gap-4 mb-6 transition-all duration-300">
          <div className="bg-black/30 px-3 py-1 rounded">
            <span className="text-sm text-white/70">Players: </span>
            <span className="text-sm font-semibold">{selectedGame.players}</span>
          </div>
          <div className="bg-black/30 px-3 py-1 rounded">
            <span className="text-sm text-white/70">Rating: </span>
            <span className="text-sm font-semibold">{selectedGame.rating}/5</span>
          </div>
          <div className="bg-black/30 px-3 py-1 rounded">
            <span className="text-sm text-white/70">Difficulty: </span>
            <span className="text-sm font-semibold">{selectedGame.difficulty}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 transition-all duration-300">
          <button className="bg-white text-black rounded-full py-2 px-6 flex items-center gap-2 font-medium hover:bg-white/90 transition-all">
            <Play size={20} />
            PLAY
          </button>
          <button className="bg-transparent border border-white/20 text-white rounded-full py-2 px-6 flex items-center gap-2 font-medium hover:bg-white/10 transition-all">
            <Star size={20} />
            ADD TO FAVORITE
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameContent;