import Vue from 'vue'
import { ObeyOption } from '../types/vue'

export default class VuePhoenixMixin extends Vue {
  public created() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return
    }
    const waitingEventList: ObeyOption = {}
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key]
      if (phoenixOption instanceof Function) {
        this.$channel ? this.$channel.on(key, phoenixOption) : (waitingEventList[key] = phoenixOption)
      } else {
        const channel = this.$channelHelper.initInstance(key)
        channel.join()
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.on(eventName, phoenixOption[eventName])
        }
      }
    }
    if (Object.keys(waitingEventList)) {
      this.$watch('$channel', (newVal: any, oldVal: any) => {
        for (const key of Object.keys(waitingEventList)) {
          this.$channel.on(key, waitingEventList[key])
        }
      })
    }
  }

  public destroyed() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return
    }
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key]
      if (phoenixOption instanceof Function) {
        if (this.$channel) {
          this.$channel.off(key)
        }
      } else {
        const channel = this.$channelHelper.initInstance(key)
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.off(eventName)
        }
      }
    }
  }
}
