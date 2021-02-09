<template>
  <layout-default>
    <nav class="navbar navbar-expand-lg">
      <button
        @click="isCreateChannelModalVisible = true"
        class="btn btn-primary"
      >
        Start Video
      </button>
    </nav>

    <teleport to="#modal-overlay">
      <create-channel-modal
        v-if="isCreateChannelModalVisible"
        @on-channel-defined="joinChannel"
        @on-left="isCreateChannelModalVisible = false"
      />
    </teleport>
  </layout-default>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import LayoutDefault from '../layouts/LayoutDefault.vue'
import CreateChannelModal from '../components/CreateChannelModal.vue'

export default defineComponent({
  name: 'Top',
  components: {
    LayoutDefault,
    CreateChannelModal
  },
  setup () {
    const isCreateChannelModalVisible = ref(false)
    const ruter = useRouter()

    // TODO: request server and get hash form server
    const joinChannel = (channelName: string) => {
      isCreateChannelModalVisible.value = false
      ruter.push({ name: 'Communication', params: { communicationHash: channelName } })
      // useRouter().push({ name: 'Communication', params: { communicationHash: channelName } })
    }

    return {
      isCreateChannelModalVisible,

      joinChannel
    }
  }
})
</script>
