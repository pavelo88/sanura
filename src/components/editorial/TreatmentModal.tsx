"use client";

import React from 'react';
import { X, Phone } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface TreatmentModalProps {
  treatment: Treatment;
  onClose: () => void;
}

export const TreatmentModal = ({ treatment, onClose }: TreatmentModalProps) => {
  const WHATSAPP_URL = "https://wa.me/593983992549";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06414B]/90 dark:bg-black/90 backdrop-blur-xl p-0 sm:p-6 lg:p-12" onClick={onClose}>
      <div className="bg-white dark:bg-[#0C1217] w-full h-full sm:h-[90vh] max-w-7xl flex flex-col md:flex-row relative shadow-2xl overflow-hidden border border-[#C4E8E9] dark:border-[#1F2E3A]" onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-[#06414B] transition-all">
          <X size={24} />
        </button>

        {/* IMAGEN: GLIDE CINEMATOGRÁFICO */}
        <div className="w-full h-1/2 md:h-full md:w-3/5 relative bg-black">
           <BeforeAfterSlider 
              imgAntes={treatment.imgAntes} 
              imgDespues={treatment.imgDespues} 
           />
        </div>

        {/* CONTENIDO EDITORIAL */}
        <div className="w-full h-1/2 md:h-full md:w-2/5 p-8 lg:p-16 flex flex-col justify-center bg-white dark:bg-[#0C1217] overflow-y-auto">
          <span className="text-[#5BC0BE] text-[10px] font-bold uppercase tracking-[0.5em] mb-8 border-b border-[#C4E8E9] dark:border-[#1F2E3A] inline-block pb-2">
            Protocolo Médico VIP
          </span>
          
          <h3 className="font-serif text-4xl lg:text-6xl text-[#06414B] dark:text-white mb-8 tracking-tighter leading-none uppercase">
            {treatment.name}
          </h3>
          
          <p className="font-sans text-[#3A8B99] dark:text-[#A0AAB2] text-xl leading-relaxed mb-12 font-light">
            {treatment.desc}
          </p>

          <div className="bg-[#F0F8F9] dark:bg-[#121A21] p-8 border-l-4 border-[#5BC0BE] mb-12">
            <p className="text-sm text-[#06414B] dark:text-[#E2E8F0] font-serif italic leading-relaxed">
              "La excelencia no es un acto, sino un hábito de rigor científico aplicado a la arquitectura facial."
            </p>
          </div>

          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noreferrer" 
            className="bg-[#06414B] dark:bg-[#1A2833] text-white text-center py-6 px-10 text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-4 shadow-xl"
          >
            <Phone size={18} /> Iniciar Valoración VIP
          </a>
        </div>

      </div>
    </div>
  );
};
