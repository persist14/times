import * as dayjs from 'dayjs'
import Vue from 'vue'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn') // 全局使用
// console.log(dayjs().format('YYYY:MM:DD'))
// 注册一个全局过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
