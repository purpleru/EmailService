import 'bootstrap/js/collapse';
import 'bootstrap/js/transition';
import 'bootstrap/js/modal';
// import './assets/layer/theme/default/layer.css';
// import './assets/layer/layer';
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import $http from './plugins/http';

new Vue({
    beforeCreate() {
        Vue.prototype.$http = $http;
        Vue.prototype.$layer = window.layer;
    },
    render: h => h(App),
    router
}).$mount('#app')
