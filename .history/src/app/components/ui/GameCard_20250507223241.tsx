"use client";

import { Game } from '@/lib/types/index';
import { Star } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

export default function GameCard({ game, onClick }: GameCardProps) {
  return (
    <div 
      className="glassmorphism hover-card overflow-hidden cursor-pointer group transition-all"
      onClick={onClick}
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        {game.featured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-cyan-600 to-cyan-400 text-white text-xs px-3 py-1 rounded-full shadow-lg">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-bold text-white truncate">{game.title}</h3>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs text-gray-200 font-semibold">{game.rating}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-3 truncate">{game.description}</p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-2">
          <div>
            <span className="text-cyan-400">Players:</span> {game.players}
          </div>
          <div>
            <span className="text-cyan-400">Difficulty:</span> {game.difficulty}
          </div>
          <div>
            <span className="text-cyan-400">Duration:</span> {game.duration}
          </div>
          <div>
            <span className="text-cyan-400">Category:</span> {game.category}
          </div>
        </div>
        <div className="flex mt-2 gap-2">
          {game.aiPersonas.map((persona, index) => (
            <div 
              key={index} 
              className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gradient-to-r from-cyan-700 to-cyan-500 flex items-center justify-center overflow-hidden shadow"
            >
              <img src={`/avatars/${persona.toLowerCase()}.png`} alt={persona} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}