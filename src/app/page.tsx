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

// Data Centralizada y Firebase
import { serviciosData, Category, Treatment } from '@/lib/clinic-data';
import { getFirestore } from '@/firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('01_medicina_estetica_facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Estado para la configuración del CMS (Hero, Dra, etc)
  const [siteConfig, setSiteConfig] = useState<any>(null);

  // ESTADO SEGURO: Inicia con el 100% de tus datos locales garantizados
  const [liveServices, setLiveServices] = useState<Category[]>(serviciosData);

  useEffect(() => {
    const db = getFirestore();

    // 1. Escuchar CMS (Textos principales)
    const unsubSettings = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) {
        setSiteConfig(docSnap.data());
      }
    });

    // 2. Escuchar Servicios (Fotos e info) con Fusión Segura
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        // Creamos un diccionario rápido con lo que venga de Firebase
        const firebaseTreatments = new Map();
        snapshot.docs.forEach(doc => {
          firebaseTreatments.set(doc.id, doc.data());
        });

        // FUSIÓN: Tomamos los datos locales como molde inquebrantable
        const mergedServices = serviciosData.map(category => ({
          ...category,
          items: category.items.map(localItem => {
            const firebaseItem = firebaseTreatments.get(localItem.id);

            // Si Firebase tiene datos de este tratamiento, los sobreescribe (ej: nuevas fotos)
            // Si Firebase NO lo tiene, se queda el localItem intacto.
            if (firebaseItem) {
              return {
                ...localItem,
                ...firebaseItem // Lo de Firebase gana en caso de conflicto
              };
            }
            return localItem;
          })
        }));

        setLiveServices(mergedServices);
      }
    });

    return () => {
      unsubSettings();
      unsubServices();
    };
  }, []);

  useEffect(() => {
    if (selectedTreatment || showCertModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTreatment, showCertModal]);

  // Usamos los datos fusionados
  const activeCatData = liveServices.find(c => c.id === activeCategory) || liveServices[0];

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full min-h-screen transition-colors duration-1000 bg-background`}>
      <div className="text-[#06414B] dark:text-[#E2E8F0] font-sans antialiased min-h-screen selection:bg-[#3A8B99] dark:selection:bg-[#5BC0BE] selection:text-white">

        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <Hero onOpenCert={() => setShowCertModal(true)} siteConfig={siteConfig} />

        <section id="servicios" className="py-8 md:py-12 relative overflow-hidden transition-all duration-700">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="glass-cyan dark:glass-teal p-10 md:p-16 rounded-[4rem] border border-white/40 dark:border-white/10 shadow-2xl">
              <div className="text-center mb-10 space-y-4">
                <h2 className="font-serif text-3xl md:text-5xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-none">
                  Curaduría <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">de Elite</span>
                </h2>
                <p className="font-serif italic text-lg text-[#3A8B99] dark:text-[#5BC0BE]">
                  Protocolos donde la ciencia médica se encuentra con la visión editorial.
                </p>
              </div>

              <div className="relative">
                <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 lg:gap-10 mb-6 md:mb-8 border-b border-white/10 pb-px justify-start lg:justify-center">
                  {liveServices.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`whitespace-nowrap pb-4 text-[8px] md:text-[9px] font-bold tracking-[0.4em] md:tracking-[0.5em] uppercase transition-all border-b-2 flex-shrink-0
                      ${activeCategory === cat.id
                          ? 'border-[#5BC0BE] text-[#06414B] dark:text-[#5BC0BE]'
                          : 'border-transparent text-[#3A8B99]/70 dark:text-white/40 hover:text-[#06414B] dark:hover:text-white'}`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
                <div className="md:hidden absolute right-0 top-0 bottom-2 w-10 bg-gradient-to-l from-white/80 dark:from-[#0D1A22]/80 to-transparent pointer-events-none" />
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

        <footer className="bg-[#06414B] text-white py-12 transition-colors duration-1000 relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-[8px] tracking-[0.5em] text-white/40 uppercase gap-8">
              <div className="flex items-center gap-6">
                <span className="font-serif text-xl tracking-widest text-[#5BC0BE] font-bold">NVITALITY</span>
                <p>© 2026 Clínica Estética. Archive v.3.0</p>
              </div>
              <div className="flex gap-10 font-bold">
                <a href="#" className="hover:text-[#5BC0BE] transition-colors">Aviso Legal</a>
                <a href="#" className="hover:text-[#5BC0BE] transition-colors">Privacidad</a>
              </div>
              <p className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10">Permiso ACESS N° 0000</p>
            </div>
          </div>
        </footer>

        {selectedTreatment && (
          <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
        )}

        {showCertModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setShowCertModal(false)}>
            <div className="glass-cyan dark:glass-teal w-full max-w-2xl p-12 relative border border-white/20 shadow-[0_0_100px_rgba(91,192,190,0.2)] rounded-[3rem]" onClick={e => e.stopPropagation()}>
              <h3 className="font-serif text-2xl uppercase tracking-tighter mb-10 border-b border-white/10 pb-6 text-center text-[#06414B] dark:text-white">Rigor <span className="italic text-[#5BC0BE]">Normativo</span></h3>
              <div className="space-y-8">
                {[
                  { n: '01', t: 'Normativa ACESS', d: 'Infraestructura y permisos validados por el MSP del Ecuador.' },
                  { n: '02', t: 'Insumos ARCSA', d: 'Toxinas y tecnología con Registro Sanitario Ecuatoriano vigente.' },
                  { n: '03', t: 'Aval SENESCYT', d: 'Equipo conformado estrictamente por médicos especialistas.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <span className="text-xl font-serif text-[#5BC0BE] opacity-40 group-hover:opacity-100 transition-opacity">{item.n}</span>
                    <div className="space-y-1">
                      <h4 className="font-bold tracking-[0.2em] uppercase text-[9px] text-[#06414B] dark:text-white">{item.t}</h4>
                      <p className="text-[#3A8B99] dark:text-white/40 text-[11px] leading-relaxed font-light">{item.d}</p>
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