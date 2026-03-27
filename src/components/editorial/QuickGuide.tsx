
"use client";

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { guiaData } from '@/lib/clinic-data';

export const QuickGuide = () => {
  const [activeGuide, setActiveGuide] = useState<number | null>(null);

  return (
    <section id="guia" className="py-24 relative overflow-hidden transition-all duration-700">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl tracking-tighter uppercase text-[#06414B] dark:text-white">
            Ruta de <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Perfección</span>
          </h2>
          <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">Protocolo de selección clínica</p>
        </div>

        <div className="flex flex-col gap-6">
          {guiaData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveGuide(activeGuide === item.id ? null : item.id)}
              className={`glass-cyan dark:glass-teal transition-all duration-500 cursor-pointer p-8 rounded-[2.5rem] shadow-xl group border border-white/20
              ${activeGuide === item.id ? 'scale-[1.02] bg-white/10 dark:bg-white/5' : 'hover:scale-[1.01] hover:bg-white/5'}`}
            >
              <div className="flex justify-between items-center gap-6">
                <h4 className="font-serif text-xl md:text-2xl tracking-widest text-[#06414B] dark:text-white uppercase transition-colors group-hover:text-[#5BC0BE]">
                  {item.necesidad}
                </h4>
                <div className={`w-12 h-12 flex items-center justify-center rounded-full glass-cyan dark:glass-teal transition-all duration-500 ${activeGuide === item.id ? 'rotate-180 bg-[#5BC0BE] text-[#090D10]' : 'text-[#5BC0BE]'}`}>
                   <ChevronUp size={24} />
                </div>
              </div>
              
              <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeGuide === item.id ? 'max-h-[500px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                <div className="pt-8 border-t border-white/10 space-y-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold tracking-[0.5em] text-[#5BC0BE] uppercase">Protocolos Sugeridos:</p>
                    <p className="font-serif text-2xl md:text-3xl text-[#06414B] dark:text-white leading-relaxed">
                      {item.solucion}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 glass-cyan dark:glass-teal rounded-2xl border border-white/5">
                      <p className="text-[8px] tracking-[0.4em] uppercase text-white/40 mb-2 font-bold">Recuperación</p>
                      <p className="text-xs tracking-widest text-[#5BC0BE] uppercase font-bold">{item.recuperacion}</p>
                    </div>
                    <div className="p-6 glass-cyan dark:glass-teal rounded-2xl border border-white/5">
                      <p className="text-[8px] tracking-[0.4em] uppercase text-white/40 mb-2 font-bold">Durabilidad</p>
                      <p className="text-xs tracking-widest text-[#5BC0BE] uppercase font-bold">{item.duracion}</p>
                    </div>
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
