<template>
  <div class="container-result" >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="获取数据失败，点击重试"
    >
      <van-cell v-for="(item, index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
    // 1. 获取请求数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // if (Math.random() < 0.5) {
        //   JSON.parse('dsjflsljfljf')
        // }
        // console.log(data)
        const { results } = data.data
        // 2.将获取的数据放在list中
        this.list.push(...results)
        // 3.关闭加载
        this.loading = false
        // 4.判断数据是否加载完毕
        if (results.length) {
          // 还有数据的情况下 获取下一页数据
          this.page++
        } else {
          this.loading = false
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  }
}
</script>

<style>

</style>
