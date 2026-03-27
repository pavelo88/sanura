"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { experienceStats } from '@/lib/clinic-data';

interface HeroProps {
  onOpenCert: () => void;
}

export const Hero = ({ onOpenCert }: HeroProps) => {
  return (
    <header className="relative pt-24 lg:h-screen flex flex-col lg:flex-row bg-[#F0F8F9] dark:bg-[#0C1217] transition-colors duration-500 overflow-hidden">
      
      {/* LADO IZQUIERDO: SEGURO MÉDICO VIP / ICE BLUE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-20 lg:px-24 xl:px-32 z-10 bg-gradient-to-br from-[#E0F4F5] to-[#C4E8E9] dark:from-[#0C1217] dark:to-[#090D10] border-r border-[#C4E8E9] dark:border-[#1F2E3A]">
        <h1 className="font-serif text-5xl md:text-7xl xl:text-9xl text-[#06414B] dark:text-white mb-6 tracking-tighter leading-[0.85] transition-colors">
          ALTA <br /><span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">ESTÉTICA</span>
        </h1>
        <p className="font-serif italic text-2xl text-[#3A8B99] dark:text-[#5BC0BE] mb-12">El rigor científico se encuentra con la alta costura.</p>
        
        <p className="font-sans text-xl text-[#06414B]/70 dark:text-[#E2E8F0]/70 leading-relaxed mb-16 max-w-lg font-light">
          Redefiniendo la medicina regenerativa en Quito. Nuestra póliza de salud VIP garantiza protocolos de bioseguridad nivel 5 y resultados de elegancia atemporal.
        </p>

        <button 
          onClick={onOpenCert}
          className="group self-start flex flex-col items-start gap-4 bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white dark:hover:bg-white/10 py-6 px-10 border border-[#3A8B99]/20 transition-all cursor-pointer shadow-sm rounded-sm"
        >
          <div className="grid grid-cols-1 gap-3">
            <span className="text-[#06414B] dark:text-white text-[10px] tracking-[0.3em] uppercase font-bold flex items-center gap-3">
              <CheckCircle size={14} className="text-[#5BC0BE]"/> Permiso ACESS N° 0000
            </span>
            <span className="text-[#06414B] dark:text-white text-[10px] tracking-[0.3em] uppercase font-bold flex items-center gap-3">
              <CheckCircle size={14} className="text-[#5BC0BE]"/> Insumos Grado Médico
            </span>
          </div>
          <span className="text-[#3A8B99] dark:text-[#5BC0BE] text-[8px] uppercase tracking-[0.4em] mt-4 border-t border-[#3A8B99]/10 pt-4 w-full text-left group-hover:text-[#06414B] dark:group-hover:text-white transition-colors">
            Garantías Institucionales VIP
          </span>
        </button>
      </div>

      {/* LADO DERECHO: SILUETA + GRID DE EXPERIENCIA */}
      <div className="w-full lg:w-1/2 h-[600px] lg:h-full relative bg-[#090D10]">
        
        <div className="absolute inset-0 z-0">
          <BeforeAfterSlider 
            imgAntes="https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887&auto=format&fit=crop" 
            imgDespues="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop" 
          />
        </div>

        {/* GRID DE EXPERIENCIA MODULAR (Capas sutiles de 1px) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center p-8 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full border border-white/20 backdrop-blur-md bg-black/20 divide-x divide-white/20 divide-y md:divide-y-0">
            {experienceStats.map((stat, idx) => (
              <div key={idx} className="p-6 text-center">
                <span className="block text-2xl md:text-3xl font-serif text-[#5BC0BE] mb-1">{stat.value}</span>
                <span className="block text-[8px] tracking-[0.3em] uppercase text-white/60 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ETIQUETA EDITORIAL */}
        <div className="absolute top-12 right-12 z-20 pointer-events-none text-right">
          <span className="font-serif text-6xl md:text-9xl text-white/5 tracking-tighter block leading-none">ELITE</span>
          <span className="font-sans text-[10px] tracking-[0.8em] uppercase text-white/40 block mt-2">Protocolo N-V2.6</span>
        </div>
      </div>
    </header>
  );
};
