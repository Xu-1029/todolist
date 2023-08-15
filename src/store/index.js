import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  msgPool: [],
  id: window.localStorage.getItem('id'),
  email: window.localStorage.getItem('email'),
  loginName: window.localStorage.getItem('loginName'),
  token: window.localStorage.getItem('token'),
  loginTime: window.localStorage.getItem('loginTime'),
}

const mutations = {
  message(state, step) {
    state.msgPool.push(step)
    //将消息添加到消息列表
    setTimeout(() => {
      state.msgPool.shift()
    }, step.time);
    //清除消息
  },
  SET_LOGINNAME: (state, data) => {
    state.loginName = data
    window.localStorage.setItem('loginName', data)
  },
  SET_TOKEN: (state, data) => {
    state.token = data
    window.localStorage.setItem('token', data)
  },
  SET_MAIL: (state, data) => {
    state.email = data
    window.localStorage.setItem('email', data)
  },
  SET_ID: (state, data) => {
    state.id = data
    window.localStorage.setItem('id', data)
  },
  SET_LOGINTIME: (state, data) => {
    state.loginTime = data
    window.localStorage.setItem('loginTime', data)
  },


  REMOVE_STATE: (state) => {
    state.token = null
    state.email = null
    state.id = null
    state.loginName = null
    state.loginTime = null
    // state.inviteLink = null
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('loginName')
    window.localStorage.removeItem('loginTime')
  },
};

const getters = {
  // whether the user filled out account and pwd
  isLoggedIn: state => !!state.token,
}


export default new Vuex.Store({
  state,
  mutations,
  getters
})
