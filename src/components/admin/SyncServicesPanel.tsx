"use client";

import React, { useState } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';
import { serviciosData } from '@/lib/clinic-data';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SyncServicesPanel() {
  const firebase = useFirebase();
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({ created: 0, updated: 0, total: 0 });

  const handleSync = async () => {
    try {
      setIsSyncing(true);
      setStatus('syncing');
      setMessage('Iniciando sincronización...');
      setStats({ created: 0, updated: 0, total: 0 });
      setProgress(0);

      if (!firebase?.firestore) throw new Error('Firebase no está disponible');

      const db = firebase.firestore;
      let created = 0;
      let updated = 0;
      let total = 0;

      // Iterar sobre todas las categorías
      for (const category of serviciosData) {
        for (const treatment of category.items) {
          total++;

          try {
            // Buscar si existe
            const servicesRef = collection(db, 'services');
            const q = query(servicesRef, where('id', '==', treatment.id));
            const querySnapshot = await getDocs(q);

            const serviceData = {
              id: treatment.id,
              categoryId: category.id,
              name: treatment.name,
              desc: treatment.desc,
              imgAntes: treatment.imgAntes,
              imgDespues: treatment.imgDespues,
              nivelDolor: treatment.nivelDolor,
              anestesia: treatment.anestesia,
              resultados: treatment.resultados,
              quote: treatment.resultados,
              updatedAt: new Date(),
            };

            if (querySnapshot.empty) {
              // Crear nuevo
              await addDoc(servicesRef, serviceData);
              created++;
              setMessage(`✅ CREADO: ${treatment.name}`);
            } else {
              // Actualizar existente
              const docId = querySnapshot.docs[0].id;
              const docRef = doc(db, 'services', docId);
              await updateDoc(docRef, serviceData);
              updated++;
              setMessage(`✏️ ACTUALIZADO: ${treatment.name}`);
            }

            setProgress(Math.round((total / 22) * 100));
            setStats({ created, updated, total });
          } catch (err: any) {
            console.error(`Error con ${treatment.id}:`, err);
            setMessage(`❌ Error en ${treatment.name}: ${err.message}`);
          }
        }
      }

      setStatus('success');
      setMessage(`✨ ¡Sincronización completada! ${created} creados, ${updated} actualizados.`);
      setProgress(100);
    } catch (error: any) {
      setStatus('error');
      setMessage(`❌ Error: ${error.message}`);
      console.error('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-[#121A21] p-8 rounded-3xl border border-[#5BC0BE]/30 shadow-2xl max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-white mb-2">🔄 Sincronización Firebase</h2>
      <p className="text-white/60 text-sm mb-8">Importa los 22 servicios desde clinic-data.ts a Firebase Firestore</p>

      {/* Status */}
      <div className="mb-6 space-y-3">
        {status === 'syncing' && (
          <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
            <Loader2 className="animate-spin text-blue-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-blue-300 font-semibold">{message}</p>
              <p className="text-blue-200 text-xs mt-1">Procesado: {progress}%</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/30 p-4 rounded-xl">
            <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-green-300 font-semibold">{message}</p>
              <p className="text-green-200 text-xs mt-2">
                ✅ Creados: {stats.created} | ✏️ Actualizados: {stats.updated}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 p-4 rounded-xl">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-red-300 font-semibold">{message}</p>
            </div>
          </div>
        )}

        {status === 'idle' && (
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-white/80 text-sm">
              Haz click en el botón para sincronizar todos los servicios de clinic-data.ts a Firebase.
            </p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {status === 'syncing' && (
        <div className="w-full bg-black/30 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#5BC0BE] to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${
          isSyncing
            ? 'bg-white/5 text-white/40 cursor-not-allowed'
            : status === 'success'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
            : 'bg-[#5BC0BE] text-[#090D10] hover:bg-cyan-400 shadow-lg'
        }`}
      >
        {isSyncing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            Sincronizando...
          </span>
        ) : status === 'success' ? (
          '✨ Sincronización completada'
        ) : (
          '🚀 Iniciar sincronización'
        )}
      </button>

      {/* Info */}
      <p className="text-white/40 text-xs text-center mt-6">
        Se sincronizarán 22 servicios con sus imágenes locales
      </p>
    </div>
  );
}
