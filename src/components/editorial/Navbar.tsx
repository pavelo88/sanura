
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

  return (
    <nav className="fixed w-full z-[100] transition-all duration-700 backdrop-blur-3xl bg-[#06414B] border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          
          <a href="#" className="font-serif text-2xl tracking-[0.2em] font-bold uppercase text-white hover:text-[#5BC0BE] transition-colors">
            NVitality
          </a>
          
          <div className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE] transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#5BC0BE] transition-all group-hover:w-full" />
              </a>
            ))}
            
            <div className="h-6 w-[1px] bg-white/10 mx-2" />

            <button 
              onClick={toggleTheme} 
              className="p-2.5 bg-white/5 rounded-full text-[#5BC0BE] hover:bg-white/10 hover:text-white transition-all border border-white/10"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <a 
              href="https://wa.me/593983992549" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-[#5BC0BE] text-[#06414B] px-8 py-3.5 text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:scale-105 transition-all shadow-lg rounded-sm"
            >
              Agendar
            </a>
          </div>
          
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 bg-white/5 rounded-full text-[#5BC0BE] hover:bg-white/10 border border-white/10"
            >
              {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-[#5BC0BE] glass-cyan dark:glass-teal rounded-xl"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden bg-[#06414B] border-t border-white/10 ${isOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
        <div className="px-6 py-8 flex flex-col gap-6">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE]"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="https://wa.me/593983992549" 
            target="_blank"
            className="w-full text-center bg-[#5BC0BE] text-[#06414B] py-4 text-[10px] font-bold tracking-[0.5em] uppercase"
          >
            Agendar VIP
          </a>
        </div>
      </div>
    </nav>
  );
};
