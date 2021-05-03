import { MutationTree } from "vuex";
import { IrregularVerb, StateInterface } from "./state";

export enum MutationType {
  CreateIrregularVerb = "CREATE_IRREGULAR_VERB",
  SetIrregularVerbs = "SET_IRREGULAR_VERBS",
  RemoveIrregularVerb = "REMOVE_IRREGULAR_VERB",
  CompleteIrregularVerb = "COMPLET_IRREGULAR_VERB",
  AddAnswer = "ADD_ANSWER",
  ClearAnswer = "CLEAR_ANSWERS",
  SetLoading = "SET_LOADING",
  ErrorIrregularVerb = "ERROR_IRREGULAR_VERB",
}

const mutations: MutationTree<StateInterface> = {
  [MutationType.CreateIrregularVerb](
    state: StateInterface,
    verb: IrregularVerb
  ) {
    state.verbs.push(verb);
    state.error = undefined;
  },
  [MutationType.SetIrregularVerbs](
    state: StateInterface,
    verbs: IrregularVerb[]
  ) {
    state.verbs = verbs;
    state.error = undefined;
  },
  [MutationType.RemoveIrregularVerb](state: StateInterface, verbId: number) {
    state.verbs = state.verbs.filter((verb) => verb.id !== verbId);
    state.error = undefined;
  },
  [MutationType.CompleteIrregularVerb](
    state: StateInterface,
    verb: IrregularVerb
  ) {
    const index = state.verbs.findIndex((v) => v.id === verb.id);
    state.verbs[index] = {
      ...state.verbs[index],
      ...verb,
    };
    state.error = undefined;
  },
  [MutationType.AddAnswer](state: StateInterface, answer: [number, boolean]) {
    if (state.answers.hasOwnProperty(answer[0])) {
      return;
    }
    state.answers[answer[0]] = answer[1];
    state.error = undefined;
  },
  [MutationType.ClearAnswer](state: StateInterface) {
    state.answers = {};
    state.error = undefined;
  },
  [MutationType.SetLoading](state: StateInterface, loading: boolean) {
    state.loading = loading;
  },
  [MutationType.ErrorIrregularVerb](state: StateInterface, error: string) {
    state.error = error;
  },
};

export default mutations;
