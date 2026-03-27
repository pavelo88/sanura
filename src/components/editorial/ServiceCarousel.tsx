
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Category, Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface ServiceCarouselProps {
  category: Category;
  onSelectTreatment: (treatment: Treatment) => void;
}

export function ServiceCarousel({ category, onSelectTreatment }: ServiceCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Carrusel Infinito con Autoplay Variable (2.5s -> 4s en hover)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      duration: 40 // Transición más lenta y suave
    },
    [
      Autoplay({ 
        delay: isHovered ? 4000 : 2500, 
        stopOnInteraction: false,
        stopOnMouseEnter: false 
      })
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div 
      className="embla overflow-hidden cursor-grab active:cursor-grabbing py-12" 
      ref={emblaRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="embla__container flex">
        {category.items.map((item, index) => {
          const isCenter = index === selectedIndex;
          return (
            <div 
              key={item.id} 
              // Visibilidad 3-2-1
              className={`embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 md:px-8 transition-all duration-1000 ease-in-out ${isCenter ? 'scale-105 z-10 opacity-100' : 'scale-90 opacity-40 grayscale-[30%]'}`}
            >
              <div className="flex flex-col shadow-2xl border border-gray-100 dark:border-[#1F2E3A] bg-white dark:bg-[#121A21] h-full group/card transition-all">
                
                {/* Visual Section con Glide Cinematográfico */}
                <div className="h-[400px] md:h-[480px] w-full relative overflow-hidden">
                  <BeforeAfterSlider 
                    imgAntes={item.imgAntes} 
                    imgDespues={item.imgDespues} 
                    isCardMode={true} 
                  />
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex-grow flex flex-col items-center justify-center text-center">
                  <h4 className="font-serif text-xl md:text-2xl tracking-wider text-[#06414B] dark:text-[#E2E8F0] mb-6 leading-tight group-hover/card:text-[#3A8B99] dark:group-hover/card:text-[#5BC0BE] transition-colors">
                    {item.name}
                  </h4>
                  <button 
                    onClick={() => onSelectTreatment(item)}
                    className="bg-[#06414B] dark:bg-[#1A2833] text-white px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all transform hover:-translate-y-1 shadow-md"
                  >
                    Ver Protocolo Completo
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
