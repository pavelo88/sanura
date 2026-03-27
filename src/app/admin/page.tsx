
"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useCollection, useStorage } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Loader2, ShieldCheck, LogOut, Users, Edit, Image as ImageIcon, Save, Trash2, ExternalLink } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'cms'>('leads');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Clave de acceso incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D10] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-[#121A21] border border-[#1F2E3A] p-12 shadow-2xl text-center rounded-3xl">
          <ShieldCheck size={48} className="text-[#5BC0BE] mx-auto mb-8" />
          <h1 className="font-serif text-3xl text-white uppercase tracking-tighter mb-8">Protocolo Admin</h1>
          <input 
            type="password" 
            placeholder="CLAVE DE ACCESO VIP"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#090D10] border border-[#1F2E3A] p-6 text-white text-xs tracking-widest outline-none focus:border-[#5BC0BE] mb-6 text-center font-bold rounded-xl"
          />
          {error && <p className="text-red-400 text-[10px] uppercase tracking-widest mb-6 font-bold">{error}</p>}
          <button className="w-full bg-[#5BC0BE] text-[#090D10] py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-all rounded-xl shadow-lg">
            Acceder a Consola
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D10] text-white flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#121A21] border-r border-[#1F2E3A] p-8 space-y-12">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl tracking-tighter uppercase">NVitality</h1>
          <p className="text-[8px] tracking-[0.4em] text-[#5BC0BE] uppercase font-bold">Consola v.3.0</p>
        </div>

        <nav className="space-y-4">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'leads' ? 'bg-[#5BC0BE] text-[#090D10]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} /> Solicitudes
          </button>
          <button 
            onClick={() => setActiveTab('cms')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'cms' ? 'bg-[#5BC0BE] text-[#090D10]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
          >
            <Edit size={18} /> Contenido
          </button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-white/20 hover:text-red-400 transition-colors uppercase font-bold pt-12 border-t border-[#1F2E3A] w-full"
        >
          <LogOut size={16} /> Cerrar Sesión
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {activeTab === 'leads' ? <LeadsTable /> : <CMSPanel />}
      </main>
    </div>
  );
}

