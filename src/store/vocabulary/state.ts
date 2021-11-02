import { Category, Vocabulary } from "@/models";

export interface VocabularyState {
  loading: boolean;
  vocabularies: Vocabulary[];
  categories: Category[];
  error?: string;
}

export const state: VocabularyState = {
  loading: false,
  vocabularies: [],
  categories: [],
};
