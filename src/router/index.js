import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '',
    name: 'layoutIndex',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/home',
        name: 'homeIndex',
        component: () => import('@/views/Home')
      },
      {
        path: '/qs',
        name: 'qsIndex',
        component: () => import('@/views/Qs')
      },
      {
        path: '/video',
        name: 'videoIndex',
        component: () => import('@/views/Video')
      },
      {
        path: '/my',
        name: 'layoutIndex',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
