import { MutationTree } from "vuex";
import { ToastPosition, ToastState } from "./state";

export enum MutationType {
  show = "SHOW",
  toggle = "TOGGLE",
  setShow = "SET_SHOW",
  setMessage = "SET_MESSAGE",
  setPosition = "SET_POSITION",
  setToast = "SET_TOAST",
}

export type Mutations<S = ToastState> = {
  [MutationType.show](state: S): void;
  [MutationType.toggle](state: S): void;
  [MutationType.setShow](state: S, payload: boolean): void;
  [MutationType.setMessage](state: S, payload: string): void;
  [MutationType.setPosition](state: S, payload: ToastPosition): void;
  [MutationType.setToast](state: S, payload: Partial<ToastState>): void;
};

export const mutations: MutationTree<ToastState> & Mutations = {
  [MutationType.show](state) {
    state.show = true;
  },
  [MutationType.toggle](state) {
    state.show = !state.show;
  },
  [MutationType.setShow](state, payload) {
    state.show = payload;
  },
  [MutationType.setMessage](state, payload) {
    state.message = payload;
  },
  [MutationType.setPosition](state, payload) {
    state.position = payload;
  },
  [MutationType.setToast](state, payload) {
    state.message = payload.message || state.message;
    state.position = payload.position || state.position;
    state.show = payload.show || state.show;
  },
};

export enum ToastMutationType {
  show = "toast/SHOW",
  toggle = "toast/TOGGLE",
  setShow = "toast/SET_SHOW",
  setMessage = "toast/SET_MESSAGE",
  setPosition = "toast/SET_POSITION",
  setToast = "toast/SET_TOAST",
}

export type ToastMutations<S = ToastState> = {
  [ToastMutationType.show](state: S): void;
  [ToastMutationType.toggle](state: S): void;
  [ToastMutationType.setShow](state: S, payload: boolean): void;
  [ToastMutationType.setMessage](state: S, payload: string): void;
  [ToastMutationType.setPosition](state: S, payload: ToastPosition): void;
  [ToastMutationType.setToast](state: S, payload: Partial<ToastState>): void;
};
