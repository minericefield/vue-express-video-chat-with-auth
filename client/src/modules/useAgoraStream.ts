import { StreamSpec, createStream } from 'agora-rtc-sdk'
import { Ref, ToRefs, ref, computed } from 'vue'

import { State as VideoSettingsState } from './useVideoSettings'

// TODO: handle with attendance
export const useAgoraStream = (myId: Ref<string>, { isAudioOn, isVideoOn }: ToRefs<VideoSettingsState>) => {
  const streamSpec = computed<StreamSpec>(() => {
    return {
      streamID: myId.value,
      audio: isAudioOn.value,
      video: isVideoOn.value,
      screen: false
    }
  })

  const myStream = ref(createStream(streamSpec.value))
  const reCreateStream = () => {
    myStream.value = createStream(streamSpec.value)
  }

  // const myStream = computed<Stream>(() => {
  //   return createStream(streamSpec.value)
  // })

  const subscribeAccessHandledEvent = (onAllowed: () => void, onDenied: () => void) => {
     myStream.value.on('accessAllowed', onAllowed)
     myStream.value.on('accessDenied', onDenied)
  }

  const init = () => new Promise<void>((resolve, reject) => {
    myStream.value.init(() => {
      resolve()
    }, (error) => {
      reject(error)
    })
  })

  return {
    myStream,

    reCreateStream,
    subscribeAccessHandledEvent,
    init
  }
}
