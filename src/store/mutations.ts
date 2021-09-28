import { MutationTree } from "vuex";
import { State } from "./state";
import { Language } from "../models";

export enum MutationType {
  setLang = "SET_LANG",
}

export type Mutations<S = State> = {
  [MutationType.setLang](state: S, payload: Language): void;
};

const mutations: MutationTree<State> & Mutations = {
  [MutationType.setLang](state: State, lang: Language) {
    state.lang = lang;
  },
};

export default mutations;
