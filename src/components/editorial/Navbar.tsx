"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { clinicContact } from '@/lib/clinic-data';

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
    { id: 'servicios', label: 'Especialidades' },
    { id: 'equipo-medico', label: 'Equipo Clínico' },
    { id: 'guia', label: 'Filosofía' },
    { id: 'valoracion', label: 'Contacto' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 flex justify-center ${scrolled ? 'p-0' : 'p-4 md:p-8 md:px-12'}`}>
      <div className={`relative transition-all duration-1000 flex items-center justify-between shadow-2xl ${scrolled
        ? 'w-full h-16 md:h-24 px-8 md:px-24 glass-navbar-light shadow-[0_10px_40px_rgba(0,0,0,0.2)]'
        : 'w-full max-w-7xl h-16 md:h-24 px-8 md:px-16 glass-navbar-white rounded-[2.5rem] border border-white/10 dark:border-white/5'
        }`}>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-serif italic text-white text-lg shadow-inner">S</div>
          <span className={`font-serif text-xl md:text-2xl tracking-[0.2em] uppercase font-bold mt-1 transition-colors duration-700 ${
            scrolled 
              ? 'text-[#F9FBFB] dark:text-[#0B252A]' 
              : 'text-[#0B252A] dark:text-[#F9FBFB]'
            }`}>
            SANURA
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} 
              className={`text-[10px] font-bold tracking-[0.4em] uppercase hover:text-accent transition-colors duration-700 ${
                scrolled
                  ? 'text-white/70 dark:text-[#0B252A]/70'
                  : 'text-[#0B252A]/70 dark:text-white/70'
              }`}
            >
              {item.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-accent hover:text-white ml-4" aria-label="Cambiar tema">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className={`transition-colors duration-700 ${
              scrolled
                ? 'text-white/70 dark:text-[#0B252A]/70'
                : 'text-[#0B252A]/70 dark:text-white/70'
            }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-accent">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-[calc(100%+0.5rem)] left-0 right-0 md:hidden bg-brand/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mx-4 flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsOpen(false)}
                className="text-[11px] font-bold tracking-[0.4em] uppercase text-white hover:text-accent p-4 rounded-xl hover:bg-white/5 transition-colors text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};