import {
  Store as VuexStore,
  createStore,
  createLogger,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import mutations, { Mutations } from "./mutations";
import actions, { Actions } from "./actions";
import getters, { Getters } from "./getters";
import state, { State } from "./state";
import { ToastState } from "./toast/state";
import { ToastMutations } from "./toast/mutations";
import { toastModule } from "./toast";
import { ToastActions } from "./toast/actions";

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    toast: toastModule,
  },
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export type Store = Omit<
  VuexStore<State & { toast: ToastState }>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof (Mutations & ToastMutations),
    P extends Parameters<(Mutations & ToastMutations)[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<(Mutations & ToastMutations)[K]>;
} & {
  dispatch<K extends keyof (Actions & ToastActions)>(
    key: K,
    payload?: Parameters<(Actions & ToastActions)[K]>[1],
    options?: DispatchOptions
  ): ReturnType<(Actions & ToastActions)[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore(): Store {
  return store as Store;
}
