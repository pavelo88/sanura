"use client";

import React, { useState } from 'react';
import { ArrowRight, Loader2, Check } from 'lucide-react';
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
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#5BC0BE]/10 mb-8">
          <Check className="text-[#5BC0BE]" size={40} />
        </div>
        <h3 className="font-serif text-3xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-4">Solicitud Recibida</h3>
        <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-lg">Un asesor VIP se pondrá en contacto con usted a la brevedad.</p>
        <button onClick={() => setSuccess(false)} className="mt-10 text-[10px] uppercase tracking-[0.4em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-2">Nueva Solicitud</button>
      </div>
    );
  }

  return (
    <section id="valoracion" className="py-24 md:py-32 bg-[#F0F8F9] dark:bg-[#0C1217] border-y border-[#C4E8E9] dark:border-[#1F2E3A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-6xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-none mb-6">
            Valoración <br /><span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Personalizada</span>
          </h2>
          <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#A0AAB2]">Inicie su camino hacia la excelencia estética.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <input 
            type="text" 
            placeholder="NOMBRE COMPLETO"
            required
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
            className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-6 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase font-bold"
          />
          <input 
            type="tel" 
            placeholder="WHATSAPP (+593)"
            required
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-6 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase font-bold"
          />
          <div className="md:col-span-2">
            <select 
              value={formData.treatmentInterest}
              onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
              className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-6 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-xs tracking-widest uppercase font-bold"
            >
              <option value="">ÁREA DE INTERÉS</option>
              <option value="Facial">FACIAL & INYECTABLES</option>
              <option value="Corporal">MODELADO CORPORAL</option>
              <option value="Laser">DERMATOLOGÍA LÁSER</option>
              <option value="Quirurgica">CIRUGÍA ESTÉTICA</option>
            </select>
          </div>
          <button 
            disabled={loading}
            className="md:col-span-2 group bg-[#06414B] dark:bg-[#1A2833] text-white py-6 text-xs font-bold tracking-[0.5em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Agendar Valoración Médica VIP"}
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </button>
        </form>
      </div>
    </section>
  );
};