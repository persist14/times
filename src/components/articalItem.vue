<template>
  <div class="artical-item">
    <van-cell>
      <div slot="title" class="title van-multi-ellipsis--l2" >{{artical.title}}</div>
      <div slot="label" >
         <div  v-if="artical.cover.type === 3" class="cover-wrap" >
         <div class="cover-item" v-for="(item, index) of artical.cover.images" :key="index" >
          <van-image
             fit="cover"
            :src="item"
          />
         </div>
      </div >
      <div class="label-info-wrap">
         <span>{{artical.aut_name}}</span>
        <span>{{artical.collect_count}}</span>
        <span>{{artical.pubdate | relativeTime}}</span>
      </div>

      </div>
      <van-image
        slot="default"
        fit="cover"
        v-if="artical.cover.type === 1"
        :src="artical.cover.images[0]"
      />
  </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticalItem',
  props: {
    artical: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
  .artical-item {
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }
    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    .cover-wrap {
      display: flex;
      padding: 30px 0;
      .cover-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .van-image {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
</style>
