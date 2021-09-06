import { IrregularVerb } from "@/models";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  totalCount: (state: State) => number;
  getVerb: (state: State) => (id: number) => IrregularVerb | undefined;
};

const getters: GetterTree<State, State> & Getters = {
  totalCount(state) {
    return state.verbs.length;
  },
  getVerb(state) {
    return (id: number) => state.verbs.find((verb) => verb.id === id);
  },
};

export default getters;
