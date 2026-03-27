
"use client";

import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'servicios', label: 'Curaduría' },
    { id: 'doctora', label: 'Directora' },
    { id: 'guia', label: 'Rigor' },
    { id: 'valoracion', label: 'Contacto' }
  ];

  // Close menu on escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <nav className="fixed w-full z-[100] transition-all duration-700 backdrop-blur-3xl bg-[#06414B] border-b border-white/10 shadow-2xl" role="navigation" aria-label="Navegación Principal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <a 
            href="#" 
            className="font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] font-bold uppercase text-white hover:text-[#5BC0BE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 rounded px-2 py-1"
            aria-label="N-Vitality - Inicio"
          >
            NVitality
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 md:gap-10 lg:gap-12">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-all relative group focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 px-2 py-1 rounded"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#5BC0BE] transition-all group-hover:w-full" />
              </a>
            ))}
            
            <div className="h-6 w-[1px] bg-white/10 mx-2" />

            <button 
              onClick={toggleTheme} 
              className="p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl text-[#5BC0BE] hover:bg-white/10 hover:text-white transition-all border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50"
              aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a 
              href="https://wa.me/593983992549" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#5BC0BE] text-[#06414B] px-6 md:px-8 py-3 md:py-3.5 text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:scale-105 transition-all shadow-lg rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[44px] md:min-h-[48px] flex items-center justify-center"
              aria-label="Agendar consulta por WhatsApp"
            >
              Agendar
            </a>
          </div>
          
          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 md:gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 md:p-3 bg-white/5 rounded-lg md:rounded-xl text-[#5BC0BE] hover:bg-white/10 border border-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50"
              aria-label={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 md:p-3 text-[#5BC0BE] glass-cyan dark:glass-teal rounded-lg md:rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 min-h-[44px] min-w-[44px] md:min-h-[48px] md:min-w-[48px] flex items-center justify-center"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`lg:hidden transition-all duration-500 overflow-hidden bg-[#06414B]/95 backdrop-blur-md border-t border-white/10 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
        role="region"
        aria-label="Menú de navegación móvil"
      >
        <div className="px-6 sm:px-8 py-6 md:py-8 flex flex-col gap-4 md:gap-6">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className="text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5BC0BE]/50 px-3 py-2 rounded block"
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile WhatsApp Button - Full Width */}
          <div className="pt-2 md:pt-4 border-t border-white/10 mt-4 md:mt-6">
            <a 
              href="https://wa.me/593983992549" 
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-[#5BC0BE] text-[#06414B] py-4 md:py-5 text-[10px] md:text-[11px] font-bold tracking-[0.5em] uppercase rounded-lg md:rounded-xl transition-all hover:bg-white active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] md:min-h-[52px] flex items-center justify-center"
              aria-label="Agendar consulta por WhatsApp (abre en nueva ventana)"
            >
              📞 Agendar VIP
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
