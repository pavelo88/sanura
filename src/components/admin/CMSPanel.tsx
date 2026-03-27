"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useStorage } from '@/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Loader2, Save, Check, Image as ImageIcon } from 'lucide-react';

export default function CMSPanel() {
  const db = getFirestore();
  const storage = useStorage();
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'site-content'), (docSnap) => {
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      } else {
        // Initialize if empty
        setConfig({
          heroTitle: '',
          heroSubtitle: '',
          doctorTitle: '',
          doctorQuote: '',
          doctorImage: ''
        });
      }
    });
    return () => unsubscribe();
  }, [db]);

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'site-content'), config, { merge: true });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
    }
    setSaving(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files?.[0] || !storage) return;
    const file = e.target.files[0];
    const refPath = ref(storage, `site/${field}_${Date.now()}`);
    try {
      const snap = await uploadBytes(refPath, file);
      const url = await getDownloadURL(snap.ref);
      setConfig({ ...config, [field]: url });
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  if (!config) {
    return (
      <div className="flex items-center gap-2 text-white/50 text-sm">
        <Loader2 className="animate-spin text-[#5BC0BE]" /> Cargando configuración...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-white mb-1">Control Editorial Global</h2>
          <p className="text-white/40 text-sm">Personaliza contenido de la página principal</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-[#5BC0BE] hover:bg-[#4db5af] text-[#090D10] px-6 py-3 rounded-lg font-medium text-sm uppercase tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shadow-lg shadow-[#5BC0BE]/20"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Guardando...
            </>
          ) : saveSuccess ? (
            <>
              <Check size={16} />
              Guardado
            </>
          ) : (
            <>
              <Save size={16} />
              Guardar Cambios
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#121A21] p-6 lg:p-8 rounded-2xl border border-[#1F2E3A] space-y-5 shadow-lg">
          <h3 className="text-xs tracking-widest uppercase text-[#5BC0BE] font-medium border-b border-white/10 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5BC0BE]"></span> Portada / Hero
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">Título Principal</label>
              <input 
                value={config.heroTitle || ''} 
                onChange={e => setConfig({...config, heroTitle: e.target.value})} 
                placeholder="Ej: Belleza Médica con Rigor"
                className="w-full bg-[#090D10] border border-[#1F2E3A] focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] p-3 text-sm text-white rounded-lg outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">Subtítulo / Slogan</label>
              <textarea 
                value={config.heroSubtitle || ''} 
                onChange={e => setConfig({...config, heroSubtitle: e.target.value})} 
                placeholder="Descripción breve del valor único"
                className="w-full bg-[#090D10] border border-[#1F2E3A] focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] p-3 text-sm text-white rounded-lg outline-none transition-all h-28 resize-none placeholder:text-white/20"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#121A21] p-6 lg:p-8 rounded-2xl border border-[#1F2E3A] space-y-5 shadow-lg">
          <h3 className="text-xs tracking-widest uppercase text-[#5BC0BE] font-medium border-b border-white/10 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5BC0BE]"></span> Directora Médica
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">Nombre Cita</label>
              <input 
                value={config.doctorTitle || ''} 
                onChange={e => setConfig({...config, doctorTitle: e.target.value})} 
                placeholder="Ej: Dra. Natalia Vitali"
                className="w-full bg-[#090D10] border border-[#1F2E3A] focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] p-3 text-sm text-white rounded-lg outline-none transition-all placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">Biografía Breve</label>
              <textarea 
                value={config.doctorQuote || ''} 
                onChange={e => setConfig({...config, doctorQuote: e.target.value})} 
                placeholder="Frase inspiradora o resumen"
                className="w-full bg-[#090D10] border border-[#1F2E3A] focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] p-3 text-sm text-white rounded-lg outline-none transition-all h-28 resize-none placeholder:text-white/20"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1.5 font-medium uppercase tracking-wider">Foto de Perfil</label>
              <div className="aspect-[21/9] bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] relative group cursor-pointer hover:border-[#5BC0BE]/50 transition-colors">
                {config.doctorImage ? (
                  <img src={config.doctorImage} alt="Doctor" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-white/10" />
                  </div>
                )}
                <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <ImageIcon size={24} className="text-white mb-2" />
                  <span className="text-xs text-white font-medium uppercase tracking-wider">Subir Nueva Imagen</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e, 'doctorImage')} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
