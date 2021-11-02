import { Category, Vocabulary } from "@/models";
import { GetterTree } from "vuex";
import { State } from "../state";
import { VocabularyState } from "./state";

type Getters = {
  totalCount: (state: VocabularyState) => number;
  getVocabulary: (
    state: VocabularyState
  ) => (id: number) => Vocabulary | undefined;
  getCategory: (state: VocabularyState) => (id: number) => Category | undefined;
  getCategoryEntries: (state: VocabularyState) => Record<number, Category>;
  countCategories: (state: VocabularyState) => number;
};

export const getters: GetterTree<VocabularyState, State> & Getters = {
  totalCount(state) {
    return state.vocabularies.length;
  },
  getVocabulary(state) {
    return (vocabularyId: number) =>
      state.vocabularies.find((voc) => voc.id === vocabularyId);
  },
  getCategory(state) {
    return (categoryId: number) =>
      state.categories.find((cat) => cat.id === categoryId);
  },
  getCategoryEntries(state) {
    return state.categories.reduce(
      (acc: Record<number, Category>, category) => {
        acc[category.id] = category;
        return acc;
      },
      {}
    );
  },
  countCategories(state) {
    return state.categories.length;
  },
};

export enum VocabulariesGetterTypes {
  totalCount = "vocabulary/totalCount",
  getVocabulary = "vocabulary/getVocabulary",
  getCategory = "vocabulary/getCategory",
  getCategoryEntries = "vocabulary/getCategoryEntries",
  countCategories = "vocabulary/countCategories",
}

export type VocabularyGetters = {
  [VocabulariesGetterTypes.totalCount]: (state: VocabularyState) => number;
  [VocabulariesGetterTypes.getVocabulary]: (
    state: VocabularyState
  ) => (id: number) => Vocabulary | undefined;
  [VocabulariesGetterTypes.getCategory]: (
    state: VocabularyState
  ) => (id: number) => Category | undefined;
  [VocabulariesGetterTypes.getCategoryEntries]: (
    state: VocabularyState
  ) => Record<number, Category>;
  [VocabulariesGetterTypes.countCategories]: (state: VocabularyState) => number;
};
