'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronUp, X, CheckCircle, Phone, Instagram, Facebook, MoveHorizontal, Sun, Moon, Menu } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

// ==============================================================================
//  DATA MAESTRA: 26 TRATAMIENTOS
// ==============================================================================
const serviciosData = [
  {
    id: '01_medicina_estetica_facial',
    title: 'Estética Facial & Inyectables',
    items: [
      { id: '01_botox', name: 'Neuromoduladores', desc: 'Prevención y tratamiento de rítides dinámicas (frente, entrecejo, patas de gallo). Efecto lifting sin pérdida de expresión facial.', imgAntes: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=800&q=80' },
      { id: '02_hialuronico', name: 'Ácido Hialurónico', desc: 'Reposición de volumen profundo (pómulos, mentón, perfilamiento mandibular). Efecto "Tense & Lift" para una arquitectura facial estructurada.', imgAntes: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80' },
      { id: '03_rinomodelacion', name: 'Rinomodelación', desc: 'Perfilamiento y elevación de la punta nasal con ácido hialurónico de alta densidad. Corrección del caballete en tan solo 20 minutos sin cirugía.', imgAntes: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
      { id: '04_hilos', name: 'Hilos Tensores', desc: 'Efecto lifting no quirúrgico mediante hilos de polidioxanona que reposicionan los tejidos caídos e inducen la formación de colágeno.', imgAntes: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
      { id: '05_meso_facial', name: 'Mesoterapia Facial', desc: 'Infusión subdérmica de un cóctel de vitaminas, antioxidantes y péptidos para una revitalización profunda y luminosidad extrema.', imgAntes: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80' },
      { id: '06_bioestimuladores', name: 'Bioestimuladores', desc: 'Inducción de una red biológica de colágeno propio (Radiesse/Sculptra) que tensa la piel de rostro y cuello progresivamente.', imgAntes: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
      { id: '07_prp', name: 'Plasma Rico en Plaquetas', desc: 'Regeneración celular utilizando factores de crecimiento autólogos extraídos de su propia sangre para mejorar calidad y textura de piel.', imgAntes: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80' }
    ]
  },
  {
    id: '02_estetica_facial_aparatologia',
    title: 'Aparatología Facial',
    items: [
      { id: '08_limpieza', name: 'Limpieza Facial Médica', desc: 'Protocolo dermatológico profundo para extracción de impurezas, control de sebo y optimización de la barrera cutánea.', imgAntes: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=800&q=80' },
      { id: '09_microdermoabrasion', name: 'Microdermoabrasión', desc: 'Exfoliación mecánica de grado médico con puntas de diamante para barrer células muertas y atenuar poros dilatados.', imgAntes: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80' },
      { id: '10_peeling', name: 'Peeling Químico', desc: 'Renovación celular controlada con ácidos médicos específicos para unificar el tono y tratar cicatrices superficiales.', imgAntes: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80' },
      { id: '11_radiofrecuencia', name: 'Radiofrecuencia', desc: 'Tensado cutáneo térmico no invasivo. Estimula las fibras de colágeno y elastina reduciendo la flacidez del óvalo facial.', imgAntes: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80' },
      { id: '12_hifu', name: 'HIFU', desc: 'Ultrasonido focalizado de alta intensidad. Alcanza el plano muscular (SMAS) logrando un efecto lifting sin pasar por quirófano.', imgAntes: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80' }
    ]
  },
  {
    id: '03_tratamientos_corporales',
    title: 'Tratamientos Corporales',
    items: [
      { id: '13_hidro', name: 'Hidrolipoclasia', desc: 'Destrucción de grasa localizada mediante infiltración de suero y ondas de ultrasonido para modelar flancos y abdomen.', imgAntes: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80' },
      { id: '14_carboxi', name: 'Carboxiterapia', desc: 'Infiltración subcutánea de CO2 médico para mejorar la oxigenación tisular, combatiendo celulitis, estrías y flacidez.', imgAntes: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
      { id: '15_preso', name: 'Presoterapia', desc: 'Drenaje linfático mecanizado que elimina la retención de líquidos, toxinas y pesadez en piernas, mejorando la circulación.', imgAntes: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80' },
      { id: '16_cavitacion', name: 'Cavitación', desc: 'Implosión de células grasas mediante ondas de ultrasonido de baja frecuencia. Alternativa indolora a la liposucción pequeña.', imgAntes: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80' },
      { id: '17_crio', name: 'Criolipólisis', desc: 'Destrucción definitiva del adipocito mediante congelamiento controlado (apoptosis), ideal para reducir tallas en zonas rebeldes.', imgAntes: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
      { id: '18_masajes', name: 'Masajes Reductores', desc: 'Remodelación manual profunda y aparatología para romper nódulos de grasa y afinar la silueta progresivamente.', imgAntes: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80' }
    ]
  },
  {
    id: '04_dermatologia_laser',
    title: 'Dermatología Láser',
    items: [
      { id: '19_depilacion', name: 'Depilación Láser', desc: 'Eliminación definitiva del folículo piloso mediante tecnología láser de diodo. Piel suave, sin irritaciones ni foliculitis.', imgAntes: 'https://images.unsplash.com/photo-1607008829749-c0f284a49fc7?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80' },
      { id: '20_manchas', name: 'Láser Manchas (IPL)', desc: 'Destrucción del pigmento melánico por fototermólisis para borrar pecas, lentigos solares y melasma crónico.', imgAntes: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80' },
      { id: '21_tatuajes', name: 'Eliminación Tatuajes', desc: 'Fragmentación de tinta subdérmica con láser Nd:YAG. El sistema inmunológico reabsorbe las partículas borrando el diseño.', imgAntes: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?w=800&q=80' },
      { id: '22_esclero', name: 'Escleroterapia', desc: 'Eliminación estética de telangiectasias (arañas vasculares) y várices pequeñas mediante infiltración de microespuma.', imgAntes: 'https://images.unsplash.com/photo-1609207925106-84e4b67b05e5?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=800&q=80' }
    ]
  },
  {
    id: '05_otros_especializados',
    title: 'Especialidades Quirúrgicas',
    items: [
      { id: '25_blefaro', name: 'Blefaroplastia', desc: 'Resección quirúrgica precisa de piel excedente y bolsas palpebrales. Mirada rejuvenecida con cicatrices ocultas.', imgAntes: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80' },
      { id: '26_dermapen', name: 'Microneedling', desc: 'Microperforaciones automatizadas para inducir colágeno masivo y permitir la penetración de principios activos médicos.', imgAntes: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=800&q=80' },
      { id: '23_meso_capilar', name: 'Mesoterapia Capilar', desc: 'Infiltración directa en el cuero cabelludo de dutasteride y vitaminas para frenar la alopecia y engrosar el folículo.', imgAntes: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80' },
      { id: '24_nutricion', name: 'Nutrición Estética', desc: 'Abordaje clínico del metabolismo para pérdida de peso saludable y mantenimiento de los resultados estéticos corporales.', imgAntes: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' }
    ]
  }
];

const guiaData = [
  { id: 1, necesidad: 'Prevención de Arrugas / Cara Cansada', solucion: 'Neuromoduladores, Hialurónico', recuperacion: 'Inmediata', duracion: '4 a 6 meses' },
  { id: 2, necesidad: 'Flacidez Facial sin Quirófano', solucion: 'Bioestimuladores, Láser CO2, HIFU', recuperacion: '12 a 24 horas', duracion: '18 a 24 meses' },
  { id: 3, necesidad: 'Manchas Severas y Poros Dilatados', solucion: 'Láser IPL/Q-Switch, Peeling Médico', recuperacion: '3 a 7 días', duracion: 'Largo plazo' },
  { id: 4, necesidad: 'Grasa Localizada Rebelde', solucion: 'Enzimas PBSerums, Criolipólisis', recuperacion: 'Variable', duracion: 'Permanente' }
];

// ==============================================================================
//  COMPONENTE INTERACTIVO: SLIDER ANTES/DESPUÉS
// ==============================================================================
const BeforeAfterSlider = ({ imgAntes, imgDespues, isCardMode = false }) => {
  const [position, setPosition] = useState(100);

  return (
    <div className="relative w-full h-full overflow-hidden select-none group/slider touch-pan-y">
      <img
        src={imgAntes}
        alt="Antes"
        className="absolute inset-0 w-full h-full object-cover object-top grayscale-[20%]"
      />
      <div
        className="absolute top-0 left-0 bottom-0 w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img
          src={imgDespues}
          alt="Actualidad"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onClick={(e) => e.stopPropagation()} 
        onTouchStart={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
        aria-label="Deslizar para ver antes y después"
      />
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-20 opacity-100 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity duration-300"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isCardMode ? 'w-8 h-8' : 'w-10 h-10'} bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center border border-gray-200 group-hover/slider:scale-110 transition-transform`}>
          <MoveHorizontal className={`${isCardMode ? 'h-4 w-4' : 'h-5 w-5'} text-gray-800`} />
        </div>
      </div>
      <div className={`absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-widest rounded-sm pointer-events-none z-10 shadow-md`}>
        Actualidad
      </div>
      <div className={`absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 ${isCardMode ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-widest rounded-sm pointer-events-none z-10 shadow-md`}>
        Antes
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('01_medicina_estetica_facial');
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const WHATSAPP_URL = "https://wa.me/593983992549";

  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    skipSnaps: false
  });

  const activeCatData = serviciosData.find(c => c.id === activeCategory);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, isHovered ? 4000 : 2500);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  useEffect(() => {
    if (selectedTreatment || showCertModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedTreatment, showCertModal]);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} w-full h-full min-h-screen`}>
      <div className="bg-white dark:bg-[#090D10] text-[#06414B] dark:text-[#E2E8F0] font-sans antialiased min-h-screen overflow-x-hidden selection:bg-[#3A8B99] dark:selection:bg-[#5BC0BE] selection:text-white transition-colors duration-500">
        
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
          .font-serif { font-family: 'Playfair Display', serif; }
          .font-sans { font-family: 'Lato', sans-serif; }
          html { scroll-behavior: smooth; }
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* --- 1. NAVBAR --- */}
        <nav className="fixed w-full z-40 bg-white/95 dark:bg-[#090D10]/95 backdrop-blur-md border-b border-[#C4E8E9] dark:border-[#162128] transition-colors duration-500 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <a href="#" className="font-serif text-2xl tracking-[0.2em] font-semibold uppercase text-[#06414B] dark:text-white transition-colors">NVitality</a>
              
              <div className="flex items-center gap-4 md:gap-6">
                <div className="hidden md:flex items-center space-x-6">
                  <a href="#servicios" className="text-xs font-bold tracking-widest uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Curaduría</a>
                  <a href="#experiencia" className="text-xs font-bold tracking-widest uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Rigor Médico</a>
                  <a href="#guia" className="text-xs font-bold tracking-widest uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Guía</a>
                  
                  {/* Botón Dark Mode reubicado entre Guía y Agendar */}
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    className="p-2 text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors"
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>

                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-[#06414B] dark:bg-[#1A2833] border border-[#06414B] dark:border-[#5BC0BE] text-white px-5 py-2 text-xs font-bold tracking-widest uppercase hover:bg-white dark:hover:bg-[#5BC0BE] hover:text-[#06414B] dark:hover:text-[#090D10] transition-colors shadow-md">
                    Agendar
                  </a>
                </div>
                
                <button className="md:hidden p-2 text-[#06414B] dark:text-white">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- 2. HERO --- */}
        <header className="relative pt-20 lg:h-screen flex flex-col lg:flex-row bg-[#F0F8F9] dark:bg-[#0C1217] transition-colors duration-500">
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-16 lg:px-16 xl:px-24 z-10">
            <h1 className="font-serif text-4xl md:text-6xl xl:text-8xl text-[#06414B] dark:text-white mb-4 tracking-widest leading-none transition-colors">NVITALITY</h1>
            <p className="font-serif italic text-xl md:text-2xl text-[#3A8B99] dark:text-[#5BC0BE] mb-12 transition-colors">Clínica de Especialidades Estéticas</p>
            <p className="font-sans text-base text-[#06414B]/80 dark:text-[#E2E8F0]/80 leading-relaxed mb-12 max-w-md transition-colors">
              Donde el rigor científico se encuentra con la alta costura. Redefiniendo la estética médica en Quito con protocolos internacionales de empoderamiento.
            </p>
            <button 
              onClick={() => setShowCertModal(true)}
              className="group self-start flex flex-col items-start gap-3 bg-white dark:bg-[#121A21] hover:bg-[#F2F9F9] dark:hover:bg-[#1A2630] py-4 px-6 rounded border border-[#C4E8E9] dark:border-[#1F2E3A] transition-all cursor-pointer shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.15em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-2"/> Permiso ACESS</span>
                <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.15em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-2"/> Insumos ARCSA</span>
                <span className="text-[#06414B] dark:text-[#E2E8F0] text-xs tracking-[0.15em] uppercase font-bold flex items-center"><CheckCircle size={14} className="text-[#5BC0BE] mr-2"/> Aval SENESCYT</span>
              </div>
              <span className="text-[#3A8B99] dark:text-[#5BC0BE] text-[10px] uppercase tracking-widest mt-2 border-t border-[#C4E8E9] dark:border-[#1F2E3A] pt-2 w-full text-left">Ver Garantías Institucionales</span>
            </button>
          </div>
          <div className="w-full lg:w-1/2 h-[500px] lg:h-full relative bg-[#E0F4F5] dark:bg-[#090D10] border-l border-[#C4E8E9] dark:border-[#162128]">
            <div className="absolute top-8 left-8 z-30 pointer-events-none">
              <h2 className="font-serif text-2xl md:text-4xl tracking-widest uppercase text-white drop-shadow-lg">El Protocolo</h2>
              <p className="font-serif italic text-lg text-white/90 drop-shadow-md">La evolución de la confianza</p>
            </div>
            <BeforeAfterSlider 
              imgAntes="https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=1887&auto=format&fit=crop" 
              imgDespues="https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=1974&auto=format&fit=crop" 
            />
          </div>
        </header>

        {/* --- 3. CURADURÍA CLÍNICA (CARRUSEL INFINITO EDITORIAL) --- */}
        <section id="servicios" className="py-20 md:py-32 bg-white dark:bg-[#090D10] border-t border-[#C4E8E9] dark:border-[#162128] transition-colors duration-500">
          <div className="max-w-full px-0 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-7xl mx-auto px-4">
              <h2 className="font-serif text-3xl md:text-5xl tracking-widest uppercase mb-4 text-[#06414B] dark:text-white">La Curaduría Clínica</h2>
              <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">Seleccione un área para explorar la galería de especialidades</p>
            </div>

            <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-8 mb-16 border-b border-[#C4E8E9] dark:border-[#1F2E3A] px-2 max-w-7xl mx-auto">
              {serviciosData.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`whitespace-nowrap pb-4 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all border-b-[3px] 
                   ${activeCategory === cat.id 
                     ? 'border-[#06414B] dark:border-[#5BC0BE] text-[#06414B] dark:text-[#5BC0BE]' 
                     : 'border-transparent text-[#3A8B99] dark:text-[#A0AAB2] hover:text-[#06414B] dark:hover:text-white'}`}
                 >
                   {cat.title}
                 </button>
              ))}
            </div>

            <div 
              className="embla overflow-hidden cursor-grab active:cursor-grabbing" 
              ref={emblaRef}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="embla__container flex">
                {activeCatData.items.map((item, index) => {
                  const isCenter = index === selectedIndex;
                  return (
                    <div 
                      key={item.id} 
                      className={`embla__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-3 md:px-6 transition-transform duration-700 ease-in-out ${isCenter ? 'scale-105 z-10' : 'scale-90 opacity-60'}`}
                    >
                      <div className="flex flex-col shadow-2xl border border-gray-100 dark:border-[#1F2E3A] bg-white dark:bg-[#121A21] h-full">
                        <div className="h-[400px] md:h-[450px] w-full relative">
                          <BeforeAfterSlider 
                            imgAntes={item.imgAntes} 
                            imgDespues={item.imgDespues} 
                            isCardMode={true} 
                          />
                        </div>
                        <div className="p-6 flex-grow flex flex-col items-center justify-center text-center">
                          <h4 className="font-serif text-xl tracking-wider text-[#06414B] dark:text-[#E2E8F0] mb-4 leading-tight">{item.name}</h4>
                          <button 
                            onClick={() => setSelectedTreatment(item)}
                            className="bg-[#06414B] dark:bg-[#1A2833] text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-colors"
                          >
                            Ver Protocolo Completo
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* --- MODAL DETALLE --- */}
        {selectedTreatment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06414B]/80 dark:bg-black/80 backdrop-blur-sm p-0 sm:p-4 lg:p-8" onClick={() => setSelectedTreatment(null)}>
            <div className="bg-white dark:bg-[#0C1217] w-full h-[100dvh] sm:h-[90vh] md:h-[600px] max-w-5xl flex flex-col md:flex-row relative sm:rounded-lg overflow-hidden border-[#C4E8E9] dark:border-[#1F2E3A]" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedTreatment(null)} className="absolute top-3 right-3 z-50 bg-white/80 dark:bg-black/50 p-2 rounded-full text-[#06414B] dark:text-[#E2E8F0] shadow-md">
                <X size={20} />
              </button>
              <div className="w-full h-[45%] md:h-full md:w-1/2 relative">
                 <BeforeAfterSlider imgAntes={selectedTreatment.imgAntes} imgDespues={selectedTreatment.imgDespues} />
              </div>
              <div className="w-full h-[55%] md:h-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto bg-white dark:bg-[#0C1217]">
                <div className="flex-grow">
                  <span className="text-[#5BC0BE] text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border-b border-[#C4E8E9] dark:border-[#1F2E3A] pb-1">Análisis Clínico y Protocolo</span>
                  <h3 className="font-serif text-2xl md:text-4xl text-[#06414B] dark:text-white mb-4 uppercase tracking-wide">{selectedTreatment.name}</h3>
                  <p className="font-sans text-[#3A8B99] dark:text-[#A0AAB2] text-sm md:text-lg leading-relaxed mb-6">{selectedTreatment.desc}</p>
                  <div className="bg-[#F0F8F9] dark:bg-[#121A21] p-6 border-l-2 border-[#5BC0BE] mb-6">
                    <p className="text-sm text-[#06414B] dark:text-[#E2E8F0] font-serif italic">Procedimiento realizado bajo estrictos estándares de bioseguridad. Operado exclusivamente por médicos especialistas.</p>
                  </div>
                </div>
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-[#06414B] dark:bg-[#1A2833] text-white text-center py-4 px-6 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3">
                  <Phone size={16} /> Contactar Asesoría Médica
                </a>
              </div>
            </div>
          </div>
        )}

        {/* --- EXPERIENCIA --- */}
        <section id="experiencia" className="py-20 md:py-24 bg-[#F0F8F9] dark:bg-[#0C1217] border-y border-[#C4E8E9] dark:border-[#162128]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="h-[400px] md:h-[600px] w-full border border-white dark:border-[#1F2E3A] p-2 bg-[#E0F4F5] dark:bg-[#121A21] shadow-xl">
                <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" alt="" className="w-full h-full object-cover grayscale-[10%]" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-5xl tracking-widest uppercase mb-6 text-[#06414B] dark:text-white">Rigor Médico y Elegancia</h2>
                <div className="w-16 h-px bg-[#5BC0BE] mb-8"></div>
                <p className="font-sans text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed mb-6 text-base md:text-lg">
                  Con más de una década de experiencia clínica en Quito, combinamos el estricto rigor científico con la visión artística de la estética internacional de vanguardia.
                </p>
                <div className="flex items-center gap-4 mt-12">
                  <div>
                    <span className="font-serif text-xl md:text-2xl block text-[#06414B] dark:text-white">Dra. Directora Médica</span>
                    <span className="font-sans text-[10px] md:text-xs tracking-widest text-[#5BC0BE] uppercase font-bold">Especialista Titular Reg. SENESCYT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- GUÍA RÁPIDA --- */}
        <section id="guia" className="py-20 md:py-24 bg-white dark:bg-[#090D10] border-b border-[#C4E8E9] dark:border-[#162128]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl tracking-widest uppercase mb-4 text-[#06414B] dark:text-white">¿Qué busca optimizar hoy?</h2>
              <p className="font-serif italic text-lg text-[#3A8B99] dark:text-[#5BC0BE]">Guía rápida de selección clínica</p>
            </div>
            <div className="flex flex-col gap-3">
              {guiaData.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => setActiveGuide(activeGuide === item.id ? null : item.id)}
                  className={`border transition-all duration-300 cursor-pointer p-5 md:p-8 ${activeGuide === item.id ? 'border-[#5BC0BE] bg-[#F0F8F9] dark:bg-[#121A21]' : 'border-[#C4E8E9] dark:border-[#1F2E3A] hover:border-[#5BC0BE] bg-white dark:bg-[#0C1217]'}`}
                >
                  <div className="flex justify-between items-center gap-4">
                    <h4 className="font-serif text-base md:text-2xl tracking-wider text-[#06414B] dark:text-[#E2E8F0] uppercase">{item.necesidad}</h4>
                    <div className={`transform transition-transform duration-300 ${activeGuide === item.id ? 'rotate-180 text-[#5BC0BE]' : 'text-[#3A8B99]'}`}>
                       <ChevronUp size={20} />
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeGuide === item.id ? 'max-h-60 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                    <div className="pt-5 border-t border-[#C4E8E9] dark:border-[#1F2E3A]">
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5BC0BE] mb-2">Protocolos Recomendados:</p>
                      <p className="font-sans text-lg md:text-xl text-[#06414B] dark:text-white mb-6 font-bold">{item.solucion}</p>
                      <div className="flex flex-col md:flex-row gap-2 md:gap-12 text-[10px] text-[#3A8B99] dark:text-[#A0AAB2] uppercase tracking-widest bg-white dark:bg-[#090D10] p-4 border border-[#C4E8E9] dark:border-[#162128]">
                        <span><strong>Recuperación:</strong> {item.recuperacion}</span>
                        <span><strong>Durabilidad:</strong> {item.duracion}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-[#06414B] dark:bg-[#04090C] text-white pt-20 pb-12 text-center">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-5xl tracking-widest uppercase mb-8">Inicie su Transformación</h2>
            <div className="flex flex-col items-center justify-center space-y-4 mb-12">
              <p className="text-3xl sm:text-4xl md:text-6xl font-serif tracking-widest text-[#5BC0BE]">+593 98 399 2549</p>
              <p className="text-[10px] font-sans tracking-widest uppercase text-white/70">Quito, Ecuador - Sector Financiero</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-8 inline-block bg-[#5BC0BE] text-[#06414B] px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-xl">
                Agendar Valoración Médica
              </a>
            </div>
            <div className="flex justify-center space-x-10 mb-16">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={24} /></a>
            </div>
            <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-[8px] tracking-widest text-white/50 uppercase">
              <p className="mb-4 md:mb-0">© 2026 NVitality Clínica Estética. Todos los derechos reservados.</p>
              <p>Permiso ACESS N° 0000-0000</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}