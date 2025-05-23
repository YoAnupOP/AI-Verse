import React from "react";
import Image from "next/image";


// Mock data for friends list
const friends = [
  { id: 1, online: true, color: "bg-red-500" },
  { id: 2, online: true, color: "bg-green-500" },
  { id: 3, online: false, color: "bg-blue-500" },
  { id: 4, online: true, color: "bg-purple-500" },
  { id: 5, online: true, color: "bg-yellow-500" },
  { id: 6, online: false, color: "bg-pink-500" },
  { id: 7, online: true, color: "bg-teal-500" },
  { id: 8, online: true, color: "bg-orange-500" },
];

const RightSidebar = () => {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-16 flex flex-col items-center py-4 bg-black/40 backdrop-blur-md z-10">
      <div className="space-y-4 mt-20">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={`relative w-10 h-10 rounded-full overflow-hidden border-2 ${friend.color}`}
          >
            <img src="/avatars/nova.jpeg" alt={`Friend ${friend.id}`} className="h-full w-full object-cover" />
            {friend.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar;