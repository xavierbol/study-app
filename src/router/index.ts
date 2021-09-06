import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { useStore } from "@/store";

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
          },
          {
            path: "vocabulaires",
            name: "Vocabularies",
            component: () =>
              import(
                /* webpackChunkName: "exercises" */ "../views/IrregularVerbs.vue"
              ),
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
