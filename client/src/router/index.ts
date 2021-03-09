import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Top from '../views/Top.vue'
import Communication from '../views/Communication.vue'
import AuthLogin from '../views/AuthLogin.vue'
import AuthRegister from '../views/AuthRegister.vue'
import AuthVerify from '../views/AuthVerify.vue'
import AuthMe from '../views/AuthMe.vue'

import checkAuthWhenRouteLeave from '../plugins/checkAuthWhenRouteLeave'

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
    path: '/communication/:channelName',
    name: 'Communication',
    component: Communication,
    meta: {
      needsAuth: true
    }
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: {
      needsAuth: false
    }
  },
  {
    path: '/register',
    name: 'AuthRegister',
    component: AuthRegister,
    meta: {
      needsAuth: false
    }
  },
  {
    path: '/verify/:userHash',
    name: 'AuthVerify',
    component: AuthVerify,
    meta: {
      needsAuth: false
    }
  },
  {
    path: '/me',
    name: 'AuthMe',
    component: AuthMe,
    meta: {
      needsAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

checkAuthWhenRouteLeave(router)

export default router
