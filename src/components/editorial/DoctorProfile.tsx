"use client";

import React, { useState } from 'react';
import { teamData, Doctor } from '@/lib/clinic-data';
import { TeamCarousel } from './TeamCarousel';
import { DoctorModal } from './DoctorModal';

interface DoctorProfileProps {
  siteConfig?: any;
}

export const DoctorProfile = ({ siteConfig }: DoctorProfileProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Si existe equipo en la DB, lo usamos; si no, el local
  const currentTeam = siteConfig?.team || teamData.flatMap(c => c.doctors);

  return (
    <section id="equipo-medico" className="w-full py-20 md:py-32 relative overflow-hidden transition-all duration-700 bg-background scroll-mt-10">
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-brand/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl uppercase text-brand tracking-tighter">
            Equipo <span className="text-accent italic">Médico SANURA</span>
          </h2>
          <p className="text-[10px] md:text-[11px] tracking-[0.5em] text-accent uppercase font-black opacity-80 pl-2">
            ✦ Excelencia clínica & Rigor Estético
          </p>
        </div>

        <div className="glass-pearl p-8 md:p-14 rounded-[4rem] border border-white/10 shadow-3xl">
           <TeamCarousel 
              onSelectDoctor={setSelectedDoctor} 
              siteConfig={siteConfig}
              dynamicTeam={siteConfig?.team}
           />
        </div>

      </div>


      {selectedDoctor && (
        <DoctorModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
          siteConfig={siteConfig}
        />
      )}
    </section>
  );
};