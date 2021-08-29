import request from '@/utils/request'

// 获取全部频道接口
export const getAllChannelsData = () => {
  return request({
    url: '/app/v1_0/channels'
  })
}

// 添加频道列表接口封装
export const addChannels = channel => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
// 删除频道列表接口封装
export const deleteUserChannels = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'DELETE'
  })
}
