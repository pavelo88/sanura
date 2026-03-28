"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useStorage } from '@/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Loader2, Save, Check, Image as ImageIcon, Instagram, Facebook,
  MapPin, Phone, Hash, BookOpen, User, Zap
} from 'lucide-react';
import { experienceStats, guiaData } from '@/lib/clinic-data';

export default function CMSPanel({ hideHeader }: { hideHeader?: boolean }) {
  const db = getFirestore();
  const storage = useStorage();
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      } else {
        setConfig({
          heroTitle: 'ALTA ESTÉTICA',
          heroSubtitle: 'El rigor científico se encuentra con la alta costura en protocolos de bioseguridad nivel 5.',
          heroDescription: 'Redefiniendo la medicina regenerativa en Quito. Nuestra póliza de salud VIP garantiza protocolos de bioseguridad nivel 5 y resultados de elegancia atemporal.',
          heroPermit: 'Permiso ACESS N° 0000',
          heroVipLabel: 'Garantías Institucionales VIP',
          heroImgAntes: 'https://images.unsplash.com/photo-1615397323114-648c08126d40',
          heroImgDespues: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a',
          stats: experienceStats,
          doctorTitle: 'Dra. Natalia Vitali',
          doctorQuote: 'La estética no es vanidad, sino arquitectura de la autoestima basada en el rigor científico.',
          doctorSpecialty: 'Armonización Facial & Medicina Regenerativa',
          doctorRegistry: '17-2549-VIP • ARCSA Autorizado',
          doctorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          instagramUrl: '#',
          facebookUrl: '#',
          phoneContact: '+593 98 399 2549',
          contactAddress: 'Edificio Capital Plaza • Piso 12 Suite 1204 • Quito, Ecuador',
          googleMapsIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.790243615525!2d-78.4820228!3d-0.1741584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59a0f7e4e1a0b%3A0x2a0f7e4e1a0b7e4e!2sEdificio%20Capital%20Plaza!5e0!3m2!1ses!2sec!4v1710000000000!5m2!1ses!2sec',
          guide: guiaData
        });
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [db]);

  // FUNCIÓN DE GUARDADO CONECTADA AL EVENTO GLOBAL
  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site-content'), config, { merge: true });
      alert("¡Estructura Global Guardada!");
    } catch (error) {
      console.error('Error al guardar cambios:', error);
    }
    setSaving(false);
  };

  // ESCUCHADOR PARA EL BOTÓN DE LA BARRA FIJA
  useEffect(() => {
    const handleGlobalSave = () => handleSave();
    window.addEventListener('cms-save-trigger', handleGlobalSave);
    return () => window.removeEventListener('cms-save-trigger', handleGlobalSave);
  }, [config]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files?.[0] || !storage) return;
    setUploadingField(field);
    const file = e.target.files[0];
    const refPath = ref(storage, `site/${field}_${Date.now()}`);
    try {
      const snap = await uploadBytes(refPath, file);
      const url = await getDownloadURL(snap.ref);
      setConfig({ ...config, [field]: url });
    } catch (error) {
      console.error('Error de subida de imagen:', error);
    }
    setUploadingField(null);
  };

  if (isLoading || !config) return (
    <div className="flex flex-col items-center justify-center p-20 gap-4">
      <Loader2 className="animate-spin text-[#5BC0BE]" size={48} />
      <p className="text-[#5BC0BE] font-bold uppercase tracking-[0.4em] text-[10px]">Sincronizando Consola...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-32 animate-in fade-in duration-700">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

        {/* 01. PORTADA & HERO */}
        <div className="bg-[#121A21] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
          <h3 className="text-[#5BC0BE] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6"><Zap size={16} /> 01. Portada & Hero</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Título Principal</label>
              <input value={config.heroTitle} onChange={e => setConfig({ ...config, heroTitle: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#5BC0BE] font-serif text-lg" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Subtítulo Italizado</label>
              <textarea value={config.heroSubtitle} onChange={e => setConfig({ ...config, heroSubtitle: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white h-20 resize-none outline-none focus:border-[#5BC0BE]" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Descripción Párrafo</label>
              <textarea value={config.heroDescription} onChange={e => setConfig({ ...config, heroDescription: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white h-28 resize-none outline-none focus:border-[#5BC0BE] text-xs leading-relaxed" />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {['heroImgAntes', 'heroImgDespues'].map((field) => (
                <div key={field} className="space-y-3">
                  <span className="text-[8px] uppercase tracking-widest text-white/30 font-black block text-center">{field.includes('Antes') ? 'Antes' : 'Después'}</span>
                  <div className="aspect-[4/5] bg-black rounded-3xl overflow-hidden relative border border-white/10 group">
                    {uploadingField === field ? <div className="absolute inset-0 flex items-center justify-center bg-black/60"><Loader2 className="animate-spin text-[#5BC0BE]" /></div> : <img src={config[field]} className="w-full h-full object-cover opacity-50" />}
                    <label className="absolute inset-0 flex flex-col items-center justify-center bg-[#5BC0BE]/20 opacity-0 group-hover:opacity-100 cursor-pointer transition-all backdrop-blur-sm">
                      <ImageIcon size={32} className="text-white" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e, field)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02. DIRECTORA MÉDICA */}
        <div className="bg-[#121A21] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
          <h3 className="text-[#5BC0BE] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6"><User size={16} /> 02. Directora Médica</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Nombre Completo</label>
              <input value={config.doctorTitle} onChange={e => setConfig({ ...config, doctorTitle: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white font-serif text-lg" placeholder="Ej: Dra. Natalia Vitali" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Frase / Cita</label>
              <textarea value={config.doctorQuote} onChange={e => setConfig({ ...config, doctorQuote: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white h-24 resize-none italic font-serif" placeholder="La estética no es vanidad..." />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Especialidad</label>
              <input value={config.doctorSpecialty} onChange={e => setConfig({ ...config, doctorSpecialty: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-[#5BC0BE] font-bold uppercase text-[11px]" placeholder="Armonización Facial..." />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Registro MSP / Aval</label>
              <input value={config.doctorRegistry} onChange={e => setConfig({ ...config, doctorRegistry: e.target.value })} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white/60 text-[10px] uppercase font-bold" placeholder="17-2549-VIP..." />
            </div>

            <div className="aspect-video bg-black rounded-3xl overflow-hidden relative border border-white/10 group">
              {uploadingField === 'doctorImage' ? <div className="absolute inset-0 flex items-center justify-center bg-black/60"><Loader2 className="animate-spin text-[#5BC0BE]" /></div> : <img src={config.doctorImage} className="w-full h-full object-cover opacity-50" />}
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-[#5BC0BE]/20 opacity-0 group-hover:opacity-100 cursor-pointer transition-all backdrop-blur-sm">
                <ImageIcon size={32} />
                <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e, 'doctorImage')} />
              </label>
            </div>
          </div>
        </div>

        {/* 03. RUTA DE PERFECCIÓN */}
        <div className="bg-[#121A21] p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl col-span-1 xl:col-span-2 space-y-8">
          <h3 className="text-[#5BC0BE] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6"><BookOpen size={16} /> 03. Ruta de Perfección</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.guide?.map((g: any, i: number) => (
              <div key={i} className="p-8 bg-black/30 rounded-[2.5rem] border border-white/5 space-y-4">
                <input value={g.necesidad} onChange={e => {
                  const n = [...config.guide]; n[i].necesidad = e.target.value; setConfig({ ...config, guide: n });
                }} className="w-full bg-transparent text-white font-serif uppercase tracking-widest text-sm outline-none border-b border-white/5 pb-2" />
                <textarea value={g.solucion} onChange={e => {
                  const n = [...config.guide]; n[i].solucion = e.target.value; setConfig({ ...config, guide: n });
                }} className="w-full bg-black/20 p-4 rounded-xl text-white/70 text-xs h-20 resize-none outline-none" />
                <div className="grid grid-cols-2 gap-4">
                  <input value={g.recuperacion} onChange={e => {
                    const n = [...config.guide]; n[i].recuperacion = e.target.value; setConfig({ ...config, guide: n });
                  }} className="w-full bg-black/20 p-2.5 rounded-lg text-[10px] text-[#5BC0BE] font-bold outline-none" placeholder="Recuperación" />
                  <input value={g.duracion} onChange={e => {
                    const n = [...config.guide]; n[i].duracion = e.target.value; setConfig({ ...config, guide: n });
                  }} className="w-full bg-black/20 p-2.5 rounded-lg text-[10px] text-[#5BC0BE] font-bold outline-none" placeholder="Duración" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 04. CONTACTO & REDES */}
        <div className="bg-[#121A21] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
          <h3 className="text-[#5BC0BE] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6"><MapPin size={16} /> 04. Contacto & Redes</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10">
              <Instagram size={20} className="text-[#5BC0BE]" />
              <input value={config.instagramUrl} onChange={e => setConfig({ ...config, instagramUrl: e.target.value })} className="bg-transparent text-white text-xs w-full outline-none" placeholder="URL Instagram" />
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10">
              <Facebook size={20} className="text-[#5BC0BE]" />
              <input value={config.facebookUrl} onChange={e => setConfig({ ...config, facebookUrl: e.target.value })} className="bg-transparent text-white text-xs w-full outline-none" placeholder="URL Facebook" />
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/10">
              <Phone size={20} className="text-[#5BC0BE]" />
              <input value={config.phoneContact} onChange={e => setConfig({ ...config, phoneContact: e.target.value })} className="bg-transparent text-white font-bold text-xs w-full outline-none" placeholder="WhatsApp" />
            </div>
            <input value={config.contactAddress} onChange={e => setConfig({ ...config, contactAddress: e.target.value })} className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-[10px]" placeholder="Dirección Footer" />
            <input value={config.googleMapsIframe} onChange={e => setConfig({ ...config, googleMapsIframe: e.target.value })} className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-[10px] truncate" placeholder="URL Iframe Mapa" />
          </div>
        </div>

        {/* 05. ESTADÍSTICAS */}
        <div className="bg-[#121A21] p-8 md:p-10 rounded-[3rem] border border-white/5 space-y-8 shadow-2xl">
          <h3 className="text-[#5BC0BE] text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4 border-b border-white/5 pb-6"><Hash size={16} /> 05. Estadísticas</h3>
          <div className="grid grid-cols-2 gap-4">
            {config.stats?.map((s: any, i: number) => (
              <div key={i} className="p-6 bg-black/20 rounded-3xl border border-white/5 space-y-2">
                <input value={s.value} onChange={e => {
                  const n = [...config.stats]; n[i].value = e.target.value; setConfig({ ...config, stats: n });
                }} className="w-full bg-transparent text-[#5BC0BE] font-serif text-2xl text-center outline-none" />
                <input value={s.label} onChange={e => {
                  const n = [...config.stats]; n[i].label = e.target.value; setConfig({ ...config, stats: n });
                }} className="w-full bg-transparent text-[8px] text-white/40 text-center uppercase tracking-widest font-black outline-none" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}