import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import UIkit from "uikit";
import Icons from 'uikit/dist/js/uikit-icons';
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(VueChartkick, {adapter: Chart})
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

UIkit.use(Icons);

