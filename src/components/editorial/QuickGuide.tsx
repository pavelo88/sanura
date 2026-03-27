"use client";

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { guiaData } from '@/lib/clinic-data';

export function QuickGuide() {
  const [activeGuide, setActiveGuide] = useState<number | null>(null);

  return (
    <section id="guia" className="py-24 md:py-32 bg-white dark:bg-[#090D10] border-b border-[#C4E8E9] dark:border-[#162128] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-serif text-4xl md:text-6xl tracking-widest uppercase mb-6 text-[#06414B] dark:text-white">
            ¿Qué busca optimizar hoy?
          </h2>
          <div className="w-24 h-1 bg-[#5BC0BE] mx-auto mb-8"></div>
          <p className="font-serif italic text-xl md:text-2xl text-[#3A8B99] dark:text-[#5BC0BE]">
            Guía rápida de selección clínica
          </p>
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          {guiaData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveGuide(activeGuide === item.id ? null : item.id)}
              className={`border transition-all duration-500 cursor-pointer p-8 md:p-12 shadow-sm ${activeGuide === item.id ? 'border-[#5BC0BE] bg-[#F0F8F9] dark:bg-[#121A21] scale-[1.02]' : 'border-[#C4E8E9] dark:border-[#1F2E3A] hover:border-[#5BC0BE] bg-white dark:bg-[#0C1217]'}`}
            >
              <div className="flex justify-between items-center gap-6">
                <h4 className="font-serif text-xl md:text-3xl tracking-widest text-[#06414B] dark:text-[#E2E8F0] uppercase leading-tight">
                  {item.necesidad}
                </h4>
                <div className={`transform transition-transform duration-500 shrink-0 ${activeGuide === item.id ? 'rotate-180 text-[#5BC0BE]' : 'text-[#3A8B99]'}`}>
                   <ChevronUp size={24} className="md:w-8 md:h-8" />
                </div>
              </div>
              
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeGuide === item.id ? 'max-h-80 opacity-100 mt-10' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="pt-8 border-t border-[#C4E8E9] dark:border-[#1F2E3A]">
                  <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#5BC0BE] mb-4">Protocolos Recomendados:</p>
                  <p className="font-sans text-xl md:text-3xl text-[#06414B] dark:text-white mb-10 font-bold leading-tight">
                    {item.solucion}
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 md:gap-16 text-[10px] md:text-xs text-[#3A8B99] dark:text-[#A0AAB2] uppercase tracking-[0.4em] bg-white dark:bg-[#090D10] p-6 border border-[#C4E8E9] dark:border-[#162128]">
                    <span><strong>Recuperación:</strong> {item.recuperacion}</span>
                    <span className="hidden md:inline opacity-20">|</span>
                    <span><strong>Durabilidad:</strong> {item.duracion}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
