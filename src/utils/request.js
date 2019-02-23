import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

const config = {
  // base_url: 'http://47.100.124.249:8006',
  base_url: 'http://localhost:8000',
  image_url: 'http://localhost:8000/image/'
}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.errno !== 0) {
      Message({
        message: res.errmsg,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     '你已被登出，可以取消继续留在该页面，或者重新登录',
      //     '确定登出',
      //     {
      //       confirmButtonText: '重新登录',
      //       cancelButtonText: '取消',
      //       type: 'warning'
      //     }
      //   ).then(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       location.reload() // 为了重新实例化vue-router对象 避免bug
      //     })
      //   })
      // }
      // return Promise.reject('error')
    } else if (res.errno === 403) {
      this.$notify.info({
        title: '提示',
        message: '账号密码错误!'
      })
    } else if (res.errno === 402) {
      this.$notify.info({
        title: '提示',
        message: '请输入正确的用户名！'
      })
    } else {
      this.$notify.info({
        title: '提示',
        message: '参数错误！'
      })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '连接超时！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export { service, config }
