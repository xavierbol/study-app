import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { useStore } from "@/store";
import { ToastActionTypes } from "@/store/toast/actions";
import { ActionTypes } from "@/store/actions";
import { VocabulariesGetterTypes } from "@/store/vocabulary/getters";
import { VocabularyActionTypes } from "@/store/vocabulary/actions";

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
        path: "exercices",
        name: "Exercises",
        component: () =>
          import(/* webpackChunkName: 'lang' */ "../views/Exercises.vue"),
        children: [
          {
            path: "verbe-irreguliers",
            name: "IrregularVerbs",
            component: () =>
              import(
                /* webpackChunkName: "exercises" */ "../views/IrregularVerbs.vue"
              ),
            beforeEnter: async () => {
              const $store = useStore();
              let fetchData = false;
              try {
                if ($store.getters.totalCount === 0) {
                  fetchData = true;
                  await $store.dispatch(ActionTypes.GetVerbs);
                }
              } catch (err) {
                console.error(err);
                $store.dispatch(
                  ToastActionTypes.show,
                  "Erreur, le serveur est inaccessible,\nil nous est impossible d'afficher les exercices."
                );
                return false;
              }
              if (fetchData && $store.getters.totalCount === 0) {
                $store.dispatch(
                  ToastActionTypes.show,
                  "Aucune donnée n'a été récupérée pour lancer l'exercice, veuillez d'avoir ajouté des verbes/mots avant de lancer un exercice."
                );
                return false;
              }
            },
          },
          {
            path: "vocabulaires",
            name: "Vocabularies",
            component: () =>
              import(
                /* webpackChunkName: "exercises" */ "../views/IrregularVerbs.vue"
              ),
            beforeEnter: async () => {
              const $store = useStore();
              let fetchData = false;
              try {
                if ($store.getters[VocabulariesGetterTypes.totalCount] === 0) {
                  fetchData = true;
                  await $store.dispatch(VocabularyActionTypes.getVocabularies);
                }
              } catch (err) {
                console.error(err);
                $store.dispatch(
                  ToastActionTypes.show,
                  "Erreur, le serveur est inaccessible, \nil nous est impossible d'afficher les exercices."
                );
                return false;
              }
              if (
                fetchData &&
                $store.getters[VocabulariesGetterTypes.totalCount] === 0
              ) {
                $store.dispatch(
                  ToastActionTypes.show,
                  "Aucun mot de vocabulaire n'a été récupérée pour lancer l'exercice, \nveuillez d'abord ajouté des mots de vocabulaires avant de lancer un exercice."
                );
                return false;
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

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
