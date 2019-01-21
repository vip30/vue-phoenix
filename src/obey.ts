import Vue from 'vue'
import { createDecorator } from 'vue-class-component'

export function Obey(eventName: string, channelName?: string) {
  return (target: Vue, key: string, descriptor: any) => {
    createDecorator((componentOptions, k) => {
      componentOptions.phoenix = !componentOptions.phoenix ? Object.create(null) : componentOptions.phoenix
      if (channelName) {
        componentOptions.phoenix[channelName] = componentOptions.phoenix[channelName]
          ? {
              ...componentOptions.phoenix[channelName],
              [eventName]: descriptor.value
            }
          : {
              [eventName]: descriptor.value
            }
      } else {
        componentOptions.phoenix[eventName] = descriptor.value
      }
    })(target, key)
  }
}
