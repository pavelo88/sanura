"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { getFirestore } from '@/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { Loader2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

// Aceptamos el filtro desde el AdminPage
export default function LeadsTable({ 
  externalFilter = 'TODOS',
  hideHeader = false 
}: { 
  externalFilter?: string,
  hideHeader?: boolean 
}) {
  const db = getFirestore();
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const [allLeads, setAllLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const STATUSES = ['SOLICITADO', 'EN GESTIÓN', 'CITA AGENDADA', 'VENDIDO', 'DESCARTADO'];

  useEffect(() => {
    setIsLoading(true);
    const leadsQuery = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(100));

    const unsubscribe = onSnapshot(leadsQuery, (snapshot) => {
      const fetchedLeads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllLeads(fetchedLeads);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [db]);

  // Usamos externalFilter en lugar de un estado local
  const filteredLeads = useMemo(() => {
    if (externalFilter === 'TODOS') return allLeads;
    return allLeads.filter(lead => lead.status === externalFilter);
  }, [allLeads, externalFilter]);

  const paginatedLeads = useMemo(() => {
    const start = page * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, page]);

  useEffect(() => {
    setPage(0);
  }, [externalFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#121A21] border border-[#1F2E3A] rounded-2xl overflow-hidden shadow-lg w-full relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#121A21]/80 backdrop-blur-sm flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-[#5BC0BE] mb-3" size={40} />
            <p className="text-[#5BC0BE] text-xs font-bold tracking-widest uppercase">Sincronizando Base de Datos...</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[800px]">
            <thead className="bg-white/5 border-b border-[#1F2E3A]">
              <tr>
                <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium w-1/5">Nombre</th>
                <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium w-1/6">Teléfono</th>
                <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium w-1/3">Interés / Mensaje</th>
                <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium w-1/6">Estado</th>
                <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2E3A]">
              {!isLoading && paginatedLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-white/40 text-sm uppercase tracking-widest">
                    No hay leads registrados aún.
                  </td>
                </tr>
              ) : (
                paginatedLeads.map((lead: any) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-serif text-white whitespace-nowrap">{lead.fullName}</td>
                    <td className="px-6 py-4 text-xs text-white/70 whitespace-nowrap">{lead.phone}</td>
                    <td className="px-6 py-4 text-xs text-white/60">
                      <span className="line-clamp-2" title={lead.message}>
                        {lead.message || 'Sin mensaje'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status || 'SOLICITADO'}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        className={`bg-[#090D10] border border-[#1F2E3A] px-3 py-2 text-[10px] uppercase font-bold tracking-wider rounded-lg text-white hover:border-[#5BC0BE]/50 focus:border-[#5BC0BE] outline-none transition-colors
                          ${lead.status === 'VENDIDO' ? 'text-green-400' : ''}
                          ${lead.status === 'DESCARTADO' ? 'text-red-400' : ''}
                        `}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center whitespace-nowrap">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-[#5BC0BE]/10 text-[#5BC0BE] hover:bg-[#5BC0BE] hover:text-[#090D10] transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0 || isLoading} className="flex items-center gap-2 px-4 py-2 bg-[#121A21] border border-[#1F2E3A] rounded-lg text-sm text-white disabled:opacity-50">
          <ChevronLeft size={16} /> Anterior
        </button>
        <span className="text-[#5BC0BE] text-xs font-bold tracking-widest uppercase">
          Página {page + 1} de {Math.max(1, Math.ceil(filteredLeads.length / itemsPerPage))}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={(page + 1) * itemsPerPage >= filteredLeads.length || isLoading} className="flex items-center gap-2 px-4 py-2 bg-[#121A21] border border-[#1F2E3A] rounded-lg text-sm text-white disabled:opacity-50">
          Siguiente <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}