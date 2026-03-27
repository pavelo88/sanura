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
      <div className="py-24 text-center animate-in fade-in zoom-in duration-700">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#5BC0BE]/10 mb-4">
          <Check className="text-[#5BC0BE]" size={24} />
        </div>
        <h3 className="font-serif text-xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-2">Solicitud Recibida</h3>
        <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-sm">Un asesor VIP se pondrá en contacto pronto.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 text-[8px] uppercase tracking-[0.4em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-1">Nueva Solicitud</button>
      </div>
    );
  }

  return (
    <section id="valoracion" className="bg-[#F0F8F9] dark:bg-[#0C1217] border-t border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          
          {/* LADO IZQUIERDO: FORMULARIO */}
          <div className="bg-white dark:bg-[#121A21]/50 backdrop-blur-sm p-8 border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-xl rounded-sm">
            <h2 className="font-serif text-2xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-none mb-6">
              Cotice su <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Proyecto a Medida</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] tracking-widest uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Nombre Completo</label>
                <input 
                  type="text" 
                  placeholder="SU NOMBRE"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full bg-[#F0F8F9] dark:bg-[#090D10] border border-[#C4E8E9] dark:border-[#1F2E3A] p-3 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] tracking-widest uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">WhatsApp</label>
                  <input 
                    type="tel" 
                    placeholder="+593"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#F0F8F9] dark:bg-[#090D10] border border-[#C4E8E9] dark:border-[#1F2E3A] p-3 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] tracking-widest uppercase font-bold text-[#3A8B99] dark:text-[#5BC0BE]">Interés</label>
                  <select 
                    value={formData.treatmentInterest}
                    onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
                    className="w-full bg-[#F0F8F9] dark:bg-[#090D10] border border-[#C4E8E9] dark:border-[#1F2E3A] p-3 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase rounded-sm appearance-none"
                  >
                    <option value="">SELECCIONE</option>
                    <option value="Facial">FACIAL</option>
                    <option value="Corporal">CORPORAL</option>
                    <option value="Laser">LÁSER</option>
                    <option value="Quirurgica">CIRUGÍA</option>
                  </select>
                </div>
              </div>
              <button 
                disabled={loading}
                className="w-full group bg-[#06414B] dark:bg-[#1A2833] text-white py-4 text-[9px] font-bold tracking-[0.4em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" size={14} /> : "Solicitar Valoración"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={14} />
              </button>
            </form>
          </div>

          {/* LADO DERECHO: CONTACTO & REDES */}
          <div className="flex flex-col justify-center items-center lg:items-end text-center lg:text-right space-y-8">
            <div className="space-y-2">
              <span className="text-[8px] tracking-[0.5em] text-[#5BC0BE] uppercase font-bold">Atención Directa VIP</span>
              <p className="font-serif text-3xl md:text-5xl text-[#06414B] dark:text-white tracking-widest transition-all hover:scale-105 duration-500">+593 98 399 2549</p>
            </div>

            <div className="space-y-4">
              <span className="text-[8px] tracking-[0.5em] text-[#5BC0BE] uppercase font-bold">Presencia Digital</span>
              <div className="flex gap-6 justify-center lg:justify-end">
                <a href="#" className="p-3 bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] rounded-full text-[#06414B] dark:text-white hover:text-[#5BC0BE] hover:border-[#5BC0BE] transition-all shadow-sm"><Instagram size={18} /></a>
                <a href="#" className="p-3 bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] rounded-full text-[#06414B] dark:text-white hover:text-[#5BC0BE] hover:border-[#5BC0BE] transition-all shadow-sm"><Facebook size={18} /></a>
                <a href="#" className="p-3 bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] rounded-full text-[#06414B] dark:text-white hover:text-[#5BC0BE] hover:border-[#5BC0BE] transition-all shadow-sm"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN MAPA CON PELÍCULA */}
        <div className="relative w-full h-[350px] overflow-hidden group rounded-sm border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-2xl">
          {/* Overlay Cian (Luz) / Negro (Oscuridad) */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/10 dark:bg-black/60 mix-blend-multiply transition-colors duration-500" />
          
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1) brightness(0.9)' }} 
            allowFullScreen={true} 
            loading="lazy" 
          />

          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-white/90 dark:bg-[#121A21]/90 backdrop-blur-md px-4 py-2 border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-lg flex items-center gap-2">
              <MapPin size={14} className="text-[#5BC0BE]" />
              <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-[#06414B] dark:text-white">Capital Plaza • Piso 12 • Quito</span>
            </div>
          </div>
        </div>

        {/* DIRECCIÓN FINAL */}
        <div className="mt-8 text-center">
          <p className="text-[8px] tracking-[0.6em] text-[#3A8B99] dark:text-[#A0AAB2] uppercase px-6 font-light">
            EDIFICIO CAPITAL PLAZA • PISO 12 • SUITE 1204 • AV. DE LOS GRANADOS & ELOY ALFARO • QUITO, ECUADOR
          </p>
        </div>
      </div>
    </section>
  );
};
