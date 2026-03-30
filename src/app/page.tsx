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
import { serviciosData, Treatment } from '@/lib/clinic-data';
import { getFirestore } from '@/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { ChevronDown } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState('01_medicina_estetica_facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [dbServices, setDbServices] = useState<any[]>([]);

  useEffect(() => {
    const db = getFirestore();
    const unsubConfig = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) setSiteConfig(docSnap.data());
    });
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      setDbServices(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => { unsubConfig(); unsubServices(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (selectedTreatment || showCertModal) ? 'hidden' : 'auto';
  }, [selectedTreatment, showCertModal]);

  const activeCatData = serviciosData.find(c => c.id === activeCategory) || serviciosData[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen relative transition-colors duration-1000 bg-background`}>

      {/* Vidrio Global */}
      <div
        className="fixed inset-0 z-0 backdrop-blur-[110px] pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.85)' : 'rgba(224,247,246,0.4)' }}
      />

      <div className="relative z-10 text-[#06414B] dark:text-[#E2E8F0] font-sans antialiased">
        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <main>
          <Hero onOpenCert={() => setShowCertModal(true)} siteConfig={siteConfig} />

          <section id="servicios" className="py-12 md:py-20 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-2xl">
                <div className="text-center mb-12 space-y-4">
                  <h2 className="font-serif text-4xl md:text-6xl uppercase text-[#06414B] dark:text-white tracking-tighter">
                    Curaduría <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">de Elite</span>
                  </h2>
                  <p className="text-[10px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">✦ Selecciona una categoría de protocolos</p>
                </div>

                <div className="hidden md:flex flex-wrap justify-center gap-4 mb-16">
                  {serviciosData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-8 py-5 rounded-2xl transition-all text-[10px] font-bold tracking-[0.2em] uppercase border min-w-[220px] ${activeCategory === cat.id
                        ? 'bg-[#06414B] text-white border-[#06414B] shadow-xl'
                        : 'bg-white/40 dark:bg-white/5 text-[#3A8B99] border-white/60 hover:bg-white'
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

          {/* FOOTER PREMIUM - COINCIDE CON EL NAV */}
          <footer className="w-full bg-[#06414B] py-16 md:py-10 mt-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 md:px-20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-12">

                {/* Branding Final */}
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#5BC0BE] rounded-full flex items-center justify-center font-serif italic font-bold text-[#06414B] text-xl shadow-lg">N</div>
                    <span className="font-serif text-2xl tracking-[0.2em] text-white uppercase font-bold">NVITALITY</span>
                  </div>
                  <p className="text-[9px] tracking-[0.5em] text-[#5BC0BE] uppercase font-black opacity-80">Alta Estética & Rigor Médico</p>
                </div>

                {/* Status y Uptime */}
                <div className="flex flex-col items-center md:items-end gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-white/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#5BC0BE] rounded-full animate-pulse shadow-[0_0_8px_#5BC0BE]"></span>
                      Status: <span className="text-white">Live</span>
                    </span>
                    <span className="w-[1px] h-3 bg-white/10"></span>
                    <span>Uptime: <span className="text-white">99.9%</span></span>
                  </div>
                  <p className="text-white/30 font-medium">© 2026 NVitality Clinic Operations</p>
                </div>
              </div>
            </div>
            {/* Decoración sutil de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5BC0BE]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          </footer>
        </main>

        {selectedTreatment && (
          <TreatmentModal
            treatment={selectedTreatment}
            onClose={() => setSelectedTreatment(null)}
            siteConfig={siteConfig}
          />
        )}

        <WhatsAppFloating phone={siteConfig?.phoneContact} />
      </div>
    </div>
  );
}