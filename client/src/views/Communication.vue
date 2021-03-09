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

    <teleport to="#modal-overlay">
      <media-permission-alert-modal
        v-if="isMediaPermissionAlertModalVisible"
        @on-submit="isMediaPermissionAlertModalVisible = false, initMe()"
      />
    </teleport>
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
import MediaPermissionAlertModal from '../components/MediaPermissionAlertModal.vue'

export default defineComponent({
  name: 'Communication',
  components: {
    LayoutDefault,
    CircleIconButton,
    CommunicationBody,
    MediaPermissionAlertModal
  },
  setup () {
    const loader = inject(UseLoaderKey, loaderDefault)
    const toasting = inject(UseToastingKey, toastingDefault)
    const { isAudioOn, isVideoOn, updateSettings: updateVideoSettings } = inject(UseVideoSettingsKey, videoSettingsDefault)
    const { _id: myId } = inject(UseAuthMeKey, authMeDefault)
    const { getChannelFromItsName, joiningChannel, onJoin, onVideoSettingsUpdate, onExit } = inject(UseChannelsKey, channelsDefault)

    const router = useRouter()
    const channelName = useRoute().params.channelName as string

    const { client, init: initClient, exit } = useAgoraClient(myId)
    const { myStream, subscribeAccessHandledEvent, init: initStream, reCreateStream } = useAgoraStream(myId, { isAudioOn, isVideoOn })
    const { streamList, addStream, removeStream, subscribeStreamEvents } = useAgoraStreamList()

    const isMediaPermissionAlertModalVisible = ref(false)
    const joiningSucceed = ref(false)

    const initMe = async () => {
      loader.displayLoader(true)
      await initStream()
      addStream(myStream.value, true)
      client.value.publish(myStream.value)
      loader.displayLoader(false)
    }

    const onAttendeeControllerClick = async (type: 'audio' | 'video') => {
      const startOver = async () => {
        client.value.unpublish(myStream.value)
        removeStream(myStream.value.getId())
        reCreateStream()
        await initMe()
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
      loader.displayLoader(true)
      window.addEventListener('beforeunload', execOnExit)

      if (getChannelFromItsName(channelName)?.members.find((member) => member._id === myId.value)) {
        toasting.displayToasting({ message: 'You are already joining this channel.', isError: true })
        return router.push({ name: 'Top' })
      }

      subscribeStreamEvents(client)
      await initClient(channelName)

      subscribeAccessHandledEvent(() => {
        onJoin(channelName)
        joiningSucceed.value = true
        toasting.displayToasting({ message: `Joined channel "${channelName}" !` })
      }, () => {
        isMediaPermissionAlertModalVisible.value = true
      })
      await initMe()
      loader.displayLoader(false)
    })

    onBeforeRouteLeave(async (_, __, next) => {
      window.removeEventListener('beforeunload', execOnExit)

      loader.displayLoader(true)
      if (joiningSucceed.value) {
        loader.displayLoader(true)
        try {
          await exit(myStream.value)
        } catch (_) {
          // 
        } finally {
          execOnExit()
          loader.displayLoader(false)
        }
      }
      loader.displayLoader(false)

      next()
    })

    return {
      router, 

      isAudioOn,
      isVideoOn,
      streamList,
      joiningChannel,
      channelName,
      isMediaPermissionAlertModalVisible,

      initMe,
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
