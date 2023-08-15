import axios from 'axios'
import store from '../store'

//重新定义axios 没有拦截器 拦截器会将multiple转换为json
const multiaxios = axios.create({
  headers: {
    Authorization: 'Bearer ' + store.state.token,
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryyb1zYhTI38xpQxBK'
  }
})

export default multiaxios