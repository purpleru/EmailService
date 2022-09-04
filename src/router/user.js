import Core from '../pages/user/core.vue';
import Service from '../pages/user/service.vue';
import Commit from '../pages/user/commit.vue';
export default [{
    path: 'core',
    meta: {
        name: '用户中心',
        iconName: 'glyphicon glyphicon-user'
    },
    component: Core
}, {
    path: 'service',
    meta: {
        name: '邮箱服务',
        iconName: 'glyphicon glyphicon-envelope'
    },
    component: Service
}, {
    path: 'commit',
    meta: {
        name: '我的接口',
        iconName: 'glyphicon glyphicon-star'
    },
    component: Commit
}];