export type EditorState = 'WRITING' | 'CORRECTING' | 'CORRECTED';

export interface ComplexSentence {
  oración: string;
  nivel: 'fácil' | 'difícil' | 'muy difícil';
  motivo: string;
  sugerencia: string;
}

export interface ToneCorrection {
  tono_general: string;
  discordancias: string[];
  pasivas_convertidas: string[];
}

export interface ClicheCrutch {
  original: string;
  sugerencia: string;
}

export interface CorrectionData {
  normalizedData: {
    complex_sentences: ComplexSentence[];
    correction_tono_voice: ToneCorrection;
    cliche_crutche: ClicheCrutch[];
  };
}

export interface ApiResponse {
  new_article: string;
  corrections: CorrectionData;
}

export interface ArticleStats {
  characters: number;
  words: number;
  paragraphs: number;
  readingTime: number;
}

// New API response types
export interface GrammarCorrection {
  correctedText: string;
}

export type ReadabilitySuggestion = Array<{
  oración: string;
  nivel: string;
  motivo: string;
  sugerencia?: string;
}>;

export type ToneAndVoiceSuggestion = {
  tono_general: string;
  discordancias: Array<{
    expresion: string;
    motivo: string;
    sugerencia: string;
  }>;
  pasivas_convertidas: Array<{
    original: string;
    activa: string;
  }>;
};

export type ClichesSuggestion = Array<{
  original: string;
  sugerencia: string;
}>;

// Generic Suggestion type for the panel
export interface SuggestionType {
  id: string;
  type: 'complex' | 'cliche' | 'tone' | 'voice';
  original: string;
  suggestion: string;
  reason?: string;
  applied: boolean;
}

// Old types to be removed or commented out
/*
export interface ApiResponse {
  new_article: string;
  corrections: {
    normalizedData: {
      complex_sentences: ComplexSentence[];
      correction_tono_voice: ToneCorrection;
      cliche_crutche: ClicheCrutch[];
    };
  };
}

export interface ComplexSentence {
  oración: string;
  nivel: string;
  motivo: string;
  sugerencia: string;
}

export interface ClicheCrutch {
  original: string;
  sugerencia: string;
}

export interface ToneCorrection {
  tono_general: string;
  discordancias: string[]; // This will change
  pasivas_convertidas: string[]; // This will also change
}
*/ 