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
      duration: 40 // Transición más lenta solicitada
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
      className="embla overflow-hidden py-16" 
      ref={emblaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="embla__container flex">
        {category.items.map((item, index) => {
          const isSelected = selectedIndex === index;
          
          return (
            <div 
              key={item.id} 
              className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4 transition-transform duration-[1500ms] ease-out"
              style={{ transform: isSelected ? 'scale(1.05)' : 'scale(0.95)' }}
            >
              <div className="flex flex-col h-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-xl overflow-hidden group">
                <div className="h-[450px] relative overflow-hidden">
                  <BeforeAfterSlider 
                    imgAntes={item.imgAntes} 
                    imgDespues={item.imgDespues} 
                    isCardMode={true} 
                  />
                </div>
                
                <div className="p-8 flex flex-col flex-grow items-center text-center justify-between gap-6">
                  <h4 className="font-serif text-2xl tracking-widest text-[#06414B] dark:text-white uppercase transition-colors group-hover:text-[#3A8B99] dark:group-hover:text-[#5BC0BE]">
                    {item.name}
                  </h4>
                  
                  <button 
                    onClick={() => onSelectTreatment(item)}
                    className="w-full bg-[#06414B] dark:bg-[#1A2833] text-white py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all"
                  >
                    Ver Protocolo Elite
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
