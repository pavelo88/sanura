"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, Loader2, Check } from 'lucide-react';
import { Treatment } from '@/lib/clinic-data';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from '@/firebase';
import { consultWithAI, AIConsultantOutput } from '@/ai/flows/ai-consultant';

interface Message {
  role: 'bot' | 'user';
  content: string;
}

interface AgentePersonalizadoProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: Treatment | null;
}

export const AgentePersonalizado = ({ isOpen, onClose, initialTreatment }: AgentePersonalizadoProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState<'chat' | 'ask_name' | 'ask_phone' | 'thank_you'>('chat');
  const [userName, setUserName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [conversationCount, setConversationCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      let welcomeMsg = "Hola 👋 Soy el Agente de SANURA. Cuéntame: ¿Qué te gustaría mejorar o cambiar? Pueden ser tus dientes, arrugas, grasa localizada, cabello, piel... lo que sea.";
      
      if (initialTreatment) {
        welcomeMsg = `Hola 👋 Veo que te interesa nuestro tratamiento de **${initialTreatment.name}**. ¡Excelente elección! ¿Quieres saber más sobre este procedimiento o tienes otras preocupaciones estéticas?`;
      }
      
      setMessages([{ role: 'bot', content: welcomeMsg }]);
      setStep('chat');
      setConversationCount(0);
    } else {
      setMessages([]);
      setStep('chat');
      setUserName('');
      setConversationCount(0);
    }
  }, [isOpen, initialTreatment]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isSaving || isLoadingAI) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoadingAI(true);

    try {
      if (step === 'chat') {
        // Conversation flow with AI - más inteligente
        const conversationHistory = messages.map(m => ({
          role: (m.role === 'bot' ? 'assistant' : 'user') as 'assistant' | 'user',
          content: m.content,
        }));

        const aiResult: AIConsultantOutput = await consultWithAI({
          userMessage: userMsg,
          conversationHistory,
          treatmentContext: initialTreatment?.name,
        });

        setMessages(prev => [...prev, { role: 'bot', content: aiResult.response }]);
        setConversationCount(prev => prev + 1);

        // Cambiar de paso basado en recomendación de IA
        if (aiResult.nextStep === 'ask_name') {
          setStep('ask_name');
        } else if (aiResult.nextStep === 'ask_phone') {
          setStep('ask_phone');
        }
        // Si es 'continue_chat', permanece en 'chat'
      } else if (step === 'ask_name') {
        setUserName(userMsg);
        setMessages(prev => [...prev, {
          role: 'bot',
          content: `Mucho gusto, ${userMsg} 👋. Por último, facilítame tu WhatsApp o número de contacto para que nuestro equipo especializado te envíe la información detallada y coordine tu cita.`
        }]);
        setStep('ask_phone');
      } else if (step === 'ask_phone') {
        setIsSaving(true);
        try {
          const db = getFirestore();
          await addDoc(collection(db, 'leads'), {
            fullName: userName,
            phone: userMsg,
            message: `[IA CHAT] Consulta sobre: ${initialTreatment?.name || 'Consulta General'}. Conversación productiva realizada.`,
            status: 'IA_ASSISTED',
            createdAt: serverTimestamp()
          });
          
          setMessages(prev => [...prev, {
            role: 'bot',
            content: `¡Perfecto, ${userName}! ✨ He registrado tu solicitud. Un especialista de SANURA se pondrá en contacto contigo al número ${userMsg} muy pronto.\n\nTe enviaremos toda la información detallada, presupuestos y disponibilidad de citas.\n\n¡Gracias por confiar en SANURA! 🏥`
          }]);
          setStep('thank_you');
        } catch (e) {
          console.error("Error saving lead:", e);
          setMessages(prev => [...prev, {
            role: 'bot',
            content: 'Hubo un pequeño error. Por favor intenta de nuevo o contacta directamente por WhatsApp.'
          }]);
        } finally {
          setIsSaving(false);
        }
      }
    } catch (error) {
      console.error("Error en chat IA:", error);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Lo siento, hubo un error procesando tu mensaje. Intenta de nuevo o contáctanos por WhatsApp.'
      }]);
    } finally {
      setIsLoadingAI(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[400] w-[calc(100%-3rem)] md:w-full max-w-[380px] h-[550px] max-h-[85vh] flex flex-col glass-pearl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden animate-in slide-in-from-right-10 duration-500">
      {/* Header */}
      <div className="p-6 bg-brand dark:bg-white text-white dark:text-brand flex items-center justify-between shadow-md border-b border-brand/20 dark:border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shadow-inner">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white dark:text-gray-700">Asesor SANURA</h4>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-medium text-white/70 dark:text-gray-700 uppercase tracking-widest">Conectado</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 dark:hover:bg-gray-100 transition-colors p-2 rounded-lg text-white dark:text-brand">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5 hide-scrollbar bg-white/40 dark:bg-[#0C1217]/80 backdrop-blur-3xl">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] leading-relaxed font-medium ${
              m.role === 'user' 
                ? 'bg-accent text-white rounded-tr-none shadow-lg' 
                : 'bg-white/90 dark:bg-[#1A2630] text-brand dark:text-[#E2E8F0] rounded-tl-none border border-brand/5 dark:border-[#5BC0BE]/30 shadow-sm'
            }`}>
              {m.content.split('\n').map((line, li) => (
                <p key={li} className={line === '' ? 'h-2' : ''}>{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoadingAI && (
          <div className="flex justify-start">
            <div className="bg-white/90 dark:bg-[#1A2630] p-4 rounded-2xl rounded-tl-none flex items-center gap-3 border border-brand/5 dark:border-[#5BC0BE]/30">
              <Loader2 size={16} className="animate-spin text-accent" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand dark:text-[#E2E8F0] opacity-70">Analizando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      {step !== 'thank_you' && (
        <div className="p-4 bg-white/80 dark:bg-black/40 border-t border-brand/5 dark:border-white/5">
          <div className="relative flex items-center bg-white/50 dark:bg-[#121A21] rounded-2xl px-2 border border-transparent dark:border-[#5BC0BE]/20">
            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder={
                step === 'ask_name' ? 'Tu nombre...' : 
                step === 'ask_phone' ? 'Tu WhatsApp...' : 
                'Cuéntame qué deseas mejorar...'
              }
              className="w-full h-12 bg-transparent border-none outline-none text-xs text-brand dark:text-white px-3 font-semibold placeholder:opacity-60 dark:placeholder:opacity-70"
              disabled={isLoadingAI || isSaving}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoadingAI || isSaving}
              className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-30"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {step === 'thank_you' && (
        <div className="p-8 bg-white/80 dark:bg-black/40 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button 
            onClick={onClose}
            className="text-[10px] font-bold tracking-[0.5em] uppercase text-accent border-b-2 border-accent pb-1 inline-flex items-center gap-3 hover:gap-4 transition-all"
          >
            Finalizar <Check size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