function LeadsTable() {
  const db = getFirestore();
  const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  const { data: leads, loading } = useCollection(leadsQuery);

  const updateStatus = async (id: string, newStatus: string) => {
    await updateDoc(doc(db, 'leads', id), { status: newStatus });
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-4xl uppercase tracking-tighter mb-2">Registro VIP</h2>
          <p className="text-xs tracking-widest text-white/40 uppercase">Gestión de pacientes y valoraciones</p>
        </div>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center justify-center opacity-50">
          <Loader2 className="animate-spin text-[#5BC0BE] mb-6" size={40} />
          <p className="font-serif italic text-xl">Sincronizando archivo...</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#121A21] border border-[#1F2E3A] rounded-3xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F2E3A] bg-white/5">
                <th className="p-8 text-[10px] tracking-[0.4em] uppercase font-bold text-[#5BC0BE]">Identidad</th>
                <th className="p-8 text-[10px] tracking-[0.4em] uppercase font-bold text-[#5BC0BE]">WhatsApp</th>
                <th className="p-8 text-[10px] tracking-[0.4em] uppercase font-bold text-[#5BC0BE]">Protocolo</th>
                <th className="p-8 text-[10px] tracking-[0.4em] uppercase font-bold text-[#5BC0BE]">Estado</th>
                <th className="p-8 text-[10px] tracking-[0.4em] uppercase font-bold text-[#5BC0BE]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2E3A]">
              {leads?.map(lead => (
                <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-8">
                    <div className="space-y-1">
                      <p className="font-serif text-lg text-white group-hover:text-[#5BC0BE] transition-colors">{lead.fullName}</p>
                      <p className="text-[9px] text-white/20 tracking-widest uppercase">ID: {lead.id.substring(0,8)}</p>
                    </div>
                  </td>
                  <td className="p-8 text-xs tracking-widest text-white/60">{lead.phone}</td>
                  <td className="p-8">
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] tracking-widest text-[#5BC0BE] uppercase font-bold">
                      {lead.treatmentInterest || 'Valoración Gral'}
                    </span>
                  </td>
                  <td className="p-8">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value)}
                      className={`bg-[#090D10] border p-3 rounded-lg text-[9px] tracking-widest font-bold uppercase outline-none transition-all
                        ${lead.status === 'Solicitado' ? 'border-red-500/30 text-red-400' : 
                          lead.status === 'Pendiente' ? 'border-yellow-500/30 text-yellow-400' : 
                          lead.status === 'Atendido' ? 'border-blue-500/30 text-blue-400' : 'border-green-500/30 text-green-400'}`}
                    >
                      <option value="Solicitado">SOLICITADO</option>
                      <option value="Pendiente">PENDIENTE</option>
                      <option value="Atendido">ATENDIDO</option>
                      <option value="Cerrado">CERRADO</option>
                    </select>
                  </td>
                  <td className="p-8">
                    <a href={`https://wa.me/${lead.phone.replace(/\+/g, '')}`} target="_blank" className="text-white/20 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads?.length === 0 && (
            <div className="p-20 text-center">
              <p className="font-serif italic text-white/20 text-xl">Sin solicitudes registradas.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CMSPanel() {
  const db = getFirestore();
  const storage = useStorage();
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const docSnap = await getDoc(doc(db, 'settings', 'site-content'));
      if (docSnap.exists()) {
        setConfig(docSnap.data());
      } else {
        setConfig({
          heroTitle: "ALTA ESTÉTICA",
          heroSubtitle: "El rigor científico se encuentra con la alta costura.",
          doctorTitle: "DRA. NATALIA VITALI",
          doctorQuote: "La estética no es una cuestión de vanidad, sino una arquitectura de la autoestima.",
          doctorImage: ""
        });
      }
      setLoading(false);
    };
    fetchConfig();
  }, [db]);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, 'settings', 'site-content'), config);
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files?.[0] || !storage) return;
    const file = e.target.files[0];
    const storageRef = ref(storage, `site/${field}_${Date.now()}`);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setConfig({ ...config, [field]: url });
    } catch (err) {
      console.error("Error al subir imagen:", err);
    }
  };

  if (loading) return <div className="animate-pulse text-[#5BC0BE] font-serif italic text-xl">Cargando CMS...</div>;

  return (
    <div className="space-y-12 max-w-4xl">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="font-serif text-4xl uppercase tracking-tighter mb-2">Control Editorial</h2>
          <p className="text-xs tracking-widest text-white/40 uppercase">Actualización de narrativa y multimedia</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#5BC0BE] text-[#090D10] px-10 py-4 rounded-xl text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />} 
          Guardar Cambios
        </button>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {/* Seccion Hero */}
        <section className="bg-[#121A21] border border-[#1F2E3A] p-10 rounded-3xl space-y-8">
          <div className="flex items-center gap-4 text-[#5BC0BE] border-b border-[#1F2E3A] pb-4">
            <ImageIcon size={20} />
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase">Portada (Hero)</h3>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.4em] uppercase text-white/40">Título Principal</label>
              <input 
                type="text" 
                value={config.heroTitle}
                onChange={e => setConfig({...config, heroTitle: e.target.value})}
                className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-white text-sm outline-none focus:border-[#5BC0BE] rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] tracking-[0.4em] uppercase text-white/40">Slogan</label>
              <textarea 
                value={config.heroSubtitle}
                onChange={e => setConfig({...config, heroSubtitle: e.target.value})}
                className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-white text-sm outline-none focus:border-[#5BC0BE] rounded-xl h-24 resize-none"
              />
            </div>
          </div>
        </section>

        {/* Seccion Doctora */}
        <section className="bg-[#121A21] border border-[#1F2E3A] p-10 rounded-3xl space-y-8">
          <div className="flex items-center gap-4 text-[#5BC0BE] border-b border-[#1F2E3A] pb-4">
            <ImageIcon size={20} />
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase">Directora Médica</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase text-white/40">Nombre</label>
                <input 
                  type="text" 
                  value={config.doctorTitle}
                  onChange={e => setConfig({...config, doctorTitle: e.target.value})}
                  className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-white text-sm outline-none focus:border-[#5BC0BE] rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] tracking-[0.4em] uppercase text-white/40">Cita / Frase</label>
                <textarea 
                  value={config.doctorQuote}
                  onChange={e => setConfig({...config, doctorQuote: e.target.value})}
                  className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-white text-sm outline-none focus:border-[#5BC0BE] rounded-xl h-32 resize-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-[9px] tracking-[0.4em] uppercase text-white/40">Imagen Retrato</label>
              <div className="aspect-[3/4] bg-[#090D10] border border-dashed border-[#1F2E3A] rounded-2xl overflow-hidden relative group">
                {config.doctorImage ? (
                  <img src={config.doctorImage} className="w-full h-full object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <label className="cursor-pointer bg-white text-black p-3 rounded-full hover:scale-110 transition-transform">
                    <ImageIcon size={20} />
                    <input type="file" className="hidden" onChange={e => handleImageUpload(e, 'doctorImage')} />
                  </label>
                  <button 
                    onClick={() => setConfig({...config, doctorImage: ''})}
                    className="bg-red-500 text-white p-3 rounded-full hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <input 
                type="text" 
                placeholder="O pegar URL aquí..."
                value={config.doctorImage}
                onChange={e => setConfig({...config, doctorImage: e.target.value})}
                className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-white text-[10px] outline-none focus:border-[#5BC0BE] rounded-xl"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
