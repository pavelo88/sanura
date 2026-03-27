"use client";

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { guiaData } from '@/lib/clinic-data';

export const QuickGuide = () => {
  const [activeGuide, setActiveGuide] = useState<number | null>(null);

  return (
    <section id="guia" className="py-20 bg-white dark:bg-[#090D10] border-b border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl tracking-tighter uppercase mb-4 text-[#06414B] dark:text-white">
            Ruta de <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Perfección</span>
          </h2>
          <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">Guía rápida de selección clínica personalizada</p>
        </div>

        <div className="flex flex-col gap-4">
          {guiaData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveGuide(activeGuide === item.id ? null : item.id)}
              className={`border transition-all duration-500 cursor-pointer p-6 md:p-8 shadow-sm ${activeGuide === item.id ? 'border-[#5BC0BE] bg-[#F0F8F9] dark:bg-[#121A21]' : 'border-[#C4E8E9] dark:border-[#1F2E3A] hover:border-[#5BC0BE] bg-white dark:bg-[#0C1217]'}`}
            >
              <div className="flex justify-between items-center gap-6">
                <h4 className="font-serif text-xl md:text-2xl tracking-widest text-[#06414B] dark:text-white uppercase">{item.necesidad}</h4>
                <div className={`transform transition-transform duration-500 ${activeGuide === item.id ? 'rotate-180 text-[#5BC0BE]' : 'text-[#3A8B99] dark:text-[#5BC0BE]/30'}`}>
                   <ChevronUp size={24} />
                </div>
              </div>
              
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeGuide === item.id ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="pt-8 border-t border-[#C4E8E9] dark:border-[#1F2E3A]">
                  <p className="text-[9px] font-bold tracking-[0.4em] uppercase text-[#5BC0BE] mb-3">Protocolos Recomendados:</p>
                  <p className="font-serif text-2xl md:text-3xl text-[#06414B] dark:text-white mb-8">{item.solucion}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[9px] text-[#3A8B99] dark:text-A0AAB2 uppercase tracking-[0.5em] bg-white/50 dark:bg-[#090D10]/50 p-4 border border-[#C4E8E9] dark:border-[#1F2E3A]">
                    <span><strong>Recuperación:</strong> {item.recuperacion}</span>
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
};