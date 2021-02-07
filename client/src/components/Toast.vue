<template>
  <transition
    name="toast-fade"
    @after-leave="$emit('on-left')"
    appear
  >
    <div
      v-show="isToastVisible"
      :class="[isError ? 'bg-danger' : 'bg-success']"
      class="toast p-2 text-white"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    isError: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const isToastVisible = ref(false)

    onMounted(async () => {
      await nextTick()
      isToastVisible.value = true
      setTimeout(() => {
        isToastVisible.value = false
      }, 1000)
    })

    return {
      isToastVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 16px;
  right: 16px;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.5s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
