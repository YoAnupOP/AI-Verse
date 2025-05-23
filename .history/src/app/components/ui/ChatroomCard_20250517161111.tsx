"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Helper to create blob styles (remains unchanged)
const getBlobStyle = (index: number): React.CSSProperties => {
  const styles: React.CSSProperties[] = [
    { width: '250px', height: '250px', left: '-50px', top: '100px', background: 'radial-gradient(circle, rgba(0, 255, 170, 0.7) 0%, rgba(0, 255, 170, 0) 70%)', animationDuration: '8s' },
    { width: '200px', height: '200px', right: '-30px', top: '50px', background: 'radial-gradient(circle, rgba(0, 179, 255, 0.7) 0%, rgba(0, 179, 255, 0) 70%)', animationDuration: '8s', animationDelay: '-3s' },
    { width: '180px', height: '180px', right: '50px', bottom: '100px', background: 'radial-gradient(circle, rgba(0, 255, 170, 0.7) 0%, rgba(0, 255, 170, 0) 70%)', animationDuration: '10s', animationDelay: '-4s' },
    { width: '220px', height: '220px', left: '30px', bottom: '30px', background: 'radial-gradient(circle, rgba(0, 179, 255, 0.7) 0%, rgba(0, 179, 255, 0) 70%)', animationDuration: '10s', animationDelay: '-4s' },
  ];
  return styles[index];
};

interface ChatroomCardProps {
  id: string | number;
  name: string;
  participants?: number | string; // Note: This prop is defined but not currently used in the JSX.
  activeUsers?: number | string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  status?: 'active' | 'full' | 'inactive' | 'upcoming';
}

