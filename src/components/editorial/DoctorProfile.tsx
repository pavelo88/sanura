
"use client";

import React from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export const DoctorProfile = () => {
  return (
    <section id="doctora" className="py-24 md:py-40 bg-white dark:bg-[#090D10] transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* LADO IZQUIERDO: TEXTO EDITORIAL */}
          <div className="w-full lg:w-1/2 space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.5em] text-[#5BC0BE] uppercase">Directora Médica</span>
              <h2 className="font-serif text-5xl md:text-7xl text-[#06414B] dark:text-white leading-[0.85] tracking-tighter">
                DRA. NATALIA <br /> <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">VITALI</span>
              </h2>
            </div>

            <div className="relative">
              <Quote className="absolute -top-8 -left-8 text-[#5BC0BE]/20" size={64} />
              <p className="font-serif italic text-2xl md:text-3xl text-[#06414B] dark:text-white leading-relaxed">
                "La estética no es una cuestión de vanidad, sino una arquitectura de la autoestima basada en el rigor científico."
              </p>
            </div>

            <div className="space-y-6 text-[#3A8B99] dark:text-[#A0AAB2] font-light text-lg leading-relaxed max-w-xl">
              <p>
                Con más de 15 años de trayectoria en medicina regenerativa, la Dra. Vitali ha liderado la vanguardia de los protocolos de rejuvenecimiento no invasivo en el Ecuador.
              </p>
              <p>
                Su filosofía combina la precisión técnica de la cirugía estética con una visión artística que busca resultados indetectables y de elegancia atemporal.
              </p>
            </div>

            <div className="pt-8 flex gap-12 border-t border-[#C4E8E9] dark:border-[#1F2E3A]">
              <div>
                <span className="block text-xs font-bold tracking-widest text-[#06414B] dark:text-white uppercase mb-1">Especialidad</span>
                <span className="text-[10px] tracking-widest text-[#5BC0BE] uppercase font-bold">Armonización Orofacial</span>
              </div>
              <div>
                <span className="block text-xs font-bold tracking-widest text-[#06414B] dark:text-white uppercase mb-1">Registro MSP</span>
                <span className="text-[10px] tracking-widest text-[#5BC0BE] uppercase font-bold">N° 17-2549-VIP</span>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: IMAGEN DE GRAN FORMATO */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto group">
              {/* Marco Decorativo */}
              <div className="absolute -inset-4 border border-[#C4E8E9] dark:border-[#1F2E3A] transition-transform duration-700 group-hover:scale-105" />
              
              <div className="relative h-full w-full overflow-hidden shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/dr-nvitality/800/1200"
                  alt="Dra. Natalia Vitali"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  data-ai-hint="female doctor"
                />
                
                {/* Overlay Gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06414B]/40 to-transparent mix-blend-multiply opacity-60" />
              </div>

              {/* Etiqueta Flotante */}
              <div className="absolute -bottom-8 -right-8 bg-[#06414B] dark:bg-[#121A21] p-8 border border-white/10 shadow-2xl hidden md:block">
                <span className="text-white text-[9px] tracking-[0.5em] uppercase font-bold">N-VITALITY ARCHIVE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
