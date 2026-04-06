"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { X, Zap, MessageCircle } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface TreatmentModalProps {
  treatment: any;
  onClose: () => void;
  siteConfig?: any;
  onOpenAgent?: () => void;
}

export const TreatmentModal = ({ treatment, onClose, siteConfig, onOpenAgent }: TreatmentModalProps) => {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B252A]/90 backdrop-blur-2xl p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="treatment-modal-title"
    >
      <div
        className="bg-[#FDF8F0] dark:bg-[#0C1217] w-full max-w-6xl h-full max-h-[90vh] lg:h-auto lg:max-h-[90vh] flex flex-col lg:grid lg:grid-cols-6 relative shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden rounded-[3rem] border border-white/10 transition-all duration-1000 animate-in fade-in zoom-in slide-in-from-bottom-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-14 h-14 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#0B252A] transition-all flex items-center justify-center shadow-2xl"
          aria-label="Cerrar modal"
        >
          <X size={28} />
        </button>

        {/* ÁREA DE IMAGEN: 60% en Desktop */}
        <div className="w-full h-[40vh] sm:h-[50vh] lg:h-full lg:col-span-3 xl:col-span-4 relative bg-black flex-shrink-0">
          <BeforeAfterSlider
            imgAntes={treatment.imgAntes}
            imgDespues={treatment.imgDespues}
            isCardMode={false}
            isActive={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B252A]/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ÁREA DE CONTENIDO: 40% en Desktop */}
        <div className="w-full flex-1 lg:h-full lg:col-span-3 xl:col-span-2 p-8 md:p-14 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col justify-center bg-[#FDF8F0] dark:bg-[#0C1217]">

          <span className="text-[#C5A059] text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-8 border-b border-[#0B252A]/5 dark:border-white/5 inline-block pb-4 w-fit flex-shrink-0">
            ✦ Protocolo Alta Estética
          </span>

          <div ref={headlineContainerRef} className="w-full mb-8 flex-shrink-0">
            <h3
              ref={headlineRef}
              id="treatment-modal-title"
              className="font-serif text-[#0B252A] dark:text-white leading-[0.85] uppercase"
            >
              {treatment.name}
            </h3>
          </div>

          <p className="font-sans text-base md:text-lg text-[#0B252A]/80 dark:text-white/70 leading-relaxed mb-10 font-light max-w-lg">
            {treatment.desc}
          </p>

          <div className="bg-white/40 dark:bg-white/5 p-8 border-l-4 border-[#C5A059] mb-12 rounded-r-3xl italic shadow-sm">
            <p className="text-sm md:text-base lg:text-lg text-[#0B252A] dark:text-[#E2E8F0] font-serif leading-relaxed">
              "{quote}"
            </p>
          </div>

          <div className="flex flex-col gap-3 md:gap-4">
            <button
              onClick={() => {
                onOpenAgent?.();
                onClose();
              }}
              className="w-full bg-gradient-to-r from-[#06414B] to-[#5BC0BE] dark:from-[#5BC0BE] dark:to-[#06414B] text-white dark:text-[#090D10] py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Zap size={20} /> Agente Personalizado
            </button>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-white/20 dark:bg-white/10 text-[#0B252A] dark:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 border border-[#0B252A]/10 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/20 transition-all"
            >
              <MessageCircle size={16} /> WhatsApp Directo
            </a>
          </div>

          <p className="text-[10px] text-[#0B252A]/40 dark:text-white/30 text-center mt-10 font-medium tracking-[0.3em] uppercase">
            Consultoría Privada • Quito
          </p>
        </div>
      </div>
    </div>
  );
};