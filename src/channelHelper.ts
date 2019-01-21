import { Socket } from 'phoenix'

export default class ChannelHelper {
  constructor(private socket: Socket) {}
  public initInstance(channelName: string, params?: object) {
    return this.socket.channel(channelName, params)
  }
}
