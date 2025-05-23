"use client";

import { AIPersona } from '@/lib/types';

interface PersonaCardProps {
  persona: AIPersona;
  type?: 'compact' | 'full';
  onClick?: () => void;
}

export default function PersonaCard({ persona, type = 'full', onClick }: PersonaCardProps) {
  if (type === 'compact') {
    return (
      <div 
        className="glassmorphism hover-card flex items-center gap-4 p-4 cursor-pointer group transition-all"
        onClick={onClick}
      >
        <div className="relative">
          <img 
            src={persona.avatar} 
            alt={persona.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-all" 
          />
          {persona.online && (
            <span className="status-online absolute bottom-0 right-0" />
          )}
          {!persona.online && (
            <span className="status-offline absolute bottom-0 right-0" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-base truncate">{persona.name}</h3>
          <p className="text-xs text-gray-400 truncate mt-0.5">{persona.role}</p>
        </div>
        {persona.unread && (
          <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold shadow-md">
            {persona.unread}
          </span>
        )}
      </div>
    );
  }
  
  return (
    <div className="glassmorphism hover-card p-6 cursor-pointer group transition-all" onClick={onClick}>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <img 
            src={persona.avatar} 
            alt={persona.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-all" 
          />
          {persona.online && (
            <span className="status-online absolute bottom-0 right-0" />
          )}
          {!persona.online && (
            <span className="status-offline absolute bottom-0 right-0" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-0.5">{persona.name}</h3>
          <p className="text-cyan-400 text-sm font-medium">{persona.role}</p>
        </div>
      </div>
      
      <p className="text-gray-200 mb-4 text-sm line-clamp-2">{persona.description}</p>
      
      {persona.specialties && (
        <div className="flex flex-wrap gap-2 mb-4">
          {persona.specialties.map((specialty, index) => (
            <span 
              key={index}
              className="bg-cyan-900/30 text-cyan-300 text-xs px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>
      )}
      
      {persona.lastMessage && (
        <div className="mt-4 p-3 bg-black/20 rounded-lg">
          <p className="text-xs text-gray-300 truncate">"{persona.lastMessage}"</p>
          <p className="text-xs text-cyan-400/70 mt-1">{persona.timestamp}</p>
        </div>
      )}
    </div>
  );
}