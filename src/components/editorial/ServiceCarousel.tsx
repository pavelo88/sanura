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

export const ServiceCarousel = ({ category, onSelectTreatment }: ServiceCarouselProps) => {
  const [autoplayDelay, setAutoplayDelay] = useState(2500); 
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center', 
      skipSnaps: false,
      duration: 50 // Transición más suave
    }, 
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const handleMouseEnter = () => setAutoplayDelay(4000);
  const handleMouseLeave = () => setAutoplayDelay(2500);

  return (
    <div 
      className="embla overflow-hidden py-4 md:py-6" 
      ref={emblaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="embla__container flex -ml-4 md:-ml-6">
        {category.items.map((item, index) => {
          const isSelected = selectedIndex === index;
          
          return (
            <div 
              key={item.id} 
              className="embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4 md:pl-6 transition-all duration-[1200ms] ease-out"
              style={{ 
                transform: isSelected ? 'scale(1.02)' : 'scale(0.95)',
                opacity: isSelected ? 1 : 0.4
              }}
            >
              <div className="flex flex-col h-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-lg overflow-hidden group">
                <div className="h-[280px] md:h-[340px] relative overflow-hidden">
                  <BeforeAfterSlider 
                    imgAntes={item.imgAntes} 
                    imgDespues={item.imgDespues} 
                    isCardMode={true}
                    isActive={isSelected} 
                  />
                </div>
                
                <div className="p-4 flex flex-col items-center text-center justify-between gap-2">
                  <h4 className="font-serif text-base tracking-widest text-[#06414B] dark:text-white uppercase transition-colors group-hover:text-[#3A8B99] dark:group-hover:text-[#5BC0BE] leading-tight">
                    {item.name}
                  </h4>
                  
                  <button 
                    onClick={() => onSelectTreatment(item)}
                    className="w-full bg-[#06414B] dark:bg-[#1A2833] text-white py-2.5 text-[7px] font-bold tracking-[0.4em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all"
                  >
                    Detalle Elite
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
