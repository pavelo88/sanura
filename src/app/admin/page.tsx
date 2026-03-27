
"use client";

import React, { useState } from 'react';
import { getFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Loader2, ShieldCheck, LogOut } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (password === adminPass) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Clave de acceso incorrecta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090D10] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="w-full max-w-md bg-[#121A21] border border-[#1F2E3A] p-12 shadow-2xl text-center">
          <ShieldCheck size={48} className="text-[#5BC0BE] mx-auto mb-8" />
          <h1 className="font-serif text-3xl text-white uppercase tracking-tighter mb-8">Protocolo Admin</h1>
          <input 
            type="password" 
            placeholder="CLAVE DE ACCESO VIP"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-[#090D10] border border-[#1F2E3A] p-6 text-white text-xs tracking-widest outline-none focus:border-[#5BC0BE] mb-6 text-center font-bold"
          />
          {error && <p className="text-red-400 text-[10px] uppercase tracking-widest mb-6">{error}</p>}
          <button className="w-full bg-[#5BC0BE] text-[#090D10] py-5 text-xs font-bold uppercase tracking-[0.3em] hover:bg-white transition-colors">
            Acceder a Consola
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const db = getFirestore();
  const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
  const { data: leads, loading } = useCollection(leadsQuery);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
    } catch (e) {
      console.error("Error al actualizar estado:", e);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D10] text-white p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-16 border-b border-[#1F2E3A] pb-8">
          <div>
            <h1 className="font-serif text-4xl uppercase tracking-tighter mb-2">Gestión de Pacientes</h1>
            <p className="text-[10px] tracking-[0.5em] text-[#5BC0BE] uppercase font-bold">Consola N-Vitality v2.6</p>
          </div>
          <button onClick={onLogout} className="flex items-center gap-3 text-xs tracking-widest text-white/40 hover:text-white transition-colors uppercase">
            <LogOut size={16} /> Salir
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#5BC0BE] mb-4" size={40} />
            <p className="font-serif italic text-xl">Sincronizando base de datos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {leads?.map(lead => (
              <div key={lead.id} className="bg-[#121A21] border border-[#1F2E3A] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group hover:border-[#5BC0BE] transition-colors">
                <div className="space-y-2">
                  <span className="text-[8px] tracking-[0.4em] text-[#5BC0BE] uppercase font-bold">ID: {lead.id.substring(0, 8)}</span>
                  <h3 className="font-serif text-2xl uppercase tracking-widest">{lead.fullName}</h3>
                  <div className="flex flex-wrap gap-6 text-[10px] tracking-widest text-white/40 uppercase">
                    <span><strong>Interés:</strong> {lead.treatmentInterest || 'No especificado'}</span>
                    <span><strong>WhatsApp:</strong> {lead.phone}</span>
                    <span><strong>Fecha:</strong> {lead.createdAt?.toDate().toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                  <select 
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className={`bg-[#090D10] border p-4 text-[10px] tracking-widest font-bold uppercase outline-none transition-colors w-full md:w-48
                      ${lead.status === 'Solicitado' ? 'border-red-500/50 text-red-400' : 
                        lead.status === 'Pendiente' ? 'border-yellow-500/50 text-yellow-400' : 
                        lead.status === 'Atendido' ? 'border-blue-500/50 text-blue-400' : 'border-green-500/50 text-green-400'}`}
                  >
                    <option value="Solicitado">SOLICITADO</option>
                    <option value="Pendiente">PENDIENTE</option>
                    <option value="Atendido">ATENDIDO</option>
                    <option value="Cerrado">CERRADO</option>
                  </select>
                </div>
              </div>
            ))}
            {leads?.length === 0 && (
              <div className="text-center py-20 border border-dashed border-[#1F2E3A]">
                <p className="font-serif italic text-white/40 text-xl">No hay solicitudes registradas.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
