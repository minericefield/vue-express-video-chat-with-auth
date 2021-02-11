import { createClient, ClientConfig, Stream } from 'agora-rtc-sdk'
import { ref, Ref } from 'vue'

import { appId } from '../agora.config'

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'h264'
}

export const useAgoraClient = () => {
  const client = ref(createClient(config))
  const myId = ref<number | null>(null)

  const join = (channelName: string) => new Promise<Ref<number | null>>((resolve, reject) => {
    client.value.join(appId, channelName, myId.value, undefined, (generatedMyId) => {
      myId.value = generatedMyId
      resolve(myId) // no need to resolve(myId)
    }, (error) => {
      reject(error)
    })
  })

  const init = (channelName: string) => new Promise<void>((resolve, reject) => {
    client.value.init(appId, async () => {
      await join(channelName)
      resolve()
    }, (error) => {
      reject(error)
    })
  })

  // const init = () => new Promise<void>((resolve, reject) => {
  //   client.value.init(appId, () => {
  //     resolve()
  //   }, (error) => {
  //     reject(error)
  //   })
  // })

  const exit = (myStream: Stream) => new Promise<void>((resolve, reject) => {
    client.value.unpublish(myStream)
    myStream.close()
    client.value.leave(() => {
      resolve()
    }, (error) => {
      reject(error)
    })
  })

  return {
    client,
    myId,

    init,
    exit
  }
}
