import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component:()=>import('@/views/home.vue')
    },
    {
        path: '/about',
        children:[
            {
                path: "myself",
                component:()=>import('@/views/about/aboutMyself.vue')
            },
            {
                path: "friends",
                component:()=>import('@/views/about/aboutFriends.vue')
            }
        ]
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history:createWebHashHistory(),
    routes,
})

export default router;

