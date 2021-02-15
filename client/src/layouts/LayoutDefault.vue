<template>
  <div class="layout-default d-flex flex-column position-relative w-100 h-100">
    <nav class="layout-default-header navbar navbar-expand-lg justify-content-end align-items-center navbar-light bg-light">
      <p
        v-if="routeName !== 'Top'"
        @click="goTop"
        class="font-weight-bold text-info mr-auto mb-0 under-lined cursor-pointer">
        Go Back to Top
      </p>
      <button
        v-if="isAuthenticated && routeName !== 'AuthMe'"
        @click="goProfile"
        class="btn btn-primary d-flex mr-2"
      >
        <i class="material-icons mr-1">
          manage_accounts
        </i>
        <p class="mb-0">
          Profile
        </p>
      </button>
      <button
        v-if="isAuthenticated"
        @click="logout"
        class="btn btn-secondary d-flex"
      >
        <i class="material-icons mr-1">
          logout
        </i>
        <p class="mb-0">
          Logout
        </p>
      </button>
    </nav>
    <div class="layout-default-body flex-grow-1 h-100">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'

export default defineComponent({
  name: 'LayoutDefault',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { isAuthenticated, logout } = inject(UseAuthMeKey, authMeDefault)

    const goTop = () => {
      router.push({
        name: 'Top'
      })
    }

    const goProfile = () => {
      router.push({
        name: 'AuthMe'
      })
    }

    // onMounted(fetchMyInfo)

    return {
      isAuthenticated,
      routeName: route.name,

      goTop,
      goProfile,
      logout
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-default {
  &-header {
    min-height: 54px;
  }
  &-body {
    overflow-y: auto;
  }
}
</style>
