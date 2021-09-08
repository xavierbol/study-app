import { Module } from "vuex";
import { VocabularyState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";
import { State } from "../state";

export const vocabularyModule: Module<VocabularyState, State> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
