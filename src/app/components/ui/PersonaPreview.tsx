'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AIPersona } from '@/lib/types';
import { personas as personaData } from '@/lib/data/personas';

// ... (CardData interface and cardItems array remain the same)
interface CarouselCardData {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  titleColorClass: string;
  description: string;
  progress: number;
  phase: string; // Corresponds to AIPersona.role
  techTags: string[]; // Corresponds to AIPersona.specialties
}

const cardItems: CarouselCardData[] = personaData.map((persona: AIPersona): CarouselCardData => ({
  id: persona.id,
  imageSrc: persona.avatar,
  imageAlt: persona.name,
  title: persona.name,
  titleColorClass: "text-emerald-400", // Default color
  description: persona.description || "No description available.", // Default description
  progress: 100, // Static progress for personas
  phase: persona.role,
  techTags: persona.specialties || [], // Default to empty array if undefined
}));


const debounce = <F extends (...args: any[]) => any>(func: F, wait: number): ((...args: Parameters<F>) => void) => {
// ... existing code ...
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>) => {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
};

const FuturisticCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(cardItems.length / 2)); // Start near the middle
  const [cardsData] = useState<CarouselCardData[]>(cardItems);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [cardNominalWidth, setCardNominalWidth] = useState(320);
  const cardMarginValue = 0; 
  const cardMarginHorizontalTotal = cardMarginValue * 2;

  const getCardDimensions = useCallback(() => {
    if (cardRefs.current[0]) {
      setCardNominalWidth(cardRefs.current[0].offsetWidth);
    }
  }, []);
  
  // ... existing code ...
  const moveToSlide = useCallback((targetIndex: number) => {
    if (!trackRef.current || !containerRef.current || cardRefs.current.length === 0) return;
    if (targetIndex < 0 || targetIndex >= cardsData.length) return;

    const currentCardRef = cardRefs.current[targetIndex];
    const actualCardWidth = currentCardRef ? currentCardRef.offsetWidth : cardNominalWidth;
    const cardStepWidth = actualCardWidth + cardMarginHorizontalTotal;
    const amountToMove = targetIndex * cardStepWidth;
    const containerCenter = containerRef.current.offsetWidth / 2;
    const cardContentCenter = actualCardWidth / 2;
    let targetTranslateX = containerCenter - cardContentCenter - amountToMove;
    
    // MODIFICATION: To move to the RIGHT from the previous state (where 50 was subtracted),
    // we subtract a SMALLER value. Let's use cardMarginValue (25).
    targetTranslateX -= cardMarginValue; 
    // This was the original logic in your React implementation.
    // The previous suggestion was: targetTranslateX -= cardMarginHorizontalTotal;

    trackRef.current.style.transform = `translateX(${targetTranslateX}px)`;
    setCurrentIndex(targetIndex);

// ... rest of the function
  }, [cardsData.length, cardNominalWidth, cardMarginHorizontalTotal, cardMarginValue]);
// ... existing code ...
  useEffect(() => {
    getCardDimensions();
    const timer = setTimeout(() => moveToSlide(currentIndex), 0); 
    const debouncedResize = debounce(() => {
      getCardDimensions();
      moveToSlide(currentIndex); 
    }, 250);
    window.addEventListener('resize', debouncedResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', debouncedResize);
    };
  }, [getCardDimensions, moveToSlide, currentIndex]);

  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTrackTranslate = useRef(0);
  const prevTrackTranslate = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const getPositionX = (event: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in event ? event.touches[0].clientX : event.pageX;
  };

  const dragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    startPos.current = getPositionX(event);
    if (trackRef.current) {
        const transformMatrix = window.getComputedStyle(trackRef.current).getPropertyValue('transform');
        currentTrackTranslate.current = transformMatrix !== 'none' ? parseInt(transformMatrix.split(',')[4]) : 0;
        prevTrackTranslate.current = currentTrackTranslate.current;
        trackRef.current.style.transition = 'none';
    }
    animationFrameId.current = requestAnimationFrame(animationLoop);
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing';
  }, []); 

  const drag = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (isDragging.current) {
      const currentPosition = getPositionX(event);
      const moveX = currentPosition - startPos.current;
      currentTrackTranslate.current = prevTrackTranslate.current + moveX;
    }
  }, []); 
  
  const animationLoop = useCallback(() => {
    if (!isDragging.current || !trackRef.current) return;
    trackRef.current.style.transform = `translateX(${currentTrackTranslate.current}px)`;
    animationFrameId.current = requestAnimationFrame(animationLoop);
  }, []);

  const dragEnd = useCallback(() => {
    if (!isDragging.current || !trackRef.current) return;
    if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    isDragging.current = false;
    const movedBy = currentTrackTranslate.current - prevTrackTranslate.current;
    trackRef.current.style.transition = 'transform 0.75s cubic-bezier(0.21, 0.61, 0.35, 1)';
    trackRef.current.style.cursor = 'grab';
    const currentCardRef = cardRefs.current[0];
    const currentCardActualWidth = currentCardRef ? currentCardRef.offsetWidth : cardNominalWidth;
    const threshold = currentCardActualWidth / 3.5;
    if (movedBy < -threshold && currentIndex < cardsData.length - 1) {
      moveToSlide(currentIndex + 1);
    } else if (movedBy > threshold && currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    } else {
      moveToSlide(currentIndex); 
    }
  }, [currentIndex, cardsData.length, moveToSlide, cardNominalWidth]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentIndex < cardsData.length - 1) moveToSlide(currentIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentIndex > 0) moveToSlide(currentIndex - 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, cardsData.length, moveToSlide]);

  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showScanLine, setShowScanLine] = useState(false);

