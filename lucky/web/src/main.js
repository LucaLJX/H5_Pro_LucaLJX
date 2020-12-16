import VueParticles from 'vue-particles'
import Vue from 'vue'
import Vant from 'vant'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'

Vue.config.productionTip = false

Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
