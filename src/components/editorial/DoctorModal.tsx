"use client";

import React, { useEffect } from 'react';
import { X, MessageCircle, Award, Stethoscope } from 'lucide-react';
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B252A]/90 backdrop-blur-xl p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#F6F4EE] dark:bg-[#0C1217] w-full max-w-6xl h-full max-h-[90vh] lg:h-auto lg:max-h-[85vh] flex flex-col lg:flex-row relative shadow-[0_20px_100px_rgba(0,0,0,0.7)] overflow-hidden rounded-[2.5rem] border-[3px] border-[#C8A969]/60 transition-all duration-1000 animate-in fade-in zoom-in slide-in-from-bottom-10"
        onClick={e => e.stopPropagation()}
      >
        {/* Botón de cerrar dorado metálico */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 lg:right-auto lg:left-6 z-[110] w-12 h-12 bg-gradient-to-br from-[#E6CA8C] to-[#AD8632] rounded-full text-[#1A1A1A] hover:scale-105 hover:shadow-lg transition-all flex items-center justify-center shadow-md border-2 border-[#F9E2A9]"
          aria-label="Cerrar modal"
        >
          <X size={22} strokeWidth={2.5} />
        </button>

        {/* Contenido Detallado: 60% en Desktop, a la izquierda */}
        <div className="w-full order-2 lg:order-1 flex-1 lg:w-[55%] p-8 md:p-12 lg:p-16 overflow-y-auto custom-scrollbar flex flex-col relative bg-cover bg-center" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>

          <div className="mb-10 lg:hidden">
            <span className="text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.5em] mb-2 block">
              {doctor.specialty}
            </span>
          </div>

          <h3 className="font-serif text-5xl md:text-6xl text-[#0B252A] dark:text-white leading-[1.1] mb-6 tracking-tight">
            {doctor.name.split(' ')[0]} <br />
            {doctor.name.split(' ').slice(1).join(' ')}
          </h3>

          <div className="flex gap-3 mb-10 flex-wrap">
            <div className="px-5 py-2.5 bg-gradient-to-r from-[#D7B466] to-[#A37B29] rounded-full flex items-center gap-2 shadow-inner border border-[#EACD8B]">
              <Stethoscope size={14} className="text-[#1A1A1A]" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">Excelencia Clínica</span>
            </div>
            <div className="px-5 py-2.5 bg-gradient-to-r from-[#D7B466] to-[#A37B29] rounded-full flex items-center gap-2 shadow-inner border border-[#EACD8B]">
              <Award size={14} className="text-[#1A1A1A]" />
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">Certificado MSP</span>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            <div className="space-y-3">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-[#1A1A1A]">Perfil Profesional</h4>
              <p className="font-sans text-base md:text-[17px] text-[#2A3B3E] dark:text-white/70 leading-relaxed font-normal">
                {doctor.fullBio}
              </p>
            </div>

            <div className="space-y-3 pt-6">
              <h4 className="text-[11px] uppercase tracking-[0.3em] font-black text-[#1A1A1A]">Visión Clínica</h4>
              <p className="italic text-[#2A3B3E] dark:text-white/60 text-sm md:text-base leading-loose font-serif">
                "Comprometidos con la armonía natural y el rigor médico en cada uno de nuestros protocolos."
              </p>
            </div>
          </div>

          {/* Logo Footer (Sanura) */}
          <div className="mt-12 flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-[#0B252A]" fill="currentColor">
              {/* Icono de ejemplo inspirado en la imagen */}
              <path d="M20,0 C8.954,0 0,8.954 0,20 C0,31.046 8.954,40 20,40 C31.046,40 40,31.046 40,20 C40,8.954 31.046,0 20,0 Z M18.5,30 C13.253,30 9,25.747 9,20.5 C9,18.067 9.919,15.85 11.439,14.168 L27.766,28.608 C25.328,29.497 22.046,30 18.5,30 Z M28.561,25.832 L12.234,11.392 C14.672,10.503 17.954,10 21.5,10 C26.747,10 31,14.253 31,19.5 C31,21.933 30.081,24.15 28.561,25.832 Z" />
            </svg>
            <span className="font-serif text-2xl text-[#0B252A] tracking-wide">Sanura</span>
          </div>

        </div>

        {/* Columna Derecha: Imagen y Botones: 45% en Desktop */}
        <div className="w-full order-1 lg:order-2 lg:w-[45%] flex flex-col flex-shrink-0 relative overflow-hidden bg-gradient-to-br from-[#ffffff] via-[#e5e5e5] to-[#f0f0f0]">

          {/* Fondo simulando textura de mármol */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/white-marble.png')" }}></div>

          {/* Imagen del Doctor */}
          <div className="relative h-[50vh] lg:h-full lg:flex-1 overflow-hidden flex-shrink-0 flex items-end justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-full object-cover object-top relative z-10"
            />

            {/* Tarjeta flotante "Especialidad" estilo glassmorphism cálido */}
            <div className="absolute bottom-12 left-8 right-8 z-20 hidden lg:block">
              <div className="bg-gradient-to-br from-[#F5EEDC]/80 to-[#D4B982]/60 backdrop-blur-md p-6 rounded-2xl border border-[#F4E5B8]/60 shadow-[0_15px_30px_rgba(0,0,0,0.15)]">
                <span className="text-[#1A1A1A] text-[9px] uppercase tracking-[0.3em] font-black block mb-2 opacity-80">Especialidad /</span>
                <p className="text-[#0B252A] font-serif text-2xl leading-tight italic">{doctor.specialty}</p>
              </div>
            </div>
          </div>

          {/* Botones debajo de la foto */}
          <div className="px-8 pb-8 pt-6 space-y-4 bg-[#F6F4EE] dark:bg-[#0B1217] z-30 relative shadow-[0_-10px_20px_rgba(0,0,0,0.05)] border-t border-[#0B252A]/5">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-b from-[#414141] to-[#1A1A1A] text-[#D8B768] py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-[0_8px_15px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 transition-all border-t border-white/20"
            >
              <MessageCircle size={18} /> Agendar Cita
            </a>
            <button
              onClick={onClose}
              className="w-full py-4 text-[#B38728] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#B38728]/10 transition-all"
            >
              Regresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};