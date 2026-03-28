"use client";

import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { guiaData as defaultGuia } from '@/lib/clinic-data';

interface QuickGuideProps {
  siteConfig?: any;
}

export const QuickGuide = ({ siteConfig }: QuickGuideProps) => {
  const [activeGuide, setActiveGuide] = useState<number | null>(null);

  // 1. Prioridad a las rutas configuradas en Firebase, respaldo en clinic-data.ts
  const data = siteConfig?.guide || defaultGuia;

  const toggleGuide = (id: number) => {
    setActiveGuide(activeGuide === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleGuide(id);
    }
  };

  return (
    <section id="guia" className="py-8 md:py-12 lg:py-16 relative overflow-hidden transition-all duration-700 bg-background scroll-mt-10" aria-label="Guía de protocolos y tratamientos">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">

        {/* Encabezado */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10 space-y-3 md:space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#06414B] dark:text-white tracking-tighter uppercase leading-tight">
            Ruta de <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Perfección</span>
          </h2>
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#3A8B99] dark:text-[#5BC0BE] font-light">
            Protocolo de selección clínica personalizado
          </p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#5BC0BE]/50 to-transparent max-w-xs mx-auto" />
        </div>

        {/* Contenedor del Acordeón */}
        <div
          className="flex flex-col gap-4 md:gap-5 lg:gap-6"
          role="region"
          aria-label="Preguntas frecuentes sobre protocolos"
        >
          {data.map((item: any, index: number) => (
            <div
              key={item.id || index}
              className="group"
            >
              <button
                onClick={() => toggleGuide(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                className={`w-full glass-cyan dark:glass-teal transition-all duration-500 cursor-pointer p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl md:rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-xl hover:shadow-2xl group text-left border border-white/30 dark:border-white/10 min-h-[60px] md:min-h-[72px] flex items-center justify-between ${activeGuide === item.id
                  ? 'scale-[1.01] md:scale-[1.02] bg-white/15 dark:bg-white/8 ring-2 ring-[#5BC0BE]/50'
                  : 'hover:scale-[1.01] hover:bg-white/8 dark:hover:bg-white/5'
                  } focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50`}
                aria-expanded={activeGuide === item.id}
                aria-controls={`guide-content-${item.id}`}
              >
                <h4 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest text-[#06414B] dark:text-white uppercase transition-colors group-hover:text-[#5BC0BE] leading-tight flex-1">
                  {item.necesidad}
                </h4>
                <div className={`w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 flex items-center justify-center rounded-full glass-cyan dark:glass-teal transition-all duration-500 flex-shrink-0 ml-4 ${activeGuide === item.id ? 'rotate-180 bg-[#5BC0BE] text-[#090D10] shadow-lg' : 'text-[#5BC0BE] group-hover:bg-[#5BC0BE]/20'}`}>
                  <ChevronUp size={20} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
                </div>
              </button>

              {/* Contenido Desplegable */}
              <div
                id={`guide-content-${item.id}`}
                className={`transition-all duration-700 ease-in-out overflow-hidden ${activeGuide === item.id ? 'max-h-[800px] md:max-h-[900px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className={`pt-6 md:pt-7 lg:pt-8 space-y-6 md:space-y-7 lg:space-y-8 border-t border-white/10 mt-4 md:mt-5 ${activeGuide === item.id ? 'animate-in fade-in slide-in-from-top-2 duration-500' : ''}`}>

                  {/* Texto de Solución */}
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.5em] text-[#5BC0BE] uppercase">
                      ✦ Protocolos Sugeridos
                    </p>
                    <p className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#06414B] dark:text-white leading-relaxed md:leading-relaxed lg:leading-relaxed">
                      {item.solucion}
                    </p>
                  </div>

                  {/* Cuadrícula de Recuperación y Duración */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
                    <div className="p-5 md:p-6 lg:p-7 glass-cyan dark:glass-teal rounded-xl md:rounded-2xl lg:rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/40 mb-2 md:mb-3 font-bold">⏱ Recuperación</p>
                      <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm tracking-widest text-[#5BC0BE] uppercase font-bold leading-relaxed">
                        {item.recuperacion}
                      </p>
                    </div>
                    <div className="p-5 md:p-6 lg:p-7 glass-cyan dark:glass-teal rounded-xl md:rounded-2xl lg:rounded-2xl border border-white/10 hover:border-white/20 transition-all">
                      <p className="text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.4em] uppercase text-white/40 mb-2 md:mb-3 font-bold">✓ Durabilidad</p>
                      <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm tracking-widest text-[#5BC0BE] uppercase font-bold leading-relaxed">
                        {item.duracion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Informativo */}
        <div className="mt-6 md:mt-8 lg:mt-10 text-center">
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#06414B]/60 dark:text-white/40 font-light">
            ✧ Selecciona cada opción para más detalles sobre protocolos y recuperación ✧
          </p>
        </div>
      </div>
    </section>
  );
};