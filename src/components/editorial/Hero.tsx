"use client";

import React from 'react';
import { CheckCircle } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { clinicStats as defaultStats } from '@/lib/clinic-data';

interface HeroProps {
  onOpenCert: () => void;
  siteConfig?: any;
}

export const Hero = ({ onOpenCert, siteConfig }: HeroProps) => {
  const title = siteConfig?.heroTitle || "CLÍNICA SANURA";
  const subtitle = siteConfig?.heroSubtitle || "La convergencia entre la medicina estética de alta complejidad y la arquitectura digital contemporánea.";
  const description = siteConfig?.heroDescription || "Redefiniendo la medicina estética en Quito. Entorno clínico estricto con resultados de precisión, mitigando la ansiedad preoperatoria con tecnología de punta.";
  const imgAntes = siteConfig?.heroImgAntes || "https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887";
  const imgDespues = siteConfig?.heroImgDespues || "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974";
  const stats = siteConfig?.stats || defaultStats;
  const permitText = siteConfig?.heroPermit || "100% EFICACIA CLÍNICA";
  const vipLabel = siteConfig?.heroVipLabel || "Resultados Visibles y Precisos";

  const firstWord = title.split(' ')[0];
  const restOfTitle = title.split(' ').slice(1).join(' ');

  return (
    <header className="relative w-full pt-28 md:pt-32 pb-12 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-10 lg:px-12 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

        <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-brand dark:text-white tracking-tighter leading-[0.85]">
            {firstWord} <br />
            {restOfTitle && (
              <span className="text-accent italic font-light">
                {restOfTitle}
              </span>
            )}
          </h1>

          <p className="font-serif italic text-lg md:text-xl text-accent max-w-md leading-relaxed">
            {subtitle}
          </p>

          <p className="font-sans text-sm md:text-lg text-brand/70 dark:text-white/70 leading-relaxed max-w-md font-light">
            {description}
          </p>

          <button
            onClick={onOpenCert}
            className="group flex flex-col items-start gap-3 bg-brand dark:bg-white/10 p-6 md:p-8 border border-white/10 transition-all rounded-3xl hover:scale-105 active:scale-95 shadow-2xl"
          >
            <div className="space-y-1 text-left">
              <span className="text-white dark:text-accent text-[10px] tracking-[0.3em] uppercase font-bold flex items-center gap-2">
                <CheckCircle size={14} /> {permitText}
              </span>
              <span className="text-white/60 dark:text-white/40 text-[9px] tracking-[0.3em] uppercase font-medium">
                {vipLabel}
              </span>
            </div>
          </button>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-8 md:gap-10 lg:relative lg:aspect-[4/5] lg:overflow-visible">

          <div className="w-full aspect-[4/5] relative bg-brand/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 z-20 lg:absolute lg:inset-0">
            <BeforeAfterSlider
              imgAntes={imgAntes}
              imgDespues={imgDespues}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full lg:absolute lg:bottom-8 lg:right-10 lg:w-auto lg:grid-cols-2 lg:gap-3 lg:top-auto lg:z-30">
            {stats.map((stat: any, idx: number) => (
              <div
                key={idx}
                className="bg-white/40 dark:bg-brand/90 backdrop-blur-md border border-brand/5 dark:border-white/10 p-4 md:p-5 text-center rounded-2xl shadow-xl transition-all hover:bg-accent/10 flex flex-col justify-center items-center lg:p-3 lg:min-w-[120px]"
              >
                <span className="block text-xl md:text-3xl font-serif text-accent mb-1 lg:text-2xl">
                  {stat.value}
                </span>
                <span className="block text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-brand/60 dark:text-white/70 font-bold leading-tight lg:text-[6px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </header>
  );
};