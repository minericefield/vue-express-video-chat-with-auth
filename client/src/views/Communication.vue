<template>
  <layout-default>
    <div class="communication">
      <div class="communication-body">
      </div>
      <div class="communication-footer d-flex align-items-center justify-content-spece-between p-2">
        <circle-icon-button
          icon="mic"
          :is-active="isAudioOn"
          @on-click="onAttendeeControllerClick('audio')"
        />
        <circle-icon-button
          icon="videocam"
          :is-active="isVideoOn"
          @on-click="onAttendeeControllerClick('video')"
        />
        <circle-icon-button
          icon="videocam"
          :is-active="isVideoOn"
          @on-click="updateSettings({ isVideoOn: !isVideoOn})"
        />
      </div>
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, inject } from 'vue'
import { useRoute } from 'vue-router'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'
import { UseVideoSettingsKey, videoSettingsDefault } from '../modules/useVideoSettings'
import { useAgoraClient } from '../modules/useAgoraClient'
import { useAgoraStream } from '../modules/useAgoraStream'
import { useAgoraStreamList } from '../modules/useAgoraStreamList'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import CircleIconButton from '../components/CircleIconButton.vue'

export default defineComponent({
  name: 'Communication',
  components: {
    LayoutDefault,
    CircleIconButton
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)
    const { isAudioOn, isVideoOn, updateSettings: updateVideoSettings } = inject(UseVideoSettingsKey, videoSettingsDefault)
    const { _id: myId } = inject(UseAuthMeKey, authMeDefault)
    const route = useRoute()
    const channelName = route.params.communicationHash as string // TODO : use server response
    const isMediaPermissionAlertModalVisible = ref(false)

    const { client, init: initClient, exit } = useAgoraClient(myId)
    const { myStream, updateStreamSpec, updateMyStream, subscribeAccessHandledEvent, init: initStream } = useAgoraStream(myId)
    const { streamList, addStream, removeStream } = useAgoraStreamList()

    const subscribeStreamEvents = () => {
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

    const onAttendeeControllerClick = async (type: 'audio' | 'video') => {
      if (type === 'audio') {
        updateVideoSettings({ isAudioOn: !isAudioOn.value })
        if (myStream.value.hasAudio() === false) {
          loader.displayLoader(true)
          client.value.unpublish(myStream.value)
          await initStream()
        }
      }
    }

    onMounted(async () => { // TODO: Error handling
      subscribeStreamEvents()
      await initClient(channelName)

      updateStreamSpec({ audio: isAudioOn.value, video: isVideoOn.value })
      updateMyStream()
      subscribeAccessHandledEvent(() => {
        toasting.displayToasting({ message: 'Thank you for permitting your device' })
      }, () => {
        isMediaPermissionAlertModalVisible.value = true
      })
      await initStream()
      addStream(myStream.value, true)
      client.value.publish(myStream.value)
    })

    onBeforeUnmount(async () => {
      loader.displayLoader(true)
      await exit(myStream.value)
      loader.displayLoader(false)
    })

    return {
      isAudioOn,
      isVideoOn,


      streamList
    }
  }
})
</script>
