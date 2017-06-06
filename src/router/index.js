import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

import Home from '@/pages/home.vue'

// Vue.use(Router)

export default [{
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/home/',
    name: 'home',
    component: Home
  }
]
