import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Home from '@/pages/home.vue'

// Vue.use(Router)

export default [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/login/',
    name: 'login',
    component: require("@/pages/login.vue")
  },
  {
    path: '/check/',
    name: 'check',
    component: require("@/pages/check.vue")
  },
  {
    path: '/areas/',
    name: 'areas',
    component: require("@/pages/areas.vue")
  },
  {
    path: '/contact/',
    name: 'contact',
    component: require("@/pages/contact.vue")
  },

  {
    path: '/myhome/',
    name: 'myhome',
    component: require("@/pages/myhome.vue")
  }

]
