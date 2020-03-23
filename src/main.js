import Vue from "vue";
import App from "./App.vue";
import router from "@/routes/router";
import store from "./store";
import "./assets/style.css";
import VueSweetalert2 from "vue-sweetalert2";

// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
import "@/routes/router-guard";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

Vue.use(VueSweetalert2);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
