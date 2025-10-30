import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/views/home.vue')
    },
    {
        path: '/about',
        children: [
            {
                path: "myself",
                component: () => import('@/views/about/myself.vue')
            },
            {
                path: "friends",
                component: () => import('@/views/about/friends.vue')
            }
        ]
    },
    {
        path: '/content',
        children: [
            {
                path: "articles",
                component: () => import('@/views/content/articles.vue')
            },
            {
                path: "notes",
                component: () => import('@/views/content/notes.vue')
            },
            {
                path: ":type/:id",
                component: () => import('@/views/content/read.vue')
            }
        ]
    },
    {
        path: '/treehole',
        component: () => import('@/views/treehole.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router