// components/layout/Topbar.tsx
"use client";
import React, { useState } from 'react';
import { Bell, User, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Topbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add your search logic here (e.g., API call, redirect, updating state)
    }
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-6 py-3 bg-transparent text-white sticky top-0 z-50">
      {/* Left: AI Verse Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            // Updated className: removed fixed w/h, SVG controls its size
            className="flex items-center justify-center group-hover:opacity-90 transition-opacity"
          >
            {/* SVG Icon replacing the Image component */}
            <svg 
              viewBox="0 0 130 130" // ViewBox appropriate for the icon's original coordinates before transform
              className="h-14 w-14 sm:h-15 sm:w-15" // Responsive sizing for the SVG icon
              aria-label="AI Verse Icon"
            >
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#00ffaa', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#00ffdd', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Icon part of the SVG, with its original transform and gradient fill */}
              <g id="SvgjsG1012IconOnly" transform="matrix(0.6510416666666666,0,0,0.6510416666666666,6,12)" fill="url(#logoGradient)">
                <g xmlns="http://www.w3.org/2000/svg" data-name="Solid Line">
                  <g data-name="Solid Line">
                    <path d="M25,38.5A1.5,1.5,0,0,0,23.5,37H13.826a4.477,4.477,0,0,1-3.817-2.115l-5.737-9.18A1.5,1.5,0,0,0,1.728,27.3l5.737,9.181A7.459,7.459,0,0,0,13.826,40H23.5A1.5,1.5,0,0,0,25,38.5Z"></path>
                    <path d="M2.205,102.772a1.5,1.5,0,0,0,2.067-.477l5.737-9.18A4.477,4.477,0,0,1,13.826,91H22.5a1.5,1.5,0,0,0,0-3H13.826a7.458,7.458,0,0,0-6.361,3.525l-5.737,9.18A1.5,1.5,0,0,0,2.205,102.772Z"></path>
                    <path d="M21.5,65.5a1.5,1.5,0,0,0,0-3H4.5a1.5,1.5,0,0,0,0,3Z"></path>
                    <path d="M71.872,89.544a1.5,1.5,0,0,0-1.959.813C68.713,93.265,67.282,95,66.089,95c-2.951,0-7.066-9.7-7.066-25.5S63.138,44,66.089,44c2.336,0,6.03,6.984,6.89,20.1a1.5,1.5,0,0,0,3-.2C75.28,53.337,72.275,41,66.089,41,59.48,41,56.023,55.337,56.023,69.5S59.48,98,66.089,98c1.785,0,4.379-1.127,6.6-6.5A1.5,1.5,0,0,0,71.872,89.544Z"></path>
                    <path d="M128,79.08a6.861,6.861,0,0,0-2.61-5.35c-2.04-1.58-6.17-4.69-8.16-6.34a34.8,34.8,0,0,0-11.77-6.59,19.491,19.491,0,0,0,9.68-9.52A6.5,6.5,0,0,0,120,45V41a6.5,6.5,0,0,0-4.86-6.28A19.449,19.449,0,0,0,97.5,23.5a19.655,19.655,0,0,0-4.23.48C88.37,8.51,81.54,0,73.93,0h-20C39.39,0,28,32.1,28,73.07c0,17.43,2.16,34.27,6.07,47.43a10.44,10.44,0,0,0,2.75,4.5H1.5a1.5,1.5,0,0,0,0,3h125a1.5,1.5,0,0,0,0-3h-8.54a7.647,7.647,0,0,0,1.46-6.18c-1.91-9.71-4.21-28.64-5.08-36.04,0,0,2.52,1.53,3.35,2.06A6.838,6.838,0,0,0,128,79.08ZM97.5,26.5a16.466,16.466,0,0,1,14.14,8H95.5a6.5,6.5,0,0,0-6,4H81.65A16.42,16.42,0,0,1,97.5,26.5Zm-8,21a6.5,6.5,0,0,0,6,4h16.14a16.48,16.48,0,0,1-29.99-4ZM58.73,125C53.82,111.63,51,92.8,51,73.07c0-29.39,6.29-55.24,14.9-65.44,4.99,5.89,9.27,17.05,11.94,31.1A3.018,3.018,0,0,0,76,41.5v3a2.992,2.992,0,0,0,2.55,2.95,19.156,19.156,0,0,0,1.09,3.31c.54,4.84.91,9.84,1.09,14.87-7.08,5.77-9.67,15.71-4.22,23.61-1.83,7.52-3.92,20.24-5.36,29.73a7.825,7.825,0,0,0,1.6,6.03Zm32.32,0a10.326,10.326,0,0,0,2.74-4.5,125.319,125.319,0,0,0,3.02-12.66,176.431,176.431,0,0,0,8.57,16.61c.12.19.26.37.39.55ZM112.5,75a1.517,1.517,0,0,0-1.5,1.5c-.14,4.08,2.69,27.19,5.48,42.9a4.757,4.757,0,0,1-4.76,5.6,4.476,4.476,0,0,1-3.78-2.12,196.869,196.869,0,0,1-9.75-19.28l1.67-2.78a1.5,1.5,0,0,0-2.58-1.54l-14.23,23.4a4.854,4.854,0,0,1-8.94-3.26c1.17-7.1,3.07-19.46,4.86-27.48,3.12,2.75,6.94,3.18,9.81.77,2.4-2.1,3.4-6.3.66-10.24-1.2-1.72-2.62-4.8-2.49-5.6a1.549,1.549,0,0,0-1.05-1.82,1.51,1.51,0,0,0-1.85,1.05c-.71,2.57,2.89,8.03,2.93,8.09,1.81,2.61,1.18,5.08-.18,6.27-1.23,1.08-3.56,1.52-5.99-.89C68.34,77.18,84.03,62.26,97.48,62.5c6.22.11,12.57,2.86,17.84,7.2,2.01,1.66,8.23,6.4,8.23,6.4a3.769,3.769,0,0,1-4.29,6.18L114,79.04V76.5A1.5,1.5,0,0,0,112.5,75Z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="font-semibold text-2xl sm:text-[30px] bg-gradient-to-r from-[#00ffaa] to-[#00ffdd] bg-clip-text text-transparent transition-colors hidden sm:inline"
          >
            AI Verse
          </motion.span>
        </Link>
      </div>

      {/* Center: Search Bar - Taking most of the space */}
      <div className="flex-1 max-w-xl mx-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 bg-black/40 border border-gray-800 rounded-full focus:outline-none focus:border-[#00ffaa]/50 focus:ring-1 focus:ring-[#00ffaa]/30 placeholder-gray-500 text-white shadow-portal-button"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right: Icons */}
      <div className="flex items-center space-x-3">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-1"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-[#00ffaa]"></span>
          </motion.button>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="h-9 w-9 rounded-full bg-[#00ffaa] flex items-center justify-center cursor-pointer"
          aria-label="User Profile"
        >
          <User className="h-5 w-5 text-black" />
        </motion.div>
      </div>
    </header>
  );
}

export default Topbar;