<template>
  <div
    ref="doc"
    class="communication-body d-flex align-items-center justify-content-around flex-wrap p-2 overflow-auto"
  >
    <agora-stream
      v-for="stream in streamList"
      :stream="stream"
      :video-settings="getVideoSettingsFromStreamId(stream.getId())"
      :key="stream.getId()"
      :style="{ width: streamSize.width + 'px', height: streamSize.height + 'px' }"
    />
  </div>
</template>

<script lang="ts">
import { Stream } from 'agora-rtc-sdk'
import {
  PropType,
  defineComponent,
  reactive,
  ref,
  computed,
  toRefs,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch
} from 'vue'

import { ChannelMember } from '../types/ChannelMember'
import AgoraStream from './AgoraStream.vue'

export default defineComponent({
  components: {
    AgoraStream
  },
  props: {
    streamList: {
      type: Array as PropType<Stream[]>,
      required: true
    },
    channelMembers: {
      type: Array as PropType<ChannelMember[]>,
      required: true
    }
  },
  setup (props) {
    const { streamList, channelMembers } = toRefs(props)
    const streamListLength = computed(() => streamList.value.length)
    const getVideoSettingsFromStreamId = computed(() => {
      return (streamId: string) => {
        const targetChannelMember = channelMembers.value.find((channelMember) => channelMember._id === streamId)
        return {
          isAudioOn: targetChannelMember?.isAudioOn,
          isVideoOn: targetChannelMember?.isVideoOn
        }
      }
    })

    const doc = ref<HTMLElement | null>(null)
    const streamSize = reactive({
      width: 0,
      height: 0
    })

    const initScale = async () => {
      await nextTick()
      const streamsSqrt = Math.ceil(Math.sqrt(streamListLength.value))
      const { clientWidth, clientHeight } = doc.value as HTMLElement
      if (clientWidth > clientHeight) {
        streamSize.width = clientWidth / (streamsSqrt + .5)
      } else {
        streamSize.width = clientWidth * .8
      }
      streamSize.height = streamSize.width * clientHeight / clientWidth
    }

    watch(streamListLength, initScale) // could be handled parents on stream add or remove event

    onMounted(() => {
      window.addEventListener('resize', initScale)
      initScale()
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', initScale)
    })

    return {
      doc,
      streamSize,

      getVideoSettingsFromStreamId
    }
  }
})
</script>
