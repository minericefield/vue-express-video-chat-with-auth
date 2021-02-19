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
                <h4 class="mb-0">
                  {{ channel.name }}
                </h4>
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

              <div>
                <p>
                  Enable audio / video settings
                </p>
                <div class="d-flex">
                  <circle-icon-button
                    icon="mic"
                    class="mr-4"
                    :is-active="isAudioOn"
                    @on-click="updateSettings({ isAudioOn: !isAudioOn })"
                  />
                  <circle-icon-button
                    icon="videocam"
                    :is-active="isVideoOn"
                    @on-click="updateSettings({ isVideoOn: !isVideoOn})"
                  />
                </div>
                <p
                  v-if="videoSettigsErrorMessage"
                  class="text-danger"
                >
                  {{ videoSettigsErrorMessage }}
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
                @click.stop="onSubmit"
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
import { PropType, defineComponent, ref, inject } from 'vue'

import { UseVideoSettingsKey, videoSettingsDefault } from '../modules/useVideoSettings'
import { Channel } from '../modules/useChannels'

import CircleIconButton from './CircleIconButton.vue'

export default defineComponent({
  components: {
    CircleIconButton
  },
  props: {
    channel: {
      type: Object as PropType<Channel>
    }
  },
  setup (_, ctx) {
    const isChannelDetailOverlayVisible = ref(false)

    const { isAudioOn, isVideoOn, updateSettings } = inject(UseVideoSettingsKey, videoSettingsDefault)
    const videoSettigsErrorMessage = ref('')

    const validate = () => { // TODO: make validation module
      videoSettigsErrorMessage.value = ''

      if (!isAudioOn.value && !isVideoOn.value) {
        videoSettigsErrorMessage.value = 'Either must be enabled.'
      }

      return !videoSettigsErrorMessage.value
    }

    const onSubmit = () => {
      if (validate()) ctx.emit('on-joinning-channel-apply')
    }

    return {
      isChannelDetailOverlayVisible,

      isAudioOn,
      isVideoOn,
      updateSettings,
      videoSettigsErrorMessage,
      onSubmit
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

.modal-content-fade-enter-from {
  transform: scale(0);
}
.modal-content-fade-enter-active {
  transition: transform ease .4s;
}
</style>