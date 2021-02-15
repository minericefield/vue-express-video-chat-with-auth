import { Client, Stream } from 'agora-rtc-sdk'
import { Ref, ref, computed } from 'vue'

export const useAgoraStreamList = () => {
  const streamList = ref<Stream[]>([])

  const streamIds = computed(() => streamList.value.map(stream => stream.getId()))

  const addStream = (stream: Stream, shouldPush: boolean) => {
    if (streamIds.value.includes(stream.getId())) return
    
    shouldPush ? streamList.value.push(stream) : streamList.value.unshift(stream)
  }

  const removeStream = (streamId: string | number | undefined) => {
    const stream = streamList.value.find(stream => stream.getId() === streamId)
    if (stream) {
      stream.close()
      streamList.value = streamList.value.filter(stream => stream.getId() !== streamId) // reject
    }
  }

  const subscribeStreamEvents = (client: Ref<Client>) => {
    client.value.on('stream-added', ({ stream }) => {
      client.value.subscribe(stream)
    })
    client.value.on('stream-removed', ({ stream }) => {
      removeStream(stream.getId())
    })
    client.value.on('stream-subscribed', ({ stream }) => {
      addStream(stream, false)
    })
    client.value.on('peer-leave', ({ uid }) => {
      removeStream(uid)
    })
  }

  return {
    streamList,

    addStream,
    removeStream,
    subscribeStreamEvents
  }
}
