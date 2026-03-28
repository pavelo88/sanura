"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Treatment } from '@/lib/clinic-data';
// Nota: Si esta ruta te da error, recuerda cambiarla a '../BeforeAfterSlider' o la ruta correcta
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ServiceCarouselProps {
  category: Category;
  onSelectTreatment: (treatment: Treatment) => void;
  dbServices?: any[];
}

export const ServiceCarousel = ({ category, onSelectTreatment, dbServices = [] }: ServiceCarouselProps) => {
  // Lógica Híbrida
  const categoryItemsFromDB = dbServices?.filter((s: any) => s.categoryId === category.id) || [];
  const itemsToDisplay = categoryItemsFromDB.length > 0 ? categoryItemsFromDB : category.items;

  // Loop seguro: Evitamos loop si hay muy pocos elementos
  const isLoopSafe = itemsToDisplay.length > 3;

  const [autoplayDelay] = useState(4000);
  const autoplayPlugin = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: isLoopSafe,
      align: 'center', // Cambiado a 'start' para evitar el hueco en el centro
      skipSnaps: false,
      duration: 60,
      watchDrag: true // Deslizamiento en móvil activado
    },
    [autoplayPlugin.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect, onInit]);

  // Manejo del Autoplay (se pausa y vuelve a arrancar en 2 segundos)
  const handleSliderInteraction = useCallback(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi.plugins().autoplay;
    if (!autoplay) return;

    autoplay.stop();

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = setTimeout(() => {
      autoplay.play();
    }, 2000);
  }, [emblaApi]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div key={category.id} className="w-full flex flex-col items-center relative">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {itemsToDisplay.map((item: any, index: number) => {
            const isSelected = selectedIndex === index;

            return (
              // 1. EL CONTENEDOR DE EMBLA: Intocable, solo anchos y min-w-0 para evitar el bug del "fantasma"
              <div
                key={item.id || `fallback-${index}`}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 h-full"
              >
                {/* 2. EL CONTENEDOR VISUAL: Aquí van las escalas y opacidades */}
                <div
                  className="px-1 md:px-4 h-full transition-all duration-700 ease-out"
                  style={{
                    transform: isSelected ? 'scale(1)' : 'scale(0.95)',
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  <div className="flex flex-col h-full w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-lg overflow-hidden group rounded-2xl md:rounded-3xl">

                    {/* Evita que mover la imagen mueva todo el carrusel */}
                    <div
                      className="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 z-10 overflow-hidden"
                      onPointerDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    >
                      <BeforeAfterSlider
                        imgAntes={item.imgAntes}
                        imgDespues={item.imgDespues}
                        isCardMode={true}
                        isActive={isSelected}
                        onInteraction={handleSliderInteraction}
                      />
                    </div>

                    <button
                      onClick={() => onSelectTreatment(item)}
                      className="p-4 md:p-6 flex-1 flex flex-col items-center text-center justify-between gap-3 bg-white dark:bg-[#121A21] hover:bg-gray-50 dark:hover:bg-[#1A2630] transition-colors w-full cursor-pointer outline-none min-h-[5rem]"
                    >
                      <h4 className="font-serif text-lg md:text-xl tracking-widest text-[#06414B] dark:text-white uppercase line-clamp-2 min-h-[3rem]">
                        {item.name}
                      </h4>
                      <div className="w-full pt-3 border-t border-[#C4E8E9] dark:border-white/10">
                        <div className="text-[#5BC0BE] border border-[#5BC0BE] group-hover:bg-[#5BC0BE] group-hover:text-[#090D10] text-[10px] md:text-xs uppercase tracking-widest font-bold py-2.5 md:py-3 rounded-lg transition-all w-full text-center">
                          Ver Protocolo
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 md:mt-8 w-full">
        <button onClick={handlePrev} className="w-10 h-10 md:w-12 md:h-12 bg-[#06414B]/10 dark:bg-white/10 hover:bg-[#5BC0BE] text-[#06414B] dark:text-white hover:text-[#090D10] rounded-full flex items-center justify-center transition-all shadow-md">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {scrollSnaps.map((_, index: number) => (
            <button
              key={`dot-${index}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-300 rounded-full ${index === selectedIndex ? 'w-8 md:w-10 h-2 md:h-2.5 bg-[#5BC0BE]' : 'w-2 md:w-2.5 h-2 md:h-2.5 bg-[#06414B]/30 dark:bg-white/20'}`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="w-10 h-10 md:w-12 md:h-12 bg-[#06414B]/10 dark:bg-white/10 hover:bg-[#5BC0BE] text-[#06414B] dark:text-white hover:text-[#090D10] rounded-full flex items-center justify-center transition-all shadow-md">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};