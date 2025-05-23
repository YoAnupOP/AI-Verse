// src/app/components/ui/GameCard.tsx
"use client";

import Image from 'next/image';
import { Play, UserPlus } from 'lucide-react';
import Link from 'next/link';

export interface GameCardProps {
  id: string;
  title: string;
  logoUrl: string;
  matches: Match[];
  gamePath: string;
}

interface PersonaInfo {
  name: string;
  avatarUrl: string;
}

interface Match {
  id: string;
  persona1: PersonaInfo;
  persona2: PersonaInfo;
}

export default function GameCard({ id, title, logoUrl, matches, gamePath }: GameCardProps) {
  return (
    <div 
      className="bg-[rgba(10,12,18,0.8)] rounded-[20px] shadow-portal-card border border-[rgba(0,255,170,0.4)] shadow-xl p-5 flex flex-col sm:flex-row items-stretch w-full max-w-2xl mx-auto text-white transition-all duration-300 ease-out hover:shadow-cyan-500/20 hover:border-[rgba(0,255,170,0.6)]"
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} // Enhanced glassmorphism
    >
      {/* Left Side: Game Logo and Name - Adjusted for better vertical alignment and spacing */}
      <div className="flex flex-col items-center justify-center w-full sm:w-[180px] md:w-[200px] p-4 sm:pr-5 border-b sm:border-b-0 sm:border-r border-[rgba(0,255,170,0.15)] flex-shrink-0 mb-4 sm:mb-0">
        <div className="w-28 h-28 md:w-32 md:h-32 relative mb-4">
          <Image 
            src={logoUrl} 
            alt={`${title} logo`} 
            layout="fill" 
            objectFit="contain" 
            className="rounded-lg" // Slightly more rounded for logo
            onError={(e) => { (e.target as HTMLImageElement).src = '/games/default-logo.png'; }}
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-center break-words">{title}</h3>
      </div>

      {/* Right Side: Matches and Actions - Adjusted for new match row layout */}
      <div className="flex flex-col justify-between flex-grow sm:pl-5 min-w-0">
        {/* Matches List */}
        <div className="space-y-2.5 mb-4"> {/* Increased spacing between match rows slightly */}
          {matches.slice(0, 3).map((match) => (
            <div 
              key={match.id} 
              className="flex items-center text-sm p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.07)] transition-colors group"
            >
              {/* Persona 1 */}
              <div className="flex items-center w-2/5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-cyan-500 flex-shrink-0 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src={match.persona1.avatarUrl} 
                    alt={match.persona1.name} 
                    width={32} height={32} 
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/avatars/default.png'; }}
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-200 truncate" title={match.persona1.name}>
                  {match.persona1.name}
                </span>
              </div>

              {/* VS Separator */}
              <div className="flex-shrink-0 px-1 sm:px-2">
                <span className="text-gray-400 font-semibold text-xs">VS</span>
              </div>

              {/* Persona 2 */}
              <div className="flex items-center justify-end w-2/5">
                <span className="text-xs sm:text-sm text-gray-200 truncate text-right mr-2 sm:mr-3" title={match.persona2.name}>
                  {match.persona2.name}
                </span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Image 
                    src={match.persona2.avatarUrl} 
                    alt={match.persona2.name} 
                    width={32} height={32} 
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/avatars/default.png'; }}
                  />
                </div>
              </div>
              
              {/* Spectate Button - Aligned to the far right of the entire match row effectively */}
               <div className="w-1/5 flex justify-end pl-2">
                <button 
                  className="p-1.5 rounded-full text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/20 transition-all duration-200 flex-shrink-0 group-hover:scale-110" 
                  title={`Spectate match: ${match.persona1.name} vs ${match.persona2.name}`}
                >
                  <Play size={18} />
                </button>
              </div>
            </div>
          ))}
          {/* Placeholder for empty match slots */}
          {Array(Math.max(0, 3 - matches.length)).fill(0).map((_, index) => (
             <div key={`placeholder-${index}`} className="flex items-center justify-center text-sm p-2.5 rounded-lg bg-[rgba(255,255,255,0.03)] opacity-60 h-[48px] sm:h-[52px]">
                <span className="text-xs text-gray-500 italic">Open Match Slot</span>
             </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 mt-auto pt-2">
          <button 
            className="flex items-center space-x-1.5 py-2 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 text-white transition-all transform hover:scale-105 shadow-md hover:shadow-lg"
            title="Invite AI Persona to Game"
          >
            <UserPlus size={18} />
            <span className="text-xs sm:text-sm font-medium">Invite</span> {/* Always show Invite text or make responsive */}
          </button>
          <Link href={gamePath} passHref>
            <button className="py-2 px-5 sm:px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all transform hover:scale-105 shadow-md hover:shadow-lg">
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}