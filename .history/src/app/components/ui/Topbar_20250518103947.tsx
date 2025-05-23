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
    <header className="flex justify-between items-center px-4 sm:px-6 py-3 bg-transparent text-white relative top-0 z-40">
      {/* Left: AI Verse Logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity"
          >
            <Image
    src="/logos/green-logo.png"
    alt="Logo"
    width={50} // or whatever size you want
    height={50}
    className="object-contain"
  />
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