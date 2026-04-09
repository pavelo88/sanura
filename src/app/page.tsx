"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/editorial/Navbar';
import { Hero } from '@/components/editorial/Hero';
import { ServiceCarousel } from '@/components/editorial/ServiceCarousel';
import { DoctorProfile } from '@/components/editorial/DoctorProfile';
import { QuickGuide } from '@/components/editorial/QuickGuide';
import { LeadForm } from '@/components/editorial/LeadForm';
import { TreatmentModal } from '@/components/editorial/TreatmentModal';
import { WhatsAppFloating } from '@/components/editorial/WhatsAppFloating';
import { AgentePersonalizado } from '@/components/editorial/AgentePersonalizado';
import { serviciosData, Treatment, clinicContact } from '@/lib/clinic-data';
import { getFirestore } from '@/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';

export default function App() {
  const [activeCategory, setActiveCategory] = useState(serviciosData[0]?.id || 'facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubConfig = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) setSiteConfig(docSnap.data());
    });
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      setDbServices(snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubConfig(); unsubServices(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedTreatment || showCertModal || isAgentOpen) ? 'hidden' : 'auto';
  }, [selectedTreatment, showCertModal, isAgentOpen]);

  const activeCatData = serviciosData.find(c => c.id === activeCategory) || serviciosData[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen relative transition-colors duration-1000 bg-background`}>

      {/* Vidrio Global */}
      <div
        className="fixed inset-0 z-0 backdrop-blur-[110px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? 'rgba(11,37,42,0.85)' : 'rgba(255,255,255,0.4)' }}
      />

      <div className="relative z-10 text-brand font-sans antialiased">
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <main className="pt-2 md:pt-8">
          <Hero onOpenCert={() => setShowCertModal(true)} siteConfig={siteConfig} />

          <section id="servicios" className="py-12 md:py-20 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
              <div className="glass-pearl p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border transition-colors duration-700">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="font-serif text-4xl md:text-6xl uppercase text-brand tracking-tighter">
                    Catálogo de <span className="text-accent italic">Servicios Clínicos</span>
                  </h2>
                  <p className="text-[10px] tracking-[0.4em] text-accent uppercase font-bold">✦ Selecciona una especialidad médica</p>
                </div>

                <div className="hidden md:flex flex-wrap justify-center gap-4 mb-16">
                  {serviciosData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-8 py-6 rounded-2xl transition-all text-[10px] font-bold tracking-[0.3em] uppercase border min-w-[200px] flex-shrink-0 ${activeCategory === cat.id
                        ? 'bg-[#0B252A] text-[#F9FBFB] dark:bg-[#FDF8F0] dark:text-[#0B252A] border-[#0B252A] dark:border-[#FDF8F0] shadow-[0_15px_40px_rgba(0,0,0,0.15)] scale-105'
                        : 'bg-white/5 dark:bg-white/5 text-[#0B252A] dark:text-[#F9FBFB] border-[#0B252A]/10 dark:border-[#F9FBFB]/10 hover:bg-[#0B252A]/5 dark:hover:bg-white/10'
                        }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>

                <ServiceCarousel
                  category={activeCatData}
                  onSelectTreatment={setSelectedTreatment}
                  dbServices={dbServices}
                />
              </div>
            </div>
          </section>

          <DoctorProfile siteConfig={siteConfig} />
          <QuickGuide siteConfig={siteConfig} />
          <LeadForm siteConfig={siteConfig} />

          {/* FOOTER PREMIUM */}
          <footer className="w-full bg-brand py-16 md:py-10 mt-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-20 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">

                {/* Branding Final */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-serif italic text-white text-xl shadow-lg">S</div>
                    <span className="font-serif text-2xl tracking-[0.2em] text-white dark:text-gray-600 uppercase mt-0.5">SANURA</span>
                  </div>
                  <p className="text-[9px] tracking-[0.5em] text-accent dark:text-gray-700 uppercase font-black opacity-80 pl-1">Alta Estética & Medicina</p>
                </div>

                {/* Status y Uptime */}
                <div className="flex flex-col items-center md:items-end gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-white/50 dark:text-gray-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-white/80 dark:text-gray-600">
                      Contacto: <span className="text-accent">{clinicContact.phone}</span>
                    </span>
                    <span className="w-[1px] h-3 bg-white/10 dark:bg-white/5"></span>
                    <span className="flex items-center gap-2 text-white/80 dark:text-gray-600">
                      Ubicación: <span className="text-white dark:text-gray-600">Quito</span>
                    </span>
                  </div>
                  <p className="text-white/30 dark:text-gray-700 font-medium">© 2026 Clínica Sanura Operations</p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </footer>
        </main>

        {selectedTreatment && (
          <TreatmentModal
            treatment={selectedTreatment}
            onClose={() => setSelectedTreatment(null)}
            siteConfig={siteConfig}
            onOpenAgent={() => setIsAgentOpen(true)}
          />
        )}

        <AgentePersonalizado
          isOpen={isAgentOpen}
          onClose={() => setIsAgentOpen(false)}
          initialTreatment={selectedTreatment}
        />

        <WhatsAppFloating 
          phone={siteConfig?.phoneContact || clinicContact.whatsapp}
          onOpenAgent={() => setIsAgentOpen(true)}
        />
      </div>
    </div>
  );
}