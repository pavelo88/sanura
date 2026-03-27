
"use client";

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  return (
    <nav className="fixed w-full z-[100] transition-all duration-700 backdrop-blur-3xl bg-[#06414B] border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20 lg:h-24">
          
          <a href="#" className="font-serif text-2xl lg:text-3xl tracking-[0.2em] font-bold uppercase text-white hover:text-[#5BC0BE] transition-colors">
            NVitality
          </a>
          
          <div className="hidden lg:flex items-center space-x-12">
            {['servicios', 'doctora', 'guia', 'valoracion'].map((item) => (
              <a 
                key={item}
                href={`#${item}`} 
                className="text-[9px] font-bold tracking-[0.5em] uppercase text-white/70 hover:text-[#5BC0BE] transition-all relative group"
              >
                {item === 'servicios' ? 'Curaduría' : item === 'doctora' ? 'Directora' : item === 'guia' ? 'Rigor' : 'Contacto'}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#5BC0BE] transition-all group-hover:w-full" />
              </a>
            ))}
            
            <div className="h-6 w-[1px] bg-white/10 mx-4" />

            <button 
              onClick={toggleTheme} 
              className="p-3 bg-white/5 rounded-full text-[#5BC0BE] hover:bg-white/10 hover:text-white transition-all border border-white/10 shadow-lg"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a 
              href="https://wa.me/593983992549" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#5BC0BE] text-[#06414B] px-10 py-4 text-[9px] font-bold tracking-[0.5em] uppercase hover:bg-white hover:scale-105 transition-all shadow-[0_10px_30px_-10px_rgba(91,192,190,0.5)] rounded-sm"
            >
              Agendar
            </a>
          </div>
          
          <button className="lg:hidden p-3 text-[#5BC0BE] glass-cyan dark:glass-teal rounded-xl">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};
