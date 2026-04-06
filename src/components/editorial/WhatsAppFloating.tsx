"use client";

import React, { useState } from 'react';
import { MessageCircle, Zap, X } from 'lucide-react';

interface WhatsAppFloatingProps {
    phone?: string;
    onOpenAgent?: () => void;
}

export const WhatsAppFloating = ({ phone, onOpenAgent }: WhatsAppFloatingProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const cleanNumber = phone?.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}`;

    const handleAgent = () => {
        onOpenAgent?.();
        setIsOpen(false);
    };

    const handleWhatsApp = () => {
        if (phone) {
            window.open(waUrl, '_blank');
            setIsOpen(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[90] flex items-center justify-end gap-4">
            {/* Menú de opciones */}
            {isOpen && (
                <div className="flex flex-col gap-3 animate-in slide-in-from-right-4 fade-in duration-300">
                    {/* Opción: Agente Personalizado */}
                    <button
                        onClick={handleAgent}
                        className="group/agent flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#5BC0BE] to-[#06414B] dark:from-[#06414B] dark:to-[#5BC0BE] text-white rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 min-w-[220px] text-left"
                    >
                        <Zap size={18} />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase">Agente</span>
                            <span className="text-[8px] font-light opacity-90">IA Personalizado</span>
                        </div>
                    </button>

                    {/* Opción: WhatsApp Directo */}
                    <button
                        onClick={handleWhatsApp}
                        className="group/whats flex items-center gap-3 px-6 py-3 bg-white dark:bg-[#0C1217] border-2 border-[#25D366] text-[#25D366] dark:text-[#25D366] rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 min-w-[220px] text-left"
                    >
                        <MessageCircle size={18} fill="currentColor" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black tracking-[0.3em] uppercase">WhatsApp</span>
                            <span className="text-[8px] font-light opacity-90">Habla con una Persona</span>
                        </div>
                    </button>
                </div>
            )}

            {/* Botón Principal - Contacto */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center justify-center"
                aria-label="Opciones de contacto"
                title="Elige tu forma de contacto"
            >
                {/* Etiqueta flotante que aparece al hacer hover */}
                {!isOpen && (
                    <span className="mr-4 px-4 py-2 bg-white/90 dark:bg-[#121A21]/90 backdrop-blur-md border border-[#C4E8E9] dark:border-[#1F2E3A] text-[#06414B] dark:text-[#5BC0BE] text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
                        Contacto
                    </span>
                )}

                {/* El Botón Circular */}
                <div className="relative">
                    {/* Efecto de pulso - solo cuando está cerrado */}
                    {!isOpen && <div className="absolute inset-0 bg-[#5BC0BE] rounded-full animate-ping opacity-20" />}

                    <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#06414B] to-[#5BC0BE] dark:from-[#5BC0BE] dark:to-[#06414B] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(91,192,190,0.5)]">
                        {isOpen ? (
                            <X size={28} className="md:w-8 md:h-8" />
                        ) : (
                            <MessageCircle size={28} className="md:w-8 md:h-8" />
                        )}
                    </div>
                </div>
            </button>
        </div>
    );
};