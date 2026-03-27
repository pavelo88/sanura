
"use client";

import React, { useState, useEffect } from 'react';

// Atelier Editorial Components
import { Navbar } from '@/components/editorial/Navbar';
import { Hero } from '@/components/editorial/Hero';
import { ServiceCarousel } from '@/components/editorial/ServiceCarousel';
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

  // Bloqueo de scroll preventivo para modales
  useEffect(() => {
    if (selectedTreatment || showCertModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTreatment, showCertModal]);

  const activeCatData = serviciosData.find(c => c.id === activeCategory) || serviciosData[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full h-full min-h-screen transition-colors duration-700`}>
      <div className="bg-white dark:bg-[#090D10] text-[#06414B] dark:text-[#E2E8F0] font-sans antialiased min-h-screen overflow-x-hidden selection:bg-[#3A8B99] dark:selection:bg-[#5BC0BE] selection:text-white">
        
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <Hero onOpenCert={() => setShowCertModal(true)} />

        <section id="servicios" className="py-20 md:py-24 bg-white dark:bg-[#090D10] border-t border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="text-center mb-12 max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-6xl tracking-tighter uppercase mb-4 text-[#06414B] dark:text-white leading-[0.8]">
                Curaduría <br /><span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">de Elite</span>
              </h2>
              <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">
                26 Garantías donde la ciencia médica se encuentra con la visión editorial.
              </p>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-12 mb-8 border-b border-[#C4E8E9] dark:border-[#1F2E3A] px-4 justify-start lg:justify-center">
              {serviciosData.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`whitespace-nowrap pb-4 text-[9px] font-bold tracking-[0.3em] uppercase transition-all border-b-[3px] 
                   ${activeCategory === cat.id 
                     ? 'border-[#06414B] dark:border-[#5BC0BE] text-[#06414B] dark:text-[#5BC0BE]' 
                     : 'border-transparent text-[#3A8B99] dark:text-[#A0AAB2] hover:text-[#06414B] dark:hover:text-white'}`}
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
        </section>

        <QuickGuide />

        <LeadForm />

        <footer className="bg-[#06414B] dark:bg-[#04090C] text-white pt-24 pb-12 text-center transition-colors duration-700">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-5xl md:text-[8rem] tracking-tighter uppercase mb-12 leading-[0.8]">
              Inicie su <br /><span className="text-[#5BC0BE] italic">Legado</span>
            </h2>
            
            <div className="flex flex-col items-center justify-center space-y-8 mb-20">
              <p className="text-3xl sm:text-5xl md:text-7xl font-serif tracking-widest text-[#5BC0BE]">+593 98 399 2549</p>
              <a 
                href="https://wa.me/593983992549" 
                target="_blank" 
                rel="noreferrer" 
                className="group relative inline-block border-2 border-[#5BC0BE] px-12 py-5 text-xs font-bold tracking-[0.5em] uppercase hover:bg-white hover:text-[#06414B] transition-all duration-500 shadow-2xl overflow-hidden"
              >
                Agendar Valoración Médica VIP
              </a>
            </div>

            <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-[0.5em] text-white/40 uppercase gap-6">
              <p>© 2026 NVitality Clínica Estética. Archive v.2.6</p>
              <p>Permiso ACESS N° 0000-0000</p>
            </div>
          </div>
        </footer>

        {selectedTreatment && (
          <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
        )}

        {showCertModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#06414B]/80 dark:bg-black/80 backdrop-blur-xl" onClick={() => setShowCertModal(false)}>
            <div className="bg-white dark:bg-[#121A21] w-full max-w-2xl p-10 relative border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowCertModal(false)} className="absolute top-6 right-6 text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="font-serif text-3xl uppercase tracking-tighter mb-10 border-b border-[#C4E8E9] dark:border-[#1F2E3A] pb-6 text-center text-[#06414B] dark:text-white">Rigor <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Normativo</span></h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-xl font-serif text-[#5BC0BE]">01</span>
                  <div>
                    <h4 className="font-bold tracking-[0.2em] uppercase text-[10px] mb-1 text-[#06414B] dark:text-white">Normativa ACESS</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-xs leading-relaxed font-light">Infraestructura y permisos validados por el MSP del Ecuador.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xl font-serif text-[#5BC0BE]">02</span>
                  <div>
                    <h4 className="font-bold tracking-[0.2em] uppercase text-[10px] mb-1 text-[#06414B] dark:text-white">Insumos ARCSA</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-xs leading-relaxed font-light">Toxinas y tecnología con Registro Sanitario Ecuatoriano vigente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-xl font-serif text-[#5BC0BE]">03</span>
                  <div>
                    <h4 className="font-bold tracking-[0.2em] uppercase text-[10px] mb-1 text-[#06414B] dark:text-white">Aval SENESCYT</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-xs leading-relaxed font-light">Equipo conformado estrictamente por médicos especialistas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
