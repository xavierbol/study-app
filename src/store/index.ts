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
import { VocabularyMutations } from "./vocabulary/mutations";
import { VocabularyActions } from "./vocabulary/actions";
import { VocabularyState } from "./vocabulary/state";
import { vocabularyModule } from "./vocabulary";
import { VocabularyGetters } from "./vocabulary/getters";

export const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    toast: toastModule,
    vocabulary: vocabularyModule,
  },
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export type Store = Omit<
  VuexStore<State & { toast: ToastState; vocabulary: VocabularyState }>,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof (Mutations & ToastMutations & VocabularyMutations),
    P extends Parameters<
      (Mutations & ToastMutations & VocabularyMutations)[K]
    >[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<(Mutations & ToastMutations & VocabularyMutations)[K]>;
} & {
  dispatch<K extends keyof (Actions & ToastActions & VocabularyActions)>(
    key: K,
    payload?: Parameters<(Actions & ToastActions & VocabularyActions)[K]>[1],
    options?: DispatchOptions
  ): ReturnType<(Actions & ToastActions & VocabularyActions)[K]>;
} & {
  getters: {
    [K in keyof (Getters & VocabularyGetters)]: ReturnType<
      (Getters & VocabularyGetters)[K]
    >;
  };
};

export function useStore(): Store {
  return store as Store;
}
