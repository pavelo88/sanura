"use client";

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, Stethoscope, AlertCircle } from 'lucide-react';
import { suggestAestheticTreatments, AITreatmentSuggesterOutput } from '@/ai/flows/ai-treatment-suggester';

interface AIConsultantProps {
  siteConfig?: any; // Propiedad para datos de Firebase
}

export const AIConsultant = ({ siteConfig }: AIConsultantProps) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<AITreatmentSuggesterOutput | null>(null);

  // 1. Textos dinámicos con respaldo editorial 
  const badgeText = siteConfig?.aiBadge || "Consultoría Gen-AI de Élite";
  const title = siteConfig?.aiTitle || "Análisis Algorítmico de Belleza";
  const aiDesc = siteConfig?.aiDescription || "Nuestra IA exclusiva procesa tus objetivos estéticos comparándolos con miles de protocolos internacionales para sugerir una ruta clínica personalizada en segundos.";
  const btnLabel = siteConfig?.aiBtnLabel || "Iniciar Análisis VIP";

  // Lógica de separación de título para estilo editorial
  const titleParts = title.split(' ');
  const firstWord = titleParts[0];
  const italicWord = titleParts[1] || "";
  const restOfTitle = titleParts.slice(2).join(' ');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
      setError('Por favor describe tus objetivos estéticos');
      return;
    }

    if (description.trim().length < 10) {
      setError('Describe con más detalle tus objetivos (mínimo 10 caracteres)');
      return;
    }

    setLoading(true);
    try {
      const output = await suggestAestheticTreatments({ userDescription: description });
      setResult(output);
    } catch (err) {
      console.error("AI Consultation Error:", err);
      setError('Error al procesar tu consulta. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="ia-consultant"
      className="py-8 md:py-12 lg:py-16 bg-[#F0F8F9]/50 dark:bg-[#0C1217]/80 transition-colors duration-500 overflow-hidden border-y border-[#C4E8E9]/30 dark:border-[#1F2E3A]"
      aria-label="Consultor IA de tratamientos estéticos"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-stretch">

          {/* SECCIÓN IZQUIERDA: FORMULARIO [cite: 220-233, 804-817] */}
          <div className="space-y-6 md:space-y-8 lg:space-y-10 flex flex-col">

            <div className="inline-flex items-center gap-2 md:gap-3 w-fit px-4 md:px-5 py-2 md:py-3 bg-[#5BC0BE]/10 dark:bg-[#5BC0BE]/5 border border-[#5BC0BE]/30 dark:border-[#5BC0BE]/20 rounded-full">
              <Sparkles className="text-[#5BC0BE]" size={16} />
              <span className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase text-[#3A8B99] dark:text-[#5BC0BE]">
                {badgeText}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter uppercase text-[#06414B] dark:text-white leading-tight">
              <span>{firstWord}</span> <br />
              <span className="text-[#3A8B99] dark:text-[#5BC0BE] italic">{italicWord}</span> <br className="hidden sm:inline" />
              <span>{restOfTitle}</span>
            </h2>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed max-w-2xl font-light">
              {aiDesc}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5 lg:space-y-6 mt-6 md:mt-8 flex flex-col">
              <div className="space-y-2">
                <label htmlFor="ai-description" className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-semibold text-[#3A8B99] dark:text-[#5BC0BE] block">
                  Describe tus objetivos *
                </label>
                <textarea
                  id="ai-description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setError('');
                  }}
                  placeholder="Ej: Deseo mejorar la firmeza de mi rostro..."
                  className="w-full bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] hover:border-[#5BC0BE]/50 focus:border-[#5BC0BE] focus:ring-2 focus:ring-[#5BC0BE]/20 p-4 md:p-5 lg:p-6 h-32 md:h-40 lg:h-48 focus:outline-none transition-all text-[#06414B] dark:text-white text-sm md:text-base rounded-lg md:rounded-xl shadow-md"
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-400/10 border border-red-400/30 p-3 md:p-4 rounded-lg animate-in fade-in duration-300">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs md:text-sm font-light">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="group w-full md:w-auto bg-[#06414B] dark:bg-[#5BC0BE] text-white dark:text-[#090D10] px-8 md:px-10 lg:px-12 py-4 md:py-5 text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-3 rounded-lg md:rounded-xl shadow-lg disabled:opacity-50 min-h-[44px] md:min-h-[48px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Analizando...</span>
                  </>
                ) : (
                  <>
                    <span>{btnLabel}</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* SECCIÓN DERECHA: RESULTADOS [cite: 234-249, 818-833] */}
          <div
            className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
            role="region"
            aria-live="polite"
          >
            {!result && !loading && (
              <div className="absolute inset-0 border-2 border-dashed border-[#C4E8E9]/20 dark:border-[#1F2E3A] flex flex-col items-center justify-center p-6 md:p-8 lg:p-12 text-center rounded-xl lg:rounded-2xl backdrop-blur-sm">
                <div className="mb-4 md:mb-6 text-[#3A8B99]/60 dark:text-[#5BC0BE]/40">
                  <Stethoscope size={48} className="md:w-16 md:h-16 lg:w-20 lg:h-20" />
                </div>
                <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-[#3A8B99]/70 dark:text-[#5BC0BE]/60">
                  Describe tu objetivo para recibir análisis personalizado...
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
                <div className="w-16 h-16 md:w-20 md:h-20 border-3 border-[#5BC0BE]/20 dark:border-[#5BC0BE]/10 border-t-[#5BC0BE] rounded-full animate-spin" />
                <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-[#3A8B99] dark:text-[#5BC0BE]">
                  Procesando arquitectura estética...
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="w-full space-y-4 md:space-y-5 lg:space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl uppercase tracking-widest text-[#06414B] dark:text-white border-b-2 border-[#C4E8E9] dark:border-[#1F2E3A] pb-4 md:pb-5">
                  Sugerencias Clínicas
                </h3>

                <div className="space-y-3 md:space-y-4 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-3 custom-scrollbar">
                  {result.suggestedTreatments.map((treatment, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#121A21] p-4 md:p-5 lg:p-6 border border-[#C4E8E9] dark:border-[#1F2E3A] shadow-md rounded-lg md:rounded-xl"
                    >
                      <span className="text-[7px] md:text-[8px] font-bold text-[#5BC0BE] uppercase tracking-[0.4em] mb-2 block">
                        Protocolo {idx + 1}
                      </span>
                      <h4 className="font-serif text-base md:text-lg lg:text-xl text-[#06414B] dark:text-white mb-2 md:mb-3">
                        {treatment.name}
                      </h4>
                      <p className="text-[9px] md:text-[10px] lg:text-sm text-[#3A8B99] dark:text-[#A0AAB2] leading-relaxed mb-3 md:mb-4">
                        {treatment.description}
                      </p>
                      <div className="bg-[#F0F8F9]/50 dark:bg-[#090D10]/50 p-3 md:p-4 text-[7px] md:text-[8px] uppercase tracking-widest border-l-3 border-[#5BC0BE] rounded">
                        <strong>Razón:</strong> {treatment.reasoning}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => { setResult(null); setDescription(''); }}
                  className="w-full mt-4 md:mt-6 py-3 md:py-4 text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[#5BC0BE] border border-[#5BC0BE]/30 hover:border-[#5BC0BE] rounded-lg md:rounded-xl transition-all"
                >
                  Nueva Consulta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};