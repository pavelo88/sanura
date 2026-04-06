"use client";

import React from 'react';
import { User } from 'lucide-react';
import { teamData } from '@/lib/clinic-data';

interface DoctorProfileProps {
  siteConfig?: any;
}

export const DoctorProfile = ({ siteConfig }: DoctorProfileProps) => {
  return (
    <section id="equipo-medico" className="w-full py-16 md:py-24 relative overflow-hidden transition-all duration-700 bg-background scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl uppercase text-brand tracking-tighter">
            Equipo <span className="text-accent italic">Médico</span>
          </h2>
          <p className="text-[10px] tracking-[0.4em] text-brand uppercase font-bold opacity-60">
            ✦ Excelencia clínica multidisciplinaria
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {teamData.map((categoryGroup, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-[#0B252A]/20 backdrop-blur-3xl p-8 md:p-12 rounded-[2.5rem] border border-[#0B252A]/5 dark:border-white/10 shadow-2xl transition-all duration-700 relative overflow-hidden group"
            >
              {/* Decoración lateral dorada (hover o siempre, usaremos un borde o acento sutil) */}
              <div className="absolute top-0 left-0 h-full w-1 bg-accent opacity-50"></div>

              {/* Título de la categoría médica */}
              <div className="mb-10 border-b border-[#0B252A]/10 dark:border-white/10 pb-6">
                <h3 className="text-xs md:text-sm tracking-[0.3em] font-bold text-accent uppercase leading-loose">
                  {categoryGroup.category}
                </h3>
              </div>

              {/* Lista de doctores de la categoría */}
              <div className="space-y-10">
                {categoryGroup.doctors.map((doc, docIdx) => {
                  const nameParts = doc.name.split(' ');
                  const firstPart = nameParts[0];
                  const titlerest = nameParts.slice(1).join(' ');

                  return (
                    <div key={docIdx} className="flex gap-4 md:gap-6 items-start">
                      <div className="flex-shrink-0 mt-1">
                        <User className="text-accent/60" strokeWidth={1.5} size={24} />
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-serif text-2xl md:text-3xl text-brand leading-tight">
                          {firstPart} <br/> <span className="text-brand opacity-80">{titlerest}</span>
                        </h4>
                        <p className="text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-brand dark:text-white/70 opacity-60 leading-relaxed max-w-sm">
                          {doc.bio}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};