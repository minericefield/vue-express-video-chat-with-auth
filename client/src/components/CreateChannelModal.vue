<template>
  <div
    @click.self="isModalContentVisible = false"
    class="create-channel-modal modal d-flex align-items-center justify-content-center p-5 bg-overlay-color"
  >
    <transition
      name="create-channel-modal-content-fade"
      @after-leave="$emit('on-left')"
      appear
    >
      <div
        v-show="isModalContentVisible"
        class="modal-content mt-n4"
      >
        <div class="modal-header">
          <h5 class="modal-title">
            Create channel and join it
          </h5>
        </div>
        <div class="modal-body">
          <div>
            <form-text-input
              :text="channelName.text"
              target="channel-name"
              label="Channel Name"
              placeholder="Enter the channel name"
              :errorMessage="channelName.errorMessage"
              @on-update="updateChannelName"
            />
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
                @on-click="updateVideoSettings({ isAudioOn: !isAudioOn })"
              />
              <circle-icon-button
                icon="videocam"
                :is-active="isVideoOn"
                @on-click="updateVideoSettings({ isVideoOn: !isVideoOn})"
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
            @click.stop="isModalContentVisible = false"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.stop="onSubmit"
          >
            Join
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, inject, onMounted, nextTick } from 'vue'

import { State as VideoSettingsState, UseVideoSettingsKey, videoSettingsDefault } from '../modules/useVideoSettings'
import FormTextInput from './FormTextInput.vue'
import CircleIconButton from './CircleIconButton.vue'

import { isNotEmpty, isLengthLowerThan, isAlpha } from '../services/validator'

export default defineComponent({
  name: 'CreateChannelModal',
  components: {
    FormTextInput,
    CircleIconButton
  },
  setup (_, ctx) {
     const isModalContentVisible = ref(false)

    const { isAudioOn, isVideoOn, updateSettings } = inject(UseVideoSettingsKey, videoSettingsDefault)
    const videoSettigsErrorMessage = ref('')

    const isValidationOnGoing = ref(false)

    const channelName = reactive({
      text: '',
      errorMessage: ''
    })

    const validate = () => {
      isValidationOnGoing.value = true

      videoSettigsErrorMessage.value = !isAudioOn.value && !isVideoOn.value ? 'Either must be enabled.' : ''
      channelName.errorMessage = isNotEmpty(channelName.text.trim()) || isLengthLowerThan(channelName.text.trim(), 10) || isAlpha(channelName.text.trim())

      return !videoSettigsErrorMessage.value && !channelName.errorMessage
    }

    const updateVideoSettings = ({ isAudioOn, isVideoOn }: VideoSettingsState) => {
      updateSettings({ isAudioOn, isVideoOn })
      if (isValidationOnGoing.value) validate()
    }

    const updateChannelName = (_channelName: string) => {
      channelName.text = _channelName
      if (isValidationOnGoing.value) validate()
    }

    const onSubmit = () => {
      if (validate()) ctx.emit('on-channel-defined', channelName.text)
    }

    onMounted(async () => {
      await nextTick()
      isModalContentVisible.value = true
    })

    return {
      isModalContentVisible,
      isAudioOn,
      isVideoOn,
      channelName,
      isValidationOnGoing,
      videoSettigsErrorMessage,

      updateVideoSettings,
      updateChannelName,

      onSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.create-channel-modal-content-fade-enter-active,
.create-channel-modal-content-fade-leave-active {
  transition: all 0.5s ease;
}

.create-channel-modal-content-fade-enter-from,
.create-channel-modal-content-fade-leave-to {
  transform: translateY(-16px);
  opacity: 0;
}
</style>
