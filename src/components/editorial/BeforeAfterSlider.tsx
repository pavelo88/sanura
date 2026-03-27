"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  imgAntes: string;
  imgDespues: string;
  isCardMode?: boolean;
  isActive?: boolean; 
}

export const BeforeAfterSlider = ({ imgAntes, imgDespues, isCardMode = false, isActive = true }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerGlide = () => {
    if (!isActive) return;
    
    // Salto inicial al 75%
    setPosition(75);
    const startTime = Date.now();
    const duration = 3000; 

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolación suave de 75 a 95
      const currentPos = 75 + (progress * (95 - 75));
      setPosition(currentPos);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isActive) {
      triggerGlide();
    } else {
      setPosition(100); // 100% Actualidad si no es el activo
    }
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none group/slider ${isActive && !isCardMode ? 'cursor-ew-resize' : 'cursor-default'} ${isCardMode ? 'pointer-events-none' : ''}`}
      onMouseEnter={() => !isCardMode && triggerGlide()}
      onMouseLeave={() => !isCardMode && setPosition(100)}
    >
      {/* CAPA BASE: ANTES */}
      <img
        src={imgAntes}
        alt="Antes"
        className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%]"
      />

      {/* CAPA SUPERPUESTA: ACTUALIDAD */}
      <div
        className="absolute top-0 left-0 bottom-0 w-full overflow-hidden transition-all duration-300 ease-out"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={imgDespues}
          alt="Actualidad"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* DIVISOR CINEMÁTICO - SOLO SI ESTÁ ACTIVO */}
      {isActive && (
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-white/50 pointer-events-none z-20 transition-all duration-300"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCardMode ? 'w-6 h-6' : 'w-12 h-12'} bg-white/90 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center border border-white/20`}>
            <MoveHorizontal className={`${isCardMode ? 'h-3 w-3' : 'h-6 w-6'} text-[#06414B]`} />
          </div>
        </div>
      )}
      
      {/* ETIQUETAS */}
      <div className={`absolute top-3 left-3 bg-[#06414B]/80 backdrop-blur-md text-white px-2 py-0.5 ${isCardMode ? 'text-[7px]' : 'text-[10px]'} uppercase tracking-[0.3em] rounded-sm pointer-events-none z-10 shadow-lg opacity-0 group-hover/slider:opacity-100 transition-opacity`}>
        Actualidad
      </div>
      <div className={`absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white/60 px-2 py-0.5 ${isCardMode ? 'text-[7px]' : 'text-[10px]'} uppercase tracking-[0.3em] rounded-sm pointer-events-none z-10 opacity-0 group-hover/slider:opacity-100 transition-opacity`}>
        Antes
      </div>
    </div>
  );
};