useEffect(() => {
    const activeCardData = cardsData[currentIndex];
    if (!activeCardData) return;
    setShowScanLine(true);
    const scanTimer = setTimeout(() => setShowScanLine(false), 2000);
    setAnimatedProgress(0); 
    const targetPercentage = activeCardData.progress; // This will be 100
    let currentPercentageValue = 0; 
    const progressValueEl = cardRefs.current[currentIndex]?.querySelector('.progress-value-animated') as HTMLDivElement;
    if(progressValueEl) progressValueEl.style.width = '0%';
    const interval = setInterval(() => {
      currentPercentageValue += Math.ceil(targetPercentage / 15); 
      if (currentPercentageValue >= targetPercentage) {
        currentPercentageValue = targetPercentage;
        clearInterval(interval);
      }
      setAnimatedProgress(currentPercentageValue);
      if(progressValueEl) {
        requestAnimationFrame(() => {
            if(progressValueEl) {
                //progressValueEl.style.transition = 'width 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
                //progressValueEl.style.width = `${currentPercentageValue}%`;
                progressValueEl.style.width = `${currentPercentageValue}%`;
            }
        });
      }
    }, 50);
return () => {
      clearTimeout(scanTimer);
      clearInterval(interval);
      if(progressValueEl) progressValueEl.style.transition = 'none'; 
    };
  }, [currentIndex, cardsData]);

  const getCardStyle = (index: number): React.CSSProperties => {
    const isActive = index === currentIndex;
    const isPrev = index === currentIndex - 1;
    const isNext = index === currentIndex + 1;
    if (isActive) {
      return { transform: 'scale(1) rotateY(0deg) translateZ(0px)', opacity: 1, zIndex: 20, filter: 'saturate(1.2) brightness(1.1)' };
    } else if (isPrev) {
      return { transformOrigin: 'right center', transform: 'scale(0.75) rotateY(45deg) translateX(-80px) translateZ(-150px)', opacity: 0.45, filter: 'saturate(0.6) brightness(0.7)' };
    } else if (isNext) {
      return { transformOrigin: 'left center', transform: 'scale(0.75) rotateY(-45deg) translateX(80px) translateZ(-150px)', opacity: 0.45, filter: 'saturate(0.6) brightness(0.7)' };
    } else {
      const rotateYValue = index < currentIndex ? 35 : -35;
      const translateXValue = index < currentIndex ? -50 : 50; 
      return { 
        transformOrigin: 'center center', 
        transform: `scale(0.8) rotateY(${rotateYValue}deg) translateX(${translateXValue}px) translateZ(-100px)`, 
        opacity: 0.45, 
        filter: 'saturate(0.6) brightness(0.7)' 
      };
    }
  };

