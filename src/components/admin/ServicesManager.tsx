"use client";

import React, { useState } from 'react';
import { serviciosData } from '@/lib/clinic-data';
import { ImageIcon } from 'lucide-react';

export default function ServicesManager() {
  const [services] = useState(serviciosData);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl md:text-4xl uppercase tracking-tight text-white mb-1">Gestor de Servicios</h2>
        <p className="text-white/40 text-sm">Visualización de {services.flatMap((c: any) => c.items).length} tratamientos estéticos y médicos</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.flatMap((cat: any) => cat.items).map((item: any) => (
          <div key={item.id} className="bg-[#121A21] p-5 rounded-xl border border-[#1F2E3A] hover:border-[#5BC0BE]/30 transition-all duration-300 group shadow-lg">
            <h4 className="text-[10px] tracking-widest uppercase text-[#5BC0BE] font-medium mb-3 h-8 line-clamp-2" title={item.name}>
              {item.name}
            </h4>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] group-hover:border-white/10 transition-colors relative">
                <img 
                  src={item.imgAntes} 
                  alt={`Antes - ${item.name}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-1 left-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] uppercase text-white tracking-wider font-medium">
                  Antes
                </div>
              </div>
              <div className="aspect-square bg-[#090D10] rounded-lg overflow-hidden border border-[#1F2E3A] group-hover:border-white/10 transition-colors relative">
                <img 
                  src={item.imgDespues} 
                  alt={`Después - ${item.name}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-1 left-1 bg-[#5BC0BE]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] uppercase text-[#090D10] tracking-wider font-bold">
                  Después
                </div>
              </div>
            </div>
            
            <textarea 
              className="w-full bg-[#090D10] border border-[#1F2E3A] p-3 text-[11px] text-white/70 rounded-lg h-24 resize-none focus:border-[#5BC0BE] focus:ring-1 focus:ring-[#5BC0BE] transition-colors outline-none custom-scrollbar" 
              defaultValue={item.desc}
              readOnly
              title="Descripción del tratamiento"
            />
            
            <button className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-medium border border-[#1F2E3A]">
              <ImageIcon size={14} />
              Modificar Imágenes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
