import { ActionContext, ActionTree } from "vuex";
import { IrregularVerbMutations, Mutations, MutationType } from "./mutations";
import { IrregularVerbState } from "./state";
import { IrregularVerb } from "@/models";
import { headers } from "@/utils";
import { State } from "../state";
import { Getters } from "../getters";

const IRREGULAR_VERB_ROUTE = "/irregular_verbs";

export enum ActionTypes {
  getVerbs = "GET_VERBS",
  deleteVerb = "DELETE_VERB",
  createVerb = "CREATE_VERB",
  updateVerb = "UPDATE_VERB",
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
  [ActionTypes.getVerbs]({
    commit,
    rootGetters,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.createVerb](
    { commit, rootGetters }: AugmentedActionContext,
    payload: IrregularVerb
  ): Promise<void>;
  [ActionTypes.deleteVerb](
    { commit, rootGetters }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
  [ActionTypes.updateVerb](
    { commit, rootGetters }: AugmentedActionContext,
    payload: Partial<IrregularVerb> & { id: number }
  ): Promise<void>;
}

export const actions: ActionTree<IrregularVerbState, State> & Actions = {
  async [ActionTypes.getVerbs]({ commit, rootGetters }) {
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
  async [ActionTypes.createVerb]({ commit, rootGetters }, verb: IrregularVerb) {
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
  async [ActionTypes.updateVerb](
    { commit, rootGetters },
    updatedVerb: Partial<IrregularVerb> & { id: number }
  ): Promise<void> {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(`${IRREGULAR_VERB_ROUTE}/${updatedVerb.id}`),
        {
          method: "PUT",
          headers,
        }
      );

      if (result.ok && result.status === 203) {
        commit(MutationType.updateIrregularVerb, await result.json());
      } else {
        const error = await result.text();
        console.error(error);
        commit(MutationType.setError, error);
      }
    } catch (err) {
      console.error(err);
      commit(MutationType.setError, String(err));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.deleteVerb]({ commit, rootGetters }, verbId: number) {
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
  getVerbs = "irregularVerb/GET_VERBS",
  createVerb = "irregularVerb/CREATE_VERB",
  updateVerb = "irregularVerb/UPDATE_VERB",
  deleteVerb = "irregularVerb/DELETE_VERB",
}

type IrregularVerbAugmentedActionContext = {
  commit<K extends keyof IrregularVerbMutations>(
    key: K,
    payload: Parameters<IrregularVerbMutations[K]>[1]
  ): ReturnType<IrregularVerbMutations[K]>;
} & Omit<ActionContext<IrregularVerbState, State>, "commit">;

export interface IrregularVerbActions {
  [IrregularVerbActionTypes.getVerbs]({
    commit,
  }: IrregularVerbAugmentedActionContext): Promise<void>;
  [IrregularVerbActionTypes.createVerb](
    { commit }: IrregularVerbAugmentedActionContext,
    payload: IrregularVerb
  ): Promise<void>;
  [IrregularVerbActionTypes.updateVerb](
    { commit, rootGetters }: IrregularVerbAugmentedActionContext,
    payload: Partial<IrregularVerb> & { id: number }
  ): Promise<void>;
  [IrregularVerbActionTypes.deleteVerb](
    { commit }: IrregularVerbAugmentedActionContext,
    payload: number
  ): Promise<void>;
}
