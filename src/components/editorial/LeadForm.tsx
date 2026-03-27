
"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check, Instagram, Facebook, Linkedin, MapPin, Phone } from 'lucide-react';
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
      <div className="py-24 text-center animate-in fade-in zoom-in duration-700 bg-[#06414B]/5 backdrop-blur-xl border-y border-[#C4E8E9] dark:border-[#1F2E3A]">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5BC0BE]/10 mb-6">
          <Check className="text-[#5BC0BE]" size={32} />
        </div>
        <h3 className="font-serif text-3xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-4">Protocolo Iniciado</h3>
        <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-lg max-w-md mx-auto">Su solicitud ha sido registrada en nuestro archivo VIP. Un asesor especializado se contactará para su valoración clínica.</p>
        <button onClick={() => setSuccess(false)} className="mt-8 text-[10px] uppercase tracking-[0.5em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-2 font-bold hover:text-[#06414B] dark:hover:text-white transition-colors">Nueva Solicitud</button>
      </div>
    );
  }

  return (
    <section id="valoracion" className="relative min-h-[900px] flex items-center overflow-hidden">
      {/* FONDO GLASSMORPHISM */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" 
          alt="Clinic Interior" 
          className="w-full h-full object-cover blur-[4px] brightness-[0.8] dark:brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-[#06414B]/20 dark:bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* LADO IZQUIERDO: INFORMACIÓN VIP & MAPA */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold tracking-[0.6em] text-[#5BC0BE] uppercase">Atención de Elite</span>
              <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tighter leading-none uppercase">
                Arquitectura <br /> <span className="italic text-[#5BC0BE]">de su Belleza</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[#5BC0BE] group-hover:bg-[#5BC0BE] group-hover:text-[#06414B] transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="block text-[8px] tracking-[0.4em] text-white/60 uppercase font-bold mb-1">Línea Directa VIP</span>
                  <p className="font-serif text-3xl text-white tracking-widest">+593 98 399 2549</p>
                </div>
              </div>

              <div className="space-y-4">
                <span className="block text-[8px] tracking-[0.4em] text-white/60 uppercase font-bold">Presencia Digital</span>
                <div className="flex gap-4">
                  <a href="#" className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#5BC0BE] hover:text-[#06414B] transition-all"><Instagram size={20} /></a>
                  <a href="#" className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#5BC0BE] hover:text-[#06414B] transition-all"><Facebook size={20} /></a>
                  <a href="#" className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-[#5BC0BE] hover:text-[#06414B] transition-all"><Linkedin size={20} /></a>
                </div>
              </div>
            </div>

            {/* MAPA CON FILTROS ATMOSFÉRICOS */}
            <div className="space-y-6">
              <div className="relative w-full h-[300px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/20 dark:bg-black/70 mix-blend-multiply transition-colors duration-500" />
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                />
              </div>
              <p className="text-[10px] tracking-[0.6em] text-white/60 uppercase text-center font-light leading-relaxed">
                Edificio Capital Plaza • Piso 12 • Suite 1204 <br /> 
                Av. de los Granados & Eloy Alfaro • Quito
              </p>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO GLASS */}
          <div className="bg-black/40 backdrop-blur-xl p-10 md:p-14 border border-white/10 shadow-2xl rounded-2xl">
            <h3 className="font-serif text-3xl tracking-tighter uppercase text-white mb-8 border-b border-white/10 pb-6">
              Inicie su <span className="text-[#5BC0BE] italic">Transformación</span>
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] tracking-widest uppercase font-bold text-[#5BC0BE]">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="SU IDENTIDAD"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#5BC0BE] outline-none transition-colors text-white text-xs tracking-widest uppercase rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-[#5BC0BE]">WhatsApp VIP</label>
                  <input 
                    type="tel" 
                    placeholder="+593"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#5BC0BE] outline-none transition-colors text-white text-xs tracking-widest uppercase rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] tracking-widest uppercase font-bold text-[#5BC0BE]">Protocolo de Interés</label>
                  <select 
                    value={formData.treatmentInterest}
                    onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#5BC0BE] outline-none transition-colors text-white text-xs tracking-widest uppercase rounded-lg appearance-none"
                  >
                    <option value="" className="bg-[#090D10]">SELECCIONE</option>
                    <option value="Facial" className="bg-[#090D10]">FACIAL & LIFTING</option>
                    <option value="Corporal" className="bg-[#090D10]">REMODELACIÓN CORPORAL</option>
                    <option value="Laser" className="bg-[#090D10]">DERMATOLOGÍA LÁSER</option>
                    <option value="Quirurgica" className="bg-[#090D10]">CIRUGÍA ESTÉTICA</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-[9px] tracking-widest uppercase font-bold text-[#5BC0BE]">Notas Clínicas</label>
                <textarea 
                  placeholder="DESCRIBA SUS OBJETIVOS ESTÉTICOS..."
                  className="w-full bg-white/5 border border-white/10 p-4 h-32 focus:border-[#5BC0BE] outline-none transition-colors text-white text-xs tracking-widest uppercase rounded-lg resize-none"
                />
              </div>

              <button 
                disabled={loading}
                className="w-full group bg-[#5BC0BE] text-[#06414B] py-5 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-white transition-all flex items-center justify-center gap-4 disabled:opacity-50 mt-4 rounded-lg shadow-xl"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Solicitar Valoración Clínica"}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
