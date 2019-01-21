import { Socket } from 'phoenix'

export default class ChannelHelper {
  public initInstance(
    this: {
      $socket: Socket
    },
    channelName: string,
    params?: object
  ) {
    return this.$socket.channel(channelName, params)
  }
}
