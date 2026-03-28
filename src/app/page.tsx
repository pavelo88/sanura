"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/editorial/Navbar';
import { Hero } from '@/components/editorial/Hero';
import { ServiceCarousel } from '@/components/editorial/ServiceCarousel';
import { DoctorProfile } from '@/components/editorial/DoctorProfile';
import { QuickGuide } from '@/components/editorial/QuickGuide';
import { LeadForm } from '@/components/editorial/LeadForm';
import { TreatmentModal } from '@/components/editorial/TreatmentModal';
import { AIConsultant } from '@/components/editorial/AIConsultant';
import { WhatsAppFloating } from '@/components/editorial/WhatsAppFloating'; // <--- IMPORTACIÓN NUEVA
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

  // ESTADOS DE FIREBASE
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [dbServices, setDbServices] = useState<any[]>([]);

  // ESCUCHA EN TIEMPO REAL A FIREBASE (Settings y Servicios)
  useEffect(() => {
    const db = getFirestore();

    // 1. Escucha la configuración global (Hero, Doctora, etc)
    const unsubConfig = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) setSiteConfig(docSnap.data());
    });

    // 2. Escucha la colección de servicios para el carrusel
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
          {/* 1. HERO CONECTADO */}
          <Hero onOpenCert={() => setShowCertModal(true)} siteConfig={siteConfig} />

          {/* 2. SECCIÓN DE SERVICIOS - Ajustado scroll-mt a 20 */}
          <section id="servicios" className="py-12 md:py-20 relative scroll-mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
              <div className="bg-white/10 dark:bg-white/5 backdrop-blur-2xl p-8 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white/20 shadow-2xl">

                <div className="text-center mb-12 space-y-4">
                  <h2 className="font-serif text-4xl md:text-6xl uppercase text-[#06414B] dark:text-white tracking-tighter">
                    Curaduría <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">de Elite</span>
                  </h2>
                  <p className="text-[10px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">✦ Selecciona una categoría de protocolos</p>
                </div>

                {/* BOTONES DESKTOP */}
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

                {/* SELECTOR MÓVIL */}
                <div className="md:hidden relative z-40 mb-10">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full flex items-center justify-between bg-white/80 dark:bg-black/40 px-6 py-5 rounded-2xl border border-white/40 shadow-xl"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest">{activeCatData?.title}</span>
                    <ChevronDown className={isMobileMenuOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </button>
                  {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-[#0D151C] backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl p-4 space-y-2 z-50">
                      {serviciosData.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => { setActiveCategory(cat.id); setIsMobileMenuOpen(false); }}
                          className={`w-full text-left px-5 py-4 rounded-xl text-[9px] font-bold uppercase ${activeCategory === cat.id ? 'bg-[#5BC0BE] text-black' : 'text-[#06414B] dark:text-white/70'
                            }`}
                        >
                          {cat.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <ServiceCarousel
                  category={activeCatData}
                  onSelectTreatment={setSelectedTreatment}
                  dbServices={dbServices}
                />
              </div>
            </div>
          </section>

          {/* 3. RESTO DE COMPONENTES */}
          <DoctorProfile siteConfig={siteConfig} />
          <QuickGuide siteConfig={siteConfig} />
          <LeadForm siteConfig={siteConfig} />
          <AIConsultant siteConfig={siteConfig} />
        </main>

        {/* 4. MODAL CONECTADO */}
        {selectedTreatment && (
          <TreatmentModal
            treatment={selectedTreatment}
            onClose={() => setSelectedTreatment(null)}
            siteConfig={siteConfig}
          />
        )}

        {/* 5. BOTÓN FLOTANTE DE WHATSAPP */}
        <WhatsAppFloating phone={siteConfig?.phoneContact} />
      </div>
    </div>
  );
}