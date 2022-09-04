import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../pages/login.vue';
import User from '../pages/user.vue';

import userChildren from './user';

const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: Login
        }, {
            redirect: '/user/core',
            path: '/user',
            component: User,
            children: userChildren
        }
    ]
});


export default router;