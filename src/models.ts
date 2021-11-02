export type Language = "nl" | "en";

export interface IrregularVerb {
  id: number;
  infinitive: string;
  past_simple: string;
  past_simple2: string;
  past_participle: string;
  translation: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Vocabulary {
  id: number;
  word: string;
  translation: string;
  category_id: number | "";
}

export type Exercise = IrregularVerb | Vocabulary;

export type Answer<T extends Exercise> = T & {
  correct: boolean;
};

export function isIrregularVerb(exercise: Exercise): exercise is IrregularVerb {
  return (exercise as IrregularVerb).infinitive !== undefined;
}
