"use client";

import React, { useEffect } from 'react';
import { X, MessageCircle, Award, Stethoscope, Mail } from 'lucide-react';
import { Doctor } from '@/lib/clinic-data';

interface DoctorModalProps {
  doctor: Doctor;
  onClose: () => void;
  siteConfig?: any;
}

export const DoctorModal = ({ doctor, onClose, siteConfig }: DoctorModalProps) => {
  const phone = siteConfig?.phoneContact || "096 220 4998";
  const WHATSAPP_URL = `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B252A]/90 backdrop-blur-2xl p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FDF8F0] dark:bg-[#0C1217] w-full max-w-5xl h-full max-h-[90vh] lg:h-auto lg:max-h-[85vh] flex flex-col lg:flex-row relative shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden rounded-[3rem] border border-white/10 transition-all duration-1000 animate-in fade-in zoom-in slide-in-from-bottom-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-[110] w-12 h-12 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-[#0B252A] transition-all flex items-center justify-center shadow-2xl"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        {/* Imagen del Doctor: 40% en Desktop */}
        <div className="w-full h-[40vh] lg:h-full lg:w-[40%] relative bg-[#F9FBFB] flex-shrink-0 overflow-hidden">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0B252A]/60 to-transparent pointer-events-none" />
          
          <div className="absolute bottom-10 left-10 right-10 z-10 hidden lg:block">
            <div className="glass-pearl p-6 rounded-2xl border border-white/10">
              <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold block mb-2 opacity-80">Especialidad</span>
              <p className="text-white font-serif text-xl leading-tight italic">{doctor.specialty}</p>
            </div>
          </div>
        </div>

        {/* Contenido Detallado: 60% en Desktop */}
        <div className="w-full flex-1 lg:w-[60%] p-8 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col bg-[#FDF8F0] dark:bg-[#0C1217]">
          
          <div className="mb-10 lg:hidden">
            <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">
                {doctor.specialty}
            </span>
          </div>

          <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0B252A] dark:text-white leading-[0.9] uppercase mb-4 tracking-titer">
            {doctor.name.split(' ')[0]} <br/> 
            <span className="text-brand/60 dark:text-white/50">{doctor.name.split(' ').slice(1).join(' ')}</span>
          </h3>

          <div className="flex gap-4 mb-10 flex-wrap">
            <div className="px-5 py-2.5 bg-[#0B252A]/5 dark:bg-white/5 rounded-full flex items-center gap-3 border border-[#0B252A]/5 dark:border-white/10">
                <Stethoscope size={14} className="text-[#C5A059]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#0B252A] dark:text-white">Excelencia Clínica</span>
            </div>
            <div className="px-5 py-2.5 bg-[#0B252A]/5 dark:bg-white/5 rounded-full flex items-center gap-3 border border-[#0B252A]/5 dark:border-white/10">
                <Award size={14} className="text-[#C5A059]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#0B252A] dark:text-white">Certificado MSP</span>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            <div className="space-y-4">
              <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#C5A059]">Perfil Profesional</h4>
              <p className="font-sans text-base md:text-lg text-[#0B252A]/80 dark:text-white/70 leading-relaxed font-light">
                {doctor.fullBio}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#0B252A]/5 dark:border-white/5">
               <h4 className="text-[11px] uppercase tracking-[0.4em] font-black text-[#C5A059]">Visión Clínica</h4>
               <p className="italic text-[#0B252A]/70 dark:text-white/60 text-sm md:text-base leading-loose font-serif">
                 "Comprometidos con la armonía natural y el rigor médico en cada uno de nuestros protocolos."
               </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 bg-[#0B252A] dark:bg-accent text-white dark:text-[#090D10] py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              <MessageCircle size={20} /> Agendar con Especialista
            </a>
            <button
               onClick={onClose}
               className="px-10 py-6 bg-white/20 dark:bg-white/5 text-[#0B252A] dark:text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] border border-[#0B252A]/10 dark:border-white/10 hover:bg-white transition-all"
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
