'use server';
/**
 * @fileOverview An AI agent that suggests aesthetic treatments based on user input.
 *
 * - suggestAestheticTreatments - A function that handles the treatment suggestion process.
 * - AITreatmentSuggesterInput - The input type for the suggestAestheticTreatments function.
 * - AITreatmentSuggesterOutput - The return type for the suggestAestheticTreatments function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const AITreatmentSuggesterInputSchema = z.object({
  userDescription: z
    .string()
    .describe(
      'A description from the user detailing their aesthetic goals and physical characteristics, possibly in response to a guided questionnaire.'
    ),
});
export type AITreatmentSuggesterInput = z.infer<
  typeof AITreatmentSuggesterInputSchema
>;

// Output Schema
const SuggestedTreatmentSchema = z.object({
  name: z.string().describe('The name of the suggested treatment.'),
  description: z.string().describe('A brief description of the treatment.'),
  reasoning: z
    .string()
    .describe('Why this treatment is suitable for the user based on their input.'),
});

const AITreatmentSuggesterOutputSchema = z.object({
  suggestedTreatments: z
    .array(SuggestedTreatmentSchema)
    .max(3) // Limit to max 3 suggestions as per prompt instructions
    .describe('A list of potential treatments tailored to the user’s needs.'),
  generalAdvice: z
    .string()
    .optional()
    .describe(
      'Optional general advice or disclaimers about seeking professional consultation.'
    ),
});
export type AITreatmentSuggesterOutput = z.infer<
  typeof AITreatmentSuggesterOutputSchema
>;

// Prompt definition
const aiTreatmentSuggesterPrompt = ai.definePrompt({
  name: 'aiTreatmentSuggesterPrompt',
  input: { schema: AITreatmentSuggesterInputSchema },
  output: { schema: AITreatmentSuggesterOutputSchema },
  prompt: `You are an expert aesthetic consultant for SANURA Aesthetics. Your goal is to help potential patients identify potential treatments tailored to their aesthetic goals and physical characteristics.

Based on the user's description below, suggest up to 3 potential aesthetic or plastic surgery treatments. For each suggested treatment, provide its name, a brief description, and a clear reasoning why it is suitable for the user based on their input. Also, provide some general advice or a disclaimer about the importance of professional consultation.

User's aesthetic goals and physical characteristics:
{{{userDescription}}} `,
});

// Flow definition
const aiTreatmentSuggesterFlow = ai.defineFlow(
  {
    name: 'aiTreatmentSuggesterFlow',
    inputSchema: AITreatmentSuggesterInputSchema,
    outputSchema: AITreatmentSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await aiTreatmentSuggesterPrompt(input);
    return output!;
  }
);

// Wrapper function
export async function suggestAestheticTreatments(
  input: AITreatmentSuggesterInput
): Promise<AITreatmentSuggesterOutput> {
  return aiTreatmentSuggesterFlow(input);
}
