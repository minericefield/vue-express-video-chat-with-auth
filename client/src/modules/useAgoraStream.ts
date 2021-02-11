import { Stream, StreamSpec, createStream } from 'agora-rtc-sdk'
import { reactive, ref, Ref, computed } from 'vue'

// TODO: handle with attendance
export const useAgoraStream = (myId: Ref<string>, { isAudioOn, isVideoOn }: { isAudioOn: Ref<boolean>; isVideoOn: Ref<boolean> }) => {
  const streamSpec = computed<StreamSpec>(() => {
    return {
      streamID: myId.value,
      audio: isAudioOn.value,
      video: isVideoOn.value,
      screen: false
    }
  })

  const myStream = ref<Stream>(createStream(streamSpec.value))

  const updateStreamSpec = ({ audio, video }: Partial<StreamSpec>) => { // maybe better to handle with computed
    // NOTE: way to merge https://stackoverflow.com/questions/64099203/vue-how-to-merge-two-reactive-objects-without-loosing-reactivity
    if (audio !== undefined) streamSpec.audio = audio
    if (video !== undefined) streamSpec.video = video
  }

  const updateMyStream = () => {
    myStream.value = createStream(streamSpec)
  }

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

    updateStreamSpec,
    updateMyStream,
    subscribeAccessHandledEvent,
    init
  }
}
