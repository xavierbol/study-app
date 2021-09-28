import { IrregularVerb } from "@/models";

export interface IrregularVerbState {
  loading: boolean;
  verbs: IrregularVerb[];
  error?: string;
}

export const state: IrregularVerbState = {
  loading: false,
  verbs: [],
};
