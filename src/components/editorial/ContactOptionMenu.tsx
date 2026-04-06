"use client";

import React from 'react';
import { MessageSquare, MessageCircle, X } from 'lucide-react';

interface ContactOptionMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAI: () => void;
  onSelectWhatsApp: () => void;
}

export const ContactOptionMenu = ({ isOpen, onClose, onSelectAI, onSelectWhatsApp }: ContactOptionMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#0B252A]/40 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative glass-pearl w-full max-w-sm rounded-[2.5rem] p-8 md:p-10 border border-white/20 shadow-default animate-in zoom-in-95 duration-500">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-brand/40 dark:text-white/40 hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h3 className="font-serif text-2xl uppercase tracking-tighter text-brand dark:text-white mb-2">
            Canal de <span className="text-accent italic">Atención</span>
          </h3>
          <p className="text-[10px] tracking-[0.3em] text-brand/60 dark:text-white/60 uppercase font-bold">
            ✦ ¿Cómo deseas continuar?
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={onSelectAI}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-[#0B252A] dark:bg-white text-white dark:text-[#0B252A] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-inner">
              <MessageSquare size={20} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase">Agente Personalizado</p>
              <p className="text-[9px] opacity-60 uppercase tracking-widest mt-0.5">Asesoría Inteligente IA</p>
            </div>
          </button>

          <button
            onClick={onSelectWhatsApp}
            className="group flex items-center gap-4 p-5 rounded-2xl bg-white/50 dark:bg-black/20 border border-brand/5 dark:border-white/10 text-brand dark:text-white hover:bg-white/80 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg">
              <MessageCircle size={22} />
            </div>
            <div className="text-left">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase">Vía WhatsApp</p>
              <p className="text-[9px] opacity-60 uppercase tracking-widest mt-0.5">Asesoría Humana Directa</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
