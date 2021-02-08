<template>
  <layout-default>
    <div class="aute-me">
      プロフィール
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LayoutDefault from '../layouts/LayoutDefault.vue'

export default defineComponent({
  name: 'AuthMe',
  components: {
    LayoutDefault
  }
})
</script>
