import Vue from 'vue'
import { createDecorator } from 'vue-class-component'

export function Obey(eventName: string) {
  return (target: Vue, key: string, descriptor: any) => {
    createDecorator((componentOptions: any, k) => {
      componentOptions.phoenixOptions = componentOptions.phoenixOptions || []
      componentOptions.phoenixOptions.push({
        eventName,
        callback: descriptor.value
      })
    })(target, key)
  }
}
