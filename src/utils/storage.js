// 封装 token的读取、删除、写入
// 设置本地存储的token
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
// 获取本地存储的token
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除本地存储的token
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
