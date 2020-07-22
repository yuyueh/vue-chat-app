import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/views/Login.vue';
import { Store } from 'vuex';
import { RootState } from '@/models/RootState';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/chat',
        name: 'Chat',
        component: () => import(/* webpackChunkName: "chat" */ '../views/Chat.vue'),
        meta: {
            requiresAuth: true,
        },
    },
    { path: '*', redirect: '/chat' },
];

export const router = new VueRouter({
    routes,
});

export default function (store: Store<RootState>): VueRouter {
    router.beforeEach((to, from, next) => {
        if (
            to.matched.some((record) => record.meta.requiresAuth) &&
            !store.state.user.authenticated
        ) {
            next({
                path: '/login',
            });
        } else {
            next();
        }
    });
    return router;
}
