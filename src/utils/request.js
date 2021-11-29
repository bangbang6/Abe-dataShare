import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

// create an axios instance
const request = axios.create({
  baseURL: 'http://localhost:8070', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
request.interceptors.request.use(
  config => {
    console.log('config', config)
    if (config.url.indexOf('login') === -1 || config.url.indexOf('register') === -1 || config.url.indexOf('getAllChannels') === -1) {
      config.headers['token'] = getToken('abe-token')
      return config
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 200) {
      return res.data
    } else {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
