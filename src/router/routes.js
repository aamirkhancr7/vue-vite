const MainLayout = () => import(/* webpackChunkName: "v-v" */ '@/layout/MainLayout.vue');
const Unauthorized = () => import(/* webpackChunkName: "v-v" */ '@/views/Unauthorized.vue');
import Login from '@/views/Login.vue';

export default [
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/unauthorized',
        name: 'unauthorized',
        component: Unauthorized,
    },
    {
        path: '/',
        component: MainLayout,
        name: 'base',
        children: [],
    },
];
