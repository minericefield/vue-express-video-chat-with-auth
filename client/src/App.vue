<template>
  <div class="position-relative w-100 h-100">
    <router-view />

    <teleport to="#loader-overlay">
      <loader v-if="loader.isVisible.value" />
    </teleport>
    <teleport to="#toasting-overlay">
      <toasting
        v-if="toasting.isVisible.value"
        :message="toasting.message.value"
        :is-error="toasting.isError.value"
        @on-left="toasting.displayToasting({ shouldBeVisible: false, message: '', isError: false })"
      />
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

import { useLoader, UseLoaderKey } from './modules/useLoader'
import { useToasting, UseToastingKey } from './modules/useToasting'
import Loader from './components/Loader.vue'
import Toasting from './components/Toasting.vue'

export default defineComponent({
  components: {
    Loader,
    Toasting
  },
  setup () {
    const loader = useLoader()
    provide(UseLoaderKey, loader)
    const toasting = useToasting()
    provide(UseToastingKey, toasting)

    return {
      loader,
      toasting
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
