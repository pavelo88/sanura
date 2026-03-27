"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Users, Edit, Globe, Menu, X } from 'lucide-react';
import LeadsTable from '@/components/admin/LeadsTable';
import CMSPanel from '@/components/admin/CMSPanel';
import ServicesManager from '@/components/admin/ServicesManager';

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'leads' | 'cms' | 'services'>('leads');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // Verificar sesión al montar (doble validación cliente-side por si el middleware falla o para estado de UI)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        if (!res.ok) {
          router.push('/admin/login');
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Auth check failed');
        router.push('/admin/login');
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      console.error('Logout error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#090D10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-[#5BC0BE]" size={48} />
          <p className="text-white/60 font-sans text-sm tracking-widest uppercase">Validando Acceso...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D10] text-white flex flex-col lg:flex-row font-sans overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#121A21] border-b border-[#1F2E3A] p-5 sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="font-serif text-xl tracking-tighter uppercase leading-none">NVitality</h1>
          <span className="text-[8px] tracking-[0.3em] text-[#5BC0BE] font-bold uppercase mt-1">Admin Central</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-3 bg-[#090D10] border border-[#1F2E3A] rounded-xl text-[#5BC0BE] active:scale-90 transition-transform shadow-inner"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#121A21] border-r border-[#1F2E3A] flex flex-col transform transition-transform duration-500 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full shadow-2xl shadow-black/50'}`}>
        <div className="p-10 space-y-2 border-b border-[#1F2E3A]/50">
          <h2 className="font-serif text-3xl tracking-tighter uppercase text-white leading-none">NVitality</h2>
          <p className="text-[9px] tracking-[0.5em] text-[#5BC0BE] uppercase font-black opacity-80">Consola v4.2</p>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-4">
          {[
            { id: 'leads', label: 'Gestión Leads', icon: Users },
            { id: 'cms', label: 'Estructura Global', icon: Edit },
            { id: 'services', label: 'Servicios VIP', icon: Globe },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group ${
                activeTab === tab.id
                  ? 'bg-[#5BC0BE] text-[#090D10] shadow-lg shadow-[#5BC0BE]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#1F2E3A]'
              }`}
            >
              <tab.icon size={18} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} transition-opacity`} />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-[#090D10]/30"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-[#1F2E3A]/50 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all border border-transparent hover:border-red-400/20"
          >
            <LogOut size={16} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#090D10] p-6 md:p-10 lg:p-14 custom-scrollbar">
        <div className="max-w-7xl mx-auto animate-fade-in relative">
          {activeTab === 'leads' && <LeadsTable />}
          {activeTab === 'cms' && <CMSPanel />}
          {activeTab === 'services' && <ServicesManager />}
          
          <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.4em] font-medium text-white/20">
            <p>© 2026 NVitality Clinic Operations</p>
            <div className="flex gap-6">
              <span className="text-[#5BC0BE]/40">Status: Encriptado</span>
              <span>Uptime: 99.9%</span>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Navigation Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm lg:hidden z-40 transition-opacity duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
