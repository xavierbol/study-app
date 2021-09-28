import {
  Store as VuexStore,
  createStore,
  createLogger,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import mutations, { Mutations } from "./mutations";
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
import { irregularVerbModule } from "./irregular-verb";
import { IrregularVerbMutations } from "./irregular-verb/mutations";
import { IrregularVerbState } from "./irregular-verb/state";
import { IrregularVerbActions } from "./irregular-verb/actions";
import { IrregularVerbGetters } from "./irregular-verb/getters";

export const store = createStore({
  state,
  mutations,
  getters,
  modules: {
    toast: toastModule,
    vocabulary: vocabularyModule,
    irregularVerb: irregularVerbModule,
  },
  plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
});

export type Store = Omit<
  VuexStore<
    State & {
      toast: ToastState;
      vocabulary: VocabularyState;
      irregularVerb: IrregularVerbState;
    }
  >,
  "getters" | "commit" | "dispatch"
> & {
  commit<
    K extends keyof (Mutations &
      ToastMutations &
      VocabularyMutations &
      IrregularVerbMutations),
    P extends Parameters<
      (Mutations &
        ToastMutations &
        VocabularyMutations &
        IrregularVerbMutations)[K]
    >[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<
    (Mutations &
      ToastMutations &
      VocabularyMutations &
      IrregularVerbMutations)[K]
  >;
} & {
  dispatch<
    K extends keyof (ToastActions & VocabularyActions & IrregularVerbActions)
  >(
    key: K,
    payload?: Parameters<
      (ToastActions & VocabularyActions & IrregularVerbActions)[K]
    >[1],
    options?: DispatchOptions
  ): ReturnType<(ToastActions & VocabularyActions & IrregularVerbActions)[K]>;
} & {
  getters: {
    [K in keyof (Getters &
      VocabularyGetters &
      IrregularVerbGetters)]: ReturnType<
      (Getters & VocabularyGetters & IrregularVerbGetters)[K]
    >;
  };
};

export function useStore(): Store {
  return store as Store;
}
