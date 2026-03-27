
"use client";

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const WHATSAPP_URL = "https://wa.me/593983992549";

  return (
    <nav className="fixed w-full z-50 bg-[#06414B] border-b border-white/10 transition-all duration-500 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <a href="#" className="font-serif text-2xl tracking-[0.2em] font-semibold uppercase text-white transition-colors">
            NVitality
          </a>
          
          <div className="hidden lg:flex items-center space-x-10">
            <a href="#servicios" className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-colors">Curaduría</a>
            <a href="#doctora" className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-colors">Dra. Vitali</a>
            <a href="#guia" className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-colors">Rigor</a>
            <a href="#valoracion" className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-colors">Contacto</a>
            
            <button 
              onClick={toggleTheme} 
              className="p-2.5 bg-white/5 rounded-full text-[#5BC0BE] hover:bg-white/10 hover:text-white transition-all border border-white/10"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-transparent border border-[#5BC0BE] text-[#5BC0BE] px-8 py-3 text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-[#5BC0BE] hover:text-[#06414B] transition-all shadow-lg"
            >
              Agendar
            </a>
          </div>
          
          <button className="lg:hidden p-3 text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </nav>
  );
};
