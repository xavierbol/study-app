import { Module } from "vuex";
import { State } from "../state";
import { ToastState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const toastModule: Module<ToastState, State> = {
  namespaced: true,
  state,
  mutations,
  actions,
};
