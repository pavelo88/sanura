"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Loader2, LogOut, Users, Edit, Globe, Menu, X,
  ChevronRight, Save, Filter, CheckCircle2
} from 'lucide-react';
import LeadsTable from '@/components/admin/LeadsTable';
import CMSPanel from '@/components/admin/CMSPanel';
import ServicesManager from '@/components/admin/ServicesManager';
import { serviciosData } from '@/lib/clinic-data';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'cms' | 'services'>('leads');
  const [activeServiceCat, setActiveServiceCat] = useState(serviciosData[0].id);
  const [leadsFilter, setLeadsFilter] = useState('TODOS'); // Estado del filtro para Leads
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const STATUSES = ['SOLICITADO', 'EN GESTIÓN', 'CITA AGENDADA', 'VENDIDO', 'DESCARTADO'];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) router.push('/admin/login');
        else setIsLoading(false);
      } catch (err) { router.push('/admin/login'); }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const triggerGlobalSave = () => {
    window.dispatchEvent(new CustomEvent('cms-save-trigger'));
  };

  if (isLoading) return (
    <div className="h-screen bg-[#090D10] flex items-center justify-center">
      <Loader2 className="animate-spin text-[#5BC0BE]" size={48} />
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#090D10] text-white flex overflow-hidden font-sans">

      {/* 1. SIDEBAR FIJO IZQUIERDA [cite: 50, 592-593] */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#121A21] border-r border-[#1F2E3A] flex flex-col h-full transform transition-transform duration-500 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl'}`}>
        <div className="p-10 border-b border-[#1F2E3A]/50 flex-shrink-0">
          <h2 className="font-serif text-3xl uppercase text-white leading-none">SANURA</h2>
          <p className="text-[9px] tracking-[0.5em] text-[#5BC0BE] uppercase font-black opacity-80 mt-2">Consola v4.2</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
          <button onClick={() => setActiveTab('leads')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'leads' ? 'bg-[#5BC0BE] text-[#090D10] shadow-lg shadow-[#5BC0BE]/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <Users size={18} /> Gestión Leads
          </button>

          <button onClick={() => setActiveTab('cms')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'cms' ? 'bg-[#5BC0BE] text-[#090D10] shadow-lg shadow-[#5BC0BE]/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <Edit size={18} /> Estructura Global
          </button>

          <button onClick={() => setActiveTab('services')} className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'services' ? 'bg-[#5BC0BE] text-[#090D10] shadow-lg shadow-[#5BC0BE]/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
            <Globe size={18} /> Servicios VIP
          </button>

          {activeTab === 'services' && (
            <div className="mt-8 pt-6 border-t border-white/5 space-y-1 animate-in fade-in slide-in-from-top-4">
              <p className="text-[8px] uppercase font-black text-[#5BC0BE] px-6 mb-3 tracking-[0.3em]">Curaduría</p>
              {serviciosData.map(cat => (
                <button key={cat.id} onClick={() => setActiveServiceCat(cat.id)} className={`w-full flex items-center justify-between px-6 py-3.5 rounded-lg text-[9px] font-bold uppercase transition-all ${activeServiceCat === cat.id ? 'text-[#5BC0BE] bg-[#5BC0BE]/10 border-l-2 border-[#5BC0BE]' : 'text-white/20 hover:text-white/60 hover:bg-white/5'}`}>
                  <span className="truncate text-left">{cat.title}</span>
                  {activeServiceCat === cat.id && <ChevronRight size={12} />}
                </button>
              ))}
            </div>
          )}
        </nav>

        <div className="p-6 border-t border-[#1F2E3A]/50 flex-shrink-0">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 px-6 py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 hover:text-red-400 transition-all">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* 2. CONTENIDO PRINCIPAL CON CABECERA FIJA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">

        <header className="h-24 md:h-32 bg-[#090D10] border-b border-white/5 flex items-center justify-between px-6 md:px-14 flex-shrink-0 z-40">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-white">
              {activeTab === 'leads' && "Registro de Leads"}
              {activeTab === 'cms' && "Control Editorial Global"}
              {activeTab === 'services' && "Edición de Protocolos"}
            </h1>
            <p className="text-[9px] uppercase font-black text-[#5BC0BE] tracking-[0.4em] opacity-60">Admin Panel / SANURA</p>
          </div>

          <div className="flex items-center gap-4">
            {/* FILTRO DE LEADS EN LA CABECERA FIJA */}
            {activeTab === 'leads' && (
              <div className="flex items-center gap-2 bg-[#121A21] border border-white/10 p-2 rounded-xl">
                <Filter size={16} className="text-[#5BC0BE] ml-2" />
                <select
                  value={leadsFilter}
                  onChange={(e) => setLeadsFilter(e.target.value)}
                  className="bg-transparent text-[10px] text-white uppercase font-bold outline-none border-none pr-4 cursor-pointer focus:ring-0"
                >
                  <option value="TODOS" className="bg-[#090D10]">TODOS LOS ESTADOS</option>
                  {STATUSES.map(s => <option key={s} value={s} className="bg-[#090D10]">{s}</option>)}
                </select>
              </div>
            )}

            {/* BOTÓN GUARDAR CMS EN LA CABECERA FIJA */}
            {activeTab === 'cms' && (
              <button
                onClick={triggerGlobalSave}
                className="bg-[#5BC0BE] text-[#090D10] px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 hover:bg-white transition-all shadow-lg active:scale-95"
              >
                <Save size={16} /> Guardar Todo
              </button>
            )}

            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-3 bg-[#121A21] border border-[#1F2E3A] rounded-xl text-[#5BC0BE]">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        {/* 3. CUERPO CON SCROLL */}
        <main className="flex-1 overflow-y-auto p-6 md:p-14 custom-scrollbar bg-[#090D10]">
          <div className="max-w-7xl mx-auto">

            <div className={activeTab === 'leads' ? 'block' : 'hidden'}>
              <LeadsTable hideHeader={true} externalFilter={leadsFilter} />
            </div>

            <div className={activeTab === 'cms' ? 'block' : 'hidden'}>
              <CMSPanel hideHeader={true} />
            </div>

            <div className={activeTab === 'services' ? 'block' : 'hidden'}>
              <ServicesManager activeCategoryId={activeServiceCat} hideHeader={true} />
            </div>

            <footer className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-[0.4em] font-medium text-white/20">
              <p>© 2026 SANURA Clinic Operations</p>
              <div className="flex gap-6">
                <span className="text-[#5BC0BE]/40">Status: Live</span>
                <span>Uptime: 99.9%</span>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-[60]" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}