import { Vocabulary } from "@/models";
import { getRoute, headers } from "@/utils";
import { ActionContext, ActionTree } from "vuex";
import { State } from "../state";
import { Mutations, MutationType, VocabularyMutations } from "./mutations";
import { VocabularyState } from "./state";

const VOCABULARY_URL = getRoute("/vocabularies");

export enum ActionTypes {
  getVocabularies = "GET_VOCABULARIES",
  deleteVocabulary = "DELETE_VOCABULARY",
  createVocabulary = "CREATE_VOCABULARY",
  updateVocabulary = "UPDATE_VOCABULARY",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<VocabularyState, State>, "commit">;

export interface Actions {
  [ActionTypes.getVocabularies]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.createVocabulary](
    { commit }: AugmentedActionContext,
    payload: Vocabulary
  ): Promise<void>;
  [ActionTypes.deleteVocabulary](
    { commit }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
  [ActionTypes.updateVocabulary](
    { commit }: AugmentedActionContext,
    payload: Partial<Vocabulary> & { id: number }
  ): Promise<void>;
}

export const actions: ActionTree<VocabularyState, State> & Actions = {
  async [ActionTypes.getVocabularies]({ commit }: AugmentedActionContext) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(VOCABULARY_URL, {
        method: "GET",
        headers,
      });
      if (result.ok) {
        const json = (await result.json()) as Array<Vocabulary>;
        commit(MutationType.setVocabularies, json);
      } else {
        commit(MutationType.setError, await result.text());
      }
    } catch (err) {
      console.error(err);
      commit(MutationType.setError, err);
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.createVocabulary]({ commit }, vocabulary) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(VOCABULARY_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(vocabulary),
      });

      if (result.ok) {
        const newVocabulary = (await result.json()) as Vocabulary;
        commit(MutationType.createVocabulary, newVocabulary);
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
  async [ActionTypes.deleteVocabulary]({ commit }, vocabularyId) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        `${VOCABULARY_URL}/${vocabularyId}`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (result.ok && result.status === 204) {
        commit(MutationType.removeVocabulary, vocabularyId);
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
  async [ActionTypes.updateVocabulary]({ commit }, vocabularyUpdated) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        `${VOCABULARY_URL}/${vocabularyUpdated.id}`,
        {
          method: "PUT",
          headers,
        }
      );

      if (result.ok && result.status === 204) {
        commit(MutationType.updateVocabulary, vocabularyUpdated);
      } else {
        const err = await result.text();
        console.error(err);
        commit(MutationType.setError, err);
      }
    } catch (err) {
      console.error(err);
      commit(MutationType.setError, err);
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
};

export enum VocabularyActionTypes {
  getVocabularies = "vocabulary/GET_VOCABULARIES",
  deleteVocabulary = "vocabulary/DELETE_VOCABULARY",
  createVocabulary = "vocabulary/CREATE_VOCABULARY",
  updateVocabulary = "vocabulary/UPDATE_VOCABULARY",
}

type ToastAugmentedActionContext = {
  commit<K extends keyof VocabularyMutations>(
    key: K,
    payload: Parameters<VocabularyMutations[K]>[1]
  ): ReturnType<VocabularyMutations[K]>;
} & Omit<ActionContext<VocabularyState, State>, "commit">;

export interface VocabularyActions {
  [VocabularyActionTypes.getVocabularies]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  [VocabularyActionTypes.createVocabulary](
    { commit }: AugmentedActionContext,
    payload: Vocabulary
  ): Promise<void>;
  [VocabularyActionTypes.deleteVocabulary](
    { commit }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
  [VocabularyActionTypes.updateVocabulary](
    { commit }: AugmentedActionContext,
    payload: Partial<Vocabulary> & { id: number }
  ): Promise<void>;
}
