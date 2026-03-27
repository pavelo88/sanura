"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redirigir al dashboard principal del admin
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al autenticar');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090D10] to-[#121A21] flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="bg-[#121A21] border border-[#1F2E3A] p-10 md:p-14 shadow-2xl text-center rounded-3xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#5BC0BE]/50 to-transparent"></div>
          
          <div className="flex justify-center">
            <div className="p-4 bg-[#5BC0BE]/10 rounded-2xl border border-[#5BC0BE]/20 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck size={56} className="text-[#5BC0BE]" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="font-serif text-3xl md:text-4xl text-white uppercase tracking-tight font-light">Protocolo Admin</h1>
            <p className="text-[#5BC0BE] text-[10px] tracking-[0.4em] uppercase font-bold opacity-70">N-VITALITY SECURITY v4.2</p>
          </div>

          <div className="space-y-4">
            <div className="relative group/input">
              <input 
                type="password" 
                placeholder="CLAVE DE ACCESO REQUERIDA"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                required
                disabled={isSubmitting}
                className="w-full bg-[#090D10] border border-[#1F2E3A] hover:border-[#5BC0BE]/30 focus:border-[#5BC0BE] p-5 text-white text-center text-xs tracking-[0.3em] font-bold outline-none transition-all rounded-xl placeholder:text-white/10 disabled:opacity-50"
              />
            </div>
            
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-400 text-[10px] uppercase font-bold tracking-widest bg-red-400/5 border border-red-400/20 py-3 rounded-lg">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5BC0BE] hover:bg-white text-[#090D10] py-4 text-xs font-bold uppercase tracking-[0.3em] rounded-xl transition-all shadow-lg hover:shadow-[#5BC0BE]/20 active:scale-95 flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? 'Verificando...' : 'Acceder a la Consola'}
          </button>
          
          <p className="text-[9px] text-white/20 tracking-widest uppercase font-medium">Conexión cifrada punto a punto</p>
        </div>
      </form>
    </div>
  );
}
