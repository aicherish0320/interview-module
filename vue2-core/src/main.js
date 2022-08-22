import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from './plugins/vueLazyLoad'

const loadImage = require('./assets/images/loading.gif')
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: loadImage
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
