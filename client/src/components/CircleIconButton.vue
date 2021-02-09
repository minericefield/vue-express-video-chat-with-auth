<template>
  <div
    class="circle-icon-button position-relative overflow-hidden rounded-circle cursor-pointer"
    @click="$emit('on-click')"
  >
    <i class="circle-icon-button-icon material-icons position-absolute color-black">
      {{ icon }}
    </i>
    <transition name="disabled-overlay-fade">
      <div
        v-show="!isActive"
        class="circle-icon-button-disabled-overlay position-absolute w-100 h-100 rounded-circle"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CircleIconButton',
  props: {
    icon: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.circle-icon-button {
  width: 48px;
  min-width: 48px;
  height: 48px;
  min-height: 48px;
  border: solid 2px rgba(74, 74, 74, .9);
  &-icon {
    top: 50%;
    left: 51%;
    transform: translateY(-50%) translateX(-50%);
  }
  &-disabled-overlay {
    background-color: rgba(74, 74, 74, .4);
    &::after {
      position: absolute;
      top: 50%;
      content: "";
      height: 2px;
      width: 100%;
      background-color: rgba(74, 74, 74, .9);
      transform: rotate(145deg);
    }
  }
}

.disabled-overlay-fade-enter-to,
.disabled-overlay-fade-leave-from {
  opacity: .8;
}

.disabled-overlay-fade-enter-from,
.disabled-overlay-fade-leave-to {
  opacity: 0;
}

.disabled-overlay-fade-enter-active,
.disabled-overlay-fade-leave-active  {
  transition: opacity ease .4s 0s;
}
</style>
