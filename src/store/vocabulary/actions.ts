import { Category, Vocabulary } from "@/models";
import { headers } from "@/utils";
import { ActionContext, ActionTree } from "vuex";
import { Getters } from "../getters";
import { State } from "../state";
import { Mutations, MutationType, VocabularyMutations } from "./mutations";
import { VocabularyState } from "./state";

const VOCABULARY_ROUTE = "/vocabularies";
const CATEGORY_ROUTE = "/categories";

export enum ActionTypes {
  getVocabularies = "GET_VOCABULARIES",
  deleteVocabulary = "DELETE_VOCABULARY",
  createVocabulary = "CREATE_VOCABULARY",
  updateVocabulary = "UPDATE_VOCABULARY",
  getCategories = "GET_CATEGORIES",
  createCategory = "CREATE_CATEGORY",
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
  rootGetters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & Omit<ActionContext<VocabularyState, State>, "commit">;

export interface Actions {
  [ActionTypes.getVocabularies]({
    commit,
    rootGetters,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.createVocabulary](
    { commit, rootGetters }: AugmentedActionContext,
    payload: Vocabulary
  ): Promise<void>;
  [ActionTypes.deleteVocabulary](
    { commit, rootGetters }: AugmentedActionContext,
    payload: number
  ): Promise<void>;
  [ActionTypes.updateVocabulary](
    { commit, rootGetters }: AugmentedActionContext,
    payload: Partial<Vocabulary> & { id: number }
  ): Promise<void>;
  [ActionTypes.getCategories]({
    commit,
    rootGetters,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.createCategory](
    { commit, rootGetters }: AugmentedActionContext,
    category: Category
  ): Promise<void>;
}

export const actions: ActionTree<VocabularyState, State> & Actions = {
  async [ActionTypes.getVocabularies]({
    commit,
    rootGetters,
  }: AugmentedActionContext) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(VOCABULARY_ROUTE),
        {
          method: "GET",
          headers,
        }
      );
      if (result.ok) {
        const json = (await result.json()) as Array<Vocabulary>;
        commit(MutationType.setVocabularies, json);
      } else {
        commit(MutationType.setError, await result.text());
      }
    } catch (err) {
      console.error(err);
      commit(MutationType.setError, String(err));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.createVocabulary]({ commit, rootGetters }, vocabulary) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(VOCABULARY_ROUTE),
        {
          method: "POST",
          headers,
          body: JSON.stringify(vocabulary),
        }
      );

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
      commit(MutationType.setError, String(error));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.deleteVocabulary]({ commit, rootGetters }, vocabularyId) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(`${VOCABULARY_ROUTE}/${vocabularyId}`),
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
      commit(MutationType.setError, String(error));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.updateVocabulary](
    { commit, rootGetters },
    vocabularyUpdated
  ) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(`${VOCABULARY_ROUTE}/${vocabularyUpdated.id}`),
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
      commit(MutationType.setError, String(err));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.getCategories]({
    commit,
    rootGetters,
  }: AugmentedActionContext) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(CATEGORY_ROUTE),
        {
          method: "GET",
          headers,
        }
      );
      if (result.ok) {
        const json = (await result.json()) as Array<Category>;
        commit(MutationType.setCategories, json);
      } else {
        commit(MutationType.setError, await result.text());
      }
    } catch (err) {
      console.error(err);
      commit(MutationType.setError, String(err));
    } finally {
      commit(MutationType.setLoading, false);
    }
  },
  async [ActionTypes.createCategory](
    { commit, rootGetters }: AugmentedActionContext,
    category: Category
  ) {
    commit(MutationType.setLoading, true);
    try {
      const result: Response = await fetch(
        rootGetters.getApiRoute(CATEGORY_ROUTE),
        {
          method: "POST",
          headers,
          body: JSON.stringify(category),
        }
      );
      if (result.ok) {
        const newCategory = (await result.json()) as Category;
        commit(MutationType.createCategory, newCategory);
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
};

export enum VocabularyActionTypes {
  getVocabularies = "vocabulary/GET_VOCABULARIES",
  deleteVocabulary = "vocabulary/DELETE_VOCABULARY",
  createVocabulary = "vocabulary/CREATE_VOCABULARY",
  updateVocabulary = "vocabulary/UPDATE_VOCABULARY",
  createCategory = "vocabulary/CREATE_CATEGORY",
  getCategories = "vocabulary/GET_CATEGORIES",
}

type VocabularyAugmentedActionContext = {
  commit<K extends keyof VocabularyMutations>(
    key: K,
    payload: Parameters<VocabularyMutations[K]>[1]
  ): ReturnType<VocabularyMutations[K]>;
} & Omit<ActionContext<VocabularyState, State>, "commit">;

export interface VocabularyActions {
  [VocabularyActionTypes.getVocabularies]({
    commit,
    rootGetters,
  }: VocabularyAugmentedActionContext): Promise<void>;
  [VocabularyActionTypes.createVocabulary](
    { commit, rootGetters }: VocabularyAugmentedActionContext,
    payload: Vocabulary
  ): Promise<void>;
  [VocabularyActionTypes.deleteVocabulary](
    { commit, rootGetters }: VocabularyAugmentedActionContext,
    payload: number
  ): Promise<void>;
  [VocabularyActionTypes.updateVocabulary](
    { commit, rootGetters }: VocabularyAugmentedActionContext,
    payload: Partial<Vocabulary> & { id: number }
  ): Promise<void>;
  [VocabularyActionTypes.createCategory](
    { commit, rootGetters }: VocabularyAugmentedActionContext,
    payload: Category
  ): Promise<void>;
  [VocabularyActionTypes.getCategories]({
    commit,
    rootGetters,
  }: VocabularyAugmentedActionContext): Promise<void>;
}
