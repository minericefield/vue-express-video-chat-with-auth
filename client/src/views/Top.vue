<template>
  <layout-default>
    <div class="top">
      トップ
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LayoutDefault from '../layouts/LayoutDefault.vue'

export default defineComponent({
  name: 'Top',
  components: {
    LayoutDefault
  },
  setup () {
  }
})
</script>
