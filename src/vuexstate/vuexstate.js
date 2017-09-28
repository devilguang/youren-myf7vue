import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LOGINUSER = 'LOGIN_USER'
export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    LOGIN_USER(state,userInfo){
      state.token = userInfo.token
      localStorage.setItem('token', userInfo.token)
    }
  },
  getters: {
    token: state => state.token,
  },
  actions: {
    storeLoginUser({commit}, userInfo) {
      commit(LOGIN_USER, userInfo)
    },
  }

})
