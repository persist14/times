import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
// 加载dayjs
import './utils/dayjs'
Vue.use(vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
