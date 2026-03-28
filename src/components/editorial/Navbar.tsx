"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Navbar = ({ isDarkMode, toggleTheme }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'servicios', label: 'Curaduría' },
    { id: 'doctora', label: 'Directora' },
    { id: 'guia', label: 'Rigor' },
    { id: 'valoracion', label: 'Contacto' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center ${scrolled ? 'p-0' : 'p-4 md:p-8'
      }`}>
      <div className={`transition-all duration-500 flex items-center justify-between border-white/10 shadow-2xl ${scrolled
          ? 'w-full h-16 md:h-20 px-8 md:px-20 bg-[#06414B]/95 backdrop-blur-xl border-b'
          : 'w-full max-w-7xl h-16 md:h-20 px-8 bg-[#06414B] rounded-2xl border'
        }`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#5BC0BE] rounded-full flex items-center justify-center font-serif italic font-bold text-[#06414B]">N</div>
          <span className="font-serif text-lg md:text-xl tracking-[0.2em] text-white uppercase font-bold">NVITALITY</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/70 hover:text-[#5BC0BE]">
              {item.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-[#5BC0BE] hover:text-white ml-4">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleTheme} className="text-white/70">{isDarkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#5BC0BE]"><Menu size={24} /></button>
        </div>
      </div>
    </nav>
  );
};