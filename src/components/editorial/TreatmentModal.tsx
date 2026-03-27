"use client";

import React from 'react';
import { X, Phone } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface TreatmentModalProps {
  treatment: Treatment;
  onClose: () => void;
}

export function TreatmentModal({ treatment, onClose }: TreatmentModalProps) {
  const WHATSAPP_URL = "https://wa.me/593983992549";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06414B]/80 dark:bg-black/90 backdrop-blur-md p-0 sm:p-4 lg:p-8" onClick={onClose}>
      
      <div className="bg-white dark:bg-[#0C1217] w-full h-[100dvh] sm:h-[90vh] md:h-[650px] max-w-6xl flex flex-col md:flex-row relative sm:shadow-2xl sm:rounded-none overflow-hidden border-t md:border border-[#C4E8E9] dark:border-[#1F2E3A]" onClick={e => e.stopPropagation()}>
        
        {/* BOTÓN CERRAR */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-white/10 backdrop-blur-xl p-3 rounded-full text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-all shadow-xl">
          <X size={24} />
        </button>

        {/* LADO VISUAL (50%) */}
        <div className="w-full h-[40%] sm:h-[45%] md:h-full md:w-1/2 relative bg-[#F0F8F9] dark:bg-[#090D10] shrink-0 border-r border-[#C4E8E9] dark:border-[#1F2E3A]">
           <BeforeAfterSlider 
              imgAntes={treatment.imgAntes} 
              imgDespues={treatment.imgDespues} 
           />
        </div>

        {/* LADO CONTENIDO (50%) */}
        <div className="w-full h-[60%] sm:h-[55%] md:h-full md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col relative overflow-y-auto bg-white dark:bg-[#0C1217]">
          
          <div className="flex-grow flex flex-col justify-center">
            <span className="text-[#5BC0BE] text-xs font-bold uppercase tracking-[0.4em] mb-6 border-b border-[#C4E8E9] dark:border-[#1F2E3A] inline-block w-max pb-2">
              Análisis Clínico y Protocolo v.2026
            </span>
            
            <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#06414B] dark:text-white mb-8 uppercase tracking-tighter leading-none break-words">
              {treatment.name}
            </h3>
            
            <p className="font-sans text-[#3A8B99] dark:text-[#A0AAB2] text-lg sm:text-xl leading-relaxed mb-10">
              {treatment.desc}
            </p>

            <div className="bg-[#F0F8F9] dark:bg-[#121A21] p-8 border-l-4 border-[#5BC0BE] mb-10">
              <p className="text-sm md:text-base text-[#06414B] dark:text-[#E2E8F0] font-serif italic leading-relaxed">
                Este protocolo ha sido validado bajo estrictos estándares de bioseguridad internacional. La intervención es operada exclusivamente por nuestro cuadro médico titular con registro SENESCYT.
              </p>
            </div>
          </div>

          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#06414B] dark:bg-[#1A2833] text-white text-center py-6 px-8 text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-4 w-full shadow-2xl mt-auto"
          >
            <Phone size={18} /> Iniciar Valoración Médica VIP
          </a>
        </div>

      </div>
    </div>
  );
}
