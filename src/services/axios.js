import axios from 'axios'
import store from '../store'

const instance = axios.create({
  headers: {
    // Authorization: 'Bearer ' + store.state.token,
    'token': store.state.token,
    'Content-Type': 'application/json'
  }
})
// 请求拦截
instance.interceptors.request.use(config => {
  const userId = store.state.id
  if (config.method === 'get') {
    config.data = true
  }
  if (store.state.token) {
    config.headers['token'] = store.state.token
  }
  config.headers['Content-Type'] = 'application/json'
  // 更改config中不符合服务器要求的信息
  // 显示加载图标
  // 某些请求必须携带特殊信息，如token

  config.params = {
    userId: userId,
    ...config.params
  }
  return config
}, err => {
  console.log(err)
})
// 响应拦截
instance.interceptors.response.use(res => {
  return res
}, err => {
  console.log(err)
})

export default instance
