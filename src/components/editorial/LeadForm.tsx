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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5BC0BE]/10 mb-6">
          <Check className="text-[#5BC0BE]" size={32} />
        </div>
        <h3 className="font-serif text-2xl uppercase tracking-tighter text-[#06414B] dark:text-white mb-3">Solicitud Recibida</h3>
        <p className="text-[#3A8B99] dark:text-[#A0AAB2] font-light text-base">Un asesor VIP se pondrá en contacto con usted.</p>
        <button onClick={() => setSuccess(false)} className="mt-8 text-[9px] uppercase tracking-[0.4em] text-[#5BC0BE] border-b border-[#5BC0BE] pb-1">Nueva Solicitud</button>
      </div>
    );
  }

  return (
    <section id="valoracion" className="bg-[#F0F8F9] dark:bg-[#0C1217] border-t border-[#C4E8E9] dark:border-[#1F2E3A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LADO IZQUIERDO: FORMULARIO */}
          <div className="space-y-10">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-none mb-4">
                Valoración <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">VIP</span>
              </h2>
              <p className="font-serif italic text-lg text-[#3A8B99] dark:text-[#A0AAB2]">Inicie su proceso de transformación estética.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="NOMBRE COMPLETO"
                required
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
                className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-4 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase font-bold"
              />
              <input 
                type="tel" 
                placeholder="WHATSAPP (+593)"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-4 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase font-bold"
              />
              <div className="md:col-span-2">
                <select 
                  value={formData.treatmentInterest}
                  onChange={e => setFormData({...formData, treatmentInterest: e.target.value})}
                  className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-4 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white text-[10px] tracking-widest uppercase font-bold appearance-none"
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
                className="md:col-span-2 group bg-[#06414B] dark:bg-[#1A2833] text-white py-5 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : "Agendar Valoración"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </button>
            </form>
          </div>

          {/* LADO DERECHO: CONTACTO & REDES */}
          <div className="lg:pl-16 space-y-12">
            <div className="space-y-4">
              <span className="text-[9px] tracking-[0.5em] text-[#5BC0BE] uppercase font-bold">Atención Directa VIP</span>
              <p className="font-serif text-4xl md:text-5xl text-[#06414B] dark:text-white tracking-widest">+593 98 399 2549</p>
            </div>

            <div className="space-y-6">
              <span className="text-[9px] tracking-[0.5em] text-[#5BC0BE] uppercase font-bold">Presencia Digital</span>
              <div className="flex gap-8">
                <a href="#" className="text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors"><Facebook size={24} /></a>
                <a href="#" className="text-[#06414B] dark:text-white hover:text-[#5BC0BE] transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[#C4E8E9] dark:border-[#1F2E3A]">
              <div className="flex items-center gap-4 text-[#3A8B99] dark:text-[#A0AAB2]">
                <Phone size={16} className="text-[#5BC0BE]" />
                <span className="text-[9px] tracking-[0.3em] uppercase font-bold">Lunes - Sábado: 09:00 - 19:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN MAPA */}
      <div className="relative w-full h-[400px] overflow-hidden group">
        {/* Overlays Temáticos */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-[#5BC0BE]/15 dark:bg-black/40 mix-blend-multiply transition-colors duration-500" />
        
        {/* Iframe del Mapa */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7905183492!2d-78.4831818!3d-0.1806532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTAnNTAuNCJTIDc4wrAyOCU1OS41Ilc!5e0!3m2!1ses!2sec!4v1700000000000!5m2!1ses!2sec" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Pin Flotante con dirección */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="bg-white dark:bg-[#121A21] px-6 py-4 border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-2xl flex items-center gap-3">
            <MapPin size={18} className="text-[#5BC0BE]" />
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-[#06414B] dark:text-white">Av. de los Granados & Eloy Alfaro, Quito</span>
          </div>
        </div>
      </div>

      {/* DIRECCIÓN FINAL */}
      <div className="py-12 bg-white dark:bg-[#090D10] text-center border-b border-[#C4E8E9] dark:border-[#1F2E3A]">
        <p className="text-[10px] tracking-[0.8em] text-[#3A8B99] dark:text-[#A0AAB2] uppercase px-6">
          EDIFICIO CAPITAL PLAZA • PISO 12 • SUITE 1204 • QUITO, ECUADOR
        </p>
      </div>
    </section>
  );
};