<template>
  <layout-default>
    <div class="top d-flex flex-column position-relative w-100 h-100">
      <nav class="top-header navbar navbar-expand-lg">
        <button
          @click="isCreateChannelModalVisible = true"
          class="btn btn-info d-flex ml-auto"
        >
          <i class="material-icons mr-1">
            video_call
          </i>
          <p class="mb-0">
            Start Channel
          </p>
        </button>
      </nav>

      <div class="top-body d-flex flex-wrap flex-grow-1 justify-content-between px-3 pb-2w-100 overflow-auto">
        <channel-preview
          v-for="channel in channels"
          :key="channel.name"
          :channel="channel"
          @on-joinning-channel-apply="joinChannel(channel.name)"
        />
      </div>

      <teleport to="#modal-overlay">
        <create-channel-modal
          v-if="isCreateChannelModalVisible"
          @on-channel-defined="isCreateChannelModalVisible = false, joinChannel($event)"
          @on-left="isCreateChannelModalVisible = false"
        />
      </teleport>
    </div>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import { UseChannelsKey, channelsDefault } from '../modules/useChannels'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import CreateChannelModal from '../components/CreateChannelModal.vue'
import ChannelPreview from '../components/ChannelPreview.vue'

export default defineComponent({
  name: 'Top',
  components: {
    LayoutDefault,
    CreateChannelModal,
    ChannelPreview
  },
  setup () {
    const { channels } = inject(UseChannelsKey, channelsDefault)
    const isCreateChannelModalVisible = ref(false)

    const router = useRouter()

    const joinChannel = (channelName: string) => {
      router.push({ name: 'Communication', params: { channelName } })
    }

    return {
      channels,
      isCreateChannelModalVisible,

      joinChannel
    }
  }
})
</script>

<style lang="scss" scoped>
.top {
  &-header {
    min-height: 54px;
  }
}
</style>