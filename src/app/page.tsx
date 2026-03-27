
"use client";

import React, { useState, useEffect } from 'react';

// Atelier Editorial Components
import { Navbar } from '@/components/editorial/Navbar';
import { Hero } from '@/components/editorial/Hero';
import { ServiceCarousel } from '@/components/editorial/ServiceCarousel';
import { DoctorProfile } from '@/components/editorial/DoctorProfile';
import { QuickGuide } from '@/components/editorial/QuickGuide';
import { LeadForm } from '@/components/editorial/LeadForm';
import { TreatmentModal } from '@/components/editorial/TreatmentModal';

// Data Centralizada
import { serviciosData, Treatment } from '@/lib/clinic-data';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('01_medicina_estetica_facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (selectedTreatment || showCertModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTreatment, showCertModal]);

  const activeCatData = serviciosData.find(c => c.id === activeCategory) || serviciosData[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen transition-colors duration-1000 bg-background`}>
      <div className="text-[#06414B] dark:text-[#E2E8F0] font-sans antialiased min-h-screen selection:bg-[#3A8B99] dark:selection:bg-[#5BC0BE] selection:text-white">
        
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <Hero onOpenCert={() => setShowCertModal(true)} />

        {/* Sección Servicios con Vidrio */}
        <section id="servicios" className="py-24 relative overflow-hidden transition-all duration-700">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="glass-cyan dark:glass-teal p-12 md:p-20 rounded-[4rem] border border-white/40 dark:border-white/10 shadow-2xl">
              <div className="text-center mb-16 space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-[0.85]">
                  Curaduría <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">de Elite</span>
                </h2>
                <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">
                  Protocolos donde la ciencia médica se encuentra con la visión editorial.
                </p>
              </div>

              <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-12 mb-12 border-b border-white/10 px-4 justify-start lg:justify-center">
                {serviciosData.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`whitespace-nowrap pb-6 text-[9px] font-bold tracking-[0.5em] uppercase transition-all border-b-2 
                    ${activeCategory === cat.id 
                      ? 'border-[#5BC0BE] text-[#06414B] dark:text-[#5BC0BE]' 
                      : 'border-transparent text-[#3A8B99] dark:text-white/40 hover:text-white'}`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <ServiceCarousel 
                category={activeCatData} 
                onSelectTreatment={setSelectedTreatment} 
              />
            </div>
          </div>
        </section>

        <DoctorProfile />

        <QuickGuide />

        <LeadForm />

        <footer className="bg-[#06414B] text-white py-16 transition-colors duration-1000 relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.6em] text-white/40 uppercase gap-10">
              <div className="flex items-center gap-6">
                <span className="font-serif text-2xl tracking-widest text-[#5BC0BE] font-bold">NVITALITY</span>
                <p>© 2026 Clínica Estética. Archive v.3.0</p>
              </div>
              <div className="flex gap-12 font-bold">
                <a href="#" className="hover:text-[#5BC0BE] transition-colors">Aviso Legal</a>
                <a href="#" className="hover:text-[#5BC0BE] transition-colors">Privacidad</a>
              </div>
              <p className="bg-white/5 px-6 py-2 rounded-full border border-white/10">Permiso ACESS N° 0000</p>
            </div>
          </div>
        </footer>

        {selectedTreatment && (
          <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
        )}

        {showCertModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setShowCertModal(false)}>
            <div className="glass-cyan dark:glass-teal w-full max-w-2xl p-16 relative border border-white/20 shadow-[0_0_100px_rgba(91,192,190,0.2)] rounded-[3rem]" onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-3xl uppercase tracking-tighter mb-12 border-b border-white/10 pb-6 text-center text-[#06414B] dark:text-white">Rigor <span className="italic text-[#5BC0BE]">Normativo</span></h3>
              <div className="space-y-10">
                {[
                  { n: '01', t: 'Normativa ACESS', d: 'Infraestructura y permisos validados por el MSP del Ecuador.' },
                  { n: '02', t: 'Insumos ARCSA', d: 'Toxinas y tecnología con Registro Sanitario Ecuatoriano vigente.' },
                  { n: '03', t: 'Aval SENESCYT', d: 'Equipo conformado estrictamente por médicos especialistas.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-8 group">
                    <span className="text-2xl font-serif text-[#5BC0BE] opacity-40 group-hover:opacity-100 transition-opacity">{item.n}</span>
                    <div className="space-y-1">
                      <h4 className="font-bold tracking-[0.3em] uppercase text-[10px] text-[#06414B] dark:text-white">{item.t}</h4>
                      <p className="text-[#3A8B99] dark:text-white/40 text-[12px] leading-relaxed font-light">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
