import { Socket } from 'phoenix'
import Vue, { PluginObject } from 'vue'
import ChannelHelper from './channelHelper'
import VuePhoenixMixin from './mixin'

export * from './obey'

export default class VuePhoenix implements PluginObject<string> {
  public socket: Socket
  constructor(socket: string | Socket, params?: object) {
    this.socket =
      socket instanceof Socket
        ? socket
        : new Socket(socket, {
            params
          })
  }
  public install(localVue: any) {
    Vue.prototype.$channel = undefined
    Vue.prototype.$socket = this.socket
    Vue.prototype.$channelHelper = new ChannelHelper()
    Vue.prototype.$vuePhoenix = this
    localVue.mixin(new VuePhoenixMixin())
    this.socket.connect()
  }
}
