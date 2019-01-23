import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Component from 'vue-class-component'
import VuePhoenix, { Obey } from '../src'

const localVue = createLocalVue()
localVue.use(new VuePhoenix('/socket'))

@Component({
  name: 'dummy'
})
class Dummy extends Vue {
  public dummyHello: string = 'I am dummy'
  public render(h: any) {
    return h('div', this.dummyHello)
  }

  @Obey('shout')
  public Shout() {
    this.dummyHello = 'Shout'
  }

  @Obey('shout', 'room:lobby')
  public RoomShout() {
    this.dummyHello = 'RoomShout'
  }

  @Obey('ping', 'room:lobby')
  public RoomPing() {
    this.dummyHello = 'RoomPing'
  }
}

class ObeyTest {
  public wrapper: any

  public shallow() {
    this.wrapper = shallowMount(Dummy, {
      localVue
    })
  }
}

describe('<obey.ts>', () => {
  test('obey can set the options properly', () => {
    const t = new ObeyTest()
    t.shallow()
    expect(t.wrapper.vm.$options.phoenix).not.toBe(undefined)
  })

  test('shout and ping will be consolidated by channel name', () => {
    const t = new ObeyTest()
    t.shallow()
    expect(t.wrapper.vm.$options.phoenix['room:lobby'].shout).toBe('RoomShout')
    expect(t.wrapper.vm.$options.phoenix['room:lobby'].ping).toBe('RoomPing')
  })
})
