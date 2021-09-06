import { Mutation, MutationTree } from "vuex";
import { State } from "./state";
import { Answer, IrregularVerb, Vocabulary } from "../models";

export enum MutationType {
  createIrregularVerb = "CREATE_IRREGULAR_VERB",
  setIrregularVerbs = "SET_IRREGULAR_VERBS",
  removeIrregularVerb = "REMOVE_IRREGULAR_VERB",
  updateIrregularVerb = "UPDATE_IRREGULAR_VERB",
  setLoading = "SET_LOADING",
  setError = "SET_ERROR",
}

export type Mutations<S = State> = {
  [MutationType.createIrregularVerb](state: S, payload: IrregularVerb): void;
  [MutationType.setIrregularVerbs](state: S, payload: IrregularVerb[]): void;
  [MutationType.removeIrregularVerb](state: S, payload: number): void;
  [MutationType.updateIrregularVerb](
    state: S,
    payload: Partial<IrregularVerb> & { id: number }
  ): void;
  [MutationType.setLoading](state: S, payload: boolean): void;
  [MutationType.setError](state: S, payload: string): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationType.createIrregularVerb](state: State, verb: IrregularVerb) {
    state.verbs.push(verb);
    state.error = undefined;
  },
  [MutationType.setIrregularVerbs](state: State, verbs: IrregularVerb[]) {
    state.verbs = verbs;
    state.error = undefined;
  },
  [MutationType.removeIrregularVerb](state: State, verbId: number) {
    state.verbs = state.verbs.filter((verb) => verb.id !== verbId);
    state.error = undefined;
  },
  [MutationType.updateIrregularVerb](
    state: State,
    verb: Partial<IrregularVerb> & { id: number }
  ) {
    const index = state.verbs.findIndex((v) => v.id === verb.id);
    state.verbs[index] = {
      ...state.verbs[index],
      ...verb,
    };
    state.error = undefined;
  },
  [MutationType.setLoading](state: State, loading: boolean) {
    state.loading = loading;
  },
  [MutationType.setError](state: State, error: string) {
    state.error = error;
  },
};

export default mutations;
