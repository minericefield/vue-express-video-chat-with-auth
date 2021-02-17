<template>
  <layout-default>
    <div class="communication d-flex flex-column h-100">
      <communication-body
        :stream-list="streamList"
        :channel-members="joiningChannel(channelName) ? joiningChannel(channelName).members : []"
        class="flex-grow-1 w-100"
      />

      <div class="communication-footer d-flex align-items-center justify-content-evenly p-2 border-top">
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
          icon="disabled_by_default"
          @on-click="router.push({ name: 'Top' })"
        />
      </div>
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'
import { UseVideoSettingsKey, videoSettingsDefault } from '../modules/useVideoSettings'
import { UseChannelsKey, channelsDefault } from '../modules/useChannels'
import { useAgoraClient } from '../modules/useAgoraClient'
import { useAgoraStream } from '../modules/useAgoraStream'
import { useAgoraStreamList } from '../modules/useAgoraStreamList'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import CircleIconButton from '../components/CircleIconButton.vue'
import CommunicationBody from '../components/CommunicationBody.vue'

export default defineComponent({
  name: 'Communication',
  components: {
    LayoutDefault,
    CircleIconButton,
    CommunicationBody
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)
    const { isAudioOn, isVideoOn, updateSettings: updateVideoSettings } = inject(UseVideoSettingsKey, videoSettingsDefault)
    const { _id: myId } = inject(UseAuthMeKey, authMeDefault)
    const { joiningChannel, onJoin, onVideoSettingsUpdate, onExit } = inject(UseChannelsKey, channelsDefault)

    const router = useRouter()
    const channelName = useRoute().params.channelName as string
    const isMediaPermissionAlertModalVisible = ref(false)

    const { client, init: initClient, exit } = useAgoraClient(myId)
    const { myStream, subscribeAccessHandledEvent, init: initStream, reCreateStream } = useAgoraStream(myId, { isAudioOn, isVideoOn })
    const { streamList, addStream, removeStream, subscribeStreamEvents } = useAgoraStreamList()

    const initMe = async () => {
      await initStream()
      addStream(myStream.value, true)
      client.value.publish(myStream.value)
    }

    const onAttendeeControllerClick = async (type: 'audio' | 'video') => {
      const startOver = async () => {
        loader.displayLoader(true)
        client.value.unpublish(myStream.value)
        removeStream(myStream.value.getId())
        reCreateStream()
        await initMe()
        loader.displayLoader(false)
      }

      if (type === 'audio') {
        if (isAudioOn.value && !isVideoOn.value) return toasting.displayToasting({ message: 'Either must be enabled.', isError: true })

        updateVideoSettings({ isAudioOn: !isAudioOn.value })
        if (myStream.value.hasAudio()) {
          isAudioOn.value ? myStream.value.unmuteAudio() : myStream.value.muteAudio()
        } else {
          await startOver()
        }
      }

      if (type === 'video') {
        if (isVideoOn.value && !isAudioOn.value) return toasting.displayToasting({ message: 'Either must be enabled.', isError: true })

        updateVideoSettings({ isVideoOn: !isVideoOn.value })
        if (myStream.value.hasVideo()) {
          isVideoOn.value ? myStream.value.unmuteVideo() : myStream.value.muteVideo()
        } else {
          await startOver()
        }
      }

      onVideoSettingsUpdate(channelName)
    }

    const execOnExit = () => { onExit(channelName) }
    onMounted(async () => {
      window.addEventListener('beforeunload', execOnExit)

      subscribeStreamEvents(client)
      await initClient(channelName)

      subscribeAccessHandledEvent(() => {
        onJoin(channelName)
      }, () => {
        isMediaPermissionAlertModalVisible.value = true
      })
      await initMe()
    })

    onBeforeRouteLeave(async (_, __, next) => {
      loader.displayLoader(true)
      try {
        await exit(myStream.value)
      } catch (_) {
        // 
      } finally {
        onExit(channelName)
        window.removeEventListener('beforeunload', execOnExit)
        loader.displayLoader(false)
        next()
      }
    })

    return {
      router, 

      isAudioOn,
      isVideoOn,
      streamList,
      joiningChannel,
      channelName,

      onAttendeeControllerClick
    }
  }
})
</script>

<style lang="scss" scoped>
.communication {
  &-footer {
    min-height: 64px;
  }
}
</style>
