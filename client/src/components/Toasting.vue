<template>
  <transition
    name="toasting-fade"
    @after-leave="$emit('on-left')"
    appear
  >
    <div
      v-show="isVisibleLocal"
      :class="[isError ? 'bg-danger' : 'bg-success']"
      class="toasting position-fixed p-2 text-white"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'Toasting',
  props: {
    message: {
      type: String,
      required: true
    },
    isError: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    const isVisibleLocal = ref(false)

    onMounted(async () => {
      await nextTick()
      isVisibleLocal.value = true
      setTimeout(() => {
        isVisibleLocal.value = false
      }, props.duration)
    })

    return {
      isVisibleLocal
    }
  }
})
</script>

<style lang="scss" scoped>
.toasting {
  top: 24px;
  left: 24px;
}

.toasting-fade-enter-active,
.toasting-fade-leave-active {
  transition: all 0.5s ease;
}

.toasting-fade-enter-from,
.toasting-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
