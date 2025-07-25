'use server';

/**
 * @fileOverview Retrieves the Tafsir (interpretation) of a given Ayah from the AlQuran Cloud API.
 *
 * - getTafsir - A function that retrieves the Tafsir for a specified Ayah.
 * - GetTafsirInput - The input type for the getTafsir function, specifying the Surah and Ayah number.
 * - GetTafsirOutput - The return type for the getTafsir function, containing the Tafsir text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetTafsirInputSchema = z.object({
  surah: z.number().describe('The Surah number.'),
  ayah: z.number().describe('The Ayah number.'),
});
export type GetTafsirInput = z.infer<typeof GetTafsirInputSchema>;

const GetTafsirOutputSchema = z.object({
  tafsir: z.string().describe('The interpretation (Tafsir) of the Ayah.'),
});
export type GetTafsirOutput = z.infer<typeof GetTafsirOutputSchema>;

export async function getTafsir(input: GetTafsirInput): Promise<GetTafsirOutput> {
  return getTafsirFlow(input);
}

const getTafsirPrompt = ai.definePrompt({
  name: 'getTafsirPrompt',
  input: {schema: GetTafsirInputSchema},
  output: {schema: GetTafsirOutputSchema},
  prompt: `You are an expert in Islamic studies and provide Tafsir (interpretation) of Quranic verses.

  Given the Surah number {{surah}} and Ayah number {{ayah}}, retrieve the Tafsir from AlQuran Cloud API and provide a concise explanation.
  Do not add any additional text other than the explanation.
  `,
});

const getTafsirFlow = ai.defineFlow(
  {
    name: 'getTafsirFlow',
    inputSchema: GetTafsirInputSchema,
    outputSchema: GetTafsirOutputSchema,
  },
  async input => {
    const apiUrl = `https://api.alquran.cloud/v1/ayah/${input.surah}:${input.ayah}/ar.muyassar`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();

      if (data.data && data.data.text) {
        const tafsirText = data.data.text;
        return {
          tafsir: tafsirText,
        };
      } else {
        throw new Error('Tafsir not found for the given Surah and Ayah in the API response.');
      }
    } catch (error: any) {
      console.error('Error fetching Tafsir:', error);
      // Fallback to model if API fails
      try {
        const {output} = await getTafsirPrompt(input);
        return output || { tafsir: `Error fetching Tafsir: ${error.message}` };
      } catch (promptError: any) {
         console.error('Error generating Tafsir from prompt:', promptError);
         return {
            tafsir: `Error fetching Tafsir: ${promptError.message}`,
         }
      }
    }
  }
);
