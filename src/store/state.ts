export type IrregularVerb = {
  id: number;
  infinitive: string;
  past_simple: string;
  past_simple_2: string;
  past_participle: string;
  translation: string;
};

export interface StateInterface {
  loading: boolean;
  verbs: IrregularVerb[];
  error?: string;
  answers: Set<number>;
}

const defaultState: StateInterface = {
  loading: false,
  verbs: [],
  error: undefined,
  answers: new Set(),
};

export default defaultState;
