'use client';

import React from "react";
import { Game } from "@/lib/types";

type GameCardProps = {
  game: Game;
  isActive?: boolean;
  onSelect: () => void;
};

const GameCard = ({ game, isActive = false, onSelect }: GameCardProps) => {
  return (
    <div 
      className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
        isActive ? "bg-white/10 backdrop-blur-md" : "hover:bg-black/20"
      }`}
      onClick={onSelect}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden">
        <img src={game.thumbnail} alt={game.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="pill inline-block mb-1 bg-black/50">{game.label || 'Featured'}</div>
        <div className="font-medium text-sm">{game.title}</div>
      </div>
    </div>
  );
};

export default GameCard;