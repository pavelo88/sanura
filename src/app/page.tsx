
"use client";

import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';

// Atelier Editorial Components
import { Navbar } from '@/components/editorial/Navbar';
import { Hero } from '@/components/editorial/Hero';
import { ServiceCarousel } from '@/components/editorial/ServiceCarousel';
import { QuickGuide } from '@/components/editorial/QuickGuide';
import { AIConsultant } from '@/components/editorial/AIConsultant';
import { TreatmentModal } from '@/components/editorial/TreatmentModal';

// Data Centralizada
import { serviciosData, Category, Treatment } from '@/lib/clinic-data';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('01_medicina_estetica_facial');
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Bloqueo de scroll preventivo
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
        
        {/* Fuentes y Core Editorial */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Lato:wght@300;400;700;900&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Lato', sans-serif; }
          html { scroll-behavior: smooth; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />

        <Hero onOpenCert={() => setShowCertModal(true)} />

        {/* Galería Curada de Servicios */}
        <section id="servicios" className="py-24 md:py-40 bg-white dark:bg-[#090D10] border-t border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500 overflow-hidden">
          <div className="max-w-full px-0">
            
            <div className="text-center mb-16 md:mb-32 px-4 max-w-7xl mx-auto">
              <h2 className="font-serif text-4xl md:text-7xl lg:text-9xl tracking-tighter uppercase mb-8 text-[#06414B] dark:text-white leading-[0.8]">
                26 <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Garantías</span>
              </h2>
              <div className="w-32 h-1 bg-[#5BC0BE] mx-auto mb-10"></div>
              <p className="font-serif italic text-2xl md:text-3xl text-[#3A8B99] dark:text-[#5BC0BE] max-w-3xl mx-auto">
                Una selección curada donde la rigurosa ciencia médica se encuentra con la visión editorial de la belleza.
              </p>
            </div>

            {/* Pestañas de Navegación */}
            <div className="flex overflow-x-auto hide-scrollbar gap-8 md:gap-16 mb-20 border-b border-[#C4E8E9] dark:border-[#1F2E3A] px-8 max-w-7xl mx-auto justify-start lg:justify-center">
              {serviciosData.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`whitespace-nowrap pb-6 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase transition-all border-b-[4px] 
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

        {/* Sección de Atelier Arquitectónico */}
        <section id="experiencia" className="py-24 md:py-48 bg-[#F0F8F9] dark:bg-[#0C1217] border-y border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-700">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              <div className="relative aspect-[3/4] lg:aspect-auto lg:h-[800px] w-full border border-white dark:border-[#1F2E3A] p-4 bg-[#E0F4F5] dark:bg-[#121A21] shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
                  alt="Atelier" 
                  className="w-full h-full object-cover grayscale-[10%]" 
                />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#5BC0BE] dark:bg-[#1A2833] hidden xl:flex items-center justify-center p-8 text-white">
                  <span className="font-serif italic text-3xl text-center">Rigor Científico</span>
                </div>
              </div>
              <div className="space-y-12">
                <h2 className="font-serif text-4xl md:text-6xl lg:text-8xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-[0.9]">
                  Atelier <br /><span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">del Cuerpo</span>
                </h2>
                <div className="w-24 h-px bg-[#5BC0BE]"></div>
                <p className="font-sans text-xl md:text-2xl text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed font-light">
                  Con más de una década de experiencia clínica en Quito, combinamos el estricto rigor científico con la visión artística de la estética internacional de vanguardia.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-[#C4E8E9] dark:border-[#1F2E3A] pt-12">
                  <div className="space-y-2">
                    <span className="font-serif text-3xl text-[#06414B] dark:text-white">Dra. Directora</span>
                    <span className="block text-[10px] tracking-[0.4em] uppercase text-[#5BC0BE] font-bold">Registro SENESCYT</span>
                  </div>
                  <div className="space-y-2">
                    <span className="font-serif text-3xl text-[#06414B] dark:text-white">Quito, EC</span>
                    <span className="block text-[10px] tracking-[0.4em] uppercase text-[#5BC0BE] font-bold">Sector Financiero</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <QuickGuide />

        <AIConsultant />

        {/* Footer Editorial */}
        <footer className="bg-[#06414B] dark:bg-[#04090C] text-white pt-32 pb-16 text-center transition-colors duration-700">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-5xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase mb-16 leading-[0.8]">
              Inicie su <br /><span className="text-[#5BC0BE] italic">Legado</span>
            </h2>
            
            <div className="flex flex-col items-center justify-center space-y-10 mb-24">
              <p className="text-4xl sm:text-6xl lg:text-8xl font-serif tracking-widest text-[#5BC0BE]">+593 98 399 2549</p>
              
              <a 
                href="https://wa.me/593983992549" 
                target="_blank" 
                rel="noreferrer" 
                className="group relative inline-block border-2 border-[#5BC0BE] px-16 py-6 text-xs font-bold tracking-[0.5em] uppercase hover:bg-white hover:text-[#06414B] transition-all duration-500 shadow-2xl overflow-hidden"
              >
                Agendar Valoración Médica VIP
              </a>
            </div>

            <div className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.5em] text-white/40 uppercase gap-8">
              <p>© 2026 NVitality Clínica Estética. Archive v.2.6</p>
              <p>Permiso ACESS N° 0000-0000</p>
            </div>
          </div>
        </footer>

        {/* Componentes de Orquestación Modal */}
        {selectedTreatment && (
          <TreatmentModal treatment={selectedTreatment} onClose={() => setSelectedTreatment(null)} />
        )}

        {showCertModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#06414B]/90 dark:bg-black/95 backdrop-blur-xl" onClick={() => setShowCertModal(false)}>
            <div className="bg-white dark:bg-[#121A21] w-full max-w-3xl p-10 md:p-20 relative border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-2xl animate-in fade-in zoom-in duration-500" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowCertModal(false)} className="absolute top-6 right-6 text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors"><X size={32} /></button>
              <h3 className="font-serif text-3xl md:text-5xl uppercase tracking-widest mb-10 border-b border-[#C4E8E9] dark:border-[#1F2E3A] pb-8 text-center text-[#06414B] dark:text-white">Rigor Normativo</h3>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <CheckCircle className="text-[#5BC0BE] flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold tracking-[0.3em] uppercase text-sm mb-2 text-[#06414B] dark:text-white">Protocolos ACESS</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-lg leading-relaxed">Infraestructura y permisos validados por el Ministerio de Salud Pública del Ecuador.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <CheckCircle className="text-[#5BC0BE] flex-shrink-0 mt-1" size={28} />
                  <div>
                    <h4 className="font-bold tracking-[0.3em] uppercase text-sm mb-2 text-[#06414B] dark:text-white">Insumos ARCSA</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-lg leading-relaxed">Uso exclusivo de toxinas y tecnología con Registro Sanitario Ecuatoriano vigente.</p>
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
