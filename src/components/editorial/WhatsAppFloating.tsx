"use client";

import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingProps {
    phone?: string;
}

export const WhatsAppFloating = ({ phone }: WhatsAppFloatingProps) => {
    if (!phone) return null;

    // Limpiamos el número para el enlace (solo dejamos dígitos)
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}`;

    return (
        <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-[90] group flex items-center"
            aria-label="Contactar por WhatsApp"
        >
            {/* Etiqueta flotante que aparece al hacer hover */}
            <span className="mr-4 px-4 py-2 bg-white/90 dark:bg-[#121A21]/90 backdrop-blur-md border border-[#C4E8E9] dark:border-[#1F2E3A] text-[#06414B] dark:text-[#5BC0BE] text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
                ¿Consultas? Escríbenos
            </span>

            {/* El Botón Circular */}
            <div className="relative">
                {/* Efecto de pulso */}
                <div className="absolute inset-0 bg-[#5BC0BE] rounded-full animate-ping opacity-20" />

                <div className="relative w-14 h-14 md:w-16 md:h-16 bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] rounded-full flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300">
                    <MessageCircle size={28} className="md:w-8 md:h-8" />
                </div>
            </div>
        </a>
    );
};