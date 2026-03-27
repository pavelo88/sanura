"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useStorage } from '@/firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serviciosData } from '@/lib/clinic-data';
import { ImageIcon, Loader2, UploadCloud, Database, Save, Trash2 } from 'lucide-react';

export default function ServicesManager() {
  const db = getFirestore();
  const storage = useStorage();

  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingInfo, setUploadingInfo] = useState<{ id: string, type: 'imgAntes' | 'imgDespues' } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const fetchedServices = snapshot.docs.map(doc => ({ dbId: doc.id, ...doc.data() }));
      // Ordenar por ID para mantener el orden lógico (01_botox, etc)
      fetchedServices.sort((a, b) => a.dbId.localeCompare(b.dbId));
      setServices(fetchedServices);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [db]);

  const handleSeedDatabase = async () => {
    if (!confirm("Esto subirá los 26 tratamientos de tu archivo local a Firebase. ¿Continuar?")) return;
    setIsSeeding(true);
    try {
      const allTreatments = serviciosData.flatMap(cat =>
        cat.items.map(item => ({ ...item, categoryId: cat.id, categoryTitle: cat.title }))
      );
      for (const treatment of allTreatments) {
        await setDoc(doc(db, 'services', treatment.id), treatment);
      }
      alert("Catálogo sincronizado con éxito.");
    } catch (error) {
      console.error("Error sincronizando catálogo:", error);
      alert("Error al sincronizar. Revisa las reglas de Firestore.");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDelete = async (dbId: string) => {
    if (!confirm("¿Estás seguro de eliminar este tratamiento para siempre?")) return;
    try {
      await deleteDoc(doc(db, 'services', dbId));
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleSaveText = async (dbId: string) => {
    const nameInput = document.getElementById(`name-${dbId}`) as HTMLInputElement;
    const descInput = document.getElementById(`desc-${dbId}`) as HTMLTextAreaElement;

    if (!nameInput || !descInput) return;

    setSavingId(dbId);
    try {
      await updateDoc(doc(db, 'services', dbId), {
        name: nameInput.value,
        desc: descInput.value
      });
    } catch (error) {
      console.error("Error al guardar texto:", error);
      alert("No se pudo guardar. Revisa que las reglas de Firebase tengan 'allow write: if true;'");
    } finally {
      setSavingId(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, docId: string, imageType: 'imgAntes' | 'imgDespues') => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    setUploadingInfo({ id: docId, type: imageType });
    try {
      const storageRef = ref(storage, `treatments/${docId}_${imageType}_${Date.now()}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateDoc(doc(db, 'services', docId), { [imageType]: downloadURL });
    } catch (error) {
      console.error("Error al subir imagen:", error);
      alert("Error al subir imagen. Revisa las reglas de Storage en Firebase.");
    } finally {
      setUploadingInfo(null);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 relative min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-white mb-1">Gestor de Servicios</h2>
          <p className="text-white/40 text-sm">{services.length} tratamientos en la nube</p>
        </div>

        {/* BOTÓN PARA FORZAR LA SINCRONIZACIÓN SI FALTAN DATOS */}
        <button
          onClick={handleSeedDatabase}
          disabled={isSeeding}
          className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all"
        >
          {isSeeding ? <Loader2 className="animate-spin" size={14} /> : <Database size={14} />}
          Forzar Sincronización
        </button>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#090D10]/80 backdrop-blur-sm flex flex-col items-center justify-center pt-20">
          <Loader2 className="animate-spin text-[#5BC0BE] mb-3" size={40} />
          <p className="text-[#5BC0BE] text-xs font-bold tracking-widest uppercase">Cargando...</p>
        </div>
      )}

      {!isLoading && services.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((item: any) => (
            <div key={item.dbId} className="bg-[#121A21] p-5 rounded-xl border border-[#1F2E3A] hover:border-[#5BC0BE]/30 transition-all duration-300 shadow-lg flex flex-col group">

              {/* INPUT PARA NOMBRE EDITABLE */}
              <input
                id={`name-${item.dbId}`}
                defaultValue={item.name}
                className="w-full bg-[#090D10] border border-transparent hover:border-[#1F2E3A] focus:border-[#5BC0BE] text-[11px] tracking-widest uppercase text-[#5BC0BE] font-bold mb-3 px-2 py-1 rounded outline-none transition-all"
                title="Editar Nombre"
              />

              <div className="grid grid-cols-2 gap-2 mb-4">
                {/* IMAGEN ANTES */}
                <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] relative">
                  {uploadingInfo?.id === item.dbId && uploadingInfo?.type === 'imgAntes' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D10]/80 z-20"><Loader2 className="animate-spin text-[#5BC0BE]" size={24} /></div>
                  ) : (
                    <img src={item.imgAntes} alt="Antes" className="w-full h-full object-cover" loading="lazy" />
                  )}
                  <div className="absolute top-1 left-1 bg-black/60 px-2 py-0.5 rounded text-[8px] uppercase text-white font-medium z-10">Antes</div>
                  <label className="absolute inset-0 bg-black/60 flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 flex">
                    <ImageIcon size={20} className="text-white mb-1" />
                    <span className="text-[8px] uppercase text-white tracking-widest">Cambiar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, item.dbId, 'imgAntes')} />
                  </label>
                </div>

                {/* IMAGEN DESPUÉS */}
                <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] relative">
                  {uploadingInfo?.id === item.dbId && uploadingInfo?.type === 'imgDespues' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D10]/80 z-20"><Loader2 className="animate-spin text-[#5BC0BE]" size={24} /></div>
                  ) : (
                    <img src={item.imgDespues} alt="Después" className="w-full h-full object-cover" loading="lazy" />
                  )}
                  <div className="absolute top-1 left-1 bg-[#5BC0BE]/90 px-2 py-0.5 rounded text-[8px] uppercase text-[#090D10] font-bold z-10">Después</div>
                  <label className="absolute inset-0 bg-black/60 flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 flex">
                    <ImageIcon size={20} className="text-white mb-1" />
                    <span className="text-[8px] uppercase text-white tracking-widest">Cambiar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, item.dbId, 'imgDespues')} />
                  </label>
                </div>
              </div>

              {/* TEXTAREA PARA DESCRIPCIÓN EDITABLE */}
              <textarea
                id={`desc-${item.dbId}`}
                className="w-full flex-1 bg-[#090D10] border border-transparent hover:border-[#1F2E3A] focus:border-[#5BC0BE] p-2 text-[11px] text-white/70 rounded-lg h-24 resize-none outline-none custom-scrollbar mb-3 transition-all"
                defaultValue={item.desc}
                title="Editar Descripción"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => handleSaveText(item.dbId)}
                  disabled={savingId === item.dbId}
                  className="flex-1 bg-[#5BC0BE]/10 hover:bg-[#5BC0BE] text-[#5BC0BE] hover:text-[#090D10] py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-[9px] uppercase font-bold tracking-widest border border-[#5BC0BE]/30"
                >
                  {savingId === item.dbId ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Guardar
                </button>
                <button
                  onClick={() => handleDelete(item.dbId)}
                  className="px-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition-all border border-red-500/20"
                  title="Eliminar Tratamiento"
                >
                  <Trash2 size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}