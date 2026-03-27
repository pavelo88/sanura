
"use client";

import React from 'react';
import { Sun, Moon, Menu } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const WHATSAPP_URL = "https://wa.me/593983992549";

  return (
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-[#090D10]/95 backdrop-blur-md border-b border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* LOGO IZQUIERDA */}
          <a href="#" className="font-serif text-2xl md:text-3xl tracking-[0.3em] font-semibold uppercase text-[#06414B] dark:text-white transition-colors">
            NVitality
          </a>
          
          {/* MENÚ DERECHA */}
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#servicios" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3A8B99] dark:text-[#A0AAB2] hover:text-[#06414B] dark:hover:text-white transition-colors">Curaduría</a>
              <a href="#experiencia" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3A8B99] dark:text-[#A0AAB2] hover:text-[#06414B] dark:hover:text-white transition-colors">Atelier</a>
              <a href="#guia" className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#3A8B99] dark:text-[#A0AAB2] hover:text-[#06414B] dark:hover:text-white transition-colors">Guía</a>
              
              {/* SELECTOR DE TEMA: EXACTAMENTE ENTRE GUÍA Y AGENDAR */}
              <button 
                onClick={toggleTheme} 
                className="p-2 text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-all hover:scale-110"
                aria-label="Cambiar tema"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-[#06414B] dark:bg-[#1A2833] border border-[#06414B] dark:border-[#5BC0BE] text-white px-8 py-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-white dark:hover:bg-[#5BC0BE] hover:text-[#06414B] dark:hover:text-[#090D10] transition-all shadow-lg active:scale-95">
                Agendar
              </a>
            </div>
            
            {/* MOBILE ONLY TOGGLE */}
            <div className="lg:hidden flex items-center gap-4">
               <button onClick={toggleTheme} className="p-2 text-[#3A8B99] dark:text-[#5BC0BE]">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 text-[#06414B] dark:text-white">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
