import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./assets/css/style.css";
import bootstrapvue from "bootstrap-vue";

Vue.use(bootstrapvue);
Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
