import React from "react";
import { Star, MoreHorizontal, Bell } from "lucide-react";

const TopNavBar = () => {
  return (
    <div className="fixed top-6 right-6 z-20 flex gap-3">
      {/* Game Bookmarks Pill */}
      <div className="glass-panel rounded-full py-2 px-3 flex items-center gap-1">
        <Star className="h-4 w-4 text-white mr-1" />
        
        {/* Game Thumbnails */}
        <div className="flex gap-1">
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gaming-blue flex items-center justify-center">
            <img src="/games/pac-man.jpeg" alt="Game 1" className="h-5 w-5" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gaming-purple flex items-center justify-center">
            <img src="/games/chess.jpeg" alt="Game 2" className="h-5 w-5" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gaming-accent flex items-center justify-center">
            <img src="/games/minecraft-logo.jpeg" alt="Game 3" className="h-5 w-5" />
          </div>
          <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
            <MoreHorizontal className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* User Profile Pill */}
      <div className="glass-panel rounded-full py-1 px-2 flex items-center gap-2">
        <Bell className="h-4 w-4 text-white/80" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-yellow-500">
            <img src="/avatars/user.jpg" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <div className="text-sm font-medium mr-1">White Pegasus</div>
          <div className="text-xs text-gray-400">• Strange Clan</div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;