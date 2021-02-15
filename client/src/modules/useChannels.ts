import { io } from 'socket.io-client'
import { ToRefs, InjectionKey, ref, computed } from 'vue'

import { Me } from './useAuthMe'
import { State as VideoSettingsState } from './useVideoSettings'
import { ChannelMember } from '../types/ChannelMember'

export type Channel = {
  name: string;
  members: ChannelMember[];
}

const socket = io(process.env.VUE_APP_HOST, {
  transports: ['websocket', 'polling', 'flashsocket'],
})

export const useChannels = (me: ToRefs<Pick<Me, "_id" | "name">>, videoSettingsState: ToRefs<VideoSettingsState>) => {
  const channels = ref<Channel[]>([])
  const meAsMember = computed<ChannelMember>(() => {
    return {
      isAudioOn: videoSettingsState.isAudioOn.value,
      isVideoOn: videoSettingsState.isVideoOn.value,
      _id: me._id.value,
      name: me.name.value
    }
  })
  const joiningChannel = computed(() => {
    return (name: string) => {
      return channels.value.find((channel) => channel.name === name)
    }
  })

  const onJoin = (channelName: string) => {
    socket.emit('join_channel', { channelName, channelMember: meAsMember.value })
  }

  const onVideoSettingsUpdate = (channelName: string) => {
    socket.emit('update_video_settings', { channelName, channelMember: meAsMember.value })
  }

  const onExit = (channelName: string) => {
    socket.emit('exit_channel', { channelName, channelMember: meAsMember.value })
  }

  socket.on('on_init', (_channels: Channel[]) => {
    channels.value = _channels
  })

  socket.on('on_channels_updated', (_channels: Channel[]) => {
    channels.value = _channels
  })

  return {
    channels,
    joiningChannel,

    onJoin,
    onVideoSettingsUpdate,
    onExit
  }
}

export type Channels = ReturnType<typeof useChannels>

export const UseChannelsKey: InjectionKey<Channels> = Symbol('UseAuthMe')
