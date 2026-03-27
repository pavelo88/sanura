"use client";
import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ServiceCarouselProps {
  category: Category;
  onSelectTreatment: (treatment: Treatment) => void;
}

export const ServiceCarousel = ({ category, onSelectTreatment }: ServiceCarouselProps) => {
  const [autoplayDelay] = useState(4000);
  const autoplayPlugin = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 1. Configuración del Carrusel (watchDrag: false para que NO se mueva con el dedo)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      duration: 60, // Movimiento suave entre slides
      watchDrag: false // Petición: Solo se mueve con flechas/puntos
    },
    [autoplayPlugin.current]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // 2. Nueva Función: Detener el Autoplay cuando el usuario manipula el slider
  const handleSliderInteraction = useCallback(() => {
    if (!emblaApi) return;
    // Petición: Detener el carrusel si el usuario toca el antes/despues
    const autoplay = emblaApi.plugins().autoplay;
    if (autoplay && typeof autoplay.stop === 'function') {
      autoplay.stop(); // Congela el carrusel definitivamente
      console.log("Carrusel detenido por interacción con el Slider");
    }
  }, [emblaApi]);

  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full py-6 md:py-8 lg:py-12">
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-12">
        <div
          className="embla overflow-hidden rounded-xl md:rounded-3xl shadow-inner"
          ref={emblaRef}
        >
          <div className="embla__container flex -ml-3 sm:-ml-4 md:-ml-5">
            {category.items.map((item, index) => {
              const isSelected = selectedIndex === index;

              return (
                <div
                  key={item.id}
                  className="embla__slide flex-[0_0_calc(100%-12px)] sm:flex-[0_0_calc(50%-16px)] lg:flex-[0_0_calc(33.333%-20px)] pl-3 sm:pl-4 md:pl-5 transition-all duration-1000 ease-out"
                  style={{
                    transform: isSelected ? 'scale(1.03)' : 'scale(0.95)',
                    opacity: isSelected ? 1 : 0.4,
                    zIndex: isSelected ? 10 : 1
                  }}
                >
                  <div className="flex flex-col h-full w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-xl overflow-hidden group rounded-2xl lg:rounded-[2.5rem] relative">

                    {/* Contenedor del Slider (Fluido y sincronizado) */}
                    <div className="relative overflow-hidden flex-shrink-0 aspect-[4/5] bg-gray-100 dark:bg-gray-900 z-10">
                      <BeforeAfterSlider
                        imgAntes={item.imgAntes}
                        imgDespues={item.imgDespues}
                        isCardMode={true}
                        isActive={isSelected}
                        // Conectamos la interacción
                        onInteraction={handleSliderInteraction}
                      />
                    </div>

                    {/* Sección Inferior de Texto y Botón */}
                    <button
                      onClick={() => onSelectTreatment(item)}
                      className="p-5 md:p-6 lg:p-8 flex flex-col items-center text-center justify-between gap-4 md:gap-5 flex-1 bg-white dark:bg-[#121A21] hover:bg-gray-50 dark:hover:bg-[#1A2630] transition-colors w-full z-20 focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 cursor-pointer"
                      aria-label={`Ver detalles de ${item.name}`}
                    >
                      <h4 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest text-[#06414B] dark:text-white transition-colors group-hover:text-[#3A8B99] dark:group-hover:text-[#5BC0BE] leading-tight uppercase">
                        {item.name}
                      </h4>
                      <div className="w-full pt-3 md:pt-4 border-t border-[#C4E8E9] dark:border-white/10">
                        <div className="text-[#5BC0BE] border-2 border-[#5BC0BE] group-hover:bg-[#5BC0BE] group-hover:text-[#090D10] text-[8px] md:text-[9px] uppercase tracking-[0.4em] font-bold py-3 md:py-4 rounded-xl transition-all w-full text-center">
                          Ver Protocolo Completo
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Botones de Navegación (Flechas) */}
        <button onClick={handlePrev} className="absolute left-0 md:left-2 lg:left-4 top-[42%] -translate-y-1/2 -translate-x-1/2 md:translate-x-0 z-30 w-11 h-11 md:w-14 md:h-14 bg-[#06414B]/90 dark:bg-[#5BC0BE]/90 text-white dark:text-[#090D10] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"><ChevronLeft size={24} /></button>
        <button onClick={handleNext} className="absolute right-0 md:right-2 lg:right-4 top-[42%] -translate-y-1/2 translate-x-1/2 md:translate-x-0 z-30 w-11 h-11 md:w-14 md:h-14 bg-[#06414B]/90 dark:bg-[#5BC0BE]/90 text-white dark:text-[#090D10] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"><ChevronRight size={24} /></button>

        {/* Puntos de Pagina */}
        <div className="flex justify-center gap-2.5 md:gap-3.5 mt-8 md:mt-10">
          {category.items.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-500 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 ${index === selectedIndex ? 'w-9 md:w-12 h-2.5 md:h-3 bg-[#5BC0BE] shadow-xl' : 'w-2.5 md:w-3.5 h-2.5 md:h-3.5 bg-[#06414B]/30 dark:bg-white/10 hover:bg-[#06414B]/60'}`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};