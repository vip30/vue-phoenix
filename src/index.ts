import { Socket } from 'phoenix'
import Vue, { PluginObject, VueConstructor } from 'vue'
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
  public install(localVue: VueConstructor<Vue>) {
    Vue.prototype.$channel = undefined
    Vue.prototype.$socket = this.socket
    Vue.prototype.$channelHelper = new ChannelHelper()
    Vue.prototype.$vuePhoenix = this
    Vue.mixin(VuePhoenixMixin)
    this.socket.connect()
  }
}
