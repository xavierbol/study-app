import { GetterTree } from "vuex";
import { StateInterface } from "./state";

export enum GetterTypes {
  totalCount = "COUNT_TOTAL",
  countAnswers = "COUNT_NUMBER_OF_ANSWERS",
  remainingCount = "COUNT_REMAINING_VERBS",
  remainingVerbs = "GET_REMAINING_VERBS",
  selectIrregularVerbById = "SELECT_IRREGULAR_VERB_BY_ID",
  selectRandomVerb = "SELECT_RANDOM_VERB",
  getAnswers = "GET_ANSWERS",
}

const getters: GetterTree<StateInterface, StateInterface> = {
  [GetterTypes.totalCount](state) {
    return state.verbs.length;
  },
  [GetterTypes.countAnswers](state) {
    return Object.keys(state.answers).length;
  },
  [GetterTypes.remainingCount](state, getters) {
    return getters[GetterTypes.totalCount] - getters[GetterTypes.countAnswers];
  },
  [GetterTypes.remainingVerbs](state, getters) {
    if (getters[GetterTypes.countAnswers] === 0) return state.verbs;
    return state.verbs.filter((v) => !state.answers.hasOwnProperty(v.id));
  },
  [GetterTypes.selectIrregularVerbById](state) {
    return (id: number) => state.verbs.find((verb) => verb.id === id);
  },
  [GetterTypes.selectRandomVerb](state, getters) {
    const remainingVerbsToDo = getters[GetterTypes.remainingCount];
    if (remainingVerbsToDo === 0) return null;
    const remainingVerbs = getters[GetterTypes.remainingVerbs];
    if (remainingVerbsToDo === 1) return remainingVerbs[0];
    const random = () =>
      // return a number in this interval: [0; totalCount[
      Math.floor(Math.random() * remainingVerbsToDo);
    const index = random();
    return remainingVerbs[index];
  },
  [GetterTypes.getAnswers](state) {
    return Object.values(state.answers);
  },
};

export default getters;
