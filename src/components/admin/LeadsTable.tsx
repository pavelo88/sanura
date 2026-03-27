"use client";

import React, { useState, useEffect } from 'react';
import { getFirestore } from '@/firebase';
import { collection, query, orderBy, limit, onSnapshot, doc, updateDoc } from 'firebase/firestore'; // SE ELIMINÓ offset
import { Loader2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function LeadsTable() {
  const db = getFirestore();
  const [page, setPage] = useState(0);
  const itemsPerPage = 8;
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // FIX: Se quitó offset() que no existe en el SDK modular de la forma en que se usaba.
    const leadsQuery = query(
      collection(db, 'leads'),
      orderBy('createdAt', 'desc'),
      limit(itemsPerPage * (page + 1)) // Traemos más leads a medida que avanzamos
    );

    const unsubscribe = onSnapshot(leadsQuery, (snapshot) => {
      const allLeads = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Paginar en memoria con los resultados obtenidos
      const start = page * itemsPerPage;
      const paginatedLeads = allLeads.slice(start, start + itemsPerPage);
      setLeads(paginatedLeads);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [db, page]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-white mb-2">Registro de Leads</h2>
        <p className="text-white/40 text-sm">Gestiona consultas de clientes potenciales</p>
      </div>

      {isLoading ? (
        <div className="py-20 flex flex-col items-center justify-center">
          <Loader2 className="animate-spin text-[#5BC0BE] mb-3" size={40} />
          <p className="text-white/60 text-sm">Cargando leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-[#121A21] border border-[#1F2E3A] rounded-2xl p-8 text-center">
          <p className="text-white/40 text-sm">No hay leads en esta página</p>
        </div>
      ) : (
        <>
          <div className="bg-[#121A21] border border-[#1F2E3A] rounded-2xl overflow-hidden shadow-lg w-full">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm min-w-[700px]">
                <thead className="bg-white/5 border-b border-[#1F2E3A]">
                  <tr>
                    <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium">Nombre</th>
                    <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium">Teléfono</th>
                    <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium">Interés</th>
                    <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium">Estado</th>
                    <th className="px-6 py-4 text-[10px] tracking-wide uppercase text-[#5BC0BE] font-medium text-center">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F2E3A]">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-serif text-white whitespace-nowrap">{lead.fullName}</td>
                      <td className="px-6 py-4 text-xs text-white/70 whitespace-nowrap">{lead.phone}</td>
                      <td className="px-6 py-4 text-xs uppercase text-white/60">
                        <span className="line-clamp-2" title={lead.message}>
                          {lead.treatmentInterest || lead.message?.substring(0, 40) || 'Sin mensaje'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={lead.status || 'SOLICITADO'}
                          onChange={e => updateStatus(lead.id, e.target.value)}
                          className="bg-[#090D10] border border-[#1F2E3A] px-3 py-2 text-xs rounded-lg text-white hover:border-[#5BC0BE]/50 focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] transition-colors outline-none"
                        >
                          <option value="SOLICITADO">Solicitado</option>
                          <option value="PENDIENTE">Pendiente</option>
                          <option value="ATENDIDO">Atendido</option>
                          <option value="CERRADO">Cerrado</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-lg bg-[#5BC0BE]/10 text-[#5BC0BE] hover:bg-[#5BC0BE] hover:text-[#090D10] transition-colors"
                          title="Contactar en WhatsApp"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="flex items-center gap-2 px-4 py-2 bg-[#121A21] border border-[#1F2E3A] rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#5BC0BE]/50 transition-colors"
            >
              <ChevronLeft size={16} />
              Anterior
            </button>
            <span className="text-white/40 text-sm font-medium">Página {page + 1}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={leads.length < itemsPerPage}
              className="flex items-center gap-2 px-4 py-2 bg-[#121A21] border border-[#1F2E3A] rounded-lg text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#5BC0BE]/50 transition-colors"
            >
              Siguiente
              <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}