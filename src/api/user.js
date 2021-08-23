// 封装用户模块
import request from '../utils/request'
// 登录模块封装
export const login = data => {
  return request({
    url: 'app/v1_0/authorizations',
    method: 'post',
    data
  })
}
//  获取短信模块封装
export const sendSms = mobile => {
  return request({
    url: `app/v1_0/sms/codes/${mobile}`
  })
}
