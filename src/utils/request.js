// 配置请求模块
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  //  配置基本路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(config => {
  // config 为本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, (err) => {
  return Promise.reject(err)
}
)
// 响应拦截器

//  导出
export default request
