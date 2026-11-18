import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(), // HTML5 模式，去掉 URL 中的 #
    routes: [
        { path: '/', redirect: '/dashboard' },
        {
            path: '/dashboard',
            name: 'index',
            component: () => import('@/pages/Dashboard/Index.vue') // 路由级懒加载
        },
        {
            path: '/auth',
            name: 'auth',
            component: () => import('@/pages/Auth/Index.vue'), // 路由级懒加载
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/pages/Auth/Login.vue') // 路由级懒加载
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('@/pages/Auth/Register.vue') // 路由级懒加载
                },
                {
                    path: 'findpwd',
                    name: 'findpwd',
                    component: () => import('@/pages/Auth/FindPwd.vue') // 路由级懒加载
                }
            ]
        },

        // 404 兜底路由，必须放在最后
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/pages/404.vue')
        }
    ]
});

export default router;
