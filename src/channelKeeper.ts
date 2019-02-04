import { Channel, Socket } from 'phoenix'

export default class ChannelKeeper {
  private channels: {
    [key: string]: Channel
  } = {}
  constructor(private socket: Socket) {}
  public retrieveChannel(channelName: string, params?: object) {
    if (this.channels[channelName]) {
      return this.channels[channelName]
    } else {
      const newChannel = this.socket.channel(channelName, params)
      this.channels[channelName] = newChannel
      newChannel.join()
      return newChannel
    }
  }
}
