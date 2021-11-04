import { Category, Vocabulary } from "@/models";
import { MutationTree } from "vuex";
import { VocabularyState } from "./state";

export enum MutationType {
  createVocabulary = "CREATE_VOCABULARY",
  setVocabularies = "SET_VOCABULARIES",
  removeVocabulary = "REMOVE_VOCABULARY",
  updateVocabulary = "UPDATE_VOCABULARY",
  createCategory = "CREATE_CATEGORY",
  setCategories = "SET_CATEGORIES",
  setLoading = "SET_LOADING",
  setError = "SET_ERROR",
}

export type Mutations<S = VocabularyState> = {
  [MutationType.createVocabulary](state: S, payload: Vocabulary): void;
  [MutationType.setVocabularies](state: S, payload: Vocabulary[]): void;
  [MutationType.removeVocabulary](state: S, payload: number): void;
  [MutationType.updateVocabulary](
    state: S,
    payload: Partial<Vocabulary> & { id: number }
  ): void;
  [MutationType.createCategory](state: S, payload: Category): void;
  [MutationType.setCategories](state: S, payload: Category[]): void;
  [MutationType.setLoading](state: S, payload: boolean): void;
  [MutationType.setError](state: S, payload: string): void;
};

export const mutations: MutationTree<VocabularyState> & Mutations = {
  [MutationType.createVocabulary](state, vocabulary) {
    state.vocabularies.push(vocabulary);
    state.error = undefined;
  },
  [MutationType.setVocabularies](state, vocabularies) {
    state.vocabularies = vocabularies;
    state.error = undefined;
  },
  [MutationType.removeVocabulary](state, vocabularyId) {
    state.vocabularies = state.vocabularies.filter(
      (voc) => voc.id !== vocabularyId
    );
    state.error = undefined;
  },
  [MutationType.updateVocabulary](state, vocabularyUpdated) {
    const index = state.vocabularies.findIndex(
      (voc) => voc.id === vocabularyUpdated.id
    );
    state.vocabularies[index] = {
      ...state.vocabularies[index],
      ...vocabularyUpdated,
    };
  },
  [MutationType.createCategory](state, category) {
    state.categories.push(category);
    state.error = undefined;
  },
  [MutationType.setCategories](state, categories) {
    state.categories = categories;
    state.error = undefined;
  },
  [MutationType.setLoading](state, loading) {
    state.loading = loading;
  },
  [MutationType.setError](state, error) {
    state.error = error;
  },
};

export enum VocabularyMutationTypes {
  createVocabulary = "vocabulary/CREATE_VOCABULARY",
  setVocabularies = "vocabulary/SET_VOCABULARIES",
  removeVocabulary = "vocabulary/REMOVE_VOCABULARY",
  updateVocabulary = "vocabulary/UPDATE_VOCABULARY",
  createCategory = "vocabulary/CREATE_VOCABULARY",
  setCategories = "vocabulary/SET_CATEGORIES",
  setLoading = "vocabulary/SET_LOADING",
  setError = "vocabulary/SET_ERROR",
}

export type VocabularyMutations<S = VocabularyState> = {
  [VocabularyMutationTypes.createVocabulary](
    state: S,
    payload: Vocabulary
  ): void;
  [VocabularyMutationTypes.setVocabularies](
    state: S,
    payload: Vocabulary[]
  ): void;
  [VocabularyMutationTypes.removeVocabulary](state: S, payload: number): void;
  [VocabularyMutationTypes.updateVocabulary](
    state: S,
    payload: Partial<Vocabulary> & { id: number }
  ): void;
  [VocabularyMutationTypes.createCategory](state: S, payload: Category): void;
  [VocabularyMutationTypes.setCategories](state: S, payload: Category[]): void;
  [VocabularyMutationTypes.setLoading](state: S, payload: boolean): void;
  [VocabularyMutationTypes.setError](state: S, payload: string): void;
};
