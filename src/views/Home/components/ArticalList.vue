<template>
  <div class="artical-scoll">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh"  :success-text="isSuccessText" success-duration="1000">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
      >
      <ArticalItem v-for="(item, index) of list" :key="index" :artical="item"></ArticalItem>
       <!--  <van-cell v-for="(item,index) in list" :key="index" :title="item.title" /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticalData } from '@/api/artical'
import ArticalItem from '@/components/articalItem.vue'
export default {
  name: 'ArticalList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 控制获取数据页码
      error: false, // 控制获取数据错误 提示信息的显示与隐藏
      isRefreshLoading: false, // 控制下拉刷新状态
      isSuccessText: '刷新成功' // 控制下拉刷新成功后的提示
    }
  },
  components: {
    ArticalItem
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      try {
        const { data } = await getArticalData({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), // 页码
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        const { results } = data.data
        // 2. 将获取的数据放到list数组中
        this.list.push(...results)
        // 制造人为错误
        /*  if (Math.random() > 0.5) {
          JSON.parse('ydfdsbnkjsf')
        } */
        // 3. 本次数据加载完毕后要将加载状态设置为结束
        this.loading = false
        // 4. 判断时候加完所有数据
        if (results.length) {
        // 没有加载完数据让它继续加载
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      // 获取数据
      try {
        const { data } = await getArticalData({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 刷新的 肯定是当前时间的最新数据
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        /*   */

        const { results } = data.data
        // 2. 将获取的数据置顶到list数组中
        this.list.unshift(...results)
        // 关闭下来状态
        this.isSuccessText = '刷新成功'
        this.isRefreshLoading = false
      } catch (err) {
        this.isRefreshLoading = false
        this.isSuccessText = '刷新失败'
      }
    }
    /*    onLoad () {
      // 异步更新数据
      // 1. 请求获取数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 2. 将获取的数据放到list数组中
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 3. 本次数据加载完毕后要将加载状态设置为结束
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        // 4. 判断时候加完所有数据
        if (this.list.length >= 40) {
          // 如果没有数据 就将finished设置为true 不在触发加载更多
          this.finished = true
        }
      }, 1000)
    } */
  }
}
</script>

<style lang="less" scoped>
// 刚开始的滚动条是body中的  设置完后 是组件最外层div的滚动条 并且 一个频道就会创建一个组件 所以这里的滚动条互不影响
// 标记滚动的位置
.artical-scoll {
  height: 79vh;
  overflow-y: auto;
}
</style>
