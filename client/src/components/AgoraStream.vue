<template>
  <div
    :id="'stream_' + stream.getId()"
    class="agora-stream position-relative border rounded bg-white overflow-hidden"
  >
    <div class="agora-stream-footer d-flex align-items-center justify-content-end position-absolute w-100">
      <i
        v-if="isAudioOff"
        class="agora-stream-footer-icon material-icons position-relative text-danger"
      >
        mic
      </i>
      <i
        v-if="isVideoOff"
        class="agora-stream-footer-icon material-icons position-relative text-danger"
      >
        videocam
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { Stream } from 'agora-rtc-sdk'
import { PropType, defineComponent, toRefs, computed, onMounted, nextTick, unref } from 'vue'

export default defineComponent({
  props: {
    stream: {
      type: Object as PropType<Stream>,
      required: true
    }
  },
  setup (props) {
    const { stream } = toRefs(props)

    const isAudioOff = computed(() => !stream.value.hasAudio()) // stream.value.isAudioOn() stream.value.peerMuteAudio
    const isVideoOff = computed(() => !stream.value.hasVideo()) // stream.value.isVideoOn() stream.value.peerMuteVideo

    const play = () => {
      stream.value.play("stream_" + stream.value.getId(), { fit: 'cover' })
    }

    onMounted(async () => {
      await nextTick()
      if (stream.value.hasAudio() || stream.value.hasVideo()) {
        play()
      }
    })

    return {
      isAudioOff,
      isVideoOff
    }
  }
})
</script>

<style lang="scss" scoped>
.agora-stream-footer {
  bottom: 0;
  &-icon {
    &::after {
      position: absolute;
      top: 50%;
      left: -10%;
      content: "";
      height: 2px;
      width: 120%;
      background-color: #DC3545;
      transform: rotate(145deg);
    }
  }
}
</style>
