"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  imgAntes: string;
  imgDespues: string;
  isCardMode?: boolean;
}

export const BeforeAfterSlider = ({ imgAntes, imgDespues, isCardMode = false }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Observer para activar animación al entrar en vista (celulares)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Lógica de Glide: 100% -> 75% -> 95%
  const triggerGlide = () => {
    setPosition(75);
    const startTime = Date.now();
    const duration = 3000; // 3 segundos solicitado

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolación lineal de 75 a 95
      const currentPos = 75 + (progress * (95 - 75));
      setPosition(currentPos);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isIntersecting) {
      triggerGlide();
    } else {
      setPosition(100);
    }
  }, [isIntersecting]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none group/slider touch-pan-y"
      onMouseEnter={triggerGlide}
      onMouseLeave={() => setPosition(100)}
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

      {/* DIVISOR CINEMÁTICO */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/50 pointer-events-none z-20 transition-all duration-300"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCardMode ? 'w-8 h-8' : 'w-12 h-12'} bg-white/90 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border border-white/20`}>
          <MoveHorizontal className={`${isCardMode ? 'h-4 w-4' : 'h-6 w-6'} text-[#06414B]`} />
        </div>
      </div>
      
      <div className={`absolute top-4 left-4 bg-[#06414B]/80 backdrop-blur-md text-white px-3 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-[0.3em] rounded-sm pointer-events-none z-10 shadow-xl`}>
        Actualidad
      </div>
      <div className={`absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white/60 px-3 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-[0.3em] rounded-sm pointer-events-none z-10`}>
        Antes
      </div>
    </div>
  );
};
