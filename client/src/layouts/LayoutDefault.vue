<template>
  <div class="layout-default d-flex flex-column position-relative w-100 h-100">
    <nav class="layout-default-header navbar navbar-expand-lg justify-content-end navbar-light bg-light">
      <button
        v-if="isAuthenticated"
        @click="goProfile"
        class="btn btn-primary mr-2"
      >
        Profile
      </button>
      <button
        v-if="isAuthenticated"
        @click="logout"
        class="btn btn-danger"
      >
        Logout
      </button>
    </nav>
    <div class="layout-default-body flex-grow-1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { useRouter } from 'vue-router'

import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'

export default defineComponent({
  name: 'LayoutDefault',
  setup () {
    const router = useRouter()
    const { isAuthenticated, fetchMyInfo, logout } = inject(UseAuthMeKey, authMeDefault)

    const goProfile = () => {
      router.push({
        name: 'AuthMe'
      })
    }

    // onMounted(fetchMyInfo)
    fetchMyInfo()

    return {
      isAuthenticated,

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
