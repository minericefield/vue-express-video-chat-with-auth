import { Server as SeverT } from 'http'
import { Server, Socket } from 'socket.io'

import { ChannelControl, Channels } from './definitions/channels'

const channels = new Channels()

export const init = (server: SeverT) => {
  const io = new Server(server)
  const onChannelsUpdated = () => {
    io.emit('on_channels_updated', channels.channelsForResponse)
  }

  io.on('connection', (socket: Socket) => {
    socket.on('join_channel', (channelControl: ChannelControl) => {
      channels.joinChannel(channelControl, onChannelsUpdated)
      // socket.join(channelName) // Maybe TODO: make private for update_video_settings
      // io.to(channelName).emit('channel_updated', channels)
    })

    socket.on('exit_channel', (channelControl: ChannelControl) => {
      channels.exitChannel(channelControl, onChannelsUpdated)
    })

    socket.on('update_video_settings', (channelControl: ChannelControl) => {
      channels.updateVideoSettings(channelControl, onChannelsUpdated)
    })

    socket.on('init', () => {
      // just in case remove dusts on each client's init
      const arrivedConnectionIds = [...io.sockets.sockets.keys()]
      channels.cleanup(arrivedConnectionIds, () => {
        io.emit('on_init', { channels: channels.channelsForResponse, socketId: socket.id })
      })
    })

    // safari disconnect delays?
    socket.on('disconnect', () => {
      // just in case remove dusts on each client's init
      const arrivedConnectionIds = [...io.sockets.sockets.keys()].filter(socketId => socketId !== socket.id)
      channels.cleanup(arrivedConnectionIds, onChannelsUpdated)
    })
  })
  
  setInterval(() => {
    console.log([...io.sockets.sockets.keys()])
  }, 5000)
}
