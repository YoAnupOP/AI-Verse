import React from "react";
import { LayoutGrid, Library, Folder } from "lucide-react";

const LeftSidebar = () => {
  return (
    <div className="fixed left-0 top-0 bottom-0 w-16 flex flex-col items-center py-4 bg-black/40 backdrop-blur-md z-10">
      {/* Platform Logo */}
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-8">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-white"></div>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="space-y-6 mt-2">
        <button className="sidebar-icon bg-white/10">
          <LayoutGrid size={20} />
        </button>
        <button className="sidebar-icon">
          <Library size={20} />
        </button>
        <button className="sidebar-icon">
          <Folder size={20} />
        </button>
      </div>

      {/* Chat Button (Bottom) */}
      <div className="mt-auto">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-white/80 hover:bg-white/10">
          <div className="w-4 h-4 rounded-full border-2 border-white/80"></div>
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;