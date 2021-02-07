import { Router } from 'vue-router'

import AuthApi from '../api/Auth'

export default (router: Router) => {
  router.beforeEach(async (to, _, next) => {
    if (to.meta.needsAuth) {
      const result = await new AuthApi().isUserActive()
      if (!result.succeed) {
        return router.push({
          name: 'AuthLogin'
        })
      }
    }

    next()
  })
}
