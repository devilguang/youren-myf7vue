import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home.vue'
Vue.use(Router);

export default [
  {
    path: '/home',
    name: 'home',
    component: Home,

  },
  {
    path: '/login',
    name: 'login',
    component: require("@/pages/1-login.vue")
  },
  {
    path:'/identity',
    name:'identity',
    component:require("@/pages/identity.vue")
  },
  {
    path: '/expertsHome',
    name: 'expertsHome',
    component: require("@/pages/expertsHome.vue")
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
    path: '/certification',
    name: 'certification',
    component: require("@/pages/certification.vue")
  },
  {
    path: '/registered ',
    name: 'registered ',
    component: require("@/pages/4-areas.vue")
  },
  {
    path: '/contact',
    name: 'contact',
    component: require("@/pages/4-contact.vue")

  },

  // 专家版
  {
    path: '/myhome-user',
    name: 'myhome-user',
    component: require("@/pages/scholar/myhome-user.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }

  },
  {
    path: '/myaccount-user',
    name: 'myaccount-user',
    component: require("@/pages/scholar/myaccount-user.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }

  },
  {
    path: '/recommend-user',
    name: 'recommend-user',
    component: require("@/pages/scholar/recommend-user.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }

  },
  {
    path: '/mymeeting-user',
    name: 'mymeeting-user',
    component: require("@/pages/scholar/mymeeting-user.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/demand',
    name: 'demand',
    component: require("@/pages/scholar/demand-user.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  // 企业版
  {
    path: '/myaccount-corp',
    name: 'myaccount-corp',
    component: require("@/pages/company/myaccount-corp.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/mymeeting-corp',
    name: 'mymeeting-corp',
    component: require("@/pages/company/mymeeting-corp.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/recommend-corp',
    name: 'recommend-corp',
    component: require("@/pages/company/recommend-corp.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  },
  {
    path: '/myhome-corp',
    name: 'myhome-corp',
    component: require("@/pages/company/myhome-corp.vue"),
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    }
  }
]
