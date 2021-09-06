export interface IrregularVerb {
  id: number;
  infinitive: string;
  past_simple: string;
  past_simple_2: string;
  past_participle: string;
  translation: string;
}

export interface Vocabulary {
  id: number;
  word: string;
  translation: string;
}

export type Exercise = IrregularVerb | Vocabulary;

export type Answer<T extends Exercise> = T & {
  correct: boolean;
};

export function isIrregularVerb(exercise: Exercise): exercise is IrregularVerb {
  return (exercise as IrregularVerb).infinitive !== undefined;
}
