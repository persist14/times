<template>
  <div class="container-history" >
     <div class="search-history">
    <van-cell title="搜索历史">
     <div v-if="isDeleteShow">
      <span @click="$emit('clear-search-histories')">全部删除</span>
      &nbsp;
      &nbsp;
      <span @click="isDeleteShow = false">完成</span>
     </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true"  />
    </van-cell>
    <van-cell :title="item" v-for="(item, index) of searchHistories" :key="index"  @click="deleteHistory(item, index)">
      <van-icon name="close" v-if="isDeleteShow" />
    </van-cell>
  </div>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    // props传递下来的数据 普通类型不能进行修改
    // 引用类型可以修改 但是不能执行赋值的操作 可以调用方法或者属性
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    deleteHistory (item, index) {
      if (this.isDeleteShow) {
        // 处于删除状态下
        this.searchHistories.splice(index, 1)
      } else {
        // 处于非删除的状态下  直接展示搜索结果
        this.$emit('search', item)
        console.log(item)
      }
    }
  }
}
</script>

<style>

</style>
