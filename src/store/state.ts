export type IrregularVerb = {
  id: number;
  infinitive: string;
  past_simple: string;
  past_simple_2: string;
  past_participle: string;
  translation: string;
};

export type Answer = IrregularVerb & { correct: boolean };

export interface StateInterface {
  loading: boolean;
  verbs: IrregularVerb[];
  error?: string;
  answers: Record<number, Answer>;
  exerciceDoneIds: Array<number>;
}

const defaultState: StateInterface = {
  loading: false,
  verbs: [],
  error: undefined,
  answers: {},
  exerciceDoneIds: [],
};

export default defaultState;
