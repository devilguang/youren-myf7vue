
import Vue from 'vue'
import App from './App'
import Routes from './router'
import Framework7Vue from './f7/vue-f7/framework7-vue.js'

Vue.use(Framework7Vue)


Vue.config.productionTip = false

Vue.use(Framework7Vue)
/* eslint-disable no-new */


new Vue({
  el: '#app',
  // router,
  template: '<App/>',
  components: { App }

})

// var app = new Vue({
//     // Root Element
//     el: '#app',
//     // Framework7 Parameters
//     framework7: {
//       root: '#app', //Should be same as app el
//       animateNavBackIcon: true,
//       routes: Routes,
//       material: !Framework7.prototype.device.ios
//     },
//     // Custom App Data
//     data: function () {
//       return {
//         user: {
//           name: 'Vladimir',
//           lastName: 'Kharlampidi',
//           age: 30
//         },
//         popupOpened: false,
//         loginScreenOpened: false,
//         pickerOpened: false,
//         actionsOpened: false
//       };
//     },
//     // Custom App Methods
//     methods: {
//       onF7Init: function () {
//         console.log('f7-init');
//       }
//     }
// });
