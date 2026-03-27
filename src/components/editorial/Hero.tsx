
"use client";

import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { experienceStats } from '@/lib/clinic-data';
import { getFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface HeroProps {
  onOpenCert: () => void;
}

export const Hero = ({ onOpenCert }: HeroProps) => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const db = getFirestore();
      const docSnap = await getDoc(doc(db, 'settings', 'site-content'));
      if (docSnap.exists()) setContent(docSnap.data());
    };
    fetchContent();
  }, []);

  return (
    <header className="relative pt-24 min-h-screen flex flex-col lg:flex-row transition-all duration-1000 overflow-hidden bg-background">
      
      {/* LADO IZQUIERDO: SECCIÓN GLASS */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-20 lg:px-24 xl:px-32 z-10 glass-cyan dark:glass-teal border-r border-white/10">
        <div className="animate-in fade-in slide-in-from-left-20 duration-1000 space-y-8">
          <h1 className="font-serif text-5xl md:text-7xl xl:text-9xl text-[#06414B] dark:text-white tracking-tighter leading-[0.85]">
            {content?.heroTitle?.split(' ')[0] || 'ALTA'} <br />
            <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">
              {content?.heroTitle?.split(' ').slice(1).join(' ') || 'ESTÉTICA'}
            </span>
          </h1>
          
          <p className="font-serif italic text-2xl text-[#3A8B99] dark:text-[#5BC0BE]">
            {content?.heroSubtitle || 'El rigor científico se encuentra con la alta costura.'}
          </p>
          
          <p className="font-sans text-xl text-[#06414B]/70 dark:text-[#E2E8F0]/70 leading-relaxed max-w-lg font-light">
            Redefiniendo la medicina regenerativa en Quito. Nuestra póliza de salud VIP garantiza protocolos de bioseguridad nivel 5 y resultados de elegancia atemporal.
          </p>

          <button 
            onClick={onOpenCert}
            className="group self-start flex flex-col items-start gap-4 double-glass-light dark:double-glass-dark py-8 px-12 border border-[#3A8B99]/20 transition-all cursor-pointer shadow-2xl rounded-[2rem] hover:scale-105 active:scale-95"
          >
            <div className="grid grid-cols-1 gap-4">
              <span className="text-[#06414B] dark:text-white text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-4">
                <CheckCircle size={16} className="text-[#5BC0BE]"/> Permiso ACESS N° 0000
              </span>
              <span className="text-[#06414B] dark:text-white text-[10px] tracking-[0.4em] uppercase font-bold flex items-center gap-4">
                <CheckCircle size={16} className="text-[#5BC0BE]"/> Insumos Grado Médico
              </span>
            </div>
            <span className="text-[#3A8B99] dark:text-[#5BC0BE] text-[8px] uppercase tracking-[0.5em] mt-6 border-t border-[#3A8B99]/10 pt-6 w-full text-left font-bold">
              Garantías Institucionales VIP
            </span>
          </button>
        </div>
      </div>

      {/* LADO DERECHO: SLIDER & STATS */}
      <div className="w-full lg:w-1/2 h-[600px] lg:h-full relative bg-[#090D10]">
        <BeforeAfterSlider 
          imgAntes="https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887&auto=format&fit=crop" 
          imgDespues="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop" 
        />

        <div className="absolute inset-0 z-10 pointer-events-none flex items-end justify-center p-8 md:p-16">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full glass-teal border border-white/20 backdrop-blur-xl divide-x divide-white/10 divide-y md:divide-y-0 rounded-3xl overflow-hidden shadow-2xl">
            {experienceStats.map((stat, idx) => (
              <div key={idx} className="p-8 text-center group hover:bg-white/5 transition-colors pointer-events-auto">
                <span className="block text-3xl md:text-4xl font-serif text-[#5BC0BE] mb-2">{stat.value}</span>
                <span className="block text-[8px] tracking-[0.4em] uppercase text-white/40 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-12 right-12 z-20 pointer-events-none text-right opacity-20">
          <span className="font-serif text-6xl md:text-9xl text-white tracking-tighter block leading-none">ELITE</span>
          <span className="font-sans text-[10px] tracking-[0.8em] uppercase text-white block mt-4 font-bold">Protocolo N-V3.0</span>
        </div>
      </div>
    </header>
  );
};
