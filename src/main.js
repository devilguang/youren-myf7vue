// import App from './App'
import Vue from 'vue'
import Framework7Vue from './f7/vue-f7/framework7-vue.js'
import Routes from './router'
import axios from 'axios'
import '@/assets/css/mobi-plugin-flexbox.scss'
import '@/assets/css/common.scss'
import VueBus from 'vue-bus'
Vue.config.productionTip = false
Vue.use(Framework7Vue)
Vue.use(VueBus)
// Vue.prototype.$http = axios.create({ baseURL: 'http://192.168.16.253:9002/' });
// Vue.prototype.$http = axios.create({ baseURL: 'http://120.55.191.189:9002/' });
Vue.prototype.$http = axios.create({ baseURL: 'http://192.168.16.23:9000/' });
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)
import StartRating from 'vue-star-rating'
Vue.component('StarRating', StartRating)

var app = new Vue({
    el: '#app',
    framework7: {
      root: '#app',
      animateNavBackIcon: true,
      routes: Routes,
      material: true, // !Framework7.prototype.device.ios
    },
    data () {
      return {

      };
    },
    // Custom App Methods
    methods: {
      onF7Init: function () {
        // console.log('f7-init');
      }
    }
});
