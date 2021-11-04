import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

import { Language } from "@/models";
import { useStore } from "@/store";
import { MutationType } from "@/store/mutations";
import { IrregularVerbActionTypes } from "@/store/irregular-verb/actions";
import { IrregularVerbsGetterTypes } from "@/store/irregular-verb/getters";
import { ToastActionTypes } from "@/store/toast/actions";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";

import Home from "../views/Home.vue";

async function fetchData(
  action: IrregularVerbActionTypes | VocabularyActionTypes,
  getterName: IrregularVerbsGetterTypes | VocabulariesGetterTypes,
  fetch = false,
  requireData = false
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
    path: "/:lang(nl|en)",
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/Parent.vue"),
    beforeEnter(to: RouteLocationNormalized): void | boolean {
      const $store = useStore();
      $store.commit(MutationType.setLang, to.params.lang as Language);
    },
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
          import(/* webpackChunkName: 'lang' */ "../views/Parent.vue"),
        beforeEnter: async (): Promise<void | boolean> => {
          const continueRoute = await fetchData(
            VocabularyActionTypes.getCategories,
            VocabulariesGetterTypes.countCategories,
            true,
            true
          );
          if (!continueRoute) {
            return continueRoute;
          }
        },
        children: [
          {
            path: "",
            name: "Categories",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Categories/Menu.vue"
              ),
          },
          {
            path: "nouveau",
            name: "CreateCategory",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Categories/Form.vue"
              ),
          },
          {
            path: ":category_id(\\d+|liste)",
            component: () =>
              import(
                /* webpackChunkName: 'configuration' */ "../views/Parent.vue"
              ),
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
                beforeEnter: (to: RouteLocationNormalized): void | boolean => {
                  if (to.params.id) {
                    const $store = useStore();
                    const vocabulary = $store.getters[
                      VocabulariesGetterTypes.getVocabulary
                    ](Number(to.params.id as string));
                    if (!vocabulary) {
                      return false;
                    }
                  }
                },
                component: () =>
                  import(
                    /* webpackChunkName: 'configuration' */ "../views/Vocabularies/Form.vue"
                  ),
              },
            ],
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
              import(/* webpackChunkName: "exercises" */ "../views/Parent.vue"),
            children: [
              {
                path: "",
                name: "CategoriesExercise",
                component: () =>
                  import(
                    /* webpackChunkName: "vocabularies" */ "../views/Categories/Menu.vue"
                  ),
                beforeEnter: async (): Promise<void | boolean> => {
                  const continueRoute = await fetchData(
                    VocabularyActionTypes.getCategories,
                    VocabulariesGetterTypes.countCategories,
                    true,
                    true
                  );
                  if (!continueRoute) {
                    return continueRoute;
                  }
                },
              },
              {
                path: ":category_id(\\d+)",
                name: "VocabularyExercise",
                component: () =>
                  import(
                    /* webpackChunkName: "vocabularies" */ "../views/Vocabularies/Exercise.vue"
                  ),
                beforeEnter: async (
                  to: RouteLocationNormalized
                ): Promise<void | boolean> => {
                  const $store = useStore();
                  const category = $store.getters[
                    VocabulariesGetterTypes.getCategory
                  ](Number(to.params.category_id as string));

                  if (!category) {
                    return false;
                  }

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
            ],
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
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export default routes;
