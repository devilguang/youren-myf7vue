// import App from './App'
import Vue from 'vue'
import Framework7Vue from './f7/vue-f7/framework7-vue.js'
import Routes from './router'
import axios from 'axios'
import '@/assets/css/mobi-plugin-flexbox.scss'
import '@/assets/css/common.scss'
import {VueAuthenticate} from 'vue-authenticate'
import infiniteScroll from 'vue-infinite-scroll'
// import store from './vuexstate/vuexstate'
//往Vue的原型添加一个仓库，然后写一个vue的实例，变量全部可以存放在ruturn的json数据中
Vue.prototype.$store = new Vue({
  data() {
    return {
      areaInfo: [],   //专家版约见的
      firmInfo: [],   //企业版约见
      oId: '',        //专家或者企业的oId
      lId: '',        //需求列表的id
      userId: '',
      state: {
        token: ''
      },
      getNowFormatDate() {
        let date = new Date();
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + "年" + month + "月" + strDate + "日"
          + " " + date.getHours() + seperator2 + date.getMinutes();
        return currentdate;
      },

    }
  }
});
Vue.config.productionTip = false;
Vue.use(Framework7Vue);
Vue.use(infiniteScroll);
// Vue.prototype.$http = axios.create({ baseURL: 'http://192.168.16.253:9002/' });
// Vue.prototype.$http = axios.create({ baseURL: 'http://192.168.16.27:9000/'});
// Vue.prototype.$http = axios.create({baseURL: 'http://120.55.191.189:9004/'});
Vue.prototype.$http = axios.create({baseURL: 'http://120.55.191.189:9002/'}); //服务器地址


// Vue.prototype.$http = axios.create({baseURL: 'http://192.168.16.12:9000/'});

//拦截器
Vue.prototype.$http.interceptors.request.use(
  config => {
    if (Vue.prototype.$store.state.token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = 'Bearer ' + Vue.prototype.$store.state.token;
    }
    return config
  }, err => {
    return Promise.reject(err);
  });
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar);
import StartRating from 'vue-star-rating'
Vue.component('StarRating', StartRating);

var app = new Vue({
  el: '#app',
  framework7: {
    // store,
    root: '#app',
    animateNavBackIcon: true,
    routes: Routes,
    cache: false,
    material: true, // !Framework7.prototype.device.ios
  },
  data () {
    return {};
  },
  // Custom App Methods
  methods: {
    onF7Init: function () {
      // console.log('f7-init');
    }
  }
});

