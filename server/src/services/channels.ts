import { Server as SeverT } from 'http'
import { Server, Socket } from 'socket.io'

import { ChannelControlFromClient, Channels } from './definitions/channels'

const channels = new Channels()

export const init = (server: SeverT) => {
  const io = new Server(server, {
    path: '/sockets/channels',
    maxHttpBufferSize: 1024,
    pingInterval: 60 * 1000,
    pingTimeout: 4 * 60 * 1000
  })
  const onChannelsUpdated = () => {
    io.emit('on_channels_updated', channels.channelsForResponse)
  }

  io.on('connection', (socket: Socket) => {
    socket.on('join_channel', ({ channelName, channelMember }: ChannelControlFromClient) => {
      channels.joinChannel({ channelName, channelMember: { socketId: socket.id, ...channelMember } }, onChannelsUpdated)
      // socket.join(channelName) // Maybe TODO: make private for update_video_settings
      // io.to(channelName).emit('channel_updated', channels)
    })

    socket.on('exit_channel', ({ channelName, channelMember }: ChannelControlFromClient) => {
      channels.exitChannel({ channelName, channelMember: { socketId: socket.id, ...channelMember } }, onChannelsUpdated)
    })

    socket.on('update_video_settings', ({ channelName, channelMember }: ChannelControlFromClient) => {
      channels.updateVideoSettings({ channelName, channelMember: { socketId: socket.id, ...channelMember } }, onChannelsUpdated)
    })

    socket.on('init', () => {
      // just in case remove dusts on each client's init
      const arrivedConnectionIds = [...io.sockets.sockets.keys()]
      channels.cleanup(arrivedConnectionIds, onChannelsUpdated)
    })

    // NOTE: maybe safari disconnect delays
    socket.on('disconnect', () => {
      const arrivedConnectionIds = [...io.sockets.sockets.keys()].filter(socketId => socketId !== socket.id)
      channels.cleanup(arrivedConnectionIds, onChannelsUpdated)
    })
  })
}
