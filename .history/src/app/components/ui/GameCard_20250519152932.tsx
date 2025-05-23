// src/app/components/ui/GameCard.tsx
"use client";

import Image from 'next/image';
import { Play, UserPlus } from 'lucide-react';
import Link from 'next/link'; // Added for linking the Play button or card

// Props interface for the GameCard
export interface GameCardProps {
  id: string; // Game ID, used for keys and potentially links
  title: string;
  logoUrl: string;
  matches: Match[]; // Expecting up to 3 matches
  gamePath: string; // Path for the main play button, e.g., /game-zone/[id]
}

// Nested types (can also be in a central types file if used elsewhere)
interface PersonaInfo {
  name: string;
  avatarUrl: string;
}

interface Match {
  id: string; // Match ID
  persona1: PersonaInfo;
  persona2: PersonaInfo;
  // matchPath?: string; // Optional: Path to spectate this specific match
}

export default function GameCard({ id, title, logoUrl, matches, gamePath }: GameCardProps) {
  return (
    <div 
      className="bg-[rgba(10,12,18,0.7)] rounded-[20px] border border-[rgba(0,255,170,0.5)] shadow-lg p-4 flex items-stretch w-full text-white"
      style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }} // Glassmorphism
    >
      {/* Left Side: Game Logo and Name */}
      <div className="flex flex-col items-center justify-start w-[150px] sm:w-[170px] pr-4 border-r border-[rgba(0,255,170,0.2)] flex-shrink-0 py-2">
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative mb-3">
          <Image 
            src={logoUrl} 
            alt={`${title} logo`} 
            layout="fill" 
            objectFit="contain" 
            className="rounded-md"
            onError={(e) => { (e.target as HTMLImageElement).src = '/games/default-logo.png'; }} // Fallback game logo
          />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-center break-words">{title}</h3>
      </div>

      {/* Right Side: Matches and Actions */}
      <div className="flex flex-col justify-between flex-grow pl-4 min-w-0 py-1"> {/* Added min-w-0 for flex child truncation & padding consistency */}
        {/* Matches List */}
        <div className="space-y-1.5 sm:space-y-2 mb-3">
          {matches.slice(0, 3).map((match) => (
            <div key={match.id} className="flex items-center justify-between text-sm p-1.5 sm:p-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-grow min-w-0">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-cyan-400 flex-shrink-0">
                  <Image 
                    src={match.persona1.avatarUrl} 
                    alt={match.persona1.name} 
                    width={28} height={28} 
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/avatars/default.png'; }} // Fallback avatar
                  />
                </div>
                <span className="text-gray-300 text-xs hidden xs:inline">vs</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border-2 border-purple-400 flex-shrink-0">
                  <Image 
                    src={match.persona2.avatarUrl} 
                    alt={match.persona2.name} 
                    width={28} height={28} 
                    className="object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/avatars/default.png'; }} // Fallback avatar
                   />
                </div>
                <span className="text-xs text-gray-200 truncate hidden sm:inline">{`${match.persona1.name} vs ${match.persona2.name}`}</span>
                 {/* Shortened names for very small screens if needed */}
                 <span className="text-xs text-gray-200 truncate sm:hidden xs:inline">{`${match.persona1.name.substring(0,3)}. vs ${match.persona2.name.substring(0,3)}.`}</span>
              </div>
              {/* Spectate Button - can be a Link if matchPath is available */}
              <button className="p-1 rounded-full hover:bg-cyan-500/30 transition-colors flex-shrink-0 ml-1 sm:ml-2" title="Spectate match">
                <Play size={16} className="text-cyan-400" />
              </button>
            </div>
          ))}
          {/* Fill remaining rows if less than 3 matches */}
          {Array(Math.max(0, 3 - matches.length)).fill(0).map((_, index) => (
             <div key={`placeholder-${index}`} className="flex items-center justify-center text-sm p-1.5 sm:p-2 rounded-lg bg-[rgba(255,255,255,0.05)] opacity-50 h-[40px] sm:h-[44px]">
                <span className="text-xs text-gray-500 italic">Open Match Slot</span>
             </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2 mt-auto">
          <button 
            className="flex items-center space-x-1 py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105"
            title="Invite AI Persona"
          >
            <UserPlus size={18} />
            <span className="text-xs font-medium hidden sm:inline">Invite</span>
          </button>
          <Link href={gamePath} passHref>
            <button className="py-1.5 px-3 sm:py-2 sm:px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold text-xs sm:text-sm">
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}