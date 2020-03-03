import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    const userAuthenticated = store.getters.isAuthenticated
    const requireAuth = to.matched.some(record => record.meta.auth)

    if (requireAuth && !userAuthenticated) {
        next('/login')
    }
    else if ((to.path === '/login') && userAuthenticated) {
        next('/')
    }
    else {
        next()
    }
})

export default router

