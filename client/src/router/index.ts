import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Top from '../views/Top.vue'
import Communication from '../views/Communication.vue'
import AuthLogin from '../views/AuthLogin.vue'
import AuthRegister from '../views/AuthRegister.vue'
import AuthVerify from '../views/AuthVerify.vue'
import AuthMe from '../views/AuthMe.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Top',
    component: Top,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/communication/:communicationHash',
    name: 'Communication',
    component: Communication,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin
  },
  {
    path: '/register',
    name: 'AuthRegister',
    component: AuthRegister
  },
  {
    path: '/verify/:userHash',
    name: 'AuthVerify',
    component: AuthVerify
  },
  {
    path: '/me',
    name: 'AuthMe',
    component: AuthMe
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
