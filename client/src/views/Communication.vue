<template>
  <layout-default>
    <transition name="communication-fade" appear>
      <div class="communication d-flex flex-column h-100">
        <communication-body
          :stream-list="streamList"
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
    </transition>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject } from 'vue'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

import { UseLoaderKey, loaderDefault } from '../modules/useLoader'
import { UseToastingKey, toastingDefault } from '../modules/useToasting'
import { UseAuthMeKey, authMeDefault } from '../modules/useAuthMe'
import { UseVideoSettingsKey, videoSettingsDefault } from '../modules/useVideoSettings'
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
    const router = useRouter()
    const channelName = useRoute().params.communicationHash as string // TODO: use server response
    const isMediaPermissionAlertModalVisible = ref(false)

    const { client, init: initClient, exit } = useAgoraClient(myId)
    const { myStream, subscribeAccessHandledEvent, init: initStream, reCreateStream } = useAgoraStream(myId, { isAudioOn, isVideoOn })
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
        updateVideoSettings({ isAudioOn: !isAudioOn.value })
        if (myStream.value.hasAudio()) {
          isAudioOn.value ? myStream.value.unmuteAudio() : myStream.value.muteAudio()
        } else {
          await startOver()
        }
      }

      if (type === 'video') {
        updateVideoSettings({ isVideoOn: !isVideoOn.value })
        if (myStream.value.hasVideo()) {
          isVideoOn.value ? myStream.value.unmuteVideo() : myStream.value.muteVideo()
        } else {
          await startOver()
        }
      }
    }

    onMounted(async () => { // TODO: Error handling
      subscribeStreamEvents()
      await initClient(channelName)

      subscribeAccessHandledEvent(() => {
        toasting.displayToasting({ message: 'Thank you for permitting your device' })
      }, () => {
        isMediaPermissionAlertModalVisible.value = true
      })
      await initMe()
    })

    onBeforeRouteLeave(async (_, __, next) => {
      loader.displayLoader(true)
      try {
        await exit(myStream.value)
      } catch (error) {
        // 
      } finally {
        loader.displayLoader(false)
        next()
      }
    })

    return {
      router, 

      isAudioOn,
      isVideoOn,
      streamList,

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
.communication-fade-enter-from
.communication-fade-leave-to {
  transform: translateX(100vw);
}
.communication-fade-enter-active
.communication-fade-leave-active {
  transition: transform ease 10s;
}
</style>
