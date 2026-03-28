"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

interface DoctorProfileProps {
  siteConfig?: any;
}

export const DoctorProfile = ({ siteConfig }: DoctorProfileProps) => {
  // 1. Prioridad a Firebase, luego a valores por defecto 
  const title = siteConfig?.doctorTitle || "Dra. Natalia Vitali";
  const quote = siteConfig?.doctorQuote || "La estética no es vanidad, sino arquitectura de la autoestima basada en el rigor científico.";
  const specialty = siteConfig?.doctorSpecialty || "Armonización Facial & Medicina Regenerativa";
  const registry = siteConfig?.doctorRegistry || "17-2549-VIP • ARCSA Autorizado";
  const image = siteConfig?.doctorImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop";

  // Lógica de visualización del nombre [cite: 285]
  const nameParts = title.split(' ');
  const firstPart = nameParts[0];
  const restOfName = nameParts.slice(1).join(' ');

  return (
    <section id="doctora" className="w-full py-8 md:py-12 lg:py-16 relative overflow-hidden transition-all duration-700 bg-background scroll-mt-10">      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
      <div className="glass-cyan dark:glass-teal p-8 sm:p-12 md:p-16 lg:p-24 rounded-2xl md:rounded-3xl lg:rounded-[4rem] border border-white/40 dark:border-white/10 shadow-2xl flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-24 animate-in fade-in duration-1000">

        {/* Contenido Izquierdo - Tipografía e Info [cite: 284] */}
        <div className="w-full lg:w-1/2 space-y-8 md:space-y-10 lg:space-y-12 order-2 lg:order-1">
          <div className="space-y-4 md:space-y-6">
            <span className="inline-block text-[10px] md:text-[11px] font-medium tracking-[0.6em] text-[#5BC0BE] uppercase">
              ✦ Directora Médica
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#06414B] dark:text-white leading-[1] md:leading-[0.9] lg:leading-[0.85] tracking-tight">
              <span className="block">{firstPart}</span>
              {restOfName && (
                <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">
                  {restOfName}
                </span>
              )}
            </h2>
          </div>

          {/* Sección de Cita [cite: 287] */}
          <div className="relative p-6 md:p-8 lg:p-10 glass-cyan dark:glass-teal border border-white/10 rounded-2xl md:rounded-3xl shadow-xl">
            <Quote className="absolute -top-4 md:-top-6 -left-4 md:-left-6 text-[#5BC0BE]/30" size={40} />
            <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-[#06414B] dark:text-white leading-relaxed md:leading-8 pl-4 md:pl-6">
              "{quote}"
            </p>
          </div>

          {/* Credenciales Dinámicas  */}
          <div className="pt-8 md:pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 border-t border-white/10">
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-semibold tracking-widest text-[#06414B] dark:text-white uppercase">
                Especialidad
              </label>
              <p className="text-[10px] md:text-[11px] tracking-widest text-[#5BC0BE] uppercase font-medium">
                {specialty}
              </p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs md:text-sm font-semibold tracking-widest text-[#06414B] dark:text-white uppercase">
                Registro MSP
              </label>
              <p className="text-[10px] md:text-[11px] tracking-widest text-[#5BC0BE] uppercase font-medium">
                {registry}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido Derecho - Imagen [cite: 292-294] */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto group">
            <div className="absolute -inset-4 md:-inset-6 glass-cyan dark:glass-teal border border-white/20 rounded-2xl md:rounded-3xl transition-transform duration-1000 group-hover:scale-105" />
            <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl">
              <Image
                src={image}
                alt={`Directora Médica NVITALITY - ${title}`}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06414B]/60 via-transparent to-transparent mix-blend-multiply opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};  