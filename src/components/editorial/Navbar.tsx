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
    <nav className="fixed w-full z-50 bg-white/95 dark:bg-[#090D10]/95 backdrop-blur-md border-b border-[#C4E8E9] dark:border-[#162128] transition-all duration-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          <a href="#" className="font-serif text-3xl tracking-[0.2em] font-semibold uppercase text-[#06414B] dark:text-white transition-colors">
            NVitality
          </a>
          
          <div className="hidden lg:flex items-center space-x-12">
            <a href="#servicios" className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Curaduría</a>
            <a href="#experiencia" className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Rigor</a>
            <a href="#guia" className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-colors">Guía</a>
            
            <button 
              onClick={toggleTheme} 
              className="p-3 bg-[#F0F8F9] dark:bg-[#121A21] rounded-full text-[#3A8B99] dark:text-[#5BC0BE] hover:text-[#06414B] dark:hover:text-white transition-all shadow-inner"
              aria-label="Cambiar tema"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#06414B] dark:bg-[#1A2833] border border-[#06414B] dark:border-[#5BC0BE] text-white px-10 py-4 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white dark:hover:bg-[#5BC0BE] hover:text-[#06414B] dark:hover:text-[#090D10] transition-all shadow-xl"
            >
              Agendar
            </a>
          </div>
          
          <button className="lg:hidden p-3 text-[#06414B] dark:text-white">
            <Menu size={32} />
          </button>
        </div>
      </div>
    </nav>
  );
};
