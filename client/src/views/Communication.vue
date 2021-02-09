<template>
  <layout-default>
    <div class="communication" />
  </layout-default>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LayoutDefault from '../layouts/LayoutDefault.vue'

export default defineComponent({
  name: 'Communication',
  components: {
    LayoutDefault
  }
})
</script>
