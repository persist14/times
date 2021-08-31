import request from '../utils/request'
// 封装获取文章数据
export const getArticalData = params => {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}
