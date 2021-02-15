<template>
  <div
    class="channel-preview position-relative p-2 border rounded grid-center cursor-pointer"
    @click="isChannelDetailOverlayVisible = true"
  >
    <div class="w-100 text-ellipse text-center">
      {{ channel.name }}
    </div>
    <div class="channel-preview-member-num d-flex align-items-center position-absolute p-2">
      <i class="material-icons mr-1">
        person
      </i>
      {{ channel.members.length }}
    </div>

    <teleport to="#modal-overlay">
      <div
        v-if="isChannelDetailOverlayVisible"
        @click.self="isChannelDetailOverlayVisible = false"
        class="modal d-flex align-items-center justify-content-center p-5 bg-overlay-color"
      >
        <transition
          name="modal-content-fade"
          appear
        >
          <div
            class="modal-content mt-n4"
          >
            <div class="modal-header">
              <h5 class="modal-title">
                Join this channel?
              </h5>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-end mb-3">
                <small class="text-small mr-2 mb-0">
                  ChannelName: 
                </small>
                <h5 class="mb-0">
                  {{ channel.name }}
                </h5>
              </div>
              <h5>
                Members
              </h5>
              <div
                v-for="member in channel.members"
                :key="member._id"
                class="d-flex align-items-center w-100 mb-2"
              >
                <i class="material-icons mr-1">
                  person
                </i>
                <p class="member-name mb-0 text-ellipse">
                  {{ member.name }}
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click.stop="isChannelDetailOverlayVisible = false"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click.stop="$emit('onJoinningChannelApply')"
              >
                Yes
              </button>
            </div>
          </div>
        </transition>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue'

import { Channel } from '../modules/useChannels'

export default defineComponent({
  props: {
    channel: {
      type: Object as PropType<Channel>
    }
  },
  setup () {
    const isChannelDetailOverlayVisible = ref(false)

    const onMouseEnter = () => {
      isChannelDetailOverlayVisible.value = true
    }

    const onMouseLeave = () => {
      isChannelDetailOverlayVisible.value = false
    }

    return {
      isChannelDetailOverlayVisible,
      onMouseEnter,
      onMouseLeave
    }
  }
})
</script>

<style lang="scss" scoped>
.channel-preview {
  width: calc((100vw - 2rem) / 2 - 1rem);
  height: 24vw;
  &-member-num {
    right: 0;
    bottom: 0;
  }
}

.modal-content-fade-enter-from,
.modal-content-fade-enter-leave-to {
  transform: scale(0);
}
.modal-content-fade-enter-active,
.modal-content-fade-enter-leave-active {
  transition: transform ease .4s;
}
</style>