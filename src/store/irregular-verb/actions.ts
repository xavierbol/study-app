import { ActionContext, ActionTree } from "vuex";
import { IrregularVerbMutations, Mutations, MutationType } from "./mutations";
import { IrregularVerbState } from "./state";
import { IrregularVerb } from "@/models";
import { headers } from "@/utils";
import { State } from "../state";
import { Getters } from "../getters";

const IRREGULAR_VERB_ROUTE = "/irregular_verbs";

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
  rootGetters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & Omit<ActionContext<IrregularVerbState, State>, "commit" | "rootGetters">;

export interface Actions {
  [ActionTypes.GetVerbs]({
    commit,
    rootGetters,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.CreateVerb](
    { commit, rootGetters }: AugmentedActionContext,
    payload: IrregularVerb
  ): Promise<void>;
  [ActionTypes.DeleteVerb](
    { commit, rootGetters }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
}

export const actions: ActionTree<IrregularVerbState, State> & Actions = {
  async [ActionTypes.GetVerbs]({ commit, rootGetters }) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(IRREGULAR_VERB_ROUTE),
        {
          method: "GET",
          headers,
        }
      );

      if (result.ok) {
        const json = (await result.json()) as Array<IrregularVerb>;
        commit(MutationType.setIrregularVerbs, json);
      } else {
        commit(MutationType.setError, await result.text());
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.setError, String(error));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.CreateVerb]({ commit, rootGetters }, verb: IrregularVerb) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(IRREGULAR_VERB_ROUTE),
        {
          method: "POST",
          headers,
          body: JSON.stringify(verb),
        }
      );

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
      commit(MutationType.setError, String(error));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.DeleteVerb]({ commit, rootGetters }, verbId: number) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(`${IRREGULAR_VERB_ROUTE}/${verbId}`),
        {
          method: "DELETE",
          headers,
        }
      );

      if (result.ok && result.status === 204) {
        commit(MutationType.removeIrregularVerb, verbId);
      } else {
        const error = await result.text();
        console.error(error);
        commit(MutationType.setError, error);
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.setError, String(error));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
};

export enum IrregularVerbActionTypes {
  GetVerbs = "irregularVerb/GET_VERBS",
  DeleteVerb = "irregularVerb/DELETE_VERB",
  CreateVerb = "irregularVerb/CREATE_VERB",
}

type IrregularVerbAugmentedActionContext = {
  commit<K extends keyof IrregularVerbMutations>(
    key: K,
    payload: Parameters<IrregularVerbMutations[K]>[1]
  ): ReturnType<IrregularVerbMutations[K]>;
} & Omit<ActionContext<IrregularVerbState, State>, "commit">;

export interface IrregularVerbActions {
  [IrregularVerbActionTypes.GetVerbs]({
    commit,
  }: IrregularVerbAugmentedActionContext): Promise<void>;
  [IrregularVerbActionTypes.CreateVerb](
    { commit }: IrregularVerbAugmentedActionContext,
    payload: IrregularVerb
  ): Promise<void>;
  [IrregularVerbActionTypes.DeleteVerb](
    { commit }: IrregularVerbAugmentedActionContext,
    payload: number
  ): Promise<void>;
}
