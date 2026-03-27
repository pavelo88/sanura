"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MoveHorizontal } from 'lucide-react';

// FIX TYPESCRIPT: Agregamos isActive y onInteraction a la interfaz
interface BeforeAfterSliderProps {
  imgAntes: string;
  imgDespues: string;
  isCardMode?: boolean;
  isActive?: boolean;
  onInteraction?: () => void;
}

export const BeforeAfterSlider = ({ imgAntes, imgDespues, isCardMode = false, isActive = true, onInteraction }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  // FIX TYPESCRIPT: Inicializamos useRef con 0
  const animationFrame = useRef<number>(0);
  const isAnimating = useRef(false);

  // Detectar si es un dispositivo táctil
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Animación Inicial (50% a 95% en 2 segundos)
  useEffect(() => {
    if (!isActive) {
      setPosition(100);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      isAnimating.current = false;
      return;
    }

    if (isAnimating.current) return;

    const startTimePos = 50;
    const targetTimePos = 95;
    setPosition(startTimePos);

    isAnimating.current = true;
    const startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentPos = startTimePos + (easeOut * (targetTimePos - startTimePos));

      setPosition(currentPos);

      if (progress < 1 && isAnimating.current) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        isAnimating.current = false;
      }
    };

    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      isAnimating.current = false;
    };
  }, [isActive]);

  // Cálculos matemáticos de posición
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = clientX - containerRect.left;
    let percentage = (x / containerRect.width) * 100;
    percentage = Math.max(2, Math.min(98, percentage));
    setPosition(percentage);
  }, []);

  // Función para avisarle al carrusel que el usuario intervino
  const notifyInteraction = useCallback(() => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    isAnimating.current = false;
    if (onInteraction) onInteraction();
  }, [onInteraction]);

  // ==============================================================================
  // 1. EVENTOS DE MOUSE (Laptop)
  // ==============================================================================
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    e.preventDefault();
    notifyInteraction();
    handleMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice || !isActive) return;
    // e.buttons > 0 significa que el usuario está haciendo click y arrastrando
    if (e.buttons > 0) {
      notifyInteraction();
      handleMove(e.clientX);
    }
  };

  // ==============================================================================
  // 2. EVENTOS TÁCTILES (Móvil)
  // ==============================================================================
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isTouchDevice) return;
    e.stopPropagation(); // Bloquea el toque hacia el carrusel
    notifyInteraction();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouchDevice || !isActive) return;
    if (e.cancelable) {
      e.preventDefault(); // Bloquea el scroll de toda la página
    }
    notifyInteraction();
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none group/slider bg-[#F0F8F9] dark:bg-[#090D10] ${isActive ? 'cursor-ew-resize' : 'cursor-default'
        }`}
      style={{ touchAction: isActive && isTouchDevice ? 'none' : 'auto' }}

      onMouseDown={!isTouchDevice ? handleMouseDown : undefined}
      onMouseMove={!isTouchDevice ? handleMouseMove : undefined}

      onTouchStart={isTouchDevice ? handleTouchStart : undefined}
      onTouchMove={isTouchDevice ? handleTouchMove : undefined}
    >
      <img
        src={imgAntes}
        alt="Antes"
        className="absolute inset-0 w-full h-full object-cover object-top grayscale-[15%] opacity-90"
        draggable="false"
        loading="lazy"
      />

      <div
        className="absolute top-0 left-0 bottom-0 w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={imgDespues}
          alt="Después"
          className="absolute inset-0 w-full h-full object-cover object-top"
          draggable="false"
          loading="lazy"
        />
      </div>

      {isActive && (
        <div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-white/20 via-white/70 to-white/20 pointer-events-none z-20 shadow-[0_0_20px_rgba(91,192,190,0.5)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCardMode ? 'w-8 h-8' : 'w-10 h-10 md:w-12 md:h-12'
            } bg-white/95 backdrop-blur-md rounded-full shadow-2xl flex items-center justify-center border-2 border-white/30 group-hover/slider:scale-110 transition-transform duration-300`}>
            <MoveHorizontal className={`${isCardMode ? 'h-4 w-4' : 'h-5 w-5 md:h-6 md:w-6'} text-[#06414B]`} />
          </div>
        </div>
      )}

      {isActive && (
        <>
          <div className={`absolute top-3 md:top-4 left-3 md:left-4 bg-[#06414B]/85 backdrop-blur-md text-white px-2.5 md:px-3 py-1 md:py-1.5 ${isCardMode ? 'text-[7px]' : 'text-[8px] md:text-[9px]'} uppercase tracking-[0.3em] rounded-md pointer-events-none z-10 shadow-lg font-semibold`}>
            Actual
          </div>
          <div className={`absolute top-3 md:top-4 right-3 md:right-4 bg-white/15 backdrop-blur-md text-white/70 px-2.5 md:px-3 py-1 md:py-1.5 ${isCardMode ? 'text-[7px]' : 'text-[8px] md:text-[9px]'} uppercase tracking-[0.3em] rounded-md pointer-events-none z-10 shadow-lg font-semibold`}>
            Antes
          </div>
        </>
      )}
    </div>
  );
};