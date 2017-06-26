import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'

Vue.use(Router)

export default [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/check',
    name: 'check',
    component: require("@/pages/2-check.vue")
  },
  {
    path: '/checkfirm',
    name: 'checkfirm',
    component: require("@/pages/3-check.vue")

  },
  {
    path: '/areas',
    name: 'areas',
    component: require("@/pages/3-areas.vue")

  },
  {
    path: '/contact',
    name: 'contact',
    component: require("@/pages/4-contact.vue")

  },

  // 专家版
  {
    path: '/myhome-user/:id',
    name: 'myhome-user',
    component: require("@/pages/scholar/myhome-user.vue")

  },
  {
    path: '/myaccount-user',
    name: 'myaccount-user',
    component: require("@/pages/scholar/myaccount-user.vue")

  },
  {
    path: '/recommend-user/:id',
    name: 'recommend-user',
    component: require("@/pages/scholar/recommend-user.vue")

  },
  {
    path: '/mymeeting-user/:id',
    name: 'mymeeting-user',
    component: require("@/pages/scholar/mymeeting-user.vue")

  },
  {
    path: '/demand/:id',
    name: 'demand',
    component: require("@/pages/scholar/demand-user.vue")
  },
  // 企业版
  {
    path: '/myaccount-corp',
    name: 'myaccount-corp',
    component: require("@/pages/company/myaccount-corp.vue")
  },
  {
    path: '/mymeeting-corp',
    name: 'mymeeting-corp',
    component: require("@/pages/company/mymeeting-corp.vue")

  },
  {
    path: '/recommend-cor/:id',
    name: 'recommend-corp',
    component: require("@/pages/company/recommend-corp.vue")
  },
  {
    path: '/myhome-corp/:id',
    name: 'myhome-corp',
    component: require("@/pages/company/myhome-corp.vue")
  }
]
