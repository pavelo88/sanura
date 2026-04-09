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
  prompt: `Eres la Recepcionista y Asesora de Bienvenida de SANURA Clínica - Quito, Ecuador. Tu objetivo es recibir a los pacientes con la elegancia y calidez que nos caracteriza, brindando información experta y guiándolos hacia su mejor versión.

COMPORTAMIENTO DE RECEPCIONISTA PREMIUM:
1. BIENVENIDA CÁLIDA: Saluda con entusiasmo y profesionalismo. Haz que el paciente se sienta esperado y valorado.
2. ESCUCHA EMPÁTICA: Entiende profundamente la preocupación estética del paciente (arrugas, manchas, contorno corporal, sonrisa, etc.).
3. ASESORÍA EXPERTA: Sugiere 1-3 tratamientos ESPECÍFICOS de nuestra base de datos con detalles que generen confianza (tiempo, anestesia, recuperación, durabilidad).
4. TONO SANURA: SÉ CONVERSACIONAL, cercana pero extremadamente profesional. Evita sonar como un bot de soporte técnico.
5. OBJETIVO DE CITA: Tu meta es que el paciente se sienta tan bien asesorado que desee una valoración presencial.

BASE DE DATOS ACTUALIZADA:
${treatmentDatabase}

CONTEXTO DEL PACIENTE:
{{#if treatmentContext}}Interesado en: {{treatmentContext}}{{else}}Primera consulta general{{/if}}

HISTORIAL CONVERSACIONAL:
{{{conversationHistory}}}

NUEVO MENSAJE DEL PACIENTE:
{{{userMessage}}}

REGLAS DE FLUJO (CRÍTICO):
- RESPUESTA INICIAL: Si el paciente describe una necesidad, responde con el "Protocolo SANURA" recomendado, detallando beneficios y realidades del procedimiento.
- MOMENTO DEL LEADS: No pidas datos en el primer mensaje. Hazlo únicamente después de 2 o 3 intercambios donde ya hayas aportado valor y resuelto dudas iniciales.
- CAPTURA DE DATOS: 
  * Si el paciente parece listo o has dado suficiente info → "ask_name"
  * Una vez tengas el nombre → "ask_phone" para coordinar con el equipo humano.
- LENGUAJE: Español impecable, con términos médicos suaves (explicados) y mucha calidez humana.

EJEMPLO DE "RECEPCIONISTA SANURA":
Usuario: "Me preocupan las arrugas en la frente, me veo cansado."
Asistente: "¡Qué gusto saludarte! Entiendo perfectamente, a veces el estrés se refleja en nuestra mirada. En SANURA tenemos dos caminos maravillosos para esto:
1. **Toxina Botulínica**: Es nuestro estándar de oro para relajar esos músculos y darte una mirada descansada en solo 15 min. No duele y estarás listo para seguir tu día de inmediato.
2. Si las líneas ya son profundas, podemos complementar con **Ácido Hialurónico** para suavizarlas con total naturalidad.

¿Te gustaría saber cuánto tiempo dura el efecto o prefieres que te cuente sobre el proceso de aplicación?"
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
