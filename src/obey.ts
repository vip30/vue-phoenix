import Vue from 'vue'
import { createDecorator } from 'vue-class-component'

export function Obey(eventName: string, channelName?: string) {
  return (target: Vue, key: string, descriptor: any) => {
    createDecorator((componentOptions, k) => {
      componentOptions.phoenix = !componentOptions.phoenix ? Object.create(null) : componentOptions.phoenix
      if (componentOptions.phoenix) {
        if (channelName) {
          componentOptions.phoenix[channelName] = componentOptions.phoenix[channelName]
            ? {
                ...(componentOptions.phoenix[channelName] as any),
                [eventName]: key
              }
            : {
                [eventName]: key
              }
        } else {
          componentOptions.phoenix[eventName] = key
        }
      }
    })(target, key)
  }
}
