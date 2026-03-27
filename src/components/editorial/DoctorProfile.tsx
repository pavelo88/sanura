
"use client";

import React, { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import Image from 'next/image';
import { getFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

export const DoctorProfile = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const db = getFirestore();
      const docSnap = await getDoc(doc(db, 'settings', 'site-content'));
      if (docSnap.exists()) setContent(docSnap.data());
    };
    fetchContent();
  }, []);

  return (
    <section id="doctora" className="py-24 md:py-40 relative overflow-hidden transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="glass-cyan dark:glass-teal p-12 md:p-24 rounded-[4rem] border border-white/40 dark:border-white/10 shadow-2xl flex flex-col lg:flex-row items-center gap-16 lg:gap-24 animate-in fade-in duration-1000">
          
          <div className="w-full lg:w-1/2 space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#5BC0BE] uppercase">Directora Médica</span>
              <h2 className="font-serif text-5xl md:text-7xl text-[#06414B] dark:text-white leading-[0.85] tracking-tighter">
                {content?.doctorTitle?.split(' ')[0] || 'DRA. NATALIA'} <br /> 
                <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">
                  {content?.doctorTitle?.split(' ').slice(1).join(' ') || 'VITALI'}
                </span>
              </h2>
            </div>

            <div className="relative p-10 glass-cyan dark:glass-teal border border-white/10 rounded-[2rem] shadow-xl">
              <Quote className="absolute -top-6 -left-6 text-[#5BC0BE]/40" size={56} />
              <p className="font-serif italic text-2xl md:text-3xl text-[#06414B] dark:text-white leading-relaxed">
                "{content?.doctorQuote || 'La estética no es una cuestión de vanidad, sino una arquitectura de la autoestima basada en el rigor científico.'}"
              </p>
            </div>

            <div className="pt-8 flex gap-12 border-t border-white/10">
              <div className="space-y-1">
                <span className="block text-xs font-bold tracking-widest text-[#06414B] dark:text-white uppercase">Especialidad</span>
                <span className="text-[10px] tracking-widest text-[#5BC0BE] uppercase font-bold">Armonización Facial</span>
              </div>
              <div className="space-y-1">
                <span className="block text-xs font-bold tracking-widest text-[#06414B] dark:text-white uppercase">Registro MSP</span>
                <span className="text-[10px] tracking-widest text-[#5BC0BE] uppercase font-bold">17-2549-VIP</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto group">
              <div className="absolute -inset-6 glass-cyan dark:glass-teal border border-white/20 rounded-[3rem] transition-transform duration-1000 group-hover:scale-105" />
              <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
                <Image 
                  src={content?.doctorImage || "https://picsum.photos/seed/dr-nvitality/800/1200"}
                  alt="Dra. Natalia Vitali"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06414B]/60 to-transparent mix-blend-multiply opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
