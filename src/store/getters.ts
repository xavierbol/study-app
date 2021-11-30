import { getRoute } from "@/utils";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  getApiRoute: (state: State) => (path: string) => string;
  getLang: (state: State) => string;
};

const getters: GetterTree<State, State> & Getters = {
  getApiRoute(state) {
    return (path) => getRoute(`/${state.lang}${path}`);
  },
  getLang(state) {
    return state.lang === "nl" ? "néerlandais" : "anglais";
  },
};

export default getters;
