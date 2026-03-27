
"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore, useCollection, useStorage } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Loader2, ShieldCheck, LogOut, Users, Edit, Image as ImageIcon, Save, Trash2, ExternalLink, Globe } from 'lucide-react';
import { serviciosData } from '@/lib/clinic-data';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'cms' | 'services'>('leads');

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
      <aside className="w-full md:w-64 bg-[#121A21] border-r border-[#1F2E3A] p-8 space-y-12">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl tracking-tighter uppercase">NVitality</h1>
          <p className="text-[8px] tracking-[0.4em] text-[#5BC0BE] uppercase font-bold">Consola v.3.0</p>
        </div>

        <nav className="space-y-4">
          <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'leads' ? 'bg-[#5BC0BE] text-[#090D10]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><Users size={18} /> Leads</button>
          <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'cms' ? 'bg-[#5BC0BE] text-[#090D10]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><Edit size={18} /> Global</button>
          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-all ${activeTab === 'services' ? 'bg-[#5BC0BE] text-[#090D10]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}><Globe size={18} /> Servicios</button>
        </nav>

        <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-white/20 hover:text-red-400 transition-colors uppercase font-bold pt-12 border-t border-[#1F2E3A] w-full"><LogOut size={16} /> Salir</button>
      </aside>

      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        {activeTab === 'leads' && <LeadsTable />}
        {activeTab === 'cms' && <CMSPanel />}
        {activeTab === 'services' && <ServicesManager />}
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
      <h2 className="font-serif text-4xl uppercase tracking-tighter">Registro de Leads</h2>
      {loading ? (
        <div className="py-20 flex flex-col items-center"><Loader2 className="animate-spin text-[#5BC0BE] mb-4" /> <p className="font-serif italic">Sincronizando...</p></div>
      ) : (
        <div className="bg-[#121A21] border border-[#1F2E3A] rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-6 text-[9px] tracking-[0.3em] uppercase text-[#5BC0BE]">Identidad</th>
                <th className="p-6 text-[9px] tracking-[0.3em] uppercase text-[#5BC0BE]">WhatsApp</th>
                <th className="p-6 text-[9px] tracking-[0.3em] uppercase text-[#5BC0BE]">Interés</th>
                <th className="p-6 text-[9px] tracking-[0.3em] uppercase text-[#5BC0BE]">Estado</th>
                <th className="p-6 text-[9px] tracking-[0.3em] uppercase text-[#5BC0BE]">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2E3A]">
              {leads?.map(lead => (
                <tr key={lead.id} className="hover:bg-white/[0.02]">
                  <td className="p-6 font-serif text-lg">{lead.fullName}</td>
                  <td className="p-6 text-xs">{lead.phone}</td>
                  <td className="p-6 text-[9px] uppercase tracking-widest">{lead.treatmentInterest || lead.message?.substring(0, 20)}</td>
                  <td className="p-6">
                    <select value={lead.status} onChange={e => updateStatus(lead.id, e.target.value)} className="bg-[#090D10] border border-[#1F2E3A] p-2 text-[9px] rounded-lg">
                      <option value="Solicitado">SOLICITADO</option>
                      <option value="Pendiente">PENDIENTE</option>
                      <option value="Atendido">ATENDIDO</option>
                      <option value="Cerrado">CERRADO</option>
                    </select>
                  </td>
                  <td className="p-6"><a href={`https://wa.me/${lead.phone.replace(/\+/g, '')}`} target="_blank" className="text-white/20 hover:text-white"><ExternalLink size={18} /></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function CMSPanel() {
  const db = getFirestore();
  const storage = useStorage();
  const [config, setConfig] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const snap = await getDoc(doc(db, 'settings', 'site-content'));
      if (snap.exists()) setConfig(snap.data());
    };
    fetch();
  }, [db]);

  const handleSave = async () => {
    setSaving(true);
    await setDoc(doc(db, 'settings', 'site-content'), config);
    setSaving(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (!e.target.files?.[0] || !storage) return;
    const file = e.target.files[0];
    const refPath = ref(storage, `site/${field}_${Date.now()}`);
    const snap = await uploadBytes(refPath, file);
    const url = await getDownloadURL(snap.ref);
    setConfig({ ...config, [field]: url });
  };

  if (!config) return <Loader2 className="animate-spin text-[#5BC0BE]" />;

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-4xl uppercase tracking-tighter">Control Editorial Global</h2>
        <button onClick={handleSave} disabled={saving} className="bg-[#5BC0BE] text-[#090D10] px-8 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-white disabled:opacity-50 flex items-center gap-2">
          {saving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />} Guardar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-[#121A21] p-8 rounded-3xl space-y-4">
          <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#5BC0BE] border-b border-white/10 pb-2">Hero / Portada</h3>
          <div className="space-y-4">
            <input value={config.heroTitle} onChange={e => setConfig({...config, heroTitle: e.target.value})} placeholder="Título Hero" className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-sm rounded-xl" />
            <textarea value={config.heroSubtitle} onChange={e => setConfig({...config, heroSubtitle: e.target.value})} placeholder="Slogan" className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-sm rounded-xl h-24" />
          </div>
        </section>

        <section className="bg-[#121A21] p-8 rounded-3xl space-y-4">
          <h3 className="text-[10px] tracking-[0.3em] uppercase text-[#5BC0BE] border-b border-white/10 pb-2">Directora Médica</h3>
          <div className="space-y-4">
            <input value={config.doctorTitle} onChange={e => setConfig({...config, doctorTitle: e.target.value})} placeholder="Nombre Doctora" className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-sm rounded-xl" />
            <textarea value={config.doctorQuote} onChange={e => setConfig({...config, doctorQuote: e.target.value})} placeholder="Cita / Frase" className="w-full bg-[#090D10] border border-[#1F2E3A] p-4 text-sm rounded-xl h-24" />
            <div className="aspect-video bg-[#090D10] rounded-xl overflow-hidden relative group border border-[#1F2E3A]">
              {config.doctorImage && <img src={config.doctorImage} className="w-full h-full object-cover" />}
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                <ImageIcon size={24} />
                <input type="file" className="hidden" onChange={e => handleUpload(e, 'doctorImage')} />
              </label>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ServicesManager() {
  const db = getFirestore();
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    // En un entorno real, cargaríamos esto de una colección 'services'
    // Por ahora, simulamos la edición de los servicios hardcoded
    setServicesData(serviciosData);
  }, []);

  return (
    <div className="space-y-12">
      <h2 className="font-serif text-4xl uppercase tracking-tighter">Editor de Servicios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesData.flatMap(cat => cat.items).map(item => (
          <div key={item.id} className="bg-[#121A21] p-6 rounded-2xl border border-[#1F2E3A] space-y-4">
            <h4 className="text-[10px] tracking-widest uppercase text-[#5BC0BE]">{item.name}</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-white/5 relative group">
                <img src={item.imgAntes} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] uppercase font-bold">Editar Antes</div>
              </div>
              <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-white/5 relative group">
                <img src={item.imgDespues} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] uppercase font-bold">Editar Después</div>
              </div>
            </div>
            <textarea className="w-full bg-[#090D10] border border-[#1F2E3A] p-3 text-[10px] rounded-lg h-20" defaultValue={item.desc} />
          </div>
        ))}
      </div>
    </div>
  );
}
