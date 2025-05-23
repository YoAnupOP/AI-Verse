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
  participants?: number | string;
  activeUsers?: number | string;
  thumbnail?: string;
  description?: string;
  tags?: string[];
  status?: 'active' | 'full' | 'inactive' | 'upcoming';
}

export default function ChatroomCard({ 
  id, 
  name, 
  participants = 0,
  activeUsers = 0, 
  thumbnail = '/chatrooms/default-1.jpg', 
  description = "Explore the AI verse",
  tags = ['AI', 'Chat'],
  status = 'active'
}: ChatroomCardProps) {
  const portalCardRef = useRef<HTMLDivElement>(null);
  const cardBgCanvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailError, setThumbnailError] = useState(false);
  
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
    
    if (canvas.parentElement) {
        resize();
    } else {
        setTimeout(resize, 0);
    }
    window.addEventListener('resize', resize);

    const particles: any[] = [];
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: Math.random() * 1 - 0.5,
        vy: Math.random() * 1 - 0.5,
      });
    }

    function animateParticles() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.radius || p.x > canvas.width + p.radius) p.vx *= -1;
        if (p.y < -p.radius || p.y > canvas.height + p.radius) p.vy *= -1;
        
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, "rgba(255,255,255,0.8)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (distance < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 220, 180, ${0.05 * (1 - distance / 80)})`;
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
  }, []);

  const handleGoButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (portalCardRef.current) {
      portalCardRef.current.classList.add('pulse-effect');
      setTimeout(() => {
        if (portalCardRef.current) {
          portalCardRef.current.classList.remove('pulse-effect');
        }
      }, 600);
    }
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
        
        <canvas 
            ref={cardBgCanvasRef} 
            className="card-bg absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-[1]"
        ></canvas>

        <div className="relative w-full h-[150px] sm:h-[160px] md:h-[170px] flex-shrink-0">
          <img 
            src={thumbnailError ? fallbackThumbnail : thumbnail}
            alt={`Thumbnail for ${name}`}
            className="w-full h-full"
            onError={() => setThumbnailError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(10,12,18,0.2)] to-[rgba(10,12,18,0.9)]"></div>
        </div>

        {/* Content Section - main flex container for content below thumbnail */}
        {/* MODIFIED padding classes here */}
        <div className="flex-1 p-2 sm:px-3 sm:pt-3 sm:pb-4 md:px-4 md:pt-4 md:pb-5 flex flex-col relative bottom-2 z-[2]">
          {/* Chatroom Name & Status */}
          <div className="mb-1.5 sm:mb-2"> {/* Kept original margin here, usually fine */}
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-wide leading-tight truncate">
              {name}
            </h2>
            <div className="flex items-center">
              <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor()} mr-2 flex-shrink-0`}></div>
              <span className="text-white text-xs sm:text-sm font-medium">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-200 text-xs sm:text-sm line-clamp-2">
            {description}
          </p>

          {/* Tags - MODIFIED margin class here */}
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-1 sm:mt-2">
            {tags.slice(0, 3).map((tag, index) => (
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

          {/* User Info & GO Button - mt-auto pushes this to the bottom of the flex container */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center">
              {/* Avatars */}
              <div className="flex -space-x-1 sm:-space-x-2 mr-2 sm:mr-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full overflow-hidden border-2 border-gray-900 flex-shrink-0">
                    <img 
                      src={`/avatars/player-${i}.jpeg`}
                      alt={`User ${i}`}
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
            
            <button 
              type="button"
              className="portal-button-pseudo py-1 sm:py-1.5 px-4 sm:px-6 md:px-8 bg-[rgba(10,12,20,0.3)] border-2 border-[#00ffaa] rounded-full text-white font-bold text-base sm:text-lg md:text-xl tracking-[1px] cursor-pointer transition-all duration-300 ease-in-out relative z-10 overflow-hidden shadow-portal-button text-shadow-portal-button hover:scale-105 hover:shadow-portal-button-hover hover:text-shadow-portal-button-hover hover:border-[#00ffdd] group-hover:border-[#00ffee]"
              onClick={handleGoButtonClick}
            >
              GO
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}