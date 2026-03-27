"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Stethoscope } from 'lucide-react';
import { suggestAestheticTreatments, AITreatmentSuggesterOutput } from '@/ai/flows/ai-treatment-suggester';

export const AIConsultant = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AITreatmentSuggesterOutput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const output = await suggestAestheticTreatments({ userDescription: description });
      setResult(output);
    } catch (error) {
      console.error("AI Consultation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ia-consultant" className="py-24 md:py-32 bg-[#F0F8F9] dark:bg-[#0C1217] transition-colors duration-500 overflow-hidden border-y border-[#C4E8E9] dark:border-[#1F2E3A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* LADO IZQUIERDO: INTRODUCCIÓN */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#5BC0BE]/10 border border-[#5BC0BE]/20 rounded-full">
              <Sparkles className="text-[#5BC0BE]" size={16} />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#3A8B99] dark:text-[#5BC0BE]">Consultoría Gen-AI de Élite</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-[0.9]">
              Análisis <br /><span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">Algorítmico</span> de Belleza
            </h2>
            
            <p className="font-sans text-xl text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed max-w-xl font-light">
              Nuestra IA exclusiva procesa sus objetivos estéticos comparándolos con miles de protocolos internacionales para sugerir una ruta clínica personalizada.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describa sus objetivos (ej: deseo mejorar la firmeza de mi rostro y definir el contorno mandibular)..."
                className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-8 h-48 focus:border-[#5BC0BE] outline-none transition-colors text-[#06414B] dark:text-white font-light text-lg resize-none shadow-sm"
              />
              <button 
                disabled={loading || !description.trim()}
                className="group w-full md:w-auto bg-[#06414B] dark:bg-[#1A2833] text-white px-12 py-5 text-xs font-bold tracking-[0.4em] uppercase hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : "Iniciar Análisis VIP"}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
              </button>
            </form>
          </div>

          {/* LADO DERECHO: RESULTADOS */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            {!result && !loading && (
              <div className="absolute inset-0 border-[1px] border-dashed border-[#C4E8E9] dark:border-[#1F2E3A] flex flex-col items-center justify-center p-12 text-center opacity-40">
                <Stethoscope size={64} className="text-[#3A8B99] mb-6" />
                <p className="font-serif italic text-xl text-[#3A8B99]">Esperando diagnóstico inicial...</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center space-y-8">
                <div className="w-24 h-24 border-2 border-[#5BC0BE]/20 border-t-[#5BC0BE] rounded-full animate-spin" />
                <p className="font-serif italic text-2xl text-[#3A8B99] dark:text-[#5BC0BE]">Procesando arquitectura estética...</p>
              </div>
            )}

            {result && !loading && (
              <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-10 duration-700">
                <h3 className="font-serif text-2xl uppercase tracking-widest text-[#06414B] dark:text-white border-b border-[#C4E8E9] dark:border-[#1F2E3A] pb-4">Sugerencias Clínicas</h3>
                {result.suggestedTreatments.map((treatment, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#121A21] p-8 border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-lg group hover:border-[#5BC0BE] transition-colors">
                    <span className="text-[10px] font-bold text-[#5BC0BE] uppercase tracking-[0.4em] mb-2 block">Protocolo {idx + 1}</span>
                    <h4 className="font-serif text-2xl text-[#06414B] dark:text-white mb-3">{treatment.name}</h4>
                    <p className="text-[#3A8B99] dark:text-[#A0AAB2] text-sm leading-relaxed mb-4">{treatment.description}</p>
                    <div className="bg-[#F0F8F9] dark:bg-[#090D10] p-4 text-[10px] uppercase tracking-widest text-[#06414B] dark:text-white border-l-2 border-[#5BC0BE]">
                      <strong>Razón:</strong> {treatment.reasoning}
                    </div>
                  </div>
                ))}
                {result.generalAdvice && (
                  <p className="text-[10px] uppercase tracking-widest text-[#3A8B99]/60 text-center mt-8 italic">
                    {result.generalAdvice}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