export default function ChatroomCard({ 
  id, 
  name, 
  participants = 0, // Consider using this prop or removing it if not needed.
  activeUsers = 0, 
  thumbnail = '/chatrooms/default-1.jpg', 
  description = "Explore the AI verse",
  tags = ['AI', 'Chat'],
  status = 'active'
}: ChatroomCardProps) {
  const portalCardRef = useRef<HTMLDivElement>(null);
  const cardBgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailError, setThumbnailError] = useState(false);
  
  // Effect for card background particles (remains largely unchanged, minor canvas check)
  useEffect(() => {
    const canvas = cardBgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      }
    };
    
    // Ensure parentElement is available before trying to get its dimensions
    if (canvas.parentElement) {
        resize(); // Initial resize
    } else {
        // Fallback or delay resize if parentElement is not immediately available
        // This is unlikely in typical React rendering, but good for robustness
        setTimeout(resize, 0);
    }
    window.addEventListener('resize', resize);

    const particles: any[] = [];
    const particleCount = 50; // Consider making this configurable or dynamic based on card size for performance
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Slightly smaller max radius for subtlety
        vx: Math.random() * 1 - 0.5, // Slower movement
        vy: Math.random() * 1 - 0.5,
      });
    }

    function animateParticles() {
      if (!canvas || !ctx) return; // Ensure canvas and ctx are still valid
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.radius || p.x > canvas.width + p.radius) p.vx *= -1; // Adjusted boundary check
        if (p.y < -p.radius || p.y > canvas.height + p.radius) p.vy *= -1;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, "rgba(255,255,255,0.8)"); // Slightly less opaque white
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reduced particle connection logic for performance, or make it optional
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (distance < 80) { // Reduced connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 220, 180, ${0.05 * (1 - distance / 80)})`; // More subtle lines
            ctx.lineWidth = 0.3;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Card click handler for the "GO" button.
  // Assumes clicking "GO" should navigate via the parent Link, and the pulse is visual feedback.
  const handleGoButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Apply pulse effect to the button itself or the card.
    // Here, we'll pulse the card as per original code's likely intent with portalCardRef.
    if (portalCardRef.current) {
      portalCardRef.current.classList.add('pulse-effect'); // Ensure 'pulse-effect' CSS is defined
      setTimeout(() => {
        if (portalCardRef.current) {
          portalCardRef.current.classList.remove('pulse-effect');
        }
      }, 600); // Duration of the pulse animation
    }
    // IMPORTANT: We do NOT call e.preventDefault() or e.stopPropagation() here.
    // This allows the click event to bubble up to the parent <Link> component,
    // triggering navigation as expected.
  };

  const getStatusColor = () => {
    switch(status) {
      case 'active': return 'bg-green-500';
      case 'full': return 'bg-yellow-500';
      case 'inactive': return 'bg-gray-500';
      case 'upcoming': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  // Fallback thumbnail image path (ensure this image exists in your public folder)
  const fallbackThumbnail = '/chatrooms/default-fallback.jpg';

  return (
    <Link href={`/chatrooms/${id}`} className="flex-shrink-0 w-[230px] md:w-full block" aria-label={`View details for chatroom: ${name}`}>
      <div
        ref={portalCardRef}
        className="
          portal-card-pseudos
          w-full h-[320px] sm:h-[340px] md:h-[360px]
          bg-[rgba(10,12,18,0.6)] rounded-[20px] 
          border border-[rgba(0,255,170,0.8)] shadow-portal-card
          flex flex-col 
          overflow-hidden transform-style-preserve-3d relative 
          transition-transform duration-300 ease-in-out hover:scale-[1.02]
          group 
        "
        // Removed z-10, as stacking context is established by `transform` or `position:relative`
        // `overflow-hidden` is added here to ensure child elements like blobs and rounded corners on images behave correctly.
      >
        <div className="gooey-effect absolute inset-0 rounded-[20px] overflow-hidden z-0 opacity-90 blur-sm">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="gooey-blob absolute rounded-full filter blur-[12px] animate-float-blob opacity-90"
              style={getBlobStyle(i)}
            ></div>
          ))}
        </div>
        
        {/* Canvas for particles - z-index adjusted */}
        <canvas 
            ref={cardBgCanvasRef} 
            className="card-bg absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-[1]"
            // z-[1] places it above gooey-effect (z-0) but below content.
        ></canvas>

        {/* Thumbnail Section - Improved */}
        <div className="relative w-full h-[140px] sm:h-[150px] md:h-[160px] flex-shrink-0">
          {/* Added rounded-t-[19px] (slightly less than card border to avoid overlap) and overflow-hidden to the image parent for better clipping */}
          <img 
            src={thumbnailError ? fallbackThumbnail : thumbnail}
            alt={`Thumbnail for ${name}`} // More descriptive alt text
            className="w-full h-full object-cover object-center" // Using object-center for potentially better framing
            onError={() => setThumbnailError(true)}
            // No explicit rounded corners needed on <img> if parent has overflow-hidden and rounded corners.
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(10,12,18,0.2)] to-[rgba(10,12,18,0.9)]"></div> {/* Adjusted gradient for smoother transition */}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-2.5 sm:p-3.5 md:p-4 flex flex-col relative z-[2]"> {/* Content z-index above canvas */}
          {/* Chatroom Name & Status */}
          <div className="mb-1.5 sm:mb-2">
            {/* Changed h1 to h2 for better semantic HTML structure */}
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-1 tracking-wide leading-tight truncate">
              {name}
            </h2>
            <div className="flex items-center">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor()} mr-2 flex-shrink-0`}></div>
              <span className="text-white text-xs sm:text-sm font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          </div>

          {/* Description */}
          {/* For line-clamp-2 to work, ensure you have the @tailwindcss/line-clamp plugin installed and configured. */}
          <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
            {tags.slice(0, 3).map((tag, index) => ( // Displaying up to 3 tags to prevent overflow
              <span key={index} className="bg-[rgba(0,255,170,0.15)] text-[#00ffaa] text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="bg-[rgba(100,100,100,0.2)] text-gray-300 text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>

          {/* User Info & GO Button */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              {/* Avatars */}
              <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
                {[1, 2, 3].map(i => ( // These are placeholder avatars
                  <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-gray-900 flex-shrink-0">
                    <img 
                      src={`/avatars/player-${i}.jpeg`} // Ensure these paths are correct
                      alt={`User ${i}`} // Slightly more specific alt
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {(Number(activeUsers) > 3) && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-xs text-white flex-shrink-0">
                    +{Number(activeUsers) - 3}
                  </div>
                )}
              </div>
              {/* User Count */}
              {Number(activeUsers) > 0 && (
                <div className="text-white text-xs sm:text-sm">
                  <span className="mr-1" role="img" aria-label="users">👤</span> {activeUsers}
                </div>
              )}
            </div>
            
            {/* GO Button */}
            <button 
              type="button" // Explicitly set button type
              className="portal-button-pseudo py-1 sm:py-1.5 px-4 sm:px-6 md:px-8 bg-[rgba(10,12,20,0.3)] border-2 border-[#00ffaa] rounded-full text-white font-bold text-base sm:text-lg md:text-xl tracking-[1px] cursor-pointer transition-all duration-300 ease-in-out relative z-10 overflow-hidden shadow-portal-button text-shadow-portal-button hover:scale-105 hover:shadow-portal-button-hover hover:text-shadow-portal-button-hover hover:border-[#00ffdd] group-hover:border-[#00ffee]" // Added z-10 to ensure it's clickable above other relative content if any overlap issues
              onClick={handleGoButtonClick} // Renamed handler for clarity
            >
              GO
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}