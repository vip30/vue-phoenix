import VuePhoenix from '@vip30/vue-phoenix'
import Vue from 'vue'
import App from './App.vue'

Vue.use(
  new VuePhoenix('wss://vue-phoenix.herokuapp.com/socket', {
    token: ''
  })
)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
