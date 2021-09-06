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

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore(): Store {
  return store as Store;
}
