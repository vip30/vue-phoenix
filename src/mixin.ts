import Vue from 'vue'

export default Vue.extend({
  methods: {
    $initChannel(channelName: string, params?: object) {
      if (this.$waitingEventList) {
        this.$channel = this.$channelHelper.initInstance(channelName, params)
        this.$channel.join()
        for (const key of Object.keys(this.$waitingEventList)) {
          this.$channel.on(key, this.$waitingEventList[key])
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
      if (phoenixOption instanceof Function) {
        this.$channel ? this.$channel.on(key, phoenixOption) : (this.$waitingEventList[key] = phoenixOption)
      } else {
        const channel = this.$channelHelper.initInstance(key)
        channel.join()
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.on(eventName, phoenixOption[eventName])
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
        const channel = this.$channelHelper.initInstance(key)
        for (const eventName of Object.keys(this.$options.phoenix[key])) {
          channel.off(eventName)
        }
      }
    }
  }
})
