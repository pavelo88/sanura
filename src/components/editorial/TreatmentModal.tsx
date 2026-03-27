"use client";

import React, { useEffect } from 'react';
import { X, Phone } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface TreatmentModalProps {
  treatment: Treatment;
  onClose: () => void;
}

export const TreatmentModal = ({ treatment, onClose }: TreatmentModalProps) => {
  const WHATSAPP_URL = "https://wa.me/593983992549";

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06414B]/95 dark:bg-black/95 backdrop-blur-lg p-3 sm:p-4 md:p-6 lg:p-8" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-modal-title"
      aria-describedby="treatment-modal-description"
    >
      <div 
        className="bg-white dark:bg-[#0C1217] w-full max-w-6xl max-h-[95vh] flex flex-col lg:flex-row relative shadow-2xl overflow-hidden border border-[#C4E8E9] dark:border-[#1F2E3A] rounded-xl lg:rounded-2xl" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 md:top-6 right-4 md:right-6 z-50 w-11 h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/10 dark:bg-black/20 backdrop-blur-md p-2.5 md:p-3 rounded-full text-white hover:bg-white hover:text-[#06414B] hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center justify-center shadow-lg"
          aria-label="Cerrar modal"
        >
          <X size={24} className="md:w-6 md:h-6 lg:w-7 lg:h-7" />
        </button>

        {/* Image Section */}
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-full lg:w-3/5 relative bg-black flex-shrink-0">
          <BeforeAfterSlider 
            imgAntes={treatment.imgAntes} 
            imgDespues={treatment.imgDespues} 
            isCardMode={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-2/5 p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center overflow-y-auto bg-white dark:bg-[#0C1217]">
          
          {/* Badge */}
          <span className="text-[#5BC0BE] text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 border-b border-[#C4E8E9] dark:border-[#1F2E3A] inline-block pb-2 md:pb-3 w-fit">
            ✦ Protocolo Médico VIP
          </span>
          
          {/* Title */}
          <h3 
            id="treatment-modal-title"
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#06414B] dark:text-white mb-4 md:mb-6 lg:mb-8 tracking-tight leading-tight uppercase"
          >
            {treatment.name}
          </h3>
          
          {/* Description */}
          <p 
            id="treatment-modal-description"
            className="font-sans text-[13px] sm:text-sm md:text-base lg:text-lg text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed md:leading-relaxed mb-6 md:mb-8 lg:mb-10 font-light"
          >
            {treatment.desc}
          </p>

          {/* Quote Box */}
          <div className="bg-[#F0F8F9]/50 dark:bg-[#121A21]/50 p-4 md:p-5 lg:p-6 border-l-4 border-[#5BC0BE] mb-6 md:mb-8 lg:mb-10 rounded-r-lg">
            <p className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-[#06414B] dark:text-[#E2E8F0] font-serif italic leading-relaxed">
              "La excelencia es un hábito de rigor científico aplicado con precisión a la arquitectura facial."
            </p>
          </div>

          {/* WhatsApp CTA Button */}
          <a 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noreferrer"
            className="w-full bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] text-center py-4 md:py-5 lg:py-6 px-6 md:px-8 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 shadow-xl rounded-lg md:rounded-xl min-h-[44px] md:min-h-[48px] focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Iniciar valoración VIP por WhatsApp (abre en nueva ventana)"
          >
            <Phone size={18} className="md:w-5 md:h-5 lg:w-6 lg:h-6" />
            <span>Iniciar Valoración VIP</span>
          </a>

          {/* Footer Info */}
          <p className="text-[7px] sm:text-[8px] text-[#3A8B99] dark:text-white/40 text-center mt-4 md:mt-6 font-light tracking-widest">
            Respuesta en máximo 2 horas • Consultoria privada
          </p>
        </div>
      </div>
    </div>
  );
};
