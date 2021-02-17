<template>
  <div
    @click.self="isModalContentVisible = false"
    class="media-permission-alert-modal modal d-flex align-items-center justify-content-center p-5 bg-overlay-color"
  >
    <transition
      name="media-permission-alert-modal-content-fade"
      @after-leave="$emit('on-submit')"
      appear
    >
      <div
        v-show="isModalContentVisible"
        class="modal-content mt-n4"
      >
        <div class="modal-header align-items-center justify-content-start">
          <i class="material-icons mr-1">
            report_problem
          </i>
          <h5 class="modal-title">
            <div>
              Please permit media access control!
            </div>
          </h5>
        </div>
        <div class="modal-body">
          <p>After you permit it, press "Reinitialize" button below. </p>
          <small>If you are using safari, you have to reload the browser after permiting it. </small> <!-- TODO: add useragent provider -->
        </div>
        <div class="modal-footer justify-content-center">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop="isModalContentVisible = false"
          >
            Reinitialize
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'

export default defineComponent({
  name: 'MediaPermissionAlertModal',
  setup () {
    const isModalContentVisible = ref(false)

    onMounted(async () => {
      await nextTick()
      isModalContentVisible.value = true
    })

    return {
      isModalContentVisible
    }
  }
})
</script>

<style lang="scss" scoped>
.media-permission-alert-modal-content-fade-enter-active,
.media-permission-alert-modal-content-fade-leave-active {
  transition: all 0.5s ease;
}

.media-permission-alert-modal-content-fade-enter-from,
.media-permission-alert-modal-content-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
