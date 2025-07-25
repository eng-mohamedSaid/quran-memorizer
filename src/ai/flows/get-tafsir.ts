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
    // Call AlQuran Cloud API to get the Tafsir
    const apiUrl = `https://api.alquran.cloud/v1/ayah/${input.surah}:${input.ayah}/editions/quran-tafsir-uthmani`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.data && data.data[0] && data.data[0].text) {
        const tafsirText = data.data[0].text;
        // Call the prompt to refine the tafsir (though currently, it primarily extracts).
        const {output} = await getTafsirPrompt({
          ...input,
        });
        return {
          tafsir: tafsirText,
        };
      } else {
        throw new Error('Tafsir not found for the given Surah and Ayah.');
      }
    } catch (error: any) {
      console.error('Error fetching Tafsir:', error);
      return {
        tafsir: `Error fetching Tafsir: ${error.message}`,
      };
    }
  }
);
