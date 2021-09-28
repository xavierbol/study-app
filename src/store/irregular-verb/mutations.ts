import { MutationTree } from "vuex";
import { IrregularVerb } from "@/models";
import { IrregularVerbState } from "./state";

export enum MutationType {
  createIrregularVerb = "CREATE_IRREGULAR_VERB",
  setIrregularVerbs = "SET_IRREGULAR_VERBS",
  removeIrregularVerb = "REMOVE_IRREGULAR_VERB",
  updateIrregularVerb = "UPDATE_IRREGULAR_VERB",
  setLoading = "SET_LOADING",
  setError = "SET_ERROR",
}

export type Mutations<S = IrregularVerbState> = {
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

export const mutations: MutationTree<IrregularVerbState> & Mutations = {
  [MutationType.createIrregularVerb](
    state: IrregularVerbState,
    verb: IrregularVerb
  ) {
    state.verbs.push(verb);
    state.error = undefined;
  },
  [MutationType.setIrregularVerbs](
    state: IrregularVerbState,
    verbs: IrregularVerb[]
  ) {
    state.verbs = verbs;
    state.error = undefined;
  },
  [MutationType.removeIrregularVerb](
    state: IrregularVerbState,
    verbId: number
  ) {
    state.verbs = state.verbs.filter((verb) => verb.id !== verbId);
    state.error = undefined;
  },
  [MutationType.updateIrregularVerb](
    state: IrregularVerbState,
    verb: Partial<IrregularVerb> & { id: number }
  ) {
    const index = state.verbs.findIndex((v) => v.id === verb.id);
    state.verbs[index] = {
      ...state.verbs[index],
      ...verb,
    };
    state.error = undefined;
  },
  [MutationType.setLoading](state: IrregularVerbState, loading: boolean) {
    state.loading = loading;
  },
  [MutationType.setError](state: IrregularVerbState, error: string) {
    state.error = error;
  },
};

export enum IrregularVerbMutationTypes {
  createIrregularVerb = "irregularVerb/CREATE_IRREGULAR_VERB",
  setIrregularVerbs = "irregularVerb/SET_IRREGULAR_VERBS",
  removeIrregularVerb = "irregularVerb/REMOVE_IRREGULAR_VERB",
  updateIrregularVerb = "irregularVerb/UPDATE_IRREGULAR_VERB",
  setLoading = "irregularVerb/SET_LOADING",
  setError = "irregularVerb/SET_ERROR",
}

export type IrregularVerbMutations<S = IrregularVerbState> = {
  [IrregularVerbMutationTypes.createIrregularVerb](
    state: S,
    payload: IrregularVerb
  ): void;
  [IrregularVerbMutationTypes.setIrregularVerbs](
    state: S,
    payload: IrregularVerb[]
  ): void;
  [IrregularVerbMutationTypes.removeIrregularVerb](
    state: S,
    payload: number
  ): void;
  [IrregularVerbMutationTypes.updateIrregularVerb](
    state: S,
    payload: Partial<IrregularVerb> & { id: number }
  ): void;
  [IrregularVerbMutationTypes.setLoading](state: S, payload: boolean): void;
  [IrregularVerbMutationTypes.setError](state: S, payload: string): void;
};
