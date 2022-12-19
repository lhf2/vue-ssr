import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";

// 每个请求都需要有一个干净的路由实例，所以得提供一个路由的工厂函数
export const createRouterInstance = (type) => {
    return createRouter({
        history: type === 'client' ? createWebHistory() : createMemoryHistory(),
        routes: [
            {
                path: "/",
                name: "Foo",
                component: () => import('../components/Foo.vue'),
            },
            {
                path: "/bar",
                name: "Bar",
                component: () => import('../components/Bar.vue'),
            },
        ],
    })
}



