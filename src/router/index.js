import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home.vue'

Vue.use(Router)

export default [{
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      requiresAuth:true
    }
  },
  // {
  //   path: '/login/',
  //   name: 'login',
  //   component: require("@/pages/1-login.vue")
  // },
  {
    path: '/check/:id',
    name: 'check',
    component: require("@/pages/2-check.vue"),
    meta:{
      requiresAuth:true
    }
  },
  // {
  //   path: '/check3/',
  //   name: 'check3',
  //   component: require("@/pages/3-check.vue"),
  //   meta:{
  //     requiresAuth:true
  //   }
  // },
  {
    path: '/areas/',
    name: 'areas',
    component: require("@/pages/3-areas.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/contact/',
    name: 'contact',
    component: require("@/pages/4-contact.vue"),
    meta:{
      requiresAuth:true
    }
  },


  // 专家版
  {
    path: '/myhome-user/',
    name: 'myhome-user',
    component: require("@/pages/scholar/myhome-user.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/myaccount-user/',
    name: 'myaccount-user',
    component: require("@/pages/scholar/myaccount-user.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/recommend-user/',
    name: 'recommend-user',
    component: require("@/pages/scholar/recommend-user.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/mymeeting-user/',
    name: 'mymeeting-user',
    component: require("@/pages/scholar/mymeeting-user.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/demand/:id',
    name: 'demand',
    component: require("@/pages/scholar/demand-user.vue"),
    meta:{
      requiresAuth:true
    }
  },
  // 企业版
  {
    path: '/myaccount-corp/',
    name: 'myaccount-corp',
    component: require("@/pages/company/myaccount-corp.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/mymeeting-corp/',
    name: 'mymeeting-corp',
    component: require("@/pages/company/mymeeting-corp.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/recommend-corp/',
    name: 'recommend-corp',
    component: require("@/pages/company/recommend-corp.vue"),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/myhome-corp/',
    name: 'myhome-corp',
    component: require("@/pages/company/myhome-corp.vue"),
    meta:{
      requiresAuth:true
    }
  }
]
