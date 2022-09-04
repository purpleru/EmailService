import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'bootstrap/js/modal';
import './assets/layer/theme/default/layer.css';
import './assets/layer/layer';
import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import axios from 'axios';
import qs from 'qs';
Vue.config.productionTip = false;

axios.interceptors.request.use(function (config) {
  if (typeof config.beforeSend === 'function') {
    config.beforeSend(config);
  }
  if (config.data instanceof Object) {
    config.data = qs.stringify(config.data);
  }
  return config;
});

axios.interceptors.response.use(function (response) {
  const { data } = response;
  if (data.code === 401) {
    router.replace('/login');
    return new Promise(function () { });
  } else {
    return response;
  }
});

new Vue({
  beforeCreate() {
    Vue.prototype.$http = axios;
    Vue.prototype.$layer = window.layer;
  },
  render: h => h(App),
  router
}).$mount('#app')
