"use client";

import { Home, Users, MessageCircle, MessageSquare, Gamepad, Book, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  // All navigation items
  const navItems = [
    { icon: <Home size={22} />, href: '/', label: 'Home' },
    { icon: <Users size={22} />, href: '/friends', label: 'Friends' },
    { icon: <MessageCircle size={22} />, href: '/direct-messages', label: 'Messages' },
    { icon: <MessageSquare size={22} />, href: '/chatrooms', label: 'Chatrooms' },
    { icon: <Gamepad size={22} />, href: '/game-zone', label: 'Games' },
    { icon: <Book size={22} />, href: '/personapedia', label: 'Personapedia' },
    { icon: <Settings size={22} />, href: '/settings', label: 'Settings' }
  ];

  // Mobile navigation items (limited to 5 as required)
  const mobileNavItems = [
    { icon: <Home size={22} />, href: '/', label: 'Home' },
    { icon: <MessageCircle size={22} />, href: '/direct-messages', label: 'Messages' },
    { icon: <MessageSquare size={22} />, href: '/chatrooms', label: 'Chatrooms' },
    { icon: <Gamepad size={22} />, href: '/game-zone', label: 'Games' },
    { icon: <Settings size={22} />, href: '/settings', label: 'Settings' }
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar - hidden on mobile, floating and vertically centered on md and up */}
<div className="hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col items-center justify-center bg-black/40 backdrop-blur-lg shadow-lg border-r border-green-400/20 glow-sm">
       <nav className="flex flex-col items-center py-6 space-y-6 px-4">
          {navItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link 
                key={index} 
                href={item.href}
                className={`p-3 rounded-xl hover:bg-gray-800 transition-colors group relative ${
                  active ? 'bg-gray-800 text-[#00ffaa]' : 'text-gray-400'
                }`}
                title={item.label}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] rounded-r-full"></span>
                )}
                {item.icon}
                
                {/* Tooltip */}
                <span className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Mobile Bottom Navigation - visible on mobile, hidden on md and up */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50 shadow-lg">
        <nav className="flex justify-between items-center px-2 py-2">
          {mobileNavItems.map((item, index) => {
            const active = isActive(item.href);
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 py-2 group transition-colors duration-200 ease-in-out ${
                  active ? 'text-[#00ffaa]' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors duration-200 ease-in-out ${
                  active ? 'bg-gray-700/80' : 'group-hover:bg-gray-700/50'
                }`}>
                  {item.icon}
                </div>
                <span className={`text-[10px] sm:text-xs mt-1 ${active ? 'font-medium' : 'font-normal'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}