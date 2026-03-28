"use client";
import React, { useState, useEffect } from 'react';
import { getFirestore, useStorage } from '@/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Loader2, Save, Check, Image as ImageIcon, Plus, Trash2, AlertCircle } from 'lucide-react';

export default function ServicesManager({ activeCategoryId, hideHeader }: { activeCategoryId: string, hideHeader?: boolean }) {
  const db = getFirestore();
  const storage = useStorage();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const unsub = onSnapshot(collection(db, 'services'), (snap) => {
      setServices(snap.docs.map(d => ({ dbId: d.id, ...d.data() })));
      setIsLoading(false);
    });
    return () => unsub();
  }, [db]);

  const handleUpdate = async (id: string) => {
    const name = (document.getElementById(`name-${id}`) as HTMLInputElement).value;
    const desc = (document.getElementById(`desc-${id}`) as HTMLTextAreaElement).value;
    const quote = (document.getElementById(`quote-${id}`) as HTMLTextAreaElement).value; // <--- LEEMOS LA FRASE
    setSavingId(id);
    try {
      await updateDoc(doc(db, 'services', id), { name, desc, quote }); // <--- GUARDAMOS LA FRASE
      setTimeout(() => setSavingId(null), 1500);
    } catch (e) { setSavingId(null); }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, type: string) => {
    if (!e.target.files?.[0] || !storage) return;
    setUploading(`${id}-${type}`);
    const file = e.target.files[0];
    const path = ref(storage, `treatments/${id}_${type}_${Date.now()}`);
    try {
      const snap = await uploadBytes(path, file);
      const url = await getDownloadURL(snap.ref);
      await updateDoc(doc(db, 'services', id), { [type]: url });
    } catch (e) { console.error(e); }
    setUploading(null);
  };

  const handleCreateNew = async () => {
    try {
      await addDoc(collection(db, 'services'), {
        categoryId: activeCategoryId,
        name: "NUEVO PROTOCOLO",
        desc: "Descripción clínica del nuevo protocolo...",
        quote: "La excelencia es un hábito de rigor científico aplicado con precisión a la arquitectura facial.", // <--- FRASE POR DEFECTO AL CREAR
        imgAntes: "https://images.unsplash.com/photo-1615397323114-648c08126d40?q=80&w=800",
        imgDespues: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=800",
      });
    } catch (error) {
      console.error("Error al crear:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (deleteConfirmId !== id) {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
      return;
    }
    try {
      await deleteDoc(doc(db, 'services', id));
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const filteredItems = services.filter(s => s.categoryId === activeCategoryId);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-[#5BC0BE]" size={40} /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {!hideHeader && (
        <h2 className="font-serif text-4xl uppercase text-white tracking-tighter mb-8 border-b border-white/5 pb-4">
          Edición de Protocolos
        </h2>
      )}

      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreateNew}
          className="bg-white text-[#090D10] px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2 hover:bg-[#5BC0BE] transition-all shadow-lg"
        >
          <Plus size={16} /> Añadir Protocolo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div key={item.dbId} className="bg-[#121A21] p-8 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col gap-6 relative group">

            {/* BOTÓN ELIMINAR */}
            <button
              onClick={() => handleDelete(item.dbId)}
              className={`absolute top-6 right-6 p-2 rounded-full transition-all flex items-center gap-2 z-20 ${deleteConfirmId === item.dbId
                ? 'bg-red-500 text-white w-auto px-4 opacity-100'
                : 'bg-black/50 text-white/40 hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100'
                }`}
            >
              {deleteConfirmId === item.dbId ? (
                <><AlertCircle size={14} /> <span className="text-[9px] font-bold uppercase tracking-widest">¿Confirmar?</span></>
              ) : (
                <Trash2 size={16} />
              )}
            </button>

            <div className="space-y-2">
              <label className="text-[8px] uppercase font-black text-white/30 tracking-widest">Nombre Protocolo</label>
              <input id={`name-${item.dbId}`} defaultValue={item.name} className="w-full bg-black/40 border border-white/10 p-4 rounded-2xl text-[#5BC0BE] font-serif text-xl outline-none focus:border-[#5BC0BE]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {['imgAntes', 'imgDespues'].map(type => (
                <div key={type} className="space-y-2">
                  <span className="text-[7px] uppercase font-black text-white/20 block text-center">{type === 'imgAntes' ? 'Antes' : 'Después'}</span>
                  <div className="aspect-square bg-black rounded-3xl overflow-hidden relative border border-white/5 group/img">
                    {uploading === `${item.dbId}-${type}` ? <div className="absolute inset-0 flex items-center justify-center bg-black/60"><Loader2 className="animate-spin text-[#5BC0BE]" /></div> : <img src={item[type]} className="w-full h-full object-cover opacity-60 group-hover/img:opacity-100 transition-all" />}
                    <label className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-[#5BC0BE]/20 backdrop-blur-sm cursor-pointer transition-all">
                      <ImageIcon className="text-white" size={24} />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleUpload(e, item.dbId, type)} />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[8px] uppercase font-black text-white/30 tracking-widest">Análisis / Descripción</label>
              <textarea id={`desc-${item.dbId}`} defaultValue={item.desc} className="w-full bg-black/40 border border-white/10 p-5 rounded-2xl text-white/60 text-xs h-28 resize-none outline-none focus:border-[#5BC0BE]" />
            </div>

            {/* NUEVO CAMPO: LA FRASE DEL MODAL */}
            <div className="space-y-2">
              <label className="text-[8px] uppercase font-black text-[#5BC0BE] tracking-widest">Frase del Modal</label>
              <textarea id={`quote-${item.dbId}`} defaultValue={item.quote || "La excelencia es un hábito de rigor científico aplicado con precisión a la arquitectura facial."} className="w-full bg-black/40 border border-[#5BC0BE]/30 p-4 rounded-xl text-[#5BC0BE] text-xs italic font-serif h-20 resize-none outline-none focus:border-[#5BC0BE]" />
            </div>

            <button onClick={() => handleUpdate(item.dbId)} className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] transition-all shadow-xl mt-2 ${savingId === item.dbId ? 'bg-green-500 text-white' : 'bg-white/5 text-[#5BC0BE] border border-[#5BC0BE]/20 hover:bg-[#5BC0BE] hover:text-[#090D10]'}`}>
              {savingId === item.dbId ? <Check size={18} /> : <Save size={18} />}
              {savingId === item.dbId ? 'Sincronizado' : 'Actualizar Protocolo'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}