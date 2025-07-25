import type { Surah, Ayah, AudioEdition, TranslationAyah, AyahAudio } from './types';

const ALQURAN_CLOUD_API = 'https://api.alquran.cloud/v1';

export async function getSurahs(): Promise<Surah[]> {
  try {
    const response = await fetch(`${ALQURAN_CLOUD_API}/surah`);
    if (!response.ok) {
      throw new Error('Failed to fetch surahs');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in getSurahs:", error);
    return [];
  }
}

export async function getAyahsForSurah(surahNumber: number): Promise<Ayah[]> {
    try {
        const response = await fetch(`${ALQURAN_CLOUD_API}/surah/${surahNumber}/quran-uthmani`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ayahs for surah ${surahNumber}`);
        }
        const data = await response.json();
        return data.data.ayahs;
    } catch (error) {
        console.error(`Error in getAyahsForSurah for surah ${surahNumber}:`, error);
        return [];
    }
}

export async function getTranslationForSurah(surahNumber: number): Promise<TranslationAyah[]> {
    try {
        const response = await fetch(`${ALQURAN_CLOUD_API}/surah/${surahNumber}/en.sahih`);
        if (!response.ok) {
            throw new Error(`Failed to fetch translation for surah ${surahNumber}`);
        }
        const data = await response.json();
        return data.data.ayahs;
    } catch (error) {
        console.error(`Error in getTranslationForSurah for surah ${surahNumber}:`, error);
        return [];
    }
}


export async function getAudioEditions(): Promise<AudioEdition[]> {
  try {
    const response = await fetch(`${ALQURAN_CLOUD_API}/edition/format/audio`);
     if (!response.ok) {
      throw new Error('Failed to fetch audio editions');
    }
    const data = await response.json();
    return data.data.filter((e: AudioEdition) => e.type === 'versebyverse');
  } catch (error) {
    console.error("Error in getAudioEditions:", error);
    return [];
  }
}

export async function getAudioForAyah(surah: number, ayah: number, edition: string): Promise<AyahAudio | null> {
    try {
        const response = await fetch(`${ALQURAN_CLOUD_API}/ayah/${surah}:${ayah}/${edition}`);
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
}
