
  import { Socket, Channel } from 'phoenix';
  import Vue, { PluginFunction, WatchOptions } from 'vue'
  declare module "vue/types/vue" {
    interface Vue {
      $channel: Channel
      $socket: Socket
      phoenixOptions: PhoenixOption[]
    }
  }
  interface PhoenixOption {
    eventName: string
    callback: (...args: any[]) => any
  }


