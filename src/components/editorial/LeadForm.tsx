"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from '@/firebase';

interface LeadFormProps {
  siteConfig?: any;
}

export const LeadForm = ({ siteConfig }: LeadFormProps) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // 1. Configuración dinámica con respaldos (fallbacks)
  const phone = siteConfig?.phoneContact || "+593 98 399 2549";
  const instagram = siteConfig?.instagramUrl || "#";
  const facebook = siteConfig?.facebookUrl || "#";
  const address = siteConfig?.contactAddress || "Edificio Capital Plaza • Piso 12 Suite 1204 • Quito, Ecuador";
  const mapsUrl = siteConfig?.googleMapsIframe || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790243615525!2d-78.4820228!3d-0.1741584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a0f7e4e1a0b%3A0x2a0f7e4e1a0b7e4e!2sEdificio%20Capital%20Plaza!5e0!3m2!1ses!2sec!4v1710000000000!5m2!1ses!2sec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'leads'), {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim() || '(Sin mensaje adicional)',
        status: 'SOLICITADO',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ fullName: '', phone: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Error saving lead:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valoracion" className="w-full relative py-12 md:py-20 overflow-hidden bg-background transition-colors duration-500 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Cabecera */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="font-serif text-4xl md:text-6xl text-[#06414B] dark:text-white tracking-tighter uppercase leading-none">
            Valoración<br /> <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Especializada</span>
          </h2>
          <p className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE]/70 uppercase font-bold">
            ✦ Iniciemos tu transformación con protocolo personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* COLUMNA IZQUIERDA: Info -> Mapa -> Dirección */}
          <div className="flex flex-col order-2 lg:order-1">
            <div className="bg-[#E0F7F6]/60 dark:bg-black/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-2xl flex flex-col h-full transition-all">

              {/* 1. Teléfono y Redes */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-6 border-b border-[#06414B]/10 dark:border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] shadow-xl">
                    <Phone size={20} />
                  </div>
                  <a href={`tel:${phone.replace(/\s+/g, '')}`} className="font-serif text-2xl md:text-3xl tracking-tight text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors">
                    {phone}
                  </a>
                </div>
                <div className="flex gap-3">
                  <a href={instagram} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#06414B]/10 dark:border-white/20 flex items-center justify-center text-[#06414B] dark:text-white hover:bg-[#5BC0BE] transition-all shadow-sm">
                    <Instagram size={18} />
                  </a>
                  <a href={facebook} target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full border border-[#06414B]/10 dark:border-white/20 flex items-center justify-center text-[#06414B] dark:text-white hover:bg-[#5BC0BE] transition-all shadow-sm">
                    <Facebook size={18} />
                  </a>
                </div>
              </div>

              {/* 2. El Mapa */}
              <div className="relative w-full h-44 md:h-52 mt-8 mb-6 overflow-hidden rounded-3xl border border-[#06414B]/5 dark:border-white/10 shadow-inner flex-shrink-0">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(50%) contrast(1.1)' }}
                  allowFullScreen={true}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#5BC0BE]/15 dark:bg-black/60 pointer-events-none transition-colors duration-500" />
              </div>

              {/* 3. La Dirección */}
              <div className="text-center space-y-2 pt-2">
                <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">
                  <MapPin size={14} /> Ubicación Central
                </div>
                <p className="text-[9px] md:text-[10px] tracking-[0.2em] text-[#06414B]/70 dark:text-white/40 uppercase font-medium leading-relaxed">
                  {address}
                </p>
              </div>

            </div>
          </div>

          {/* COLUMNA DERECHA: Formulario */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="bg-[#E0F7F6]/60 dark:bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/40 dark:border-white/10 shadow-2xl flex-1 flex flex-col transition-all">
              {success ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-700">
                  <div className="w-20 h-20 rounded-full bg-[#5BC0BE]/20 flex items-center justify-center mb-6 shadow-2xl">
                    <Check className="text-[#5BC0BE]" size={36} />
                  </div>
                  <h3 className="font-serif text-2xl uppercase tracking-tight text-[#06414B] dark:text-white mb-3">Protocolo Iniciado</h3>
                  <p className="text-xs text-[#3A8B99] dark:text-[#A0AAB2] font-light mb-8 max-w-xs mx-auto leading-relaxed">
                    Tu valoración personalizada ha sido registrada. Un especialista te contactará en breve.
                  </p>
                  <button onClick={() => setSuccess(false)} className="text-[10px] uppercase tracking-[0.5em] text-[#5BC0BE] border-b-2 border-[#5BC0BE] pb-1 font-bold">Nueva Solicitud</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6 flex-1 flex flex-col justify-center">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo *</label>
                    <input
                      type="text" required value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-12 bg-white/40 dark:bg-black/30 border border-[#06414B]/10 dark:border-white/10 focus:border-[#5BC0BE] p-4 outline-none text-[#06414B] dark:text-white text-sm rounded-xl transition-all"
                      placeholder="Ej. Dra. Natalia Vitali"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp / Teléfono *</label>
                    <input
                      type="tel" required value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 bg-white/40 dark:bg-black/30 border border-[#06414B]/10 dark:border-white/10 focus:border-[#5BC0BE] p-4 outline-none text-[#06414B] dark:text-white text-sm rounded-xl transition-all"
                      placeholder="+593 ..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Objetivo / Mensaje</label>
                    <textarea
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/40 dark:bg-black/30 border border-[#06414B]/10 dark:border-white/10 focus:border-[#5BC0BE] p-4 outline-none text-[#06414B] dark:text-white text-sm rounded-xl h-24 md:h-28 resize-none transition-all"
                      placeholder="Cuéntanos tu objetivo estético..."
                    />
                  </div>
                  <button
                    type="submit" disabled={loading}
                    className="w-full h-14 bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] text-[10px] md:text-[11px] font-bold tracking-[0.5em] uppercase hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 rounded-xl shadow-xl disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                      <>
                        Iniciar Valoración VIP
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};