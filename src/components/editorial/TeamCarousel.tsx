"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';

// Se agregan las interfaces y los datos localmente para solucionar el error de compilación
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  bio: string;
  fullBio?: string;
}

export const teamData = [
  {
    category: "Especialistas",
    doctors: [
      {
        id: "1",
        name: "Dra. Gabriela Torres",
        specialty: "Dermatología & Cosmetología Facial",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
        bio: "Especialista enfocada en el cuidado integral y la estética de la piel.",
        fullBio: "La Dra. Gabriela Torres es experta en dermatología clínica..."
      },
      {
        id: "2",
        name: "Dra. Alicia Yepez",
        specialty: "Periodoncia & Implantes",
        image: "https://images.unsplash.com/photo-1594824436998-d70d22fbf0b5?auto=format&fit=crop&q=80&w=800",
        bio: "Experta en salud periodontal, restauración y rehabilitación dental.",
        fullBio: "La Dra. Alicia Yepez se enfoca en devolver la salud gingival..."
      },
      {
        id: "3",
        name: "Dr. Arturo Marquez",
        specialty: "Odontología & Ortodoncia Invisible",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800",
        bio: "Experto en ortodoncia y sistemas modernos de alineación invisible.",
        fullBio: "El Dr. Arturo Marquez cuenta con certificaciones avanzadas en ortodoncia..."
      }
    ]
  }
];

interface TeamCarouselProps {
  onSelectDoctor: (doctor: Doctor) => void;
  siteConfig?: any;
  dynamicTeam?: Doctor[];
}

// Texturas para alternar entre tarjetas (Mármol, Lino, Oro)
const cardTextures = [
  "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
  "url('https://www.transparenttextures.com/patterns/white-marble.png')",
  "url('https://www.transparenttextures.com/patterns/gold-scale.png')" // Simulación de textura dorada
];

export const TeamCarousel = ({ onSelectDoctor, dynamicTeam }: TeamCarouselProps) => {
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
            // Asignar fondo dinámico dependiendo de la posición
            const bgTexture = cardTextures[index % cardTextures.length];
            const isGoldTheme = index % 3 === 2; // La tercera tarjeta tiene tema oscuro/dorado

            return (
              <div
                key={doc.id}
                className="embla__slide flex-[0_0_100%] sm:flex-[0_0_60%] lg:flex-[0_0_35%] min-w-0"
              >
                <div
                  className="px-2 md:px-4 transition-all duration-700 ease-out cursor-pointer"
                  style={{
                    transform: isSelected ? 'scale(1)' : 'scale(0.85)',
                    opacity: isSelected ? 1 : 0.6,
                  }}
                  onClick={() => onSelectDoctor(doc)}
                >
                  {/* Tarjeta Principal */}
                  <div className={`group relative flex flex-col h-[550px] w-full border-[3px] border-[#C8A969]/80 shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-hidden transition-all duration-700 ${isGoldTheme ? 'bg-[#C5A059]' : 'bg-[#FDF8F0]'}`}>

                    {/* Fondo Texturizado */}
                    <div
                      className={`absolute inset-0 z-0 ${isGoldTheme ? 'opacity-30 mix-blend-multiply' : 'opacity-40 mix-blend-multiply'}`}
                      style={{ backgroundImage: bgTexture }}
                    />

                    {/* Imagen del Doctor */}
                    <div className="absolute inset-0 z-10 flex items-end justify-center">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-full h-full object-cover object-top grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000 mix-blend-normal"
                      />
                      {/* Gradiente sutil para legibilidad inferior */}
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Contenido (Textos y Botones) */}
                    <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">

                      {/* Especialidad (Arriba Centro) */}
                      <div className="flex justify-center mt-6">
                        <span className={`text-[10px] uppercase font-black tracking-[0.4em] text-center px-4 py-1 backdrop-blur-sm rounded-full ${isGoldTheme ? 'text-white bg-black/20' : 'text-[#8A6B2D] bg-white/40 border border-white/50'}`}>
                          {doc.specialty}
                        </span>
                      </div>

                      {/* Títulos y Botón (Abajo) */}
                      <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 w-full flex flex-col items-center text-center">
                        <h4 className={`font-serif text-4xl md:text-5xl leading-none drop-shadow-md ${isGoldTheme ? 'text-white' : 'text-white'}`}>
                          {doc.name.split(' ')[0]} <br />
                          <span className="opacity-90">{doc.name.split(' ').slice(1).join(' ')}</span>
                        </h4>

                        {/* Badges Flotantes a la derecha (Simulados) */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E6CA8C] to-[#AD8632] flex items-center justify-center shadow-lg border border-[#F9E2A9] p-1 text-[6px] font-black leading-tight text-center text-[#1A1A1A] uppercase">
                            Excelencia<br />Clínica
                          </div>
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E6CA8C] to-[#AD8632] flex items-center justify-center shadow-lg border border-[#F9E2A9] p-1 text-[7px] font-black leading-tight text-center text-[#1A1A1A] uppercase">
                            Cert.<br />MSP
                          </div>
                        </div>

                        {/* Botón Ver Perfil */}
                        <div className="pt-6 w-full px-4">
                          <div className="w-full flex items-center justify-between bg-gradient-to-r from-[#D7B466] to-[#A37B29] px-6 py-4 rounded-2xl border border-[#EACD8B] text-[10px] uppercase font-black tracking-[0.3em] text-[#1A1A1A] shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:brightness-110 transition-all">
                            <span>Ver Perfil Completo</span>
                            <Lock size={14} />
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

      {/* Controles del Carrusel */}
      <div className="flex items-center justify-center gap-8 mt-6 w-full">
        <button
          onClick={handlePrev}
          className="w-12 h-12 bg-gradient-to-br from-[#E6CA8C] to-[#AD8632] text-[#1A1A1A] hover:scale-105 rounded-full flex items-center justify-center transition-all shadow-[0_5px_15px_rgba(0,0,0,0.2)] border-2 border-[#F9E2A9]"
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Puntos 3D */}
        <div className="flex gap-4">
          {scrollSnaps.map((_, index: number) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={`dot-${index}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`transition-all duration-500 rounded-full w-5 h-5 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4),inset_2px_2px_4px_rgba(255,255,255,0.7),0_4px_6px_rgba(0,0,0,0.2)] ${isSelected
                    ? 'bg-gradient-to-br from-[#F4E5B8] to-[#AD8632] scale-125'
                    : 'bg-gradient-to-br from-[#f0f0f0] to-[#a0a0a0]'
                  }`}
              />
            );
          })}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 bg-gradient-to-br from-[#E6CA8C] to-[#AD8632] text-[#1A1A1A] hover:scale-105 rounded-full flex items-center justify-center transition-all shadow-[0_5px_15px_rgba(0,0,0,0.2)] border-2 border-[#F9E2A9]"
        >
          <ChevronRight size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};