
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


import axios from 'axios'
Vue.prototype.$http = axios.create({baseURL: ''})

// import cn from 'vee-validate/dist/locale/zh_CN.js'
// import VeeValidate, {Validator } from 'vee-validate'
// Validator.addLocale(cn);

// Vue.use(VeeValidate, {
//   local: 'zh_CN'
// })


import { validForm, validValue, validField } from 'lite-validator'

Vue.prototype.$validForm = validForm;
Vue.prototype.$validValue = validValue;
Vue.prototype.$validField = validField;


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
        user: {
          name: 'liu',
          lastName: 'andy',
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
