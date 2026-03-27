
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  imgAntes: string;
  imgDespues: string;
  isCardMode?: boolean;
}

export function BeforeAfterSlider({ imgAntes, imgDespues, isCardMode = false }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(100);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Efecto "Glide Cinematográfico" (100 -> 75 -> 95) en 3 segundos
  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;
    const duration = 3000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      
      // Interpolación: del 75% al 95%
      const newPos = 75 + (progress * 20);
      setPosition(newPos);

      if (progress < 1 && isHovered) {
        animationId = requestAnimationFrame(animate);
      }
    };

    if (isHovered) {
      setPosition(75);
      animationId = requestAnimationFrame(animate);
    } else {
      setPosition(100);
    }

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // Observer para móviles (disparar glide automático al entrar en pantalla)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.innerWidth < 1024) {
          setIsHovered(true);
        } else if (!entry.isIntersecting && window.innerWidth < 1024) {
          setIsHovered(false);
        }
      },
      { threshold: 0.6 }
    );

    if (sliderRef.current) observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sliderRef}
      className="relative w-full h-full overflow-hidden select-none group/slider touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      {/* CONTROLADOR MANUAL */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Deslizar"
      />

      {/* LÍNEA DIVISORIA */}
      <div
        className="absolute top-0 bottom-0 w-[1px] bg-white/50 backdrop-blur-sm pointer-events-none z-20 transition-opacity duration-300"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCardMode ? 'w-8 h-8' : 'w-10 h-10'} bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-gray-100`}>
          <MoveHorizontal className={`${isCardMode ? 'h-4 w-4' : 'h-5 w-5'} text-gray-800`} />
        </div>
      </div>
      
      {/* ETIQUETAS EDITORIALES */}
      <div className={`absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-widest rounded-sm pointer-events-none z-10`}>
        Actualidad
      </div>
      <div className={`absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-widest rounded-sm pointer-events-none z-10`}>
        Antes
      </div>
    </div>
  );
}
