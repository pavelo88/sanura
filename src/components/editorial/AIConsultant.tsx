"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2, Send, Phone } from 'lucide-react';
import { suggestAestheticTreatments, AITreatmentSuggesterOutput } from '@/ai/flows/ai-treatment-suggester';

export function AIConsultant() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AITreatmentSuggesterOutput | null>(null);

  const handleSuggest = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const output = await suggestAestheticTreatments({ userDescription: input });
      setResult(output);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#F0F8F9] dark:bg-[#0C1217] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-4 mb-6">
            <Sparkles className="h-8 w-8 text-[#5BC0BE] animate-pulse" />
            <h2 className="font-serif text-4xl md:text-6xl tracking-widest uppercase text-[#06414B] dark:text-white">
              VIP AI Consultation
            </h2>
          </div>
          <p className="font-serif italic text-xl text-[#3A8B99] dark:text-[#5BC0BE]">
            El atelier inteligente de N-VITALITY
          </p>
        </div>

        <div className="bg-white dark:bg-[#121A21] border border-[#C4E8E9] dark:border-[#1F2E3A] p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#5BC0BE]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3A8B99] dark:text-[#5BC0BE]">
                Describa sus objetivos estéticos
              </label>
              <textarea
                placeholder="Ej: Busco rejuvenecer mi mirada y mejorar la definición de mi mandíbula de forma natural..."
                className="w-full min-h-[150px] bg-transparent border-b-2 border-[#C4E8E9] dark:border-[#1F2E3A] focus:border-[#5BC0BE] outline-none py-4 text-lg md:text-2xl font-serif text-[#06414B] dark:text-white transition-all placeholder:text-[#3A8B99]/30"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <button 
              onClick={handleSuggest} 
              disabled={isLoading || !input}
              className="w-full bg-[#06414B] dark:bg-[#1A2833] text-white py-6 md:py-8 text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#3A8B99] dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Obtener Diagnóstico Inteligente <Send size={16} /></>
              )}
            </button>

            {result && (
              <div className="mt-16 animate-in fade-in zoom-in duration-1000 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {result.suggestedTreatments.map((treatment, idx) => (
                    <div key={idx} className="p-8 border border-[#C4E8E9] dark:border-[#1F2E3A] bg-[#F0F8F9] dark:bg-[#090D10] hover:scale-105 transition-all">
                      <h3 className="font-serif font-bold text-xl text-[#06414B] dark:text-[#5BC0BE] mb-4 uppercase">
                        {treatment.name}
                      </h3>
                      <p className="text-sm text-[#3A8B99] dark:text-[#A0AAB2] mb-6 leading-relaxed">
                        {treatment.description}
                      </p>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#06414B] dark:text-white/50 mb-2 border-t border-black/5 dark:border-white/5 pt-4">Razón Clínica</div>
                      <p className="text-xs italic leading-relaxed text-[#06414B] dark:text-white">
                        {treatment.reasoning}
                      </p>
                    </div>
                  ))}
                </div>
                
                {result.generalAdvice && (
                  <div className="p-8 bg-[#06414B]/5 dark:bg-white/5 border-l-4 border-[#5BC0BE] text-sm italic font-serif text-[#06414B] dark:text-[#A0AAB2]">
                    {result.generalAdvice}
                  </div>
                )}
                
                <div className="flex justify-center pt-8">
                  <a 
                    href="https://wa.me/593983992549" 
                    target="_blank" 
                    className="border-2 border-[#06414B] dark:border-[#5BC0BE] text-[#06414B] dark:text-[#5BC0BE] px-12 py-4 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#06414B] hover:text-white dark:hover:bg-[#5BC0BE] dark:hover:text-[#090D10] transition-all flex items-center gap-4"
                  >
                    Validar con Especialista <Phone size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
