"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useStorage } from '@/firebase';
import { collection, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { serviciosData } from '@/lib/clinic-data';
import { ImageIcon, Loader2, UploadCloud, Database } from 'lucide-react';

export default function ServicesManager() {
  const db = getFirestore();
  const storage = useStorage();

  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [uploadingInfo, setUploadingInfo] = useState<{ id: string, type: 'imgAntes' | 'imgDespues' } | null>(null);

  // 1. Cargar servicios desde Firebase
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(collection(db, 'services'), (snapshot) => {
      const fetchedServices = snapshot.docs.map(doc => ({ dbId: doc.id, ...doc.data() }));
      setServices(fetchedServices);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  // 2. Función Mágica: Subir el catálogo local a Firebase la primera vez
  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      // Extraemos todos los tratamientos del archivo local
      const allTreatments = serviciosData.flatMap(cat =>
        cat.items.map(item => ({ ...item, categoryId: cat.id, categoryTitle: cat.title }))
      );

      // Los subimos a Firebase uno por uno
      for (const treatment of allTreatments) {
        await setDoc(doc(db, 'services', treatment.id), treatment);
      }
    } catch (error) {
      console.error("Error sincronizando catálogo:", error);
    } finally {
      setIsSeeding(false);
    }
  };

  // 3. Lógica para subir una nueva imagen a Firebase Storage y actualizar Firestore
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, docId: string, imageType: 'imgAntes' | 'imgDespues') => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    // Mostramos el loader en la imagen específica
    setUploadingInfo({ id: docId, type: imageType });

    try {
      // Creamos una referencia única en el Storage
      const storageRef = ref(storage, `treatments/${docId}_${imageType}_${Date.now()}`);

      // Subimos el archivo
      const snapshot = await uploadBytes(storageRef, file);

      // Obtenemos la URL pública
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Actualizamos el documento en Firestore
      await updateDoc(doc(db, 'services', docId), {
        [imageType]: downloadURL
      });

    } catch (error) {
      console.error("Error al subir imagen:", error);
    } finally {
      setUploadingInfo(null);
      // Limpiamos el input para permitir subir el mismo archivo de nuevo si hubo un error
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-8 relative min-h-[500px]">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-white mb-1">Gestor de Servicios</h2>
          <p className="text-white/40 text-sm">Visualización de {services.length} tratamientos en la nube</p>
        </div>
      </div>

      {/* ESTADO DE CARGA INICIAL */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-[#090D10]/80 backdrop-blur-sm flex flex-col items-center justify-center pt-20">
          <Loader2 className="animate-spin text-[#5BC0BE] mb-3" size={40} />
          <p className="text-[#5BC0BE] text-xs font-bold tracking-widest uppercase">Conectando al Catálogo N-Vitality...</p>
        </div>
      )}

      {/* ESTADO VACÍO: Botón para sincronizar la base de datos */}
      {!isLoading && services.length === 0 && (
        <div className="bg-[#121A21] border border-[#1F2E3A] rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-2xl mx-auto shadow-2xl">
          <Database size={48} className="text-[#5BC0BE]/50 mb-4" />
          <h3 className="font-serif text-2xl text-white mb-2 uppercase tracking-wide">Catálogo en la nube vacío</h3>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Actualmente no hay tratamientos registrados en tu base de datos de Firebase.
            Haz clic en el botón de abajo para importar todo tu catálogo local.
          </p>
          <button
            onClick={handleSeedDatabase}
            disabled={isSeeding}
            className="bg-[#5BC0BE] text-[#090D10] font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-xl shadow-lg hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
          >
            {isSeeding ? <><Loader2 className="animate-spin" size={20} /> Sincronizando Catálogo...</> : <><UploadCloud size={20} /> Sincronizar Catálogo Base</>}
          </button>
        </div>
      )}

      {/* GRILLA DE SERVICIOS */}
      {!isLoading && services.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((item: any) => (
            <div key={item.dbId} className="bg-[#121A21] p-5 rounded-xl border border-[#1F2E3A] hover:border-[#5BC0BE]/30 transition-all duration-300 group shadow-lg flex flex-col">
              <h4 className="text-[10px] tracking-widest uppercase text-[#5BC0BE] font-medium mb-3 h-8 line-clamp-2" title={item.name}>
                {item.name}
              </h4>

              <div className="grid grid-cols-2 gap-2 mb-4">

                {/* IMAGEN ANTES */}
                <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] group-hover:border-white/10 transition-colors relative">
                  {uploadingInfo?.id === item.dbId && uploadingInfo?.type === 'imgAntes' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D10]/80 z-20">
                      <Loader2 className="animate-spin text-[#5BC0BE]" size={24} />
                    </div>
                  ) : (
                    <img src={item.imgAntes} alt={`Antes - ${item.name}`} className="w-full h-full object-cover transition-transform duration-700" loading="lazy" />
                  )}
                  <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] uppercase text-white tracking-wider font-medium z-10">Antes</div>

                  {/* Botón flotante para editar foto Antes */}
                  <label className="absolute inset-0 bg-black/60 flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 flex">
                    <ImageIcon size={20} className="text-white mb-1" />
                    <span className="text-[8px] uppercase font-bold text-white tracking-widest">Cambiar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, item.dbId, 'imgAntes')} />
                  </label>
                </div>

                {/* IMAGEN DESPUÉS */}
                <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] group-hover:border-white/10 transition-colors relative">
                  {uploadingInfo?.id === item.dbId && uploadingInfo?.type === 'imgDespues' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#090D10]/80 z-20">
                      <Loader2 className="animate-spin text-[#5BC0BE]" size={24} />
                    </div>
                  ) : (
                    <img src={item.imgDespues} alt={`Después - ${item.name}`} className="w-full h-full object-cover transition-transform duration-700" loading="lazy" />
                  )}
                  <div className="absolute top-1 left-1 bg-[#5BC0BE]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] uppercase text-[#090D10] tracking-wider font-bold z-10">Después</div>

                  {/* Botón flotante para editar foto Después */}
                  <label className="absolute inset-0 bg-black/60 flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer z-10 flex">
                    <ImageIcon size={20} className="text-white mb-1" />
                    <span className="text-[8px] uppercase font-bold text-white tracking-widest">Cambiar</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, item.dbId, 'imgDespues')} />
                  </label>
                </div>
              </div>

              <textarea
                className="w-full flex-1 bg-[#090D10] border border-[#1F2E3A] p-3 text-[11px] text-white/70 rounded-lg h-24 resize-none focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] transition-colors outline-none custom-scrollbar"
                defaultValue={item.desc}
                readOnly
                title="La descripción se editará en otra actualización"
              />

              <div className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 text-white/40 text-[9px] uppercase tracking-widest font-medium border border-[#1F2E3A]">
                Pasa el mouse sobre las fotos para cambiar
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}