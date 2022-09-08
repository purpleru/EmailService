import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../pages/login.vue';
import User from '../pages/user.vue';

import userChildren from './user';

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/user/core'
        },
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

router.beforeEach(function (to, form, next) {
    var user = window.localStorage.getItem('user');
    try {
        user = JSON.parse(user)
    } catch (err) {
        window.localStorage.removeItem('user');
        user = null;
    }
    if (to.path !== '/login' && !user) {
        next('/login');
    } else {
        if (to.path === '/login' && user) {
            next('/user');
        } else {
            next();
        }
    }
});

export default router;