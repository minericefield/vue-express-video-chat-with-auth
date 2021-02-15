import { Server as SeverT } from 'http'
import { Server, Socket } from 'socket.io'

type ChannelMember = {
  _id: string;
  name: string;
  isAudioOn: boolean;
  isVideoOn: boolean;
}

class Channel {
  public name: string
  public members: ChannelMember[] = []

  constructor (name: string) {
    this.name = name
  }

  public addMember (member: ChannelMember) {
    this.members.push(member)
  }
  public removeMember (member: ChannelMember) {
    this.members = this.members.filter((_member) => _member._id !== member._id)
  }
}

let channels: Channel[] = []

export const init = (server: SeverT) => {
  const io = new Server(server)
  io.on('connection', (socket: Socket) => {
    socket.on('join_channel', ({ channelName, channelMember }: { channelName: string; channelMember: ChannelMember }) => {
      let targetChannel = channels.find((_channel) => _channel.name === channelName)
      if (!targetChannel) {
        targetChannel = new Channel(channelName)
        channels.push(targetChannel)
      }
      // socket.join(channelName)

      targetChannel.addMember(channelMember)
      
      // io.to(channelName).emit('channel_updated', channels)
      io.emit('on_channels_updated', channels)
    })

    socket.on('exit_channel', ({ channelName, channelMember }: { channelName: string; channelMember: ChannelMember }) => {
      const targetChannel = channels.find((channel) => channel.name === channelName)
      if (targetChannel) {
        targetChannel.removeMember(channelMember)
        if (!targetChannel.members.length) {
          channels = channels.filter((_channel) => _channel.name !== targetChannel.name)
        }

        io.emit('on_channels_updated', channels)
      }
    })

    socket.on('update_video_settings', ({ channelName, channelMember }: { channelName: string; channelMember: ChannelMember }) => {
      const targetChannel = channels.find((channel) => channel.name === channelName)
      if (targetChannel) {
        const targetMember = targetChannel.members.find((member) => member._id === channelMember._id)
        targetMember.isAudioOn = channelMember.isAudioOn
        targetMember.isVideoOn = channelMember.isVideoOn

        io.emit('on_channels_updated', channels)
      }
    })
  })
}
