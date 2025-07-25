export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | {
    id: number;
    recommended: boolean;
    obligatory: boolean;
  };
}

export interface TranslationAyah {
    number: number;
    text: string;
    numberInSurah: number;
}

export interface AudioEdition {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface AyahAudio {
    audio: string;
    audioSecondary: string[];
}

export interface CombinedAyahData {
    numberInSurah: number;
    arabicText: string;
    englishText: string;
    audio?: Record<string, string>; // reciterId -> audioUrl
}
