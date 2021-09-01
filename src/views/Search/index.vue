<template>
  <div class="container-search">
    <!-- 搜索区域 -->
    <form action="/">
      <van-search class="search-btn"
        v-model="searchText"
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        show-action
        @focus="isShowSearchResult = false"
      />
    </form>
    <!-- 搜索结果 -->
    <searchResult v-if="isShowSearchResult" :searchText="searchText"></searchResult>
     <!-- 联想建议 -->
    <searchSuggestion v-else-if="searchText" :searchText="searchText" @search="search" ></searchSuggestion>
    <!-- 搜索历史 -->
    <searchHistory  v-else :searchHistories="searchHistories" @clear-search-histories="searchHistories = []" @search="onSearch" ></searchHistory>

  </div>
</template>

<script>
import searchHistory from './components/searchHistory.vue'
import searchResult from './components/searchResult.vue'
import searchSuggestion from './components/searchSuggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  data () {
    return {
      searchText: '',
      isShowSearchResult: false,
      searchHistories: getItem('TOUTIAO_SEARCH_TOUTIAO') || [] // 刚开始没数据制空
    }
  },
  methods: {
    onSearch (val) {
      // console.log(val)
      // 不能重复将查询记录显示出来 添加到searchResults中
      const index = this.searchHistories.indexOf(val)
      // console.log(index)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.searchText = val
      this.isShowSearchResult = true
    },
    onCancel () {
      this.$router.back()
    },
    // 获取子组件点击后的内容传递给搜索框
    search (val) {
      this.searchText = val
      this.isShowSearchResult = true
    }
  },
  watch: {
    searchHistories (value) {
      // 通过监视searchHistories数组的变化 将每次更新的最新数据放在本地存储进行持久化
      setItem('TOUTIAO_SEARCH_TOUTIAO', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .container-search {
    padding-top: 108px;
    .van-search__action {
      color: #fff;
      /deep/ &:active{
        color:unset;
      }
      background-color: rgba(0, 0, 0, 0);
    }
    .search-btn {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>
