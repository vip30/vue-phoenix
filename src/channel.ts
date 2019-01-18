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
  return (constructor: VueClass<Vue>) => {
    const originalDestoryed = constructor.prototype.destoryed
    const originalCreated = constructor.prototype.created
    constructor.prototype.created = function () {
      if (originalCreated) {
        originalCreated.bind(this)()
      }
      this.$channel = this.$socket.channel(options.name, options.params)
      const joinObj = this.$channel.join()
      if (options.hooks) {
        for (const hook of Object.keys(options.hooks)) {
          joinObj.receive(hook, options.hooks[hook])
        }
      }
      for (const phoenixOption of this.phoenixOptions) {
        this.$channel.on(phoenixOption.eventName, phoenixOption.callback)
      }
    }
    constructor.prototype.destoryed = function () {
      if (originalDestoryed) {
        originalDestoryed.bind(this)()
      }
      for (const phoenixOption of this.phoenixOptions) {
        this.$channel.off(phoenixOption.eventName)
      }
    }
    return constructor
  }
}

export const Channel = ChannelFunc
