import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/tailwind.css'
import '@gitlab/ui/dist/index.css'
import '@gitlab/ui/dist/utility_classes.css'
import setConfigs from '@gitlab/ui/dist/config'
setConfigs()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  components: { App }
}).$mount('#app')
