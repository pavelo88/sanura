"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Phone, MapPin, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from '@/firebase';

export const LeadForm = () => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!formData.fullName.trim()) {
      setError('Por favor ingresa tu nombre');
      return;
    }
    if (!formData.phone.trim()) {
      setError('Por favor ingresa tu teléfono');
      return;
    }
    if (formData.phone.length < 7) {
      setError('Teléfono inválido');
      return;
    }

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
      setError('Error al enviar. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valoracion" className="w-full relative py-8 md:py-12 lg:py-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-6 md:mb-8 lg:mb-10 space-y-3 md:space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#06414B] dark:text-white tracking-tighter uppercase leading-tight">
            Valoración<br className="hidden sm:inline" /> <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Especializada</span>
          </h2>
          <p className="font-sans text-[10px] md:text-[11px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-semibold">
            ✦ Iniciemos tu transformación con protocolo personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch">

          {/* Left: Contact & Map */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 lg:order-1">
            <div className="glass-cyan dark:glass-teal p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between flex-1">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 md:gap-8 border-b border-white/10 pb-6 md:pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center glass-cyan dark:glass-teal text-[#5BC0BE] flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <a
                    href="tel:+593983992549"
                    className="font-serif text-xl md:text-2xl lg:text-3xl tracking-tight text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors"
                  >
                    +593 98 399 2549
                  </a>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <a href="#" className="w-12 h-12 md:w-14 md:h-14 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-12 h-12 md:w-14 md:h-14 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all"><Facebook size={18} /></a>
                </div>
              </div>

              {/* Map */}
              <div className="relative w-full aspect-video md:aspect-auto md:h-80 lg:h-96 my-6 md:my-8 overflow-hidden rounded-2xl border border-white/10 shadow-lg group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7902!2d-78.48!3d-0.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNDguMCJTIDc4wrAyOCcyOC44Ilc!5e0!3m2!1ses!2sec!4v1620000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(80%) contrast(1.1)', borderRadius: '1rem' }}
                  allowFullScreen={true}
                  loading="lazy"
                />
              </div>

              <div className="text-center space-y-2 pt-6 md:pt-8 border-t border-white/10">
                <div className="inline-flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.4em] text-[#06414B] dark:text-[#5BC0BE] uppercase font-semibold">
                  <MapPin size={14} className="flex-shrink-0" /> Ubicación Central
                </div>
                <p className="text-[8px] md:text-[9px] tracking-[0.3em] text-[#06414B]/60 dark:text-white/40 uppercase font-light leading-relaxed">
                  Edificio Capital Plaza • Piso 12<br />Suite 1204 • Quito, Ecuador
                </p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="glass-cyan dark:glass-teal p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/30 dark:border-white/10 shadow-2xl flex-1 flex flex-col">
              <div className="double-glass-light dark:double-glass-dark p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 md:space-y-8 flex-1 flex flex-col justify-center">
                {success ? (
                  <div className="py-8 md:py-12 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#5BC0BE]/20 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl">
                      <Check className="text-[#5BC0BE]" size={32} />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-tight text-[#06414B] dark:text-white mb-2 md:mb-3">Protocolo Iniciado</h3>
                    <p className="text-[11px] md:text-sm text-[#3A8B99] dark:text-[#A0AAB2] font-light mb-6 md:mb-8 leading-relaxed">
                      Tu valoración personalizada ha sido registrada con éxito. Te contactaremos pronto.
                    </p>
                    <button onClick={() => setSuccess(false)} className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-1 font-semibold">Nueva Solicitud</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-semibold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo *</label>
                      <input
                        type="text" required value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full h-12 md:h-14 bg-white/5 dark:bg-black/20 border border-white/20 focus:border-[#5BC0BE] p-3 md:p-4 outline-none text-[#06414B] dark:text-white text-sm md:text-base rounded-lg md:rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-semibold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp / Teléfono *</label>
                      <input
                        type="tel" required value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 md:h-14 bg-white/5 dark:bg-black/20 border border-white/20 focus:border-[#5BC0BE] p-3 md:p-4 outline-none text-[#06414B] dark:text-white text-sm md:text-base rounded-lg md:rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-semibold text-[#3A8B99] dark:text-[#5BC0BE]">Objetivo / Mensaje</label>
                      <textarea
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 dark:bg-black/20 border border-white/20 focus:border-[#5BC0BE] p-3 md:p-4 outline-none text-[#06414B] dark:text-white text-sm md:text-base rounded-lg md:rounded-xl h-24 md:h-28 resize-none"
                      />
                    </div>
                    <button
                      type="submit" disabled={loading}
                      className="w-full group h-12 md:h-14 bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] text-[10px] md:text-[11px] font-bold tracking-[0.5em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-2 md:gap-3 rounded-lg md:rounded-xl shadow-xl disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "Iniciar Valoración VIP"}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};