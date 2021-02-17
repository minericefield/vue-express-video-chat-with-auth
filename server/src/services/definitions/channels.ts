type ChannelMember = {
  _id: string;
  name: string;
  isAudioOn: boolean;
  isVideoOn: boolean;
  socketId: string;
}

export type ChannelControl = {
  channelName: string;
  channelMember: ChannelMember
}

class Channel {
  public name: string
  public members: ChannelMember[] = []

  constructor (name: string) {
    this.name = name
  }

  public get membersWithoutSocketId () {
    return this.members.map((member) => {
      return {
        _id: member._id,
        name: member.name,
        isAudioOn: member.isAudioOn,
        isVideoOn: member.isVideoOn
      }
    })
  }

  public addMember (member: ChannelMember) {
    this.members.push(member)
  }

  public removeMember (member: ChannelMember) {
    this.members = this.members.filter((_member) => _member._id !== member._id && _member.socketId !== member.socketId)
  }
}

export class Channels {
  private channels: Channel[] = []

  public get channelsForResponse () {
    return this.channels.map((channel) => {
      return {
        name: channel.name,
        members: channel.membersWithoutSocketId
      }
    })
  }

  public cleanup (arrivedConnectionIds: string[], callBack: () => void) {
    this.channels.forEach((channel) => {
      const unArrivedMembers = channel.members.filter((member) => {
        return !arrivedConnectionIds.includes(member.socketId)
      })
      unArrivedMembers.forEach((unArrivedMember) => {
        channel.removeMember(unArrivedMember)
      })
      if (!channel.members.length) {
        this.channels = this.channels.filter((_channel) => _channel.name !== channel.name)
      }
    })

    callBack()
  }

  public joinChannel ({ channelName, channelMember }: ChannelControl, callBack: () => void) {
    let targetChannel = this.getChannelFromItsName(channelName)
    if (!targetChannel) {
      targetChannel = new Channel(channelName)
      this.channels.push(targetChannel)
    }
    if (!targetChannel.members.find((member) => member._id === channelMember._id)) {
      targetChannel.addMember(channelMember)
    }

    callBack()
  }

  public exitChannel ({ channelName, channelMember }: ChannelControl, callBack: () => void) {
    const targetChannel = this.getChannelFromItsName(channelName)
    if (targetChannel) {
      targetChannel.removeMember(channelMember)
      if (!targetChannel.members.length) {
        this.channels = this.channels.filter((channel) => channel.name !== targetChannel.name)
      }

      callBack()
    }
  }

  public updateVideoSettings ({ channelName, channelMember }: ChannelControl, callBack: () => void) {
    const targetChannel = this.getChannelFromItsName(channelName)
    if (targetChannel) {
      const targetMember = targetChannel.members.find((member) => member._id === channelMember._id && member.socketId === channelMember.socketId)
      targetMember.isAudioOn = channelMember.isAudioOn
      targetMember.isVideoOn = channelMember.isVideoOn

      callBack()
    }
  }

  private getChannelFromItsName (channelName: string): Channel | undefined {
    return this.channels.find((channel) => channel.name === channelName)
  }
}
