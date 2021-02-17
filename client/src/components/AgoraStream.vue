<template>
  <div
    :id="'stream_' + stream.getId()"
    class="agora-stream position-relative border rounded bg-white overflow-hidden"
  >
    <h5 class="agora-stream-name position-absolute p-3 text-info">
      {{ member?.name }}
    </h5>
    <div class="agora-stream-footer d-flex align-items-center justify-content-end position-absolute w-100 p-1">
      <i
        v-show="member?.isAudioOn === false"
        key="audio"
        class="agora-stream-footer-icon material-icons position-relative text-danger"
      >
        mic
      </i>
      <div class="p-1" />
      <i
        v-show="member?.isVideoOn === false"
        key="video"
        class="agora-stream-footer-icon material-icons position-relative text-danger"
      >
        videocam
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { Stream } from 'agora-rtc-sdk'
import { PropType, defineComponent, toRefs, onMounted, nextTick} from 'vue'

import { ChannelMember } from '../types/ChannelMember'

export default defineComponent({
  props: {
    stream: {
      type: Object as PropType<Stream>,
      required: true
    },
    member: {
      type: Object as PropType<ChannelMember>,
      required: true
    }
  },
  setup (props) {
    const { stream } = toRefs(props)

    // const isAudioOff = computed(() => !stream.value.hasAudio()) // stream.value.isAudioOn() stream.value.peerMuteAudio
    // const isVideoOff = computed(() => !stream.value.hasVideo()) // stream.value.isVideoOn() stream.value.peerMuteVideo

    const play = () => {
      stream.value.play("stream_" + stream.value.getId(), { fit: 'cover' })
    }

    onMounted(async () => {
      await nextTick()
      if (stream.value.hasAudio() || stream.value.hasVideo()) {
        play()
      }
    })
  }
})
</script>

<style lang="scss" scoped>
.agora-stream {
  &-name {
    z-index: 1;
  }
  &-footer {
    bottom: 0;
    z-index: 1;
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
}
</style>
