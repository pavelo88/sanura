"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, User, Award } from 'lucide-react';
import { teamData, Doctor } from '@/lib/clinic-data';

interface TeamCarouselProps {
  onSelectDoctor: (doctor: Doctor) => void;
  siteConfig?: any;
  dynamicTeam?: Doctor[];
}

export const TeamCarousel = ({ onSelectDoctor, dynamicTeam }: TeamCarouselProps) => {
  // Aplanamos todos los doctores para un carrusel continuo
  const allDoctors = dynamicTeam || teamData.flatMap(category => category.doctors);

  
  const [autoplayDelay] = useState(5000);
  const autoplayPlugin = useRef(Autoplay({ delay: autoplayDelay, stopOnInteraction: false }));

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      duration: 50,
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

  const handlePrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const handleNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="w-full flex flex-col items-center relative">
      <div className="w-full overflow-hidden py-10" ref={emblaRef}>
        <div className="embla__container flex">
          {allDoctors.map((doc, index) => {
            const isSelected = selectedIndex === index;

            return (
              <div
                key={doc.id}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                <div
                  className="px-4 md:px-8 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: isSelected ? 'scale(1)' : 'scale(0.88)',
                    opacity: isSelected ? 1 : 0.4,
                  }}
                  onClick={() => onSelectDoctor(doc)}
                >
                  <div className="group relative flex flex-col h-[500px] w-full bg-[#FDF8F0] dark:bg-[#121A21] border border-[#0B252A]/10 dark:border-white/10 shadow-2xl rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-[0_45px_100px_rgba(0,0,0,0.15)]">
                    
                    {/* Imagen con Overlay */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0B252A] via-[#0B252A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    </div>

                    {/* Contenido */}
                    <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
                      <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                        <span className="text-accent text-[10px] uppercase font-black tracking-[0.4em] inline-block border-b border-white/20 pb-2">
                           {doc.specialty}
                        </span>
                        <h4 className="font-serif text-3xl md:text-4xl leading-tight">
                           {doc.name.split(' ')[0]} <br/> 
                           <span className="opacity-80">{doc.name.split(' ').slice(1).join(' ')}</span>
                        </h4>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                           <p className="text-[10px] md:text-[11px] font-medium leading-relaxed uppercase tracking-widest text-white/70 line-clamp-2">
                              {doc.bio}
                           </p>
                        </div>
                        <div className="pt-6">
                           <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-[9px] uppercase font-bold tracking-[0.3em] group-hover:bg-accent group-hover:text-[#0B252A] group-hover:border-accent transition-all">
                              Ver Perfil Completo <Award size={14} />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-4 w-full">
        <button onClick={handlePrev} className="w-12 h-12 bg-brand/5 dark:bg-white/5 hover:bg-accent text-brand dark:text-white hover:text-brand rounded-full flex items-center justify-center transition-all shadow-md group border border-brand/10 dark:border-white/10">
          <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex gap-3">
          {scrollSnaps.map((_, index: number) => (
            <button
              key={`dot-${index}`}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`transition-all duration-500 rounded-full h-2.5 ${index === selectedIndex ? 'w-10 bg-accent shadow-[0_0_15px_rgba(197,160,89,0.5)]' : 'w-2.5 bg-brand/20 dark:bg-white/10'}`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="w-12 h-12 bg-brand/5 dark:bg-white/5 hover:bg-accent text-brand dark:text-white hover:text-brand rounded-full flex items-center justify-center transition-all shadow-md group border border-brand/10 dark:border-white/10">
          <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};
