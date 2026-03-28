"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Phone } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface TreatmentModalProps {
  treatment: any; // Cambiado a 'any' para aceptar campos dinámicos de Firebase como 'quote'
  onClose: () => void;
  siteConfig?: any;
}

export const TreatmentModal = ({ treatment, onClose, siteConfig }: TreatmentModalProps) => {
  const phone = siteConfig?.phoneContact || "+593 98 399 2549";
  const WHATSAPP_URL = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

  // LA MAGIA: LEEMOS LA FRASE DIRECTAMENTE DEL TRATAMIENTO
  const quote = treatment.quote || "La excelencia es un hábito de rigor científico aplicado con precisión a la arquitectura facial.";

  const headlineContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const adjustHeadlineSize = useCallback(() => {
    const headlineEl = headlineRef.current;
    const containerEl = headlineContainerRef.current;
    if (!headlineEl || !containerEl) return;

    let minFontSize = 32;
    let maxFontSize = 120;
    let perfectFontSize = maxFontSize;

    headlineEl.style.fontSize = `${maxFontSize}px`;

    while (minFontSize <= maxFontSize) {
      perfectFontSize = Math.floor((minFontSize + maxFontSize) / 2);
      headlineEl.style.fontSize = `${perfectFontSize}px`;

      if (headlineEl.scrollWidth > containerEl.clientWidth) {
        maxFontSize = perfectFontSize - 1;
      } else {
        minFontSize = perfectFontSize + 1;
      }
    }
    headlineEl.style.fontSize = `${perfectFontSize}px`;
  }, []);

  useEffect(() => {
    if (!headlineRef.current || !headlineContainerRef.current) return;
    adjustHeadlineSize();
    const observer = new ResizeObserver(adjustHeadlineSize);
    observer.observe(headlineContainerRef.current);
    return () => observer.disconnect();
  }, [adjustHeadlineSize, treatment.name]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!treatment.imgAntes || !treatment.imgDespues) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg p-2 sm:p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-modal-title"
    >
      <div
        className="bg-white dark:bg-[#0C1217] w-full max-w-6xl h-full max-h-[90vh] lg:h-auto lg:max-h-[85vh] flex flex-col lg:grid lg:grid-cols-5 relative shadow-2xl overflow-hidden rounded-3xl border border-white/10 transition-all duration-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] w-12 h-12 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all flex items-center justify-center shadow-lg"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="w-full h-1/2 lg:h-full lg:col-span-3 relative bg-black flex-shrink-0">
          <BeforeAfterSlider
            imgAntes={treatment.imgAntes}
            imgDespues={treatment.imgDespues}
            isCardMode={false}
            isActive={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="w-full h-1/2 lg:h-full lg:col-span-2 p-6 md:p-10 lg:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-center bg-white dark:bg-[#0C1217]">

          <span className="text-[#5BC0BE] text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.5em] mb-4 md:mb-6 border-b border-[#C4E8E9] dark:border-[#1F2E3A] inline-block pb-2 md:pb-3 w-fit flex-shrink-0">
            ✦ Protocolo Médico VIP
          </span>

          <div ref={headlineContainerRef} className="w-full mb-4 md:mb-6 lg:mb-8 overflow-hidden flex-shrink-0">
            <h3
              ref={headlineRef}
              id="treatment-modal-title"
              className="font-serif text-[#06414B] dark:text-white tracking-tight leading-[0.85] uppercase whitespace-nowrap"
            >
              {treatment.name}
            </h3>
          </div>

          <p className="font-sans text-sm md:text-base text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed mb-8 md:mb-10 font-light max-w-lg">
            {treatment.desc}
          </p>

          <div className="bg-[#F0F8F9] dark:bg-white/5 p-6 md:p-8 border-l-4 border-[#5BC0BE] mb-8 md:mb-10 rounded-r-2xl">
            <p className="text-[11px] md:text-xs lg:text-sm text-[#06414B] dark:text-[#E2E8F0] font-serif italic leading-relaxed pl-2">
              "{quote}"
            </p>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] py-5 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Phone size={18} /> Iniciar Valoración VIP
          </a>

          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-[#3A8B99] dark:text-white/40 text-center mt-6 md:mt-8 font-light tracking-widest">
            Respuesta en máximo 2 horas • Consultoría privada
          </p>
        </div>
      </div>
    </div>
  );
};