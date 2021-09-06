import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

import "nes.css/css/nes.css";

createApp(App).use(store).use(router).mount("#app");
