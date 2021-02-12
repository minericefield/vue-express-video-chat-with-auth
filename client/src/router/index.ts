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
      needsAuth: true,
      belongingLayout: 'default'
    }
  },
  {
    path: '/communication/:communicationHash',
    name: 'Communication',
    component: Communication,
    meta: {
      needsAuth: true,
      belongingLayout: 'default'
    }
  },
  {
    path: '/login',
    name: 'AuthLogin',
    component: AuthLogin,
    meta: {
      needsAuth: false,
      belongingLayout: 'nothing'
    }
  },
  {
    path: '/register',
    name: 'AuthRegister',
    component: AuthRegister,
    meta: {
      needsAuth: false,
      belongingLayout: 'nothing'
    }
  },
  {
    path: '/verify/:userHash',
    name: 'AuthVerify',
    component: AuthVerify,
    meta: {
      needsAuth: false,
      belongingLayout: 'nothing'
    }
  },
  {
    path: '/me',
    name: 'AuthMe',
    component: AuthMe,
    meta: {
      needsAuth: true,
      belongingLayout: 'default'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

checkAuthWhenRouteLeave(router)

export default router
