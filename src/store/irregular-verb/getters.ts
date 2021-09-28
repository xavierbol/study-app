import { GetterTree } from "vuex";
import { IrregularVerb } from "@/models";
import { State } from "../state";
import { IrregularVerbState } from "./state";

type Getters = {
  totalCount: (state: IrregularVerbState) => number;
  getVerb: (
    state: IrregularVerbState
  ) => (id: number) => IrregularVerb | undefined;
};

export const getters: GetterTree<IrregularVerbState, State> & Getters = {
  totalCount(state) {
    return state.verbs.length;
  },
  getVerb(state) {
    return (id: number) => state.verbs.find((verb) => verb.id === id);
  },
};

export enum IrregularVerbsGetterTypes {
  totalCount = "irregularVerb/totalCount",
  getVerb = "irregularVerb/getVerb",
}

export type IrregularVerbGetters = {
  [IrregularVerbsGetterTypes.totalCount]: (state: IrregularVerbState) => number;
  [IrregularVerbsGetterTypes.getVerb]: (
    state: IrregularVerbState
  ) => (id: number) => IrregularVerb | undefined;
};
