import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";
import { GetterTypes } from "@/store/getters";
import { ActionTypes } from "@/store/actions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:lang",
    name: "Language",
    beforeEnter: async () => {
      if (store.getters[GetterTypes.totalCount] === 0) {
        await store.dispatch(ActionTypes.GetVerbs);
      }
    },
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/LangView.vue"),
    children: [
      {
        path: "verbe-irreguliers",
        component: () =>
          import(/* webpackChunkName: "lang" */ "../views/IrregularVerbs.vue"),
      },
      {
        name: "ResumeErrors",
        path: "revision_erreurs",
        component: () =>
          import(
            /* webpackChunkName: "resume_errors" */ "../views/ResumeErrors.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
