import axios from 'axios';
import qs from 'qs';
import router from '../router/index';
const $http = axios.create();
$http.interceptors.request.use(function (config) {
    if (typeof config.beforeSend === 'function') {
        config.beforeSend(config);
    }
    if (config.data instanceof Object) {
        config.data = qs.stringify(config.data);
    }
    return config;
});

$http.interceptors.response.use(function (response) {
    const { data } = response;
    if (data.code === 401) {
        window.localStorage.removeItem('user');
        router.replace('/login');
        return new Promise(function () { });
    } else {
        return response;
    }
});

export default $http;