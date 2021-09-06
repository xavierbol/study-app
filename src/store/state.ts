import { IrregularVerb } from "@/models";

export interface State {
  loading: boolean;
  verbs: IrregularVerb[];
  error?: string;
}

const defaultState: State = {
  loading: false,
  verbs: [],
};

export default defaultState;
