import { Module } from "vuex";
import { State } from "../state";
import { IrregularVerbState, state } from "./state";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { actions } from "./actions";

export const irregularVerbModule: Module<IrregularVerbState, State> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
