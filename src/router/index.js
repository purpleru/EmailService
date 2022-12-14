import Vue from 'vue';

import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../pages/login.vue';
import User from '../pages/user.vue';
import Register from '../pages/register.vue';

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
        },
        {
            path: '/register',
            component: Register
        },
        {
            redirect: '/user/core',
            path: '/user',
            component: User,
            children: userChildren
        }
    ]
});

router.beforeEach(function (to, form, next) {
    var user = window.localStorage.getItem('user'),
        exclude = ['/register'];
    try {
        user = JSON.parse(user)
    } catch (err) {
        window.localStorage.removeItem('user');
        user = null;
    }

    if (to.path !== '/login' && !user && exclude.indexOf(to.path) === -1) {
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