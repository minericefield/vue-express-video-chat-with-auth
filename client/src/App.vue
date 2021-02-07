<template>
  <div>
    <div>
      <router-link to="/">Top</router-link> |
      <router-link to="/communication/hash">Communication</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Regsiter</router-link> |
      <router-link to="/verify/hash">Vefiry</router-link> |
      <router-link to="/me">Me</router-link>
    </div>
    <router-view />

    <teleport to="#loader-overlay">
      <loader v-if="loader && loader.isVisible" />
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  inject
} from 'vue'

import { useLoader, UseLoaderKey } from './modules/useLoader'
import Loader from './components/Loader.vue'

export default defineComponent({
  components: {
    Loader
  },
  setup () {
    provide(UseLoaderKey, useLoader())
    const loader = inject(UseLoaderKey)

    if (loader) { // https://zenn.dev/okakyo/articles/f39d5c2c328b6d provide/inject undefined...
      return {
        loader
      }
    }
  }
})
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