return (
    <div 
      ref={containerRef} 
      className="carousel-container w-[90%] max-w-[1100px] mx-auto relative perspective-2000 py-12 z-10" // ADDED overflow-hidden
    >
      <div
        ref={trackRef}
        className="carousel-track flex transition-transform duration-700 ease-[cubic-bezier(0.21,0.61,0.35,1)] transform-style-preserve-3d cursor-grab"
        onMouseDown={dragStart}
        onTouchStart={dragStart}
        onMouseMove={drag}
        onTouchMove={drag}
        onMouseUp={dragEnd}
        onMouseLeave={dragEnd} 
        onTouchEnd={dragEnd}
      >
{cardsData.map((card, index) => {
          const isActive = index === currentIndex;
          const cardDynamicStyle = getCardStyle(index);

          return (
            <div // Outer carousel-card: for 3D transform, glow, and backdrop-filter
              key={card.id}
              ref={el => cardRefs.current[index] = el}
              className={`carousel-card group w-[320px] shrink-0 mx-[0px] rounded-[1.2rem] overflow-visible relative backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.21,0.61,0.35,1)]
                ${isActive 
                  ? 'holographic-border-active shadow-portal-card' // MODIFIED: Applied shadow-portal-card when active
                  : 'shadow-[0_15px_25px_rgba(0,0,0,0.5),0_0_30px_rgba(56,189,248,0.2)]'
                }
              `}
              style={cardDynamicStyle}
            >
              {/* Inner wrapper: for actual card background, border, and content clipping */}
              <div className="card-inner-wrapper relative w-full h-full rounded-[1.2rem] overflow-hidden bg-black border border-[rgba(94,234,212,0.2)]">
                
                {/* card-image-container is now clipped by card-inner-wrapper */}
                <div className="card-image-container relative h-[200px] overflow-hidden border-b border-[rgba(94,234,212,0.3)]">
                  <img 
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    className={`card-image w-full h-full object-cover transition-transform duration-[1500ms] ease-out ${isActive ? 'scale-105' : 'scale-100'}`}
                    width={320} height={200} 
                    loading="lazy"
                  />
                  {isActive && showScanLine && (
                     <div className="scan-line-animate absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[rgba(56,189,248,0.8)] to-transparent z-10 pointer-events-none"></div>
                  )}
                </div>

                <div className="card-content p-7 text-foreground">
                  <h3
                    className={`card-title font-orbitron text-xl font-bold mb-3 tracking-wide relative inline-block ${card.titleColorClass} ${isActive ? 'text-glow-active' : ''}`}
                    data-text={card.title} 
                  >
                    {card.title}
                  </h3>
                  <p className="card-description text-sm leading-relaxed text-[hsla(var(--muted-foreground),0.9)] font-light">
                    {card.description}
                  </p>
                  <div className="card-progress h-[3px] bg-[rgba(56,189,248,0.15)] mt-5 relative rounded-md overflow-hidden">
                    <div 
                      className="progress-value-animated absolute h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-green)] rounded-md"
                      style={{ width: isActive ? `${animatedProgress}%` : `${card.progress}%`}} 
                    ></div>
                  </div>
                  <div className="card-stats flex justify-between mt-2 text-xs text-[hsla(var(--muted-foreground),0.8)]">
                    <span>{card.phase}</span> 
                    {/* Display role (mapped to phase) */}
                    {/* Consider removing "% COMPLETE" if progress is always 100, or making it static */}
                    <span>{`${card.progress}% LOADED`}</span> 
                  </div>
                </div>

                {/* tech-details is now a child of card-inner-wrapper and will be clipped by its overflow:hidden */}
                <div 
                  className={`tech-details absolute bottom-0 left-0 right-0 bg-black backdrop-blur-md p-3 transform transition-transform duration-400 ease-[cubic-bezier(0.21,0.61,0.35,1)] border-t border-[rgba(94,234,212,0.3)] 
                  z-[25]
                  ${isActive ? 'group-hover:translate-y-0 translate-y-full' : 'translate-y-full'}`}
                >
                  {card.techTags.length > 0 ? card.techTags.map(tag => (
                    <div key={tag} className="tech-tag inline-block mr-2 mb-2 px-2 py-1 text-xs bg-[rgba(56,189,248,0.15)] border border-[rgba(56,189,248,0.3)] rounded text-[#7dd3fc]">
                      {tag}
                    </div>
                  )) : (
                    <div className="text-xs text-[hsla(var(--muted-foreground),0.7)]">No specialties listed.</div>
                  )}
                </div>
              </div> {/* End of card-inner-wrapper */}
            </div> // End of carousel-card
          )
        })}
      </div>

      {/* Buttons and Indicators remain the same */}
      <button
        onClick={() => { if (currentIndex > 0) moveToSlide(currentIndex - 1); }}
        className="carousel-button prev group absolute top-1/2 -translate-y-1/2 left-[-24px] md:left-[5px] bg-[rgba(12,74,110,0.3)] text-cyan-400 border border-[rgba(14,165,233,0.4)] rounded-full w-12 h-12 md:w-10 md:h-10 flex justify-center items-center cursor-pointer z-20 transition-all duration-300 ease-out backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:bg-[rgba(14,165,233,0.3)] hover:text-slate-100 hover:-translate-y-1/2 hover:scale-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:-translate-y-1/2 active:scale-95"
        aria-label="Previous slide"
      >
        <span className="group-hover:button-glow-hover relative w-6 h-6"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </span>
      </button>
      <button
        onClick={() => { if (currentIndex < cardsData.length - 1) moveToSlide(currentIndex + 1); }}
        className="carousel-button next group absolute top-1/2 -translate-y-1/2 right-[-24px] md:right-[5px] bg-[rgba(12,74,110,0.3)] text-cyan-400 border border-[rgba(14,165,233,0.4)] rounded-full w-12 h-12 md:w-10 md:h-10 flex justify-center items-center cursor-pointer z-20 transition-all duration-300 ease-out backdrop-blur-sm shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:bg-[rgba(14,165,233,0.3)] hover:text-slate-100 hover:-translate-y-1/2 hover:scale-110 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] active:-translate-y-1/2 active:scale-95"
        aria-label="Next slide"
      >
         <span className="group-hover:button-glow-hover relative w-6 h-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </button>

      <div className="carousel-indicators flex justify-center gap-2.5 mt-8">
        {cardsData.map((_, index) => (
          <button
            key={index}
            onClick={() => moveToSlide(index)}
            className={`indicator w-6 h-1 rounded-sm cursor-pointer transition-all duration-300 ease-out
              ${index === currentIndex ? 'bg-cyan-400 shadow-[0_0_10px_theme(colors.cyan.400)]' : 'bg-[rgba(56,189,248,0.2)]'}`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex ? "true" : "false"}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default FuturisticCarousel;