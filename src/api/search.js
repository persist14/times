// 封装用户模块
import request from '../utils/request'
// 获取联想建议数据接口
export const getSearchSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}
// 获取搜索结果数据接口
export const getSearchResult = params => {
  return request({
    url: '/app/v1_0/search',
    params
  })
}
