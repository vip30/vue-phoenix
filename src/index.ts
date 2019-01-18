import { Socket } from 'phoenix'
import Vue, { PluginObject, VueConstructor } from 'vue'

export * from './channel'
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
    Vue.prototype.$socket = this.socket
    Vue.prototype.$vuePhoenix = this
    this.socket.connect()
  }
}
