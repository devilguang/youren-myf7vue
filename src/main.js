
import Vue from 'vue'
import Framework7Vue from './f7/framework7-vue.js';
import router from './router'

Vue.use(Framework7Vue)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },

  framework7: {
      root: '#app', //Should be same as app el
      animateNavBackIcon: true,
      routes: Routes,
      material: !Framework7.prototype.device.ios
    },
})
