
"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { experienceStats } from '@/lib/clinic-data';

interface HeroProps {
  onOpenCert: () => void;
  siteConfig?: any;
}

export const Hero = ({ onOpenCert, siteConfig }: HeroProps) => {
  return (
    <header className="relative pt-20 min-h-screen flex flex-col lg:flex-row transition-all duration-1000 overflow-hidden bg-background">
      
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-24 xl:px-32 z-10 glass-cyan dark:glass-teal border-r border-white/10">
        <div className="animate-in fade-in slide-in-from-left-20 duration-1000 space-y-6">
          <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl text-[#06414B] dark:text-white tracking-tighter leading-[0.85]">
            {siteConfig?.heroTitle?.split(' ')[0] || 'ALTA'} <br />
            <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">
              {siteConfig?.heroTitle?.split(' ').slice(1).join(' ') || 'ESTÉTICA'}
            </span>
          </h1>
          
          <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">
            {siteConfig?.heroSubtitle || 'El rigor científico se encuentra con la alta costura.'}
          </p>
          
          <p className="font-sans text-lg text-[#06414B]/70 dark:text-[#E2E8F0]/70 leading-relaxed max-w-md font-light">
            Redefiniendo la medicina regenerativa en Quito. Nuestra póliza de salud VIP garantiza protocolos de bioseguridad nivel 5 y resultados de elegancia atemporal.
          </p>

          <button 
            onClick={onOpenCert}
            className="group self-start flex flex-col items-start gap-3 double-glass-light dark:double-glass-dark py-6 px-10 border border-[#3A8B99]/20 transition-all cursor-pointer shadow-2xl rounded-[2rem] hover:scale-105 active:scale-95"
          >
            <div className="grid grid-cols-1 gap-2">
              <span className="text-[#06414B] dark:text-white text-[9px] tracking-[0.3em] uppercase font-bold flex items-center gap-3">
                <CheckCircle size={14} className="text-[#5BC0BE]"/> Permiso ACESS N° 0000
              </span>
              <span className="text-[#06414B] dark:text-white text-[9px] tracking-[0.3em] uppercase font-bold flex items-center gap-3">
                <CheckCircle size={14} className="text-[#5BC0BE]"/> Insumos Grado Médico
              </span>
            </div>
            <span className="text-[#3A8B99] dark:text-[#5BC0BE] text-[8px] uppercase tracking-[0.4em] mt-4 border-t border-[#3A8B99]/10 pt-4 w-full text-left font-bold">
              Garantías Institucionales VIP
            </span>
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-[500px] lg:h-auto relative bg-[#090D10]">
        <BeforeAfterSlider 
          imgAntes="https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887&auto=format&fit=crop" 
          imgDespues="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop" 
        />

        <div className="absolute inset-x-0 bottom-12 z-20 flex justify-center px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {experienceStats.map((stat, idx) => (
              <div key={idx} className="glass-teal border border-white/20 p-6 text-center rounded-2xl shadow-2xl transition-all hover:scale-105">
                <span className="block text-2xl md:text-3xl font-serif text-[#5BC0BE] mb-1">{stat.value}</span>
                <span className="block text-[7px] tracking-[0.3em] uppercase text-white/40 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-10 right-10 z-20 pointer-events-none text-right opacity-10">
          <span className="font-serif text-6xl md:text-8xl text-white tracking-tighter block leading-none">ELITE</span>
          <span className="font-sans text-[8px] tracking-[0.6em] uppercase text-white block mt-3 font-bold">Protocolo N-V3.0</span>
        </div>
      </div>
    </header>
  );
};
