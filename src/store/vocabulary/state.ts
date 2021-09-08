import { Vocabulary } from "@/models";

export interface VocabularyState {
  loading: boolean;
  vocabularies: Vocabulary[];
  error?: string;
}

export const state: VocabularyState = {
  loading: false,
  vocabularies: [],
};
