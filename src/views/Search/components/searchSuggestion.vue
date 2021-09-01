<template>
  <div class="container-suggestion" >
    <div class="search-suggestion">
      <van-cell  icon="search" v-for="(item, index) of searchSuggestion" :key="index" @click="$emit('search',item)">
        <div slot="title"  v-html="highlight(item)"  ></div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      searchSuggestion: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      // 防抖节流  这里只能用es5的写法 不然this指向有问题
      handler: debounce(function (value) {
        this.loadsearchSuggestion(value)
      }, 500),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  methods: {
    async loadsearchSuggestion (value) {
      try {
        const { data } = await getSearchSuggestion(value)
        // console.log(data)
        this.searchSuggestion = data.data.options
      } catch {
        this.$toast('获取信息失败，请稍后再试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.container-suggestion {
   /deep/  span.active {
      color: #3296fa;
    }
  }
</style>
