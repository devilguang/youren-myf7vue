
// import App from './App'

import Vue from 'vue'
import Framework7Vue from './f7/vue-f7/framework7-vue.js'
import Routes from './router'

import '@/assets/css/mobi-plugin-flexbox.scss'
import '@/assets/css/common.scss'

Vue.config.productionTip = false
Vue.use(Framework7Vue)

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
      material: !Framework7.prototype.device.ios
    },


    data () {
      return {
        user: {
          name: 'Vladimir',
          lastName: 'Kharlampidi',
          age: 30
        },
        popupOpened: false,
        loginScreenOpened: false,
        pickerOpened: false,
        actionsOpened: false
      };
    },
    // Custom App Methods
    methods: {
      onF7Init: function () {
        console.log('f7-init');
      }
    }
});
