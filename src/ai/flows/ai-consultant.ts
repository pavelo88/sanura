'use server';
/**
 * @fileOverview AI conversational consultant for SANURA Clínica.
 * Provides real aesthetic consulting, not just data collection.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema for conversation
const AIConsultantInputSchema = z.object({
  userMessage: z
    .string()
    .describe('The message from the user in the conversation'),
  conversationHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional()
    .describe('Previous messages in the conversation for context'),
  treatmentContext: z
    .string()
    .optional()
    .describe('If user selected a specific treatment, this contains its name'),
});

export type AIConsultantInput = z.infer<typeof AIConsultantInputSchema>;

// Output Schema
const AIConsultantOutputSchema = z.object({
  response: z
    .string()
    .describe('The conversational response from the assistant'),
  nextStep: z
    .enum(['continue_chat', 'ask_name', 'ask_phone', 'close_session'])
    .describe('What should happen next in the flow'),
});

export type AIConsultantOutput = z.infer<typeof AIConsultantOutputSchema>;

// Comprehensive treatment data
const treatmentDatabase = `
ESTÉTICA FACIAL - PROCEDIMIENTOS SANURA:
• Ácido Hialurónico: Rellenos para volumen labial, mentón, surcos. Tiempo: <1h, Anestesia: Tópica, Recuperación: Inmediata, Durabilidad: 12-18 meses
• Hilos Tensores PDO: Lifting sin cirugía. Tiempo: 30-60 min, Anestesia: Local, Recuperación: 7 días, Durabilidad: 12-18 meses
• Toxina Botulínica: Para arrugas dinámicas (frente, entrecejo, patas de gallo). Tiempo: 15-45 min, Anestesia: Tópica, Recuperación: 8 horas, Durabilidad: 9-24 meses
• Rejuvenecimiento AUREXIS: Protocolo que activa fibroblastos. Tiempo: 35 min sesiones, Sin anestesia, Resultados: Mejora de colágeno y textura
• Aumento de Labios: Proporciones áureas con AH. Tiempo: <1h, Anestesia: Tópica/Local, Recuperación: 24-48h, Durabilidad: 6-12 meses
• Proyección de Mentón: Avance con AH. Tiempo: 30-60 min, Anestesia: Local, Recuperación: 2-3 días, Durabilidad: 6-12 meses
• Rinomodelación: Perfilado nasal sin cirugía. Tiempo: 20 min, Anestesia: Tópica, Sin hematomas, Durabilidad: 6-12 meses
• Armonización Facial Full: Integración AH+Botox+Hilos. Tiempo: 1h, Anestesia: Local/Tópica, Recuperación: 7 días, Rejuvenecimiento: 5-10 años visibles
• Blefaroplastia Plasma: Párpados sin bisturí. Tiempo: 60 min, Anestesia: Local/Tópica, Recuperación: 7-10 días, Durabilidad: 24 meses
• Bichectomía: Perfilado facial quirúrgico. Anestesia: Local profunda, Resultados: Pómulos marcados permanentes

MEDICINA LÁSER:
• Blanqueamiento Dental: Para dientes amarillos. Tiempo: 1-2 sesiones, Anestesia: Gel desensibilizante, Resultados: Varios tonos más blanco
• Carillas Dentales: Para discoloraciones profundas. Ideal para: Dientes fracturados, desgaste, manchas permanentes
• Depilación Definitiva: Vello facial y corporal. Permanente, con sistema de enfriamiento, Sin dolor
• Manchas & Pigmentación IPL: Para manchas solares, melasma, lentigos. Tiempos: Sesiones variables, Resultados: Tono uniforme inmediato
• Rejuvenecimiento Cutáneo: Piel tensa y fresca. Sin anestesia, Efecto inmediato
• Secuelas de Acné: Cicatrices de acné. Láser fraccional, Mejora: 70-80% en textura
• Reducción de Estrías: Para estrías antiguas. Mejora: 70-80% visible
• Remoción de Lunares: Sin cicatrices con láser. Ideal para: Lunares pequeños a medianos

CIRUGÍA PLÁSTICA:
• Rinoplastia Ultrasónica: Cirugía de nariz con tecnología ultrasónica. Tiempo: 2-3h, Anestesia: General/Sedación, Recuperación: 7 días críticos, Resultados: Finales a 12 meses
• Abdominoplastia: Para abdomen flácido y músculos separados. Tiempo: 2-5h, Anestesia: General, Requiere: Cesación total de tabaquismo, Resultados: Permanentes
• Lipoescultura Tumescente: Extracción y esculpido de grasa. Anestesia: Local con epinefrina, Recuperación: 10 días críticos + uso de fajas, Edema resuelto en 2-3 meses
• Otoplastia: Orejas prominentes. Tiempo: 1-2h, Anestesia: Local con sedación, Recuperación: 1-2 semanas, Resultados: Permanentes

DERMATOLOGÍA:
• Acné & Rosácea: Fórmulas magistrales especializadas
• Lunares de Carne: Cauterización rápida en consulta
• Micropigmentación de Labios: Tatuaje paramédico. Durabilidad: 1-3 años

ESTÉTICA CORPORAL:
• Hidrolipoclasia: Lipo sin cirugía para grasa localizada. Tiempo: 30-60 min, Sesiones: 4-6 para efecto notable, Ideal para: Abdomen, caderas, papada
• Carboxiterapia: Inyección de CO₂ médico. Ideal para: Celulitis, flacidez, estrías
• Hiperhidrosis: Control de sudoración excesiva. Durabilidad: 6-8 meses

MEDICINA CAPILAR:
• Implante Capilar FUE: Para calvicie instalada. Tiempo: 4-8h, Anestesia: Local con sedación, Recuperación: 15 días críticos, Resultados: Finales a 18 meses
• Estimulación Capilar: Para caída activa. Sesiones de 35 min, Sin anestesia, Resultados: Progresivos

ODONTOLOGÍA ESTÉTICA:
• Diseño de Sonrisa Digital: Protocolo CAD/CAM personalizado
• Implantes Dentales: Para reemplazo de dientes
• Ortodoncia: Sistemas invisibles y modernos
• Profilaxis: Limpieza y mantenimiento preventivo
`;

// Consultant Prompt
const aiConsultantPrompt = ai.definePrompt({
  name: 'aiConsultantPrompt',
  input: { schema: AIConsultantInputSchema },
  output: { schema: AIConsultantOutputSchema },
  prompt: `Eres un Asesor Médico Estético de SANURA Clínica - Quito, Ecuador. 

COMPORTAMIENTO CRÍTICO:
1. ESCUCHA el problema/necesidad del paciente
2. SUGIERE 1-3 tratamientos ESPECÍFICOS con detalles reales: tiempo, anestesia, recuperación, durabilidad
3. SÉ CONVERSACIONAL, amable, profesional - NO robótico
4. RESPONDE CON INFORMACIÓN VALIOSA, no solo preguntes datos
5. Mantén el contexto de la conversación
6. SOLO EN TURNO 4+ pregunta nombre y WhatsApp

BASE DE DATOS ACTUALIZADA:
${treatmentDatabase}

CONTEXTO DEL PACIENTE:
${(context?: string) => context || 'Sin tratamiento seleccionado'}

HISTORIAL CONVERSACIONAL:
{{{conversationHistory}}}

NUEVO MENSAJE DEL PACIENTE:
{{{userMessage}}}

REGLAS ESENCIALES:
- Si describe un PROBLEMA (ej: "dientes amarillos", "barriguita", "arrugas"), RESPONDE CON SOLUCIONES
- Incluye: Nombre del procedimiento, tiempo estimado, tipo de anestesia, días de recuperación, cuánto dura el efecto
- Si es primer mensaje con problema → "continue_chat"
- Si ha habido 3-4 turnos productivos → "ask_name" 
- Si tienes nombre → "ask_phone"
- Responde en español, coloquial pero profesional
- NUNCA inventes datos no verificados
- Haz preguntas aclaratorias solo si necesitas más contexto
- SÉ POSITIVO, REALISTA y ÚTIL

EJEMPLO CONVERSACIÓN BUENA:
Usuario: "Tengo acné en la cara y quiero mejorar"
Asistente: "Entiendo perfectamente. En SANURA tratamos el acné con un protocolo que combina:
1. **Fórmulas magistrales especializadas** - controlan la proliferación bacteriana y sebogénesis
2. Si hay **cicatrices ya formadas**, usamos **Láser Fraccional** (mejora 70-80% en 3-4 sesiones)
3. Para manchas rojas post-acné, **Luz IPL** que unifique el tono en una o dos sesiones

¿Es acné activo o cicatrices lo que más te preocupa? Así te doy la mejor opción."
- nextStep: "continue_chat"`,
});

// Flow
const aiConsultantFlow = ai.defineFlow(
  {
    name: 'aiConsultantFlow',
    inputSchema: AIConsultantInputSchema,
    outputSchema: AIConsultantOutputSchema,
  },
  async (input) => {
    const { output } = await aiConsultantPrompt(input);
    return output!;
  }
);

// Export functions
export async function consultWithAI(
  input: AIConsultantInput
): Promise<AIConsultantOutput> {
  return aiConsultantFlow(input);
}

// Backwards compatibility
export async function suggestAestheticTreatments(input: {
  userDescription: string;
}): Promise<{ response: string }> {
  const result = await aiConsultantFlow({
    userMessage: input.userDescription,
    conversationHistory: [],
  });
  return { response: result.response };
}
