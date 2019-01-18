import Vue from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import { ChannelOption } from './declartation'

function ChannelFunc<V extends Vue>(options: ChannelOption & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC
function ChannelFunc<VC extends VueClass<Vue>>(target: VC): VC
function ChannelFunc<V extends Vue>(options: {
  name: string
  params: object
  hooks?: {
    ok: (resp: any) => void
    error: (resp: any) => void
    [key: string]: (resp: any) => void
  }
}) {
  return (constructor: V) => {
    const originalCreated = constructor.$options.destroyed
    constructor.$options.created = () => {
      if (originalCreated) {
        originalCreated.bind(this)()
      }
      constructor.$channel = constructor.$socket.channel(options.name, options.params)
      const joinObj = constructor.$channel.join()
      if (options.hooks) {
        for (const hook of Object.keys(options.hooks)) {
          joinObj.receive(hook, options.hooks[hook])
        }
      }
      for (const phoenixOption of constructor.phoenixOptions) {
        constructor.$channel.on(phoenixOption.eventName, phoenixOption.callback)
      }
    }
    const originalDestoryed = constructor.$options.destroyed
    constructor.$options.destroyed = () => {
      if (originalDestoryed) {
        originalDestoryed.bind(this)()
      }
      for (const phoenixOption of constructor.phoenixOptions) {
        constructor.$channel.off(phoenixOption.eventName)
      }
    }
    return constructor
  }
}

export const Channel = ChannelFunc
