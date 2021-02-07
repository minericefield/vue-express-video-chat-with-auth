import { Router } from 'vue-router'

import AuthApi from '../api/Auth'

export default (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    if (to.name === from.name) return

    if (to.meta.needsAuth) {
      const result = await new AuthApi().isUserActive()
      if (!result.succeed) {
        await router.push({
          name: 'AuthLogin'
        })
      }
    }

    next()
  })
}
