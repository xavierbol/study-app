import { Vocabulary } from "@/models";
import { MutationTree } from "vuex";
import { VocabularyState } from "./state";

export enum MutationType {
  createVocabulary = "CREATE_VOCABULARY",
  setVocabularies = "SET_VOCABULARIES",
  removeVocabulary = "REMOVE_VOCABULARY",
  updateVocabulary = "UPDATE_VOCABULARY",
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
  [VocabularyMutationTypes.setLoading](state: S, payload: boolean): void;
  [VocabularyMutationTypes.setError](state: S, payload: string): void;
};
