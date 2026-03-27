
"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { experienceStats } from '@/lib/clinic-data';

export function Hero({ onOpenCert }: { onOpenCert: () => void }) {
  return (
    <header className="relative pt-20 lg:h-screen flex flex-col lg:flex-row bg-[#F0F8F9] dark:bg-[#0C1217] transition-colors duration-700 overflow-hidden">
      
      {/* LADO IZQUIERDO: DEGRADADO Y TIPOGRAFÍA (Salud & Seguros) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-20 xl:px-32 z-10 bg-gradient-to-br from-[#E0F4F5] to-transparent dark:from-[#091014] dark:to-transparent">
        <h1 className="font-serif text-5xl md:text-7xl xl:text-9xl text-[#06414B] dark:text-white mb-6 tracking-tighter leading-none animate-in slide-in-from-left duration-1000">
          NVITALITY
        </h1>
        <p className="font-serif italic text-2xl md:text-3xl text-[#3A8B99] dark:text-[#5BC0BE] mb-12 animate-in slide-in-from-left delay-150 duration-1000">
          The Health & Insurance Issue
        </p>
        
        <p className="font-sans text-lg text-[#06414B]/80 dark:text-[#E2E8F0]/80 leading-relaxed mb-12 max-w-lg break-words hyphens-auto animate-in fade-in delay-300 duration-1000">
          Donde el rigor científico se encuentra con la alta costura. Redefiniendo la estética médica en Quito con protocolos internacionales de empoderamiento.
        </p>

        <button 
          onClick={onOpenCert}
          className="group self-start flex flex-col items-start gap-3 bg-white/50 dark:bg-[#121A21]/50 backdrop-blur-md py-6 px-8 rounded-none border border-[#C4E8E9] dark:border-[#1F2E3A] hover:bg-white dark:hover:bg-[#1A2630] transition-all cursor-pointer shadow-sm animate-in slide-in-from-bottom delay-500 duration-1000"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.2em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-3"/> Permiso ACESS</span>
            <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.2em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-3"/> Insumos ARCSA</span>
            <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.2em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-3"/> Aval SENESCYT</span>
          </div>
          <span className="text-[#3A8B99] dark:text-[#5BC0BE] text-[10px] uppercase tracking-widest mt-4 border-t border-[#C4E8E9] dark:border-[#1F2E3A] pt-4 w-full text-left group-hover:text-[#06414B] dark:group-hover:text-white transition-colors">
            Ver Garantías Institucionales
          </span>
        </button>
      </div>

      {/* LADO DERECHO: SILUETA Y GRID DE EXPERIENCIA (Moda & Sensualidad) */}
      <div className="w-full lg:w-1/2 h-[600px] lg:h-full relative bg-[#E0F4F5] dark:bg-[#090D10] border-l border-[#C4E8E9] dark:border-[#1F2E3A]">
        <div className="absolute top-12 left-12 z-30 pointer-events-none animate-in fade-in duration-1000">
          <h2 className="font-serif text-3xl md:text-5xl tracking-[0.2em] uppercase text-white drop-shadow-2xl">El Protocolo</h2>
          <p className="font-serif italic text-xl text-white/90 drop-shadow-xl">v.2026 Archive Edition</p>
        </div>

        {/* Grid de Experiencia Modular Minimalista */}
        <div className="absolute bottom-12 right-12 z-30 grid grid-cols-2 gap-px bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-in zoom-in duration-1000">
          {experienceStats.map((stat, i) => (
            <div key={i} className="p-6 md:p-8 flex flex-col justify-center items-center text-center bg-[#06414B]/10 dark:bg-black/20">
              <span className="font-serif text-2xl md:text-4xl text-white block mb-1">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-bold whitespace-nowrap">{stat.label}</span>
            </div>
          ))}
        </div>

        <BeforeAfterSlider 
          imgAntes="https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887&auto=format&fit=crop" 
          imgDespues="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop" 
        />
      </div>
    </header>
  );
}
