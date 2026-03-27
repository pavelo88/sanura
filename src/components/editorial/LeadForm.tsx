
"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Phone } from 'lucide-react';
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

  if (success) {
    return (
      <div className="py-32 text-center animate-in fade-in zoom-in duration-700 bg-[#06414B]/5 dark:bg-black/40 backdrop-blur-3xl border-y border-[#C4E8E9] dark:border-[#1F2E3A]">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#5BC0BE]/10 mb-8">
          <Check className="text-[#5BC0BE]" size={40} />
        </div>
        <h3 className="font-serif text-4xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-4">Protocolo Iniciado</h3>
        <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-xl max-w-md mx-auto">Su solicitud ha sido registrada en nuestro archivo VIP. Un asesor especializado se contactará para su valoración.</p>
        <button onClick={() => setSuccess(false)} className="mt-12 text-[10px] uppercase tracking-[0.5em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-2 font-bold hover:text-[#06414B] dark:hover:text-white transition-colors">Nueva Solicitud</button>
      </div>
    );
  }

  return (
    <section id="valoracion" className="relative min-h-[1000px] flex flex-col items-center justify-center overflow-hidden py-24">
      {/* FONDO CINEMÁTICO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
          alt="Clinic Background" 
          className="w-full h-full object-cover brightness-[0.9] dark:brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-white/20 dark:bg-black/60 backdrop-blur-[4px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* ENCABEZADO CENTRADO */}
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-serif text-5xl md:text-6xl text-[#06414B] dark:text-white tracking-tighter uppercase">
            Valoración <span className="italic text-[#3A8B99] dark:text-[#5BC0BE]">Especializada</span>
          </h2>
          <p className="font-sans text-[11px] md:text-xs tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE] uppercase font-bold">
            Contáctanos para darte atención personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* COLUMNA IZQUIERDA: IDENTIDAD & UBICACIÓN */}
          <div className="space-y-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="space-y-8 w-full">
              <div className="space-y-3">
                <span className="block text-[9px] tracking-[0.5em] text-[#06414B]/60 dark:text-white/40 uppercase font-bold">Línea Directa VIP</span>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-[#06414B] dark:text-white">
                  <Phone size={24} className="text-[#5BC0BE]" />
                  <p className="font-serif text-4xl tracking-widest">+593 98 399 2549</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="block text-[9px] tracking-[0.5em] text-[#06414B]/60 dark:text-white/40 uppercase font-bold">Presencia Digital</span>
                <div className="flex justify-center lg:justify-start gap-6">
                  <a href="#" className="p-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-white transition-all shadow-xl"><Instagram size={22} /></a>
                  <a href="#" className="p-4 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full text-[#06414B] dark:text-white hover:bg-[#5BC0BE] hover:text-white transition-all shadow-xl"><Facebook size={22} /></a>
                </div>
              </div>
            </div>

            {/* MAPA FUNCIONAL CON FILTROS */}
            <div className="w-full space-y-6">
              <div className="relative w-full h-[320px] overflow-hidden rounded-[2.5rem] border border-white/30 dark:border-white/10 shadow-2xl group">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/20 dark:bg-black/60 mix-blend-multiply transition-colors duration-500" />
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                />
              </div>
              <p className="text-[10px] tracking-[0.5em] text-[#06414B]/50 dark:text-white/40 uppercase text-center font-bold leading-relaxed">
                Edificio Capital Plaza • Piso 12 • Suite 1204 <br /> 
                Av. de los Granados & Eloy Alfaro • Quito
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO VIDRIO ESMERILADO */}
          <div className="bg-[#5BC0BE]/10 dark:bg-[#06414B]/30 backdrop-blur-2xl p-10 md:p-14 border border-white/30 dark:border-white/10 shadow-2xl rounded-[3rem] w-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="IDENTIDAD DEL PACIENTE"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp VIP</label>
                  <input 
                    type="tel" 
                    placeholder="+593"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Protocolo</label>
                  <select 
                    value={formData.treatmentInterest}
                    onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
                    className="w-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 p-5 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl appearance-none"
                  >
                    <option value="" className="bg-white dark:bg-[#090D10]">SELECCIONE</option>
                    <option value="Facial" className="bg-white dark:bg-[#090D10]">FACIAL & LIFTING</option>
                    <option value="Corporal" className="bg-white dark:bg-[#090D10]">REMODELACIÓN CORPORAL</option>
                    <option value="Laser" className="bg-white dark:bg-[#090D10]">DERMATOLOGÍA LÁSER</option>
                    <option value="Quirurgica" className="bg-white dark:bg-[#090D10]">CIRUGÍA ESTÉTICA</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Notas Médicas</label>
                <textarea 
                  placeholder="DESCRIBA SUS OBJETIVOS ESTÉTICOS..."
                  className="w-full bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 p-5 h-32 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase rounded-2xl resize-none"
                />
              </div>

              <button 
                disabled={loading}
                className="w-full group bg-[#06414B] text-white py-6 text-[10px] font-bold tracking-[0.6em] uppercase hover:bg-[#5BC0BE] hover:text-[#06414B] transition-all flex items-center justify-center gap-4 disabled:opacity-50 mt-4 rounded-2xl shadow-2xl"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Iniciar Valoración VIP"}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
