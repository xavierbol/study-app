import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import { IrregularVerb } from "../models";

const SERVER_URL = "http://localhost:3333/api";
const IRREGULAR_VERB_URL = `${SERVER_URL}/irregular_verbs`;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
};

export enum ActionTypes {
  GetVerbs = "GET_VERBS",
  DeleteVerb = "DELETE_VERB",
  CreateVerb = "CREATE_VERB",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.GetVerbs]({ commit }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CreateVerb](
    { commit }: AugmentedActionContext,
    payload: IrregularVerb
  ): Promise<void>;
  [ActionTypes.DeleteVerb](
    { commit }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
}

const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetVerbs]({ commit }) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(IRREGULAR_VERB_URL, {
        method: "GET",
        headers,
      });

      if (result.ok) {
        const json = (await result.json()) as Array<IrregularVerb>;
        commit(MutationType.setIrregularVerbs, json);
      } else {
        commit(MutationType.setError, await result.text());
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.setError, error);
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.CreateVerb]({ commit }, verb: IrregularVerb) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(IRREGULAR_VERB_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(verb),
      });

      if (result.ok) {
        const newVerb = (await result.json()) as IrregularVerb;
        commit(MutationType.createIrregularVerb, newVerb);
      } else {
        const error = await result.text();
        console.error(error);
        commit(MutationType.setError, error);
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.setError, error);
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.DeleteVerb]({ commit }, verbId: number) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(`${IRREGULAR_VERB_URL}/${verbId}`, {
        method: "DELETE",
        headers,
      });

      if (result.ok && result.status === 204) {
        commit(MutationType.removeIrregularVerb, verbId);
      } else {
        const error = await result.text();
        console.error(error);
        commit(MutationType.setError, error);
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.setError, error);
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
};

export default actions;
