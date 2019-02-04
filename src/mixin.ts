import Vue from 'vue'

export default Vue.extend({
  methods: {
    $initChannel(channelName: string, params?: object) {
      if (this.$waitingEventList) {
        this.$channel = this.$channelKeeper.retrieveChannel(channelName, params)
        for (const key of Object.keys(this.$waitingEventList)) {
          const methodName = this.$waitingEventList[key]
          this.$channel.on(key, this[methodName])
        }
      }
    }
  },
  created() {
    // Phoenix is not exist in the options
    if (!this.$options.phoenix) {
      return
    }
    this.$waitingEventList = {}
    for (const key of Object.keys(this.$options.phoenix)) {
      const phoenixOption = this.$options.phoenix[key]
      if (typeof phoenixOption === 'string') {
        this.$channel ? this.$channel.on(key, this[phoenixOption]) : (this.$waitingEventList[key] = phoenixOption)
      } else {
        const channel = this.$channelKeeper.retrieveChannel(key)
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          const methodName = this.$options.phoenix[key][eventName]
          channel.on(eventName, this[methodName])
        }
      }
    }
  },
  destroyed() {
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
        const channel = this.$channelKeeper.retrieveChannel(key)
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.off(eventName)
        }
      }
    }
  }
})
