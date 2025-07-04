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

export interface SuggestionType {
  id: string;
  type: 'complex' | 'tone' | 'cliche';
  original: string;
  suggestion: string;
  reason: string;
  applied: boolean;
} 