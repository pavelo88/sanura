
"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Phone, MapPin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from '@/firebase';

export const LeadForm = () => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', treatmentInterest: '' });
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
      setFormData({ fullName: '', phone: '', treatmentInterest: '' });
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valoracion" className="relative py-24 md:py-32 overflow-hidden transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera Centralizada */}
        <div className="text-center mb-24 space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#06414B] dark:text-white tracking-tighter uppercase leading-[0.85]">
            Valoración <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Especializada</span>
          </h2>
          <p className="font-sans text-[10px] md:text-xs tracking-[0.5em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">
            Contáctanos para darte atención personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Columna Izquierda: Identidad & Ubicación */}
          <div className="space-y-16 order-2 lg:order-1">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.6em] text-[#06414B]/40 dark:text-white/30 uppercase font-bold">Línea Directa VIP</span>
                <div className="flex items-center gap-6 group">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center glass-cyan dark:glass-teal text-[#5BC0BE] group-hover:scale-110 transition-transform shadow-xl">
                    <Phone size={24} />
                  </div>
                  <p className="font-serif text-3xl md:text-4xl tracking-widest text-[#06414B] dark:text-white">+593 98 399 2549</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[9px] tracking-[0.6em] text-[#06414B]/40 dark:text-white/30 uppercase font-bold">Presencia Digital</span>
                <div className="flex gap-6">
                  <a href="#" className="w-14 h-14 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all shadow-lg"><Instagram size={20} /></a>
                  <a href="#" className="w-14 h-14 glass-cyan dark:glass-teal flex items-center justify-center rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-[#090D10] transition-all shadow-lg"><Facebook size={20} /></a>
                </div>
              </div>
            </div>

            {/* Mapa Estilo Cápsula */}
            <div className="space-y-8">
              <div className="relative w-full h-[400px] overflow-hidden rounded-[3rem] border border-white/40 dark:border-white/10 shadow-2xl group glass-cyan dark:glass-teal p-1">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/10 dark:bg-black/60 mix-blend-multiply" />
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)', borderRadius: '2.8rem' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                />
              </div>
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-3 text-[10px] tracking-[0.5em] text-[#06414B] dark:text-[#5BC0BE] uppercase font-bold">
                  <MapPin size={12} /> Ubicación Central
                </div>
                <p className="text-[10px] tracking-[0.4em] text-[#06414B]/60 dark:text-white/40 uppercase font-light leading-relaxed">
                  Edificio Capital Plaza • Piso 12 • Suite 1204 <br /> 
                  Av. de los Granados & Eloy Alfaro • Quito
                </p>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Doble Vidrio */}
          <div className="order-1 lg:order-2">
            <div className="glass-cyan dark:glass-teal p-10 md:p-14 rounded-[4rem] border border-white/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in zoom-in duration-1000">
              <div className="double-glass-light dark:double-glass-dark p-8 md:p-12 rounded-[3rem] space-y-10">
                {success ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-700">
                    <div className="w-20 h-20 rounded-full bg-[#5BC0BE]/20 flex items-center justify-center mx-auto mb-8 shadow-xl">
                      <Check className="text-[#5BC0BE]" size={40} />
                    </div>
                    <h3 className="font-serif text-3xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-4">Protocolo Iniciado</h3>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-lg mb-12">Su valoración personalizada ha sido registrada con éxito.</p>
                    <button onClick={() => setSuccess(false)} className="text-[10px] uppercase tracking-[0.5em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-2 font-bold hover:text-white transition-colors">Nueva Solicitud</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-all text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp VIP</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-all text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Interés Clínico</label>
                        <select 
                          value={formData.treatmentInterest}
                          onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
                          className="w-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-all text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl appearance-none"
                        >
                          <option value="" className="bg-white dark:bg-[#090D10]">SELECCIONAR</option>
                          <option value="Facial" className="bg-white dark:bg-[#090D10]">ESTÉTICA FACIAL</option>
                          <option value="Corporal" className="bg-white dark:bg-[#090D10]">MODELADO CORPORAL</option>
                          <option value="Laser" className="bg-white dark:bg-[#090D10]">DERMATOLOGÍA LÁSER</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      disabled={loading}
                      className="w-full group bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] py-6 text-[10px] font-bold tracking-[0.6em] uppercase hover:scale-[1.02] transition-all flex items-center justify-center gap-4 disabled:opacity-50 rounded-2xl shadow-2xl"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16} /> : "Iniciar Valoración VIP"}
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
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
