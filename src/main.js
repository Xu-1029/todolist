import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';
import vuetify from './plugins/vuetify.js'



import './plugins/element.js'
import {
  Table,
  TableColumn,
  Form,
  FormItem,
  Select,
  Option,
  Popover,
  Switch,
  MessageBox,
  Loading,
  Input
} from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(Input)
Vue.component(MessageBox.name, MessageBox)
Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.use(vuetify)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
import Message from './Message'
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$loading = Loading.service

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register') {
    //页面是否登录，本地存储中是否有token(uid)数据，否：跳转登录页面
    let item = localStorage.getItem('token')
    if (item) {
      let loginTime = localStorage.loginTime
      const timeOver = 2 * 3600 * 1000
      let date = new Date()
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - loginTime > timeOver) {
        store.commit('REMOVE_STATE')
        Message.error('登录过期，请重新登陆')
        setTimeout(() => {
          next({
            name: 'login',
            query: {},
          })
        }, 1000)
      } else {
        next()
      }
    } else {
      // Message.info('Please login first.')
      setTimeout(() => {
        next({
          name: 'login',
          query: {},
        })
      }, 1000)
    }
  } else {
    next()
  }
})


new Vue({
  axios,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
