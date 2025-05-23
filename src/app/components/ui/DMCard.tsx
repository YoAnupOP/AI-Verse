"use client";

import { AIPersona } from '@/lib/types';

interface DMCardProps {
  persona: AIPersona;
  onClick?: () => void;
}

export default function DMCard({ persona, onClick }: DMCardProps) {
  return (
    <div 
      className="glassmorphism hover-card flex items-center gap-4 p-4 cursor-pointer group transition-all"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={persona.avatar} 
          alt={persona.name} 
          className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-all" 
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
        {persona.lastMessage && (
          <p className="text-xs text-gray-400 truncate mt-0.5">{persona.lastMessage}</p>
        )}
      </div>
      <div className="flex flex-col items-end min-w-[48px]">
        {persona.timestamp && (
          <p className="text-xs text-cyan-400/70 mb-1">{persona.timestamp}</p>
        )}
        {persona.unread && persona.unread > 0 && (
          <span className="bg-primary-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold shadow-md">
            {persona.unread}
          </span>
        )}
      </div>
    </div>
  );
}