<template>
  <div
    @click.self="action='on-cancel', isModalContentVisible = false"
    class="confirm-modal modal d-flex align-items-center justify-content-center p-5 bg-overlay-color"
  >
    <transition
      name="confirm-modal-content-fade"
      @after-leave="$emit(action)"
      appear
    >
      <div
        v-show="isModalContentVisible"
        class="modal-content mt-n4"
      >
        <div v-if="titleText" class="modal-header">
          <h5 class="modal-title">
            {{ titleText }}
          </h5>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click.stop="action='on-cancel', isModalContentVisible = false"
          >
            {{ cancelText }}
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.stop="action='on-submit', isModalContentVisible = false"
          >
            {{ submitText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'ConfirmlModal',
  props: {
    submitText: {
      type: String,
      default: 'OK'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    titleText: {
      type: String,
      default: ''
    }
  },
  setup () {
    const isModalContentVisible = ref(false)
    const action = ref('')

    onMounted(async () => {
      await nextTick()
      isModalContentVisible.value = true
    })

    return {
      isModalContentVisible,
      action
    }
  }
})
</script>

<style lang="scss" scoped>
.confirm-modal-content-fade-enter-active,
.confirm-modal-content-fade-leave-active {
  transition: all 0.5s ease;
}

.confirm-modal-content-fade-enter-from,
.confirm-modal-content-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
