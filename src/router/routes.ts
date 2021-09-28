import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { useStore } from "@/store";
import { IrregularVerbActionTypes } from "@/store/irregular-verb/actions";
import { IrregularVerbsGetterTypes } from "@/store/irregular-verb/getters";
import { ToastActionTypes } from "@/store/toast/actions";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";

import Home from "../views/Home.vue";
import { IrregularVerbMutationTypes } from "@/store/irregular-verb/mutations";

async function fetchData(
  action: IrregularVerbActionTypes | VocabularyActionTypes,
  getterName: "irregularVerb/totalCount" | "vocabulary/totalCount",
  fetch = false,
  requireData = false,
): Promise<boolean> {
  const $store = useStore();
  let fetchData = false;
  try {
    if (fetch || $store.getters[getterName] === 0) {
      fetchData = true;
      await $store.dispatch(action);
    }
  } catch (err) {
    console.error(err);
    $store.dispatch(
      ToastActionTypes.show,
      "Erreur, le serveur est inaccessible,\nil nous est impossible d'afficher les exercices."
    );
    return false;
  }
  if (requireData && fetchData && $store.getters[getterName] === 0) {
    $store.dispatch(
      ToastActionTypes.show,
      "Aucune donnée n'a été récupérée pour lancer l'exercice, veuillez d'avoir ajouté des verbes/mots avant de lancer un exercice."
    );
    return false;
  }
  return true;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:lang",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/LangView.vue"),
    children: [
      {
        path: "",
        name: "ExerciseMenu",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/ExerciseMenu.vue"),
      },
      {
        path: "vocabularies",
        name: "Vocabularies",
        component: () =>
          import(/* webpackChunkName: 'lang' */ "../views/MainLayout.vue"),
        beforeEnter: async (): Promise<void | boolean> => {
          const continueRoute = await fetchData(
            VocabularyActionTypes.getVocabularies,
            VocabulariesGetterTypes.totalCount,
            true
          );
          if (!continueRoute) {
            return continueRoute;
          }
        },
        children: [
          {
            path: "",
            name: "VocabulariesList",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Vocabularies/List.vue"
              ),
          },
          {
            path: "nouveau",
            name: "AddVocabulary",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Vocabularies/Form.vue"
              ),
          },
          {
            path: ":id",
            name: "EditVocabulary",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Vocabularies/Form.vue"
              ),
          },
        ],
      },
      {
        path: "exercices",
        name: "Exercises",
        component: () =>
          import(/* webpackChunkName: 'lang' */ "../views/Exercises.vue"),
        children: [
          {
            path: "verbe-irreguliers",
            name: "IrregularVerbsExercise",
            component: () =>
              import(
                /* webpackChunkName: "exercises" */ "../views/IrregularVerbs.vue"
              ),
            beforeEnter: async (): Promise<void | boolean> => {
              const continueRoute = await fetchData(
                IrregularVerbActionTypes.GetVerbs,
                IrregularVerbsGetterTypes.totalCount,
                false,
                true
              );

              if (!continueRoute) {
                return continueRoute;
              }
            },
          },
          {
            path: "vocabulaires",
            name: "VocabulariesExercise",
            component: () =>
              import(
                /* webpackChunkName: "exercises" */ "../views/Vocabularies.vue"
              ),
            beforeEnter: async (): Promise<void | boolean> => {
              const continueRoute = await fetchData(
                VocabularyActionTypes.getVocabularies,
                VocabulariesGetterTypes.totalCount,
                false,
                true
              );
              if (!continueRoute) {
                return continueRoute;
              }
            },
          },
          {
            path: "revision_erreurs",
            name: "ResumeErrors",
            component: () =>
              import(
                /* webpackChunkName: "resume_errors" */ "../views/ResumeErrors.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default routes;
