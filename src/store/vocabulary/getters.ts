import { Vocabulary } from "@/models";
import { GetterTree } from "vuex";
import { State } from "../state";
import { VocabularyState } from "./state";

type Getters = {
  totalCount: (state: VocabularyState) => number;
  getVocabulary: (
    state: VocabularyState
  ) => (id: number) => Vocabulary | undefined;
};

export const getters: GetterTree<VocabularyState, State> & Getters = {
  totalCount(state) {
    return state.vocabularies.length;
  },
  getVocabulary(state) {
    return (vocabularyId: number) =>
      state.vocabularies.find((voc) => voc.id === vocabularyId);
  },
};

export enum VocabulariesGetterTypes {
  totalCount = "vocabulary/totalCount",
  getVocabulary = "vocabulary/getVocabulary",
}

export type VocabularyGetters = {
  [VocabulariesGetterTypes.totalCount]: (state: VocabularyState) => number;
  [VocabulariesGetterTypes.getVocabulary]: (
    state: VocabularyState
  ) => (id: number) => Vocabulary | undefined;
};
