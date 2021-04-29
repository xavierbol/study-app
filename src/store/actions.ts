import { ActionTree } from "vuex";
import { MutationType } from "./mutations";
import { IrregularVerb, StateInterface } from "./state";

const SERVER_URL = "http://localhost:3333/api";
const IRREGULAR_VERB_URL = `${SERVER_URL}/irregular_verbs`;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PUT",
};

export enum ActionTypes {
  GetVerbs = "GET_VERBS",
  CreateVerb = "CREATE_VERB",
  DeleteVerb = "DELETE_VERB",
}

const actions: ActionTree<StateInterface, StateInterface> = {
  async [ActionTypes.GetVerbs]({ commit }) {
    commit(MutationType.SetLoading, true);
    try {
      const result: Response = await fetch(IRREGULAR_VERB_URL, {
        method: "GET",
        headers,
      });

      if (result.ok) {
        const json = (await result.json()) as Array<IrregularVerb>;
        commit(MutationType.SetIrregularVerbs, json);
      } else {
        commit(MutationType.ErrorIrregularVerb, await result.text());
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.ErrorIrregularVerb, error);
    } finally {
      commit(MutationType.SetLoading, false);
    }
  },
  async [ActionTypes.CreateVerb]({ commit }, verb: IrregularVerb) {
    commit(MutationType.SetLoading, true);
    try {
      const result: Response = await fetch(IRREGULAR_VERB_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(verb),
      });

      if (result.ok) {
        const newVerb = (await result.json()) as IrregularVerb;
        commit(MutationType.CreateIrregularVerb, newVerb);
      } else {
        const error = await result.text();
        console.error(error);
        commit(MutationType.ErrorIrregularVerb, error);
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.ErrorIrregularVerb, error);
    } finally {
      commit(MutationType.SetLoading, false);
    }
  },
  async [ActionTypes.DeleteVerb]({ commit }, verbId: number) {
    commit(MutationType.SetLoading, true);
    try {
      const result: Response = await fetch(`${IRREGULAR_VERB_URL}/${verbId}`, {
        method: "DELETE",
        headers,
      });

      if (result.ok && result.status === 204) {
        commit(MutationType.RemoveIrregularVerb, verbId);
      } else {
        const error = result.text();
        console.error(error);
        commit(MutationType.ErrorIrregularVerb, error);
      }
    } catch (error) {
      console.error(error);
      commit(MutationType.ErrorIrregularVerb, error);
    } finally {
      commit(MutationType.SetLoading, false);
    }
  },
};

export default actions;
