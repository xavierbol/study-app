import { ActionContext, ActionTree } from "vuex";
import { State } from "../state";
import { Mutations, MutationType, ToastMutations } from "./mutations";
import { ToastState } from "./state";

enum ActionTypes {
  show = "SHOW",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<ToastState, State>, "commit">;

interface Actions {
  [ActionTypes.show](
    { commit }: AugmentedActionContext,
    payload: string
  ): Promise<void>;
}

export const actions: ActionTree<ToastState, State> & Actions = {
  [ActionTypes.show]({ commit }, payload) {
    commit(MutationType.setToast, { message: payload, show: true });
    return new Promise((resolve) => {
      setTimeout(() => {
        commit(MutationType.toggle, undefined);
        resolve();
      }, 3000);
    });
  },
};

export enum ToastActionTypes {
  show = "toast/SHOW",
}

type ToastAugmentedActionContext = {
  commit<K extends keyof ToastMutations>(
    key: K,
    payload: Parameters<ToastMutations[K]>[1]
  ): ReturnType<ToastMutations[K]>;
} & Omit<ActionContext<ToastState, State>, "commit">;

export interface ToastActions {
  [ToastActionTypes.show](
    { commit }: ToastAugmentedActionContext,
    payload: string
  ): Promise<void>;
}
