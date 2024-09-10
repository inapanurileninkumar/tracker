import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/styles/layout.scss'
import '@/assets/styles/main.scss'
import '@/assets/scss/_theme.scss'

import '@/assets/fontawesome/css/fontawesome.css'
import '@/assets/fontawesome/css/brands.css'
import '@/assets/fontawesome/css/regular.css'
import '@/assets/fontawesome/css/solid.css'

import 'vue-popperjs/dist/vue-popper.css'
import Popper from 'vue-popperjs'

import { formatNumber, formatDate } from './mixins/format'

Vue.component('AppPopper', Popper)

Vue.config.productionTip = false
Vue.filter('formatNumber', formatNumber)
Vue.filter('formatDate', formatDate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
