// 配置请求模块
import axios from 'axios'
const request = axios.create({
  //  配置基本路径
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器

// 响应拦截器

//  导出
export default request
