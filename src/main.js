import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'


import axios from 'axios'
axios.defaults.baseURL = 'api'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts



Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
