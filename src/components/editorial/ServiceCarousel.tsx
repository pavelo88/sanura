"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Treatment } from '@/lib/clinic-data';
// IMPORTANTE: Asegúrate de que esta ruta a BeforeAfterSlider sea la correcta en tu proyecto
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
      align: 'center', // <-- CENTRADO, COMO DEBE SER
      skipSnaps: false,
      duration: 60,
      watchDrag: false // <-- DESACTIVADO EL ARRASTRE PARA NO CHOCAR CON EL ANTES/DESPUÉS
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

  // Manejo del Autoplay (se pausa y vuelve a arrancar en 2 segundos si el usuario suelta el mouse)
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

  // Si hay pocos componentes (1-2), no usamos carrusel para que se vean centrados y estéticos (Diseño Inteligente)
  if (itemsToDisplay.length <= 2) {
    return (
      <div className="w-full py-10 flex flex-wrap justify-center gap-10 md:gap-16 animate-in fade-in zoom-in duration-1000">
        {itemsToDisplay.map((item: any, index: number) => (
          <div key={item.id || index} className="w-full max-w-[400px] group transition-all duration-700 hover:scale-[1.05]">
            <div className="flex flex-col h-full w-full bg-[#FDF8F0] dark:bg-[#121A21] border border-[#0B252A]/10 dark:border-white/10 shadow-2xl overflow-hidden rounded-[2.5rem]">
              <div className="relative w-full aspect-square overflow-hidden border-b border-[#0B252A]/5">
                <BeforeAfterSlider
                  imgAntes={item.imgAntes}
                  imgDespues={item.imgDespues}
                  isCardMode={true}
                  isActive={true}
                />
              </div>
              <button
                onClick={() => onSelectTreatment(item)}
                className="p-8 flex-1 flex flex-col items-center text-center justify-between gap-5 bg-[#FDF8F0] dark:bg-[#121A21] hover:bg-white dark:hover:bg-[#1A2630] transition-all"
              >
                <h4 className="font-serif text-2xl tracking-widest text-[#0B252A] dark:text-white uppercase">
                  {item.name}
                </h4>
                <div className="w-full pt-4 border-t border-[#0B252A]/10 dark:border-white/10">
                  <div className="text-[#0B252A] dark:text-[#5BC0BE] border border-[#0B252A] dark:border-[#5BC0BE] group-hover:bg-[#0B252A] group-hover:text-white dark:group-hover:bg-[#5BC0BE] dark:group-hover:text-[#0B252A] text-[10px] uppercase tracking-[0.4em] font-black py-4 rounded-xl transition-all w-full text-center">
                    Ver Protocolo
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div key={category.id} className="w-full flex flex-col items-center relative">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {itemsToDisplay.map((item: any, index: number) => {
            const isSelected = selectedIndex === index;

            return (
              <div
                key={item.id || `fallback-${index}`}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 h-full"
              >
                <div
                  className="px-2 md:px-6 h-full transition-all duration-700 ease-out"
                  style={{
                    transform: isSelected ? 'scale(1)' : 'scale(0.92)',
                    opacity: isSelected ? 1 : 0.4,
                  }}
                >
                  <div className="flex flex-col h-full w-full bg-[#FDF8F0] dark:bg-[#121A21] border border-[#0B252A]/10 dark:border-white/10 shadow-xl overflow-hidden group rounded-[2.5rem]">
                    <div className="relative w-full aspect-square z-10 overflow-hidden border-b border-[#0B252A]/5">
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
                      className="p-6 md:p-10 flex-1 flex flex-col items-center text-center justify-between gap-4 bg-[#FDF8F0] dark:bg-[#121A21] hover:bg-white dark:hover:bg-[#1A2630] transition-colors w-full outline-none"
                    >
                      <h4 className="font-serif text-xl md:text-2xl tracking-widest text-[#0B252A] dark:text-white uppercase line-clamp-2 min-h-[3rem]">
                        {item.name}
                      </h4>
                      <div className="w-full pt-4 border-t border-[#0B252A]/10 dark:border-white/10">
                        <div className="text-[#0B252A] dark:text-[#5BC0BE] border border-[#0B252A] dark:border-[#5BC0BE] group-hover:bg-[#0B252A] group-hover:text-white dark:group-hover:bg-[#5BC0BE] dark:group-hover:text-[#0B252A] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black py-4 rounded-xl transition-all w-full text-center">
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