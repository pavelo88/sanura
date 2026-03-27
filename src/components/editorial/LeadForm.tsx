
"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from '@/firebase';

export const LeadForm = () => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setLoading(true);
    try {
      const db = getFirestore();
      await addDoc(collection(db, 'leads'), {
        ...formData,
        status: 'Solicitado',
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({ fullName: '', phone: '', message: '' });
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valoracion" className="relative py-16 md:py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 space-y-2">
          <h2 className="font-serif text-3xl md:text-5xl text-[#06414B] dark:text-white tracking-tighter uppercase">
            Valoración <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Especializada</span>
          </h2>
          <p className="font-sans text-[9px] tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">
            Contáctanos para darte atención personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Lado Izquierdo: Contacto & Mapa */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <div className="glass-cyan dark:glass-teal p-8 rounded-[2.5rem] border border-white/20 shadow-xl flex flex-col justify-between flex-1">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center glass-cyan dark:glass-teal text-[#5BC0BE]">
                    <Phone size={20} />
                  </div>
                  <p className="font-serif text-2xl tracking-widest text-[#06414B] dark:text-white">+593 98 399 2549</p>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all"><Instagram size={18} /></a>
                  <a href="#" className="w-12 h-12 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all"><Facebook size={18} /></a>
                </div>
              </div>

              <div className="relative w-full aspect-video md:aspect-auto md:flex-1 my-8 overflow-hidden rounded-[2rem] border border-white/10 shadow-lg group glass-cyan dark:glass-teal p-1">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/10 dark:bg-black/60 mix-blend-multiply" />
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)', borderRadius: '1.8rem' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                />
              </div>

              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-2 text-[9px] tracking-[0.4em] text-[#06414B] dark:text-[#5BC0BE] uppercase font-bold">
                  <MapPin size={10} /> Ubicación Central
                </div>
                <p className="text-[8px] tracking-[0.3em] text-[#06414B]/60 dark:text-white/40 uppercase font-light">
                  Edificio Capital Plaza • Piso 12 • Suite 1204 • Quito
                </p>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Formulario Doble Vidrio */}
          <div className="order-1 lg:order-2 flex flex-col h-full">
            <div className="glass-cyan dark:glass-teal p-8 md:p-10 rounded-[3rem] border border-white/30 dark:border-white/10 shadow-2xl flex-1 flex flex-col">
              <div className="double-glass-light dark:double-glass-dark p-6 md:p-8 rounded-[2rem] space-y-6 flex-1 flex flex-col justify-center">
                {success ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-16 h-16 rounded-full bg-[#5BC0BE]/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
                      <Check className="text-[#5BC0BE]" size={32} />
                    </div>
                    <h3 className="font-serif text-2xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-3">Protocolo Iniciado</h3>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-base mb-8">Su valoración personalizada ha sido registrada con éxito.</p>
                    <button onClick={() => setSuccess(false)} className="text-[9px] uppercase tracking-[0.4em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-1 font-bold">Nueva Solicitud</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo</label>
                      <input 
                        type="text" required value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white/5 dark:bg-black/20 border border-white/20 p-4 focus:border-[#5BC0BE] outline-none text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp VIP</label>
                      <input 
                        type="tel" required value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-white/5 dark:bg-black/20 border border-white/20 p-4 focus:border-[#5BC0BE] outline-none text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Mensaje / Objetivos</label>
                      <textarea 
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 dark:bg-black/20 border border-white/20 p-4 focus:border-[#5BC0BE] outline-none text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-xl h-24 resize-none"
                        placeholder="DESCRIPCIÓN BREVE..."
                      />
                    </div>
                    <button 
                      disabled={loading}
                      className="w-full group bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] py-5 text-[9px] font-bold tracking-[0.5em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-3 rounded-xl shadow-xl disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="animate-spin" size={14} /> : "Iniciar Valoración VIP"}
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
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
